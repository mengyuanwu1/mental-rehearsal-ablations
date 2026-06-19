export type ConditionId = "baseline" | "mind" | "body" | "soul" | "full";

export type PriorityTask = {
  rank: number;
  title: string;
  durationMinutes: number;
  scheduledStart?: string;
  scheduledEnd?: string;
  priority: "high" | "medium" | "low";
  linkedValue: string;
};

export type DayScheduleItem = {
  eventId: string;
  title: string;
  kind: string;
  scheduledStart: string;
  scheduledEnd: string;
  durationMinutes: number;
  note?: string;
};

export type ScenarioScope = "daily" | "task";

export type FocusTask = PriorityTask & {
  projectTitle?: string;
};

export type FocusSubtask = {
  order: number;
  title: string;
  durationMinutes?: number;
};

export type Scenario = {
  id: string;
  scope: ScenarioScope;
  profileId: string;
  profileName: string;
  age: string;
  gender: string;
  industry: string;
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
  daySchedule: DayScheduleItem[];
  focusTask?: FocusTask;
  focusSubtasks?: FocusSubtask[];
  baselineItems: string[];
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
  responseId: string;
  participantId: string;
  assignmentId: number;
  trialIndex: number;
  scenarioId: string;
  leftCondition: ConditionId;
  rightCondition: ConditionId;
  leftAudioAvailable: boolean;
  rightAudioAvailable: boolean;
  leftAudioPath: string;
  rightAudioPath: string;
  leftAudioPlayCount: number;
  rightAudioPlayCount: number;
  leftAudioMaxPositionSeconds: number;
  rightAudioMaxPositionSeconds: number;
  leftAudioEnded: boolean;
  rightAudioEnded: boolean;
  leftAudioSegmentProgress: string;
  rightAudioSegmentProgress: string;
  choice: "left" | "right" | "";
  leftBodyStateRating: number | null;
  rightBodyStateRating: number | null;
  leftTaskGoalRating: number | null;
  rightTaskGoalRating: number | null;
  leftValueConnectionRating: number | null;
  rightValueConnectionRating: number | null;
  leftEaseRating: number | null;
  rightEaseRating: number | null;
  leftRating: number | null;
  rightRating: number | null;
  improvement: string;
  attentionCheckId?: string;
  attentionCheckKind?: string;
  attentionCheckPrompt?: string;
  attentionCheckAnswer?: string;
  attentionCheckCorrectAnswer?: string;
  attentionCheckPassed?: boolean | null;
  startedAt: string;
  submittedAt: string;
  elapsedMs: number;
  userAgent: string;
};

export type QuestionnaireAnswers = {
  perspectivePreference: string;
  perspectivePreferenceOther: string;
  guidanceLevel: string;
  guidanceLevelOther: string;
  backgroundAudio: string;
  backgroundAudioOther: string;
  scriptLength: string;
  scriptLengthOther: string;
  toneStyle: string;
  toneStyleOther: string;
  personalizationFocus: string;
  personalizationFocusOther: string;
  deliveryFormat: string;
  deliveryFormatOther: string;
  idealMorningGuidance: string;
};

export type QuestionnaireResponse = QuestionnaireAnswers & {
  responseId: string;
  participantId: string;
  assignmentId: number;
  questionnaireVersion: string;
  startedAt: string;
  submittedAt: string;
  elapsedMs: number;
  userAgent: string;
};
