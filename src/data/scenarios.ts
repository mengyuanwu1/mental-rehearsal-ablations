import { studyInputScenarios, type StudyInputScenario } from "./studyInputs";
import type { DayScheduleItem, FocusSubtask, PriorityTask, Scenario } from "../types";

function flattenFocusCues(input: StudyInputScenario): string[] {
  return Object.values(input.energy.focusCues).flatMap((items) => items);
}

function goalText(input: StudyInputScenario): string {
  return input.mind.userGoal.goal_1.answers.what || input.mind.userGoal.priority.title;
}

function desiredFeelings(input: StudyInputScenario): string[] {
  return Array.from(
    new Set(input.value.topValues.flatMap((value) => value.feelsLikeLabels)),
  ).slice(0, 4);
}

function dailyTopTasks(input: StudyInputScenario): PriorityTask[] | undefined {
  return input.mind.prioritySchedule?.map((task) => ({
    rank: task.rank,
    title: task.title,
    durationMinutes: task.durationMinutes,
    scheduledStart: task.scheduledStart,
    scheduledEnd: task.scheduledEnd,
    priority: task.priority,
    linkedValue: task.linkedValue,
  }));
}

const kindLabel = (kind: string) =>
  kind
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

function daySchedule(input: StudyInputScenario): DayScheduleItem[] {
  return (
    input.mind.calendarEvents?.map((event) => ({
      eventId: event.eventId,
      title: event.title,
      kind: event.kind,
      scheduledStart: event.scheduledStart,
      scheduledEnd: event.scheduledEnd,
      durationMinutes: event.durationMinutes,
      note: event.notes || event.note || event.description || kindLabel(event.kind),
    })) ?? []
  );
}

const allScenarios: Scenario[] = studyInputScenarios.map((input) => {
  const values = input.value.topValues.map((value) => value.name);
  const fallbackLinkedValue = values[0] ?? "Focus";
  const focusTask = input.mind.focusTask
    ? {
        rank: 1,
        title: input.mind.focusTask.title,
        projectTitle: input.mind.focusTask.projectTitle,
        durationMinutes: input.mind.focusTask.durationMinutes,
        scheduledStart: input.mind.focusTask.scheduledStart,
        scheduledEnd: input.mind.focusTask.scheduledEnd,
        priority: input.mind.focusTask.priority,
        linkedValue: input.mind.focusTask.linkedValue,
      }
    : undefined;
  const focusSubtasks = input.mind.focusSubtasks?.map((subtask) => ({
    order: subtask.order,
    title: subtask.title,
    durationMinutes: subtask.durationMinutes,
  }));
  const focusSubtasksWithDurations = focusSubtasks?.filter(
    (subtask): subtask is FocusSubtask & { durationMinutes: number } =>
      typeof subtask.durationMinutes === "number",
  );

  const topTasks =
    dailyTopTasks(input) ??
    focusSubtasksWithDurations?.map((subtask) => ({
      rank: subtask.order,
      title: subtask.title,
      durationMinutes: subtask.durationMinutes,
      priority: focusTask?.priority ?? "medium",
      linkedValue: focusTask?.linkedValue ?? fallbackLinkedValue,
    })) ??
    [];

  return {
    id: input.id,
    scope: input.scope,
    profileId: input.persona.id,
    profileName: input.persona.name,
    age: input.persona.demo.age,
    gender: input.persona.demo.sex,
    industry: input.persona.demo.occupation,
    profileSummary: input.persona.demo.occupation,
    contextTitle: input.contextTitle,
    dayFrame: `${input.energy.sleepSummary.summary}; ${input.energy.activitySummary}; ${input.energy.stressSummary}`,
    lifePriority: input.persona.onboarding.lifePriority.description,
    userGoal: goalText(input),
    bodyState: input.energy.bodyState,
    focusCues: flattenFocusCues(input),
    values,
    desiredFeelings: desiredFeelings(input),
    topTasks,
    daySchedule: daySchedule(input),
    focusTask,
    focusSubtasks,
    baselineItems: input.baselineInput.visibleItems,
  };
});

export const scenarios: Scenario[] = allScenarios.filter((scenario) => scenario.scope === "daily");

export function getScenario(id: string): Scenario {
  const scenario = scenarios.find((item) => item.id === id);
  if (!scenario) {
    throw new Error(`Unknown scenario id: ${id}`);
  }
  return scenario;
}
