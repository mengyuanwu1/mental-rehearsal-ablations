export type ConditionId = "baseline" | "mind" | "body" | "soul" | "full";

export type PriorityTask = {
  rank: number;
  title: string;
  durationMinutes: number;
  priority: "high" | "medium" | "low";
  linkedValue: string;
};

export type Scenario = {
  id: string;
  profileId: string;
  profileName: string;
  profileSummary: string;
  contextTitle: string;
  dayFrame: string;
  lifePriority: string;
  userGoal: string;
  bodyState: string;
  focusCues: string[];
  values: string[];
  desiredFeelings: string[];
  topTasks: PriorityTask[];
};

export type TrialAssignment = {
  trialIndex: number;
  scenarioId: string;
  pairIndex: number;
  leftCondition: ConditionId;
  rightCondition: ConditionId;
};

export type Assignment = {
  assignmentId: number;
  trials: TrialAssignment[];
};

export type TrialResponse = {
  participantId: string;
  assignmentId: number;
  trialIndex: number;
  scenarioId: string;
  leftCondition: ConditionId;
  rightCondition: ConditionId;
  choice: "left" | "right";
  leftRating: number;
  rightRating: number;
  reason: string;
  startedAt: string;
  submittedAt: string;
  elapsedMs: number;
  userAgent: string;
};
