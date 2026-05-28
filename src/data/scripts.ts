import type { ConditionId, PriorityTask, Scenario } from "../types";

const taskPhrase = (task: PriorityTask) => {
  const timeRange =
    task.scheduledStart && task.scheduledEnd ? `${task.scheduledStart}-${task.scheduledEnd}, ` : "";
  return `${timeRange}${task.durationMinutes} minutes on ${task.title.toLowerCase()}`;
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

const valueLine = (scenario: Scenario) =>
  `${scenario.values.slice(0, 3).join(", ")} -- aiming to feel ${scenario.desiredFeelings.slice(0, 3).join(", ")}.`;

const baselinePlan = (scenario: Scenario) =>
  scenario.baselineItems.length > 0 ? scenario.baselineItems.join(", then ") : taskList(scenario);

const taskSequenceLine = (scenario: Scenario, tasks: PriorityTask[]) => {
  if (scenario.scope === "task" && scenario.focusTask) {
    return `Picture the focus task: ${scenario.focusTask.title}. Let the sequence move through ${taskList(scenario)}, with the longer pieces taking more mental space.`;
  }

  const [first, second, third] = tasks;
  return `Picture rank 1 first: ${taskPhrase(first)}, the ${first.priority}-priority anchor. Then let rank 2 arrive as ${
    second ? taskPhrase(second) : "the next priority"
  }, followed by rank 3: ${third ? taskPhrase(third) : "the final priority anchor"}.`;
};

export function scriptForCondition(scenario: Scenario, condition: ConditionId): string {
  const tasks = rehearsalTasks(scenario);
  const [first, second, third] = tasks;

  switch (condition) {
    case "baseline":
      return [
        `Review the preparation plan: ${baselinePlan(scenario)}.`,
        "Put the needed materials where you can see them, silence avoidable interruptions, and begin with the first scheduled block.",
        "After each block, mark what is complete and move to the next item without reopening the whole day.",
      ].join("\n\n");

    case "mind":
      return [
        `You are working toward: ${scenario.userGoal} Hold that goal lightly while you move through the ranked tasks.`,
        taskSequenceLine(scenario, tasks),
        `Each task is a step toward ${scenario.lifePriority.toLowerCase()} Let the sequence feel ordered, doable, and connected to the larger direction.`,
      ].join("\n\n");

    case "body":
      return [
        `Take a breath and notice the body state available today: ${scenario.bodyState.toLowerCase()}`,
        `Let the focus cues anchor the scene: ${scenario.focusCues.join(", ")}. Sense the first stretch of work beginning at a pace your energy can actually hold.`,
        "As the day moves, imagine returning to these cues before each next block, letting the body settle enough to continue.",
      ].join("\n\n");

    case "soul":
      return [
        `Begin by remembering what matters here: ${valueLine(scenario)}`,
        `Imagine the day unfolding in a way that lets those values become visible. The work does not have to be perfect; it needs to carry the feeling you are practicing.`,
        `Close by sensing one grounded word from the day -- ${scenario.desiredFeelings[0]} -- and let that word point you back to action.`,
      ].join("\n\n");

    case "full":
      return [
        `Take a breath and arrive with today's real body state: ${scenario.bodyState.toLowerCase()} Notice ${scenario.focusCues.slice(0, 3).join(", ")} as the scene anchors.`,
        `Now move through the sequence: ${taskPhrase(first)} for the most important stretch${
          second ? `, ${taskPhrase(second)} for the next anchor` : ""
        }${third ? `, then ${taskPhrase(third)} to close the set` : ""}. Let the longer block take more mental space, and let the shorter blocks feel lighter and cleaner.`,
        `This day supports ${scenario.userGoal.toLowerCase()} and ${scenario.lifePriority.toLowerCase()} Let the work carry ${scenario.values.slice(0, 3).join(", ")} in a way that feels ${scenario.desiredFeelings.slice(0, 2).join(" and ")}.`,
      ].join("\n\n");
  }
}
