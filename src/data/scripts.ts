import type { ConditionId, DayScheduleItem, PriorityTask, Scenario } from "../types";
import audioManifest from "./audioManifest.json";
import studyLlmArtifact from "./llmStudyScripts.json";

const llmScriptOverrides = studyLlmArtifact.scripts as Record<
  string,
  Partial<Record<ConditionId, string>>
>;
const llmModels = studyLlmArtifact.modelsByScenarioArm as Record<
  string,
  Partial<Record<ConditionId, string>>
>;
const llmSources = studyLlmArtifact.generationSourceByScenarioArm as Record<
  string,
  Partial<Record<ConditionId, string>>
>;
const llmSections = studyLlmArtifact.sectionsByScenarioArm as Record<
  string,
  Partial<
    Record<
      ConditionId,
      | {
          introduction?: string;
          task_completion?: string;
          ending?: string;
        }
      | null
    >
  >
>;
export type AudioSegmentId = "introduction" | "middle" | "ending" | "complete";
export type AudioSegmentMap = Partial<Record<AudioSegmentId, string>>;
const audioByScenarioArm = (
  audioManifest as {
    audioByScenarioArm?: Record<string, Partial<Record<ConditionId, string | AudioSegmentMap>>>;
  }
).audioByScenarioArm ?? {};
const pauseMarkerPattern = /<pause\s+\d+(?:\.\d+)?\s*(?:s|sec|secs|second|seconds)>/gi;
const stripPauseMarkers = (text: string) =>
  text
    .replace(pauseMarkerPattern, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const normalizeClockTimes = (text: string) =>
  text.replace(/\b(0?[1-9]|1[0-2]):([0-5]\d)\s*(AM|PM)\b/g, (_, hour, minutes, meridiem) => {
    const normalizedHour = String(Number(hour));
    const normalizedMeridiem = String(meridiem).toUpperCase();
    return minutes === "00"
      ? `${normalizedHour} ${normalizedMeridiem}`
      : `${normalizedHour}:${minutes} ${normalizedMeridiem}`;
  });

const cleanScriptText = (text: string) => normalizeClockTimes(stripPauseMarkers(text));

const taskPhrase = (task: PriorityTask) => {
  const timeRange =
    task.scheduledStart && task.scheduledEnd ? `${task.scheduledStart}-${task.scheduledEnd}, ` : "";
  return `${timeRange}${task.durationMinutes} minutes on ${task.title.toLowerCase()}`;
};

const scheduleItemPhrase = (item: DayScheduleItem) => {
  const note = item.note ? ` (${item.note})` : "";
  return `${item.scheduledStart}-${item.scheduledEnd} ${item.title.toLowerCase()}, ${item.durationMinutes} minutes${note}`;
};

const fallbackTask = (scenario: Scenario): PriorityTask => ({
  rank: 1,
  title: scenario.contextTitle,
  durationMinutes: 30,
  priority: "medium",
  linkedValue: scenario.values[0] ?? "Focus",
});

const rehearsalTasks = (scenario: Scenario): PriorityTask[] =>
  scenario.topTasks.length > 0 ? scenario.topTasks : [fallbackTask(scenario)];

const taskList = (scenario: Scenario) => rehearsalTasks(scenario).map((task) => taskPhrase(task)).join(", then ");

const focusSubtaskLine = (scenario: Scenario) => {
  const subtasks = scenario.focusSubtasks ?? [];
  if (!subtasks.length) return taskList(scenario);

  return subtasks
    .map((subtask) => `${subtask.title.toLowerCase()}${subtask.durationMinutes ? ` (${subtask.durationMinutes} minutes)` : ""}`)
    .join(", then ");
};

const valueLine = (scenario: Scenario) =>
  `${scenario.values.slice(0, 3).join(", ")} -- aiming to feel ${scenario.desiredFeelings.slice(0, 3).join(", ")}.`;

const baselinePlan = (scenario: Scenario) =>
  scenario.scope === "daily" && scenario.daySchedule.length > 0
    ? scenario.daySchedule.map((item) => scheduleItemPhrase(item)).join(", then ")
    : scenario.baselineItems.length > 0
      ? scenario.baselineItems.join(", then ")
      : taskList(scenario);

const cueLine = (scenario: Scenario) => scenario.focusCues.slice(0, 4).join(", ");

const splitTextIntoThree = (text: string): AudioSegmentMap => {
  const paragraphs = text.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  if (paragraphs.length >= 3) {
    return {
      introduction: paragraphs[0],
      middle: paragraphs.slice(1, -1).join("\n\n"),
      ending: paragraphs[paragraphs.length - 1],
    };
  }

  const sentences =
    text
      .replace(/\s+/g, " ")
      .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
      ?.map((item) => item.trim())
      .filter(Boolean) ?? [text.trim()];
  const firstCut = Math.max(1, Math.ceil(sentences.length / 3));
  const secondCut = Math.max(firstCut + 1, Math.ceil((sentences.length * 2) / 3));
  return {
    introduction: sentences.slice(0, firstCut).join(" "),
    middle: sentences.slice(firstCut, secondCut).join(" "),
    ending: sentences.slice(secondCut).join(" ") || sentences[sentences.length - 1],
  };
};

const taskSequenceLine = (scenario: Scenario, tasks: PriorityTask[]) => {
  if (scenario.scope === "task" && scenario.focusTask) {
    return `Picture the focus task: ${scenario.focusTask.title}. Let the sequence move through ${focusSubtaskLine(scenario)}.`;
  }

  if (scenario.daySchedule.length > 0) {
    return `Picture the whole day schedule in time order: ${scenario.daySchedule
      .map((item) => scheduleItemPhrase(item))
      .join(", then ")}. Let the notes beside each item help the transitions feel concrete without turning the day into a ranking exercise.`;
  }

  return `Picture the day moving through ${tasks.map((task) => taskPhrase(task)).join(", then ")}. Let the timing and duration of each block shape the rehearsal.`;
};

export function scriptForCondition(scenario: Scenario, condition: ConditionId): string {
  const llmOverride = llmScriptOverrides[scenario.id]?.[condition];
  if (llmOverride) return cleanScriptText(llmOverride);

  const tasks = rehearsalTasks(scenario);
  const [first, second, third] = tasks;

  switch (condition) {
    case "baseline":
      return [
        "Listed items:",
        baselinePlan(scenario)
          .split(", then ")
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n"),
        "End of listed items.",
      ].join("\n\n");

    case "mind":
      if (scenario.scope === "daily") {
        return [
          `Let the larger aim appear in the background: ${scenario.userGoal}. It stays present but light, like context around today's schedule rather than pressure to rank the day.`,
          taskSequenceLine(scenario, tasks),
          `As each scheduled item arrives, imagine one clear transition into it and one note you would want to remember afterward. Each block can be part of ${scenario.lifePriority.toLowerCase()}, without needing to make every item equally important.`,
        ].join("\n\n");
      }

      return [
        `Let the larger aim appear in the background: ${scenario.userGoal}. It stays present but light, like context around today's ranked work. This image is not the whole goal and not the whole season. It is one rehearsal for the priority sequence in front of the user.`,
        taskSequenceLine(scenario, tasks),
        `For the highest-ranked task, let an image form of visible progress by the end of its block. What might the mind be thinking when the task starts to make sense? What might feel different when one piece is clearly moved forward? The next tasks arrive as smaller anchors. Each image is one step toward ${scenario.lifePriority.toLowerCase()}.`,
      ].join("\n\n");

    case "body":
      return [
        `Imagine the first slow breath of the rehearsal, and the body state available today: ${scenario.bodyState.toLowerCase()}. The pace begins from the energy actually here. There is no need for the body to look different in the image. The start can be honest.`,
        `Let the scene become the anchor: ${cueLine(scenario)}. Attention moves through those cues slowly. Picture posture settling, materials nearby, and the first stretch beginning at a pace the body can hold. What might a sustainable start look like in the hands, eyes, shoulders, and breath?`,
        "As the day moves in the image, those cues return before each next block. What might the body feel like when attention comes back without force? What might feel steadier after one honest restart? The environment helps carry attention back when energy wavers.",
      ].join("\n\n");

    case "soul":
      return [
        `Let the first image be about what matters: ${valueLine(scenario)} Those words set the emotional color before any task details appear. The day is not only a list of tasks; it is a scene where a way of being can become visible.`,
        "Imagine the day unfolding so those values show up in small choices. What might it look like to begin from that value instead of from pressure? What might progress look like while still staying connected to the kind of person this work supports?",
        `The image does not need perfect work. It only needs work that carries the feeling being practiced. Close with one grounded word from the day: ${scenario.desiredFeelings[0]}. Let that word remain as a quiet standard for what a good-enough start can feel like.`,
      ].join("\n\n");

    case "full":
      if (scenario.scope === "daily" && scenario.daySchedule.length > 0) {
        return [
          `Imagine arriving with today's real body state: ${scenario.bodyState.toLowerCase()} The scene does not need to become a perfect day. It can simply hold the schedule and the cues around it: ${cueLine(scenario)}.`,
          `Let the full day unfold in order: ${scenario.daySchedule
            .map((item) => scheduleItemPhrase(item))
            .join(", then ")}. What might the mind notice at each transition? What might the body use as a simple reset before the next block begins?`,
          `The image supports ${scenario.userGoal.toLowerCase()} and ${scenario.lifePriority.toLowerCase()} Let ${scenario.values.slice(0, 3).join(", ")} show up as visible action, not abstract pressure. What might it feel like to end the day with notes captured and the work moved forward in a way that feels ${scenario.desiredFeelings.slice(0, 2).join(" and ")}?`,
        ].join("\n\n");
      }

      return [
        `Imagine arriving with today's real body state: ${scenario.bodyState.toLowerCase()} The scene does not need to become a perfect day. It can simply hold some of the work: ${cueLine(scenario)}.`,
        `Let the sequence unfold as imagery: ${taskPhrase(first)} for the most important stretch${
          second ? `, ${taskPhrase(second)} for the next anchor` : ""
        }${third ? `, then ${taskPhrase(third)} to close the set` : ""}. What might the mind be thinking when the important stretch begins to work? What might the body feel like as the shorter blocks become lighter and cleaner?`,
        `The image supports ${scenario.userGoal.toLowerCase()} and ${scenario.lifePriority.toLowerCase()} Let ${scenario.values.slice(0, 3).join(", ")} show up as visible action, not abstract pressure. What might it feel like to end with the work moved forward in a way that feels ${scenario.desiredFeelings.slice(0, 2).join(" and ")}?`,
      ].join("\n\n");
  }
}

export function scriptMetadataForCondition(scenario: Scenario, condition: ConditionId) {
  return {
    model: llmModels[scenario.id]?.[condition] ?? "fallback-local",
    source: llmSources[scenario.id]?.[condition] ?? "fallback-local",
  };
}

export function audioForCondition(scenario: Scenario, condition: ConditionId): string {
  const entry = audioByScenarioArm[scenario.id]?.[condition];
  return typeof entry === "string" ? entry : "";
}

export function audioSegmentsForCondition(scenario: Scenario, condition: ConditionId): AudioSegmentMap {
  const entry = audioByScenarioArm[scenario.id]?.[condition];
  if (!entry) return {};
  if (typeof entry === "string") return { complete: entry };
  return entry;
}

export function textSegmentsForCondition(scenario: Scenario, condition: ConditionId): AudioSegmentMap {
  const sections = llmSections[scenario.id]?.[condition];
  if (sections) {
    return {
      introduction: cleanScriptText(sections.introduction ?? ""),
      middle: cleanScriptText(sections.task_completion ?? ""),
      ending: cleanScriptText(sections.ending ?? ""),
    };
  }

  return splitTextIntoThree(scriptForCondition(scenario, condition));
}
