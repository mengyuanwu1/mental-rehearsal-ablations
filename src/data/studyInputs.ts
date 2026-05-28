export type StudyScope = "daily" | "task";

export type StudyCondition = "baseline" | "mind" | "body" | "soul" | "full";

export type DemographicSnapshot = {
  age: string;
  birthDate: string | null;
  sex: string;
  citizenship: string | null;
  occupation: string;
  race: string | null;
  englishSkill: string | null;
};

export type LifePrioritySnapshot = {
  title: string;
  description: string;
  detail?: string;
};

export type OnboardingSnapshot = {
  priorityCategory: string[];
  timeframe: string;
  customSubGoals: string[];
  goalDetail: string;
  goalSummaryFields: Array<{ id: string; label: string; value: string; inputType?: string }>;
  goalBaselineFields?: Array<{ id: string; label: string; value: string; inputType?: string }>;
  wakeTime?: string;
  sleepTime?: string;
  lifePriority: LifePrioritySnapshot;
};

export type SleepSummary = {
  summary: string;
  durationHours: number;
  targetHours?: number;
  bedtime?: string;
  wakeTime?: string;
  sleepQualityScore?: number;
  sleepEfficiencyPercent?: number;
  awakeMinutes?: number;
  restlessMinutes?: number;
  hrvMs?: number;
  restingHeartRate?: number;
};

export type GoalAnswers = {
  what: string;
  exactQuantity: {
    value: number;
    unit: string;
    description?: string;
  };
  exactDate: {
    label: string;
    isoDate: string;
  };
  keySteps: Array<{
    id: string;
    label: string;
    target?: string;
  }>;
  metric: string;
  deadline: string;
  how?: Record<string, string | boolean>;
};

export type CalendarEventSnapshot = {
  eventId: string;
  title: string;
  kind: string;
  scheduledStart: string;
  scheduledEnd: string;
  durationMinutes: number;
};

export type PriorityScheduleItem = {
  rank: number;
  title: string;
  kind: "task";
  priority: "high" | "medium" | "low";
  linkedValue: string;
  energyCost: "high" | "medium" | "low";
  durationMinutes: number;
  scheduledStart: string;
  scheduledEnd: string;
};

export type StudyInputScenario = {
  id: string;
  scope: StudyScope;
  persona: {
    id: string;
    name: string;
    demo: DemographicSnapshot;
    onboarding: OnboardingSnapshot;
  };
  contextTitle: string;
  energy: {
    currentEnergyLevel: number;
    bodyState: string;
    sleepSummary: SleepSummary;
    activitySummary: string;
    recoverySummary: string;
    energyCurveInputs: Record<string, number | string>;
    hourlyEnergy: Array<{ hour: number; energyLevel: number }>;
    focusCues: {
      visual: string[];
      auditory: string[];
      tactileBody: string[];
      smell: string[];
      taste: string[];
      other: string[];
    };
  };
  mind: {
    userGoal: {
      userid: string;
      priority: LifePrioritySnapshot;
      goal_1: {
        answers: GoalAnswers;
        completed: boolean;
        source: "onboarding";
      };
    };
    calendarEvents?: CalendarEventSnapshot[];
    prioritySchedule?: PriorityScheduleItem[];
    focusTask?: {
      taskId: string;
      title: string;
      projectTitle?: string;
      scheduledStart?: string;
      scheduledEnd?: string;
      priority: "high" | "medium" | "low";
      linkedValue: string;
      energyCost: "high" | "medium" | "low";
      durationMinutes: number;
    };
    focusSubtasks?: Array<{
      subtaskId: string;
      title: string;
      order: number;
      durationMinutes: number;
    }>;
  };
  value: {
    topValues: Array<{
      valueId: string;
      name: string;
      emoji: string;
      personalDefinition: string;
      feelsLikeLabels: string[];
      dailySignLabels: string[];
    }>;
    idealLife: {
      statement: string;
      lifeShapeLabels: string[];
    };
  };
  baselineInput: {
    preparationOnlyContext: string;
    visibleItems: string[];
  };
};

export const conditionInputRules: Record<StudyCondition, string> = {
  baseline:
    "Use only the visible schedule/task preparation context. Do not use body energy, life priority, ideal life, or value definitions.",
  mind:
    "Use only MIND fields: user_goal plus full calendar events for orientation and prioritySchedule top-three tasks for daily rehearsal, or focusTask/focusSubtasks for task scope. Do not verbalize linked value tags.",
  body:
    "Use only BODY fields: current energy, observed summaries, hourly energy, and focus_cues. Do not use location or flattened environmental_cues.",
  soul:
    "Use only VALUE fields: top values, personal definitions, clarification labels, desired feelings, daily signs, and ideal_life.",
  full:
    "Use MIND, BODY, and VALUE fields together.",
};

const formatCalendarItems = (events: CalendarEventSnapshot[]) =>
  events.map(
    (event) =>
      `${event.scheduledStart}-${event.scheduledEnd} ${event.title} - ${event.durationMinutes} min`,
  );

const mayaProfile = {
  id: "maya",
  name: "Maya Chen",
  demo: {
    age: "24",
    birthDate: null,
    sex: "Woman",
    citizenship: null,
    occupation: "HCI PhD / academic research",
    race: null,
    englishSkill: null,
  },
  onboarding: {
    priorityCategory: ["education"],
    timeframe: "this month",
    customSubGoals: ["Submit a strong workshop paper this month"],
    goalDetail: "Submit a strong workshop paper this month",
    goalSummaryFields: [
      { id: "target", label: "Target", value: "Submit one strong workshop paper", inputType: "text" },
      { id: "deadline", label: "Deadline", value: "2026-06-30", inputType: "deadline" },
    ],
    wakeTime: "07:30",
    sleepTime: "23:30",
    lifePriority: {
      title: "Become an independent researcher",
      description:
        "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend.",
    },
  },
};

const jonahProfile = {
  id: "jonah",
  name: "Jonah Rivera",
  demo: {
    age: "34",
    birthDate: null,
    sex: "Man",
    citizenship: null,
    occupation: "Product management / software",
    race: null,
    englishSkill: null,
  },
  onboarding: {
    priorityCategory: ["career"],
    timeframe: "today",
    customSubGoals: ["Run a launch review that surfaces risks early"],
    goalDetail: "Run a launch review that surfaces risks early",
    goalSummaryFields: [
      { id: "target", label: "Target", value: "Prepare one launch risk brief", inputType: "text" },
      { id: "deadline", label: "Deadline", value: "2026-05-28", inputType: "deadline" },
    ],
    lifePriority: {
      title: "Lead with clarity",
      description:
        "Lead product work with clarity and responsibility, making decisions that help the team move forward without becoming reactive.",
    },
  },
};

const priyaProfile = {
  id: "priya",
  name: "Priya Shah",
  demo: {
    age: "22",
    birthDate: null,
    sex: "Woman",
    citizenship: null,
    occupation: "Nursing / healthcare training",
    race: null,
    englishSkill: null,
  },
  onboarding: {
    priorityCategory: ["education", "health"],
    timeframe: "this week",
    customSubGoals: ["Prepare for Friday's pharmacology exam while staying current on clinical notes"],
    goalDetail: "Prepare for Friday's pharmacology exam while staying current on clinical notes",
    goalSummaryFields: [
      { id: "target", label: "Target", value: "Review one medication unit and complete one clinical note", inputType: "text" },
      { id: "deadline", label: "Deadline", value: "2026-05-29", inputType: "deadline" },
    ],
    lifePriority: {
      title: "Build calm clinical judgment",
      description:
        "Become a capable nurse who can stay present under pressure, keep learning from practice, and offer steady care to patients.",
    },
  },
};

const alexProfile = {
  id: "alex",
  name: "Alex Morgan",
  demo: {
    age: "31",
    birthDate: null,
    sex: "Nonbinary",
    citizenship: null,
    occupation: "Freelance design / creative services",
    race: null,
    englishSkill: null,
  },
  onboarding: {
    priorityCategory: ["career", "creative"],
    timeframe: "today",
    customSubGoals: ["Send a strong pitch deck before the client call"],
    goalDetail: "Send a strong pitch deck before the client call",
    goalSummaryFields: [
      { id: "target", label: "Target", value: "Export one client-ready pitch deck", inputType: "text" },
      { id: "deadline", label: "Deadline", value: "2026-05-28", inputType: "deadline" },
    ],
    lifePriority: {
      title: "Build an independent creative practice",
      description:
        "Build an independent creative practice that supports originality, reliable client work, and financial steadiness.",
    },
  },
};

const serenaProfile = {
  id: "serena",
  name: "Serena Park",
  demo: {
    age: "39",
    birthDate: null,
    sex: "Woman",
    citizenship: null,
    occupation: "Public-interest law",
    race: null,
    englishSkill: null,
  },
  onboarding: {
    priorityCategory: ["career", "family"],
    timeframe: "today",
    customSubGoals: ["Submit a clear first draft of the argument section"],
    goalDetail: "Submit a clear first draft of the argument section",
    goalSummaryFields: [
      { id: "target", label: "Target", value: "Complete one argument-section draft", inputType: "text" },
      { id: "deadline", label: "Deadline", value: "2026-05-28", inputType: "deadline" },
    ],
    lifePriority: {
      title: "Practice humane advocacy",
      description:
        "Do rigorous public-interest advocacy while staying humane to herself and making complex systems more navigable for clients.",
    },
  },
};

const mayaValue = {
  topValues: [
    {
      valueId: "independent-thinking",
      name: "Independent Thinking",
      emoji: "compass",
      personalDefinition: "trusting my own questions before borrowing other people's",
      feelsLikeLabels: ["mentally clear", "self-trusting", "unboxed"],
      dailySignLabels: ["having room to think", "making decisions faster"],
    },
    {
      valueId: "success",
      name: "Success",
      emoji: "trophy",
      personalDefinition: "finishing what matters",
      feelsLikeLabels: ["accomplished", "focused", "competent"],
      dailySignLabels: ["finishing what matters", "visible progress"],
    },
    {
      valueId: "open-mindedness",
      name: "Open-Mindedness",
      emoji: "telescope",
      personalDefinition: "staying curious about answers I did not expect",
      feelsLikeLabels: ["curious", "supported"],
      dailySignLabels: ["learning something"],
    },
  ],
  idealLife: {
    statement: "A life where I think and write on my own questions",
    lifeShapeLabels: ["independent research", "deep work mornings"],
  },
};

const jonahValue = {
  topValues: [
    {
      valueId: "clarity",
      name: "Clarity",
      emoji: "lens",
      personalDefinition: "making the next decision visible enough for the team to act",
      feelsLikeLabels: ["organized", "decisive", "uncluttered"],
      dailySignLabels: ["cleaner priorities", "fewer ambiguous asks"],
    },
    {
      valueId: "responsibility",
      name: "Responsibility",
      emoji: "anchor",
      personalDefinition: "owning the risk without carrying every task alone",
      feelsLikeLabels: ["prepared", "steady", "accountable"],
      dailySignLabels: ["risks named clearly", "owners identified"],
    },
    {
      valueId: "calm-leadership",
      name: "Calm Leadership",
      emoji: "signal",
      personalDefinition: "creating steadiness when the room gets noisy",
      feelsLikeLabels: ["calm", "firm", "useful"],
      dailySignLabels: ["clear openings", "less reactive Slack checking"],
    },
  ],
  idealLife: {
    statement: "A work life where I help teams make clear decisions without living in urgency",
    lifeShapeLabels: ["clear leadership", "protected strategy time"],
  },
};

const priyaValue = {
  topValues: [
    {
      valueId: "care",
      name: "Care",
      emoji: "hands",
      personalDefinition: "staying attentive to the person in front of me",
      feelsLikeLabels: ["grounded", "kind", "present"],
      dailySignLabels: ["slowing down enough to notice", "checking understanding"],
    },
    {
      valueId: "competence",
      name: "Competence",
      emoji: "check",
      personalDefinition: "building skills I can trust under pressure",
      feelsLikeLabels: ["ready", "capable", "steady"],
      dailySignLabels: ["one concept mastered", "sequence practiced"],
    },
    {
      valueId: "learning",
      name: "Learning",
      emoji: "book",
      personalDefinition: "using practice and mistakes as information",
      feelsLikeLabels: ["open", "brave", "curious"],
      dailySignLabels: ["asking one good question", "reviewing what changed"],
    },
  ],
  idealLife: {
    statement: "A life where I can offer skilled care while continuing to learn",
    lifeShapeLabels: ["clinical confidence", "steady presence"],
  },
};

const alexValue = {
  topValues: [
    {
      valueId: "originality",
      name: "Originality",
      emoji: "spark",
      personalDefinition: "making work that feels unmistakably mine",
      feelsLikeLabels: ["inventive", "alive", "free"],
      dailySignLabels: ["one strong concept choice", "fresh visual language"],
    },
    {
      valueId: "reliability",
      name: "Reliability",
      emoji: "bridge",
      personalDefinition: "making trust feel visible in how I deliver",
      feelsLikeLabels: ["solid", "settled", "professional"],
      dailySignLabels: ["files exported cleanly", "client knows what to expect"],
    },
    {
      valueId: "freedom",
      name: "Freedom",
      emoji: "window",
      personalDefinition: "keeping my practice independent and sustainable",
      feelsLikeLabels: ["unblocked", "self-directed", "light"],
      dailySignLabels: ["admin cleared", "money tasks not avoided"],
    },
  ],
  idealLife: {
    statement: "A life where creative work stays original and the studio stays sustainable",
    lifeShapeLabels: ["independent studio", "creative mornings"],
  },
};

const serenaValue = {
  topValues: [
    {
      valueId: "justice",
      name: "Justice",
      emoji: "scale",
      personalDefinition: "using legal skill to make unfair systems more answerable",
      feelsLikeLabels: ["committed", "clear", "purposeful"],
      dailySignLabels: ["argument made sharper", "client position protected"],
    },
    {
      valueId: "care",
      name: "Care",
      emoji: "hand",
      personalDefinition: "remembering the human stakes inside the legal work",
      feelsLikeLabels: ["kind", "human", "steady"],
      dailySignLabels: ["plain-language next step", "one check-in done"],
    },
    {
      valueId: "diligence",
      name: "Diligence",
      emoji: "file",
      personalDefinition: "doing the careful work even when the day is compressed",
      feelsLikeLabels: ["thorough", "prepared", "grounded"],
      dailySignLabels: ["notes updated", "deadline risk reduced"],
    },
  ],
  idealLife: {
    statement: "A life where I do rigorous advocacy without losing my humanity",
    lifeShapeLabels: ["humane advocacy", "clear client care"],
  },
};

const lowMorningEnergy = [
  { hour: 6, energyLevel: 3 },
  { hour: 7, energyLevel: 3 },
  { hour: 8, energyLevel: 4 },
  { hour: 9, energyLevel: 5 },
  { hour: 10, energyLevel: 5 },
  { hour: 11, energyLevel: 4 },
  { hour: 12, energyLevel: 4 },
  { hour: 13, energyLevel: 3 },
  { hour: 14, energyLevel: 3 },
  { hour: 15, energyLevel: 4 },
  { hour: 16, energyLevel: 5 },
];

const steadyDayEnergy = [
  { hour: 7, energyLevel: 5 },
  { hour: 8, energyLevel: 6 },
  { hour: 9, energyLevel: 6 },
  { hour: 10, energyLevel: 6 },
  { hour: 11, energyLevel: 5 },
  { hour: 12, energyLevel: 5 },
  { hour: 13, energyLevel: 4 },
  { hour: 14, energyLevel: 5 },
  { hour: 15, energyLevel: 5 },
  { hour: 16, energyLevel: 4 },
];

const mayaShortSleep: SleepSummary = {
  summary: "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration, some restlessness, low HRV, and slightly elevated resting heart rate.",
  durationHours: 5.5,
  targetHours: 7.5,
  bedtime: "01:05",
  wakeTime: "06:40",
  sleepQualityScore: 68,
  sleepEfficiencyPercent: 83,
  awakeMinutes: 28,
  restlessMinutes: 46,
  hrvMs: 29,
  restingHeartRate: 73,
};

const jonahSteadySleep: SleepSummary = {
  summary: "7.1 hours slept with good continuity; sleep quality 82/100, normal recovery signals, and enough morning readiness for focused planning.",
  durationHours: 7.1,
  targetHours: 7.5,
  bedtime: "23:15",
  wakeTime: "06:35",
  sleepQualityScore: 82,
  sleepEfficiencyPercent: 90,
  awakeMinutes: 18,
  restlessMinutes: 24,
  hrvMs: 48,
  restingHeartRate: 62,
};

const priyaPostShiftSleep: SleepSummary = {
  summary: "6.0 hours slept after a long shift; sleep quality 72/100 with moderate restlessness and enough recovery for short, structured study intervals.",
  durationHours: 6.0,
  targetHours: 7.5,
  bedtime: "00:10",
  wakeTime: "06:20",
  sleepQualityScore: 72,
  sleepEfficiencyPercent: 86,
  awakeMinutes: 22,
  restlessMinutes: 38,
  hrvMs: 35,
  restingHeartRate: 70,
};

const priyaSimulationSleep: SleepSummary = {
  summary: "6.7 hours slept; sleep quality 76/100 with a little pre-simulation restlessness but moderate recovery.",
  durationHours: 6.7,
  targetHours: 7.5,
  bedtime: "23:35",
  wakeTime: "06:30",
  sleepQualityScore: 76,
  sleepEfficiencyPercent: 88,
  awakeMinutes: 20,
  restlessMinutes: 32,
  hrvMs: 38,
  restingHeartRate: 68,
};

const alexRestedSleep: SleepSummary = {
  summary: "7.6 hours slept with strong continuity; sleep quality 84/100 and recovery signals that support a creative morning block.",
  durationHours: 7.6,
  targetHours: 7.5,
  bedtime: "23:20",
  wakeTime: "07:05",
  sleepQualityScore: 84,
  sleepEfficiencyPercent: 91,
  awakeMinutes: 16,
  restlessMinutes: 22,
  hrvMs: 52,
  restingHeartRate: 60,
};

const serenaInterruptedSleep: SleepSummary = {
  summary: "5.9 hours slept with an interruption overnight; sleep quality 70/100, moderate restlessness, and a usable but compressed morning recovery window.",
  durationHours: 5.9,
  targetHours: 7.5,
  bedtime: "00:05",
  wakeTime: "06:10",
  sleepQualityScore: 70,
  sleepEfficiencyPercent: 84,
  awakeMinutes: 31,
  restlessMinutes: 42,
  hrvMs: 33,
  restingHeartRate: 69,
};

const mayaGoalAnswers: GoalAnswers = {
  what: "Submit a strong workshop paper this month",
  exactQuantity: { value: 1, unit: "workshop paper submission", description: "one complete draft submitted to the workshop" },
  exactDate: { label: "by the end of June 2026", isoDate: "2026-06-30" },
  keySteps: [
    { id: "related-work", label: "Complete the related work section", target: "one coherent section draft" },
    { id: "gap-statement", label: "Write the gap statement", target: "one paragraph the advisor can react to" },
    { id: "full-draft", label: "Assemble the workshop paper draft", target: "one submission-ready PDF" },
  ],
  metric: "one strong workshop paper draft submitted",
  deadline: "2026-06-30",
};

const jonahGoalAnswers: GoalAnswers = {
  what: "Run a launch review that surfaces risks early",
  exactQuantity: { value: 1, unit: "launch review risk brief", description: "one meeting-ready risk brief before the review" },
  exactDate: { label: "by 3:00 PM today", isoDate: "2026-05-28" },
  keySteps: [
    { id: "risks", label: "Name top unresolved launch risks", target: "three to five risks" },
    { id: "owners", label: "Assign owners and decision points", target: "one owner per risk" },
    { id: "summary", label: "Write the meeting-ready summary", target: "one opening summary" },
  ],
  metric: "risk brief ready before review",
  deadline: "2026-05-28",
};

const priyaExamGoalAnswers: GoalAnswers = {
  what: "Prepare for Friday's pharmacology exam while staying current on clinical notes",
  exactQuantity: { value: 1, unit: "medication unit plus clinical note", description: "one flashcard unit reviewed and one reflection note completed" },
  exactDate: { label: "by Friday, May 29, 2026", isoDate: "2026-05-29" },
  keySteps: [
    { id: "flashcards", label: "Review cardiac medication flashcards", target: "one focused medication set" },
    { id: "reflection", label: "Complete clinical reflection note", target: "one submitted note" },
    { id: "materials", label: "Pack materials for class", target: "class materials ready before leaving" },
  ],
  metric: "flashcards reviewed and reflection note complete",
  deadline: "2026-05-29",
};

const priyaSimulationGoalAnswers: GoalAnswers = {
  what: "Enter simulation lab prepared enough to learn from mistakes",
  exactQuantity: { value: 1, unit: "assessment sequence practice", description: "one complete walk-through before lab" },
  exactDate: { label: "before simulation lab today", isoDate: "2026-05-28" },
  keySteps: [
    { id: "safety", label: "Review opening patient safety checks", target: "one checklist pass" },
    { id: "sequence", label: "Walk through assessment sequence aloud", target: "one full spoken rehearsal" },
    { id: "question", label: "Mark one question to ask instructor", target: "one learning question" },
  ],
  metric: "assessment sequence practiced",
  deadline: "2026-05-28",
};

const alexGoalAnswers: GoalAnswers = {
  what: "Send a strong pitch deck before the client call",
  exactQuantity: { value: 1, unit: "client-ready pitch deck", description: "one exported deck ready before the call" },
  exactDate: { label: "by 4:00 PM today", isoDate: "2026-05-28" },
  keySteps: [
    { id: "story", label: "Choose the core story arc", target: "one narrative direction" },
    { id: "slides", label: "Sequence strongest concept slides", target: "one deck flow" },
    { id: "export", label: "Export client-ready mockups", target: "final PDF and image files" },
  ],
  metric: "client-ready deck exported",
  deadline: "2026-05-28",
};

const serenaGoalAnswers: GoalAnswers = {
  what: "Submit a clear first draft of the argument section",
  exactQuantity: { value: 1, unit: "argument-section draft", description: "one complete first draft of the legal argument section" },
  exactDate: { label: "by noon today", isoDate: "2026-05-28" },
  keySteps: [
    { id: "outline", label: "Review argument outline", target: "one outline pass" },
    { id: "claim", label: "Draft strongest claim paragraph", target: "one complete claim paragraph" },
    { id: "precedent", label: "Tie precedent back to client facts", target: "one integrated precedent section" },
  ],
  metric: "argument draft complete",
  deadline: "2026-05-28",
};

const mayaDailyCalendarEvents: CalendarEventSnapshot[] = [
  { eventId: "maya-plan", title: "Review paper plan", kind: "planning", scheduledStart: "08:15", scheduledEnd: "08:35", durationMinutes: 20 },
  { eventId: "maya-related-work", title: "Draft related work section", kind: "task", scheduledStart: "09:00", scheduledEnd: "10:30", durationMinutes: 90 },
  { eventId: "maya-lab-standup", title: "Lab standup", kind: "meeting", scheduledStart: "10:45", scheduledEnd: "11:15", durationMinutes: 30 },
  { eventId: "maya-lunch", title: "Lunch break", kind: "break", scheduledStart: "12:10", scheduledEnd: "12:40", durationMinutes: 30 },
  { eventId: "maya-ta-email", title: "Answer TA emails", kind: "task", scheduledStart: "13:00", scheduledEnd: "13:20", durationMinutes: 20 },
  { eventId: "maya-teaching-support", title: "Teaching support tasks", kind: "admin", scheduledStart: "14:00", scheduledEnd: "14:45", durationMinutes: 45 },
  { eventId: "maya-reading-questions", title: "Prepare two reading group questions", kind: "task", scheduledStart: "15:00", scheduledEnd: "15:30", durationMinutes: 30 },
  { eventId: "maya-advisor-note", title: "Send advisor progress note", kind: "admin", scheduledStart: "16:15", scheduledEnd: "16:35", durationMinutes: 20 },
];

const jonahDailyCalendarEvents: CalendarEventSnapshot[] = [
  { eventId: "jonah-inbox", title: "Inbox triage", kind: "admin", scheduledStart: "08:45", scheduledEnd: "09:05", durationMinutes: 20 },
  { eventId: "jonah-risk-brief", title: "Finalize launch risk brief", kind: "task", scheduledStart: "09:30", scheduledEnd: "10:30", durationMinutes: 60 },
  { eventId: "jonah-eng-checkin", title: "Engineering check-in", kind: "meeting", scheduledStart: "10:40", scheduledEnd: "10:55", durationMinutes: 15 },
  { eventId: "jonah-support-notes", title: "Review support escalation notes", kind: "task", scheduledStart: "11:00", scheduledEnd: "11:30", durationMinutes: 30 },
  { eventId: "jonah-lunch", title: "Lunch break", kind: "break", scheduledStart: "12:15", scheduledEnd: "12:45", durationMinutes: 30 },
  { eventId: "jonah-stakeholder-sync", title: "Stakeholder sync", kind: "meeting", scheduledStart: "13:00", scheduledEnd: "13:30", durationMinutes: 30 },
  { eventId: "jonah-opening", title: "Draft meeting opening", kind: "task", scheduledStart: "14:10", scheduledEnd: "14:30", durationMinutes: 20 },
  { eventId: "jonah-launch-review", title: "Launch review meeting", kind: "meeting", scheduledStart: "15:00", scheduledEnd: "16:00", durationMinutes: 60 },
];

const priyaDailyCalendarEvents: CalendarEventSnapshot[] = [
  { eventId: "priya-commute", title: "Commute to campus", kind: "personal", scheduledStart: "07:35", scheduledEnd: "08:05", durationMinutes: 30 },
  { eventId: "priya-flashcards", title: "Review cardiac medication flashcards", kind: "task", scheduledStart: "08:15", scheduledEnd: "09:00", durationMinutes: 45 },
  { eventId: "priya-lecture", title: "Pharmacology lecture", kind: "class", scheduledStart: "09:15", scheduledEnd: "10:05", durationMinutes: 50 },
  { eventId: "priya-reflection", title: "Complete clinical reflection note", kind: "task", scheduledStart: "10:20", scheduledEnd: "10:55", durationMinutes: 35 },
  { eventId: "priya-lunch", title: "Lunch and reset", kind: "break", scheduledStart: "11:45", scheduledEnd: "12:15", durationMinutes: 30 },
  { eventId: "priya-pack", title: "Pack materials for afternoon class", kind: "task", scheduledStart: "12:30", scheduledEnd: "12:45", durationMinutes: 15 },
  { eventId: "priya-review-group", title: "Exam review group", kind: "class", scheduledStart: "13:00", scheduledEnd: "14:00", durationMinutes: 60 },
  { eventId: "priya-clinical-checkin", title: "Clinical check-in message", kind: "admin", scheduledStart: "15:30", scheduledEnd: "15:45", durationMinutes: 15 },
];

const alexDailyCalendarEvents: CalendarEventSnapshot[] = [
  { eventId: "alex-admin", title: "Client inbox and file check", kind: "admin", scheduledStart: "08:30", scheduledEnd: "08:50", durationMinutes: 20 },
  { eventId: "alex-narrative", title: "Build pitch deck narrative", kind: "task", scheduledStart: "09:00", scheduledEnd: "10:20", durationMinutes: 80 },
  { eventId: "alex-asset-review", title: "Review client assets", kind: "task", scheduledStart: "10:30", scheduledEnd: "10:50", durationMinutes: 20 },
  { eventId: "alex-mockups", title: "Export client-ready mockups", kind: "task", scheduledStart: "11:00", scheduledEnd: "11:35", durationMinutes: 35 },
  { eventId: "alex-lunch", title: "Lunch break", kind: "break", scheduledStart: "12:20", scheduledEnd: "12:50", durationMinutes: 30 },
  { eventId: "alex-call-prep", title: "Prepare client call notes", kind: "meeting_prep", scheduledStart: "13:30", scheduledEnd: "14:00", durationMinutes: 30 },
  { eventId: "alex-invoice", title: "Send invoice reminder", kind: "admin", scheduledStart: "14:40", scheduledEnd: "14:50", durationMinutes: 10 },
  { eventId: "alex-client-call", title: "Client call", kind: "meeting", scheduledStart: "16:00", scheduledEnd: "16:45", durationMinutes: 45 },
];

const serenaDailyCalendarEvents: CalendarEventSnapshot[] = [
  { eventId: "serena-dropoff", title: "School drop-off", kind: "personal", scheduledStart: "07:15", scheduledEnd: "07:50", durationMinutes: 35 },
  { eventId: "serena-argument", title: "Draft argument section", kind: "task", scheduledStart: "08:30", scheduledEnd: "09:55", durationMinutes: 85 },
  { eventId: "serena-pickup", title: "Confirm pickup logistics", kind: "personal", scheduledStart: "10:15", scheduledEnd: "10:30", durationMinutes: 15 },
  { eventId: "serena-cocounsel", title: "Send case update to co-counsel", kind: "task", scheduledStart: "11:05", scheduledEnd: "11:30", durationMinutes: 25 },
  { eventId: "serena-client-checkin", title: "Client check-in", kind: "meeting", scheduledStart: "12:00", scheduledEnd: "12:30", durationMinutes: 30 },
  { eventId: "serena-lunch", title: "Lunch break", kind: "break", scheduledStart: "13:00", scheduledEnd: "13:25", durationMinutes: 25 },
  { eventId: "serena-filing-check", title: "Filing window check", kind: "admin", scheduledStart: "14:30", scheduledEnd: "14:50", durationMinutes: 20 },
  { eventId: "serena-family-pickup", title: "Afternoon pickup", kind: "personal", scheduledStart: "16:00", scheduledEnd: "16:30", durationMinutes: 30 },
];

export const studyInputScenarios: StudyInputScenario[] = [
  {
    id: "maya_daily",
    scope: "daily",
    persona: mayaProfile,
    contextTitle: "Short-sleep research writing day",
    energy: {
      currentEnergyLevel: 3,
      bodyState: "Low but usable energy, with a steadier window later in the morning.",
      sleepSummary: mayaShortSleep,
      activitySummary: "4200 steps; 22 active minutes; 1900 calories out",
      recoverySummary: "resting heart rate 73 bpm; HRV 29 ms",
      energyCurveInputs: { sleep_hours: 5.5, sleep_quality: 68, steps: 4200, active_minutes: 22, resting_heart_rate: 73, hrv_ms: 29, calories_out: 1900 },
      hourlyEnergy: lowMorningEnergy,
      focusCues: {
        visual: ["laptop open to the paper draft", "three anchor papers beside the keyboard", "morning light coming through the window"],
        auditory: ["quiet apartment hum"],
        tactileBody: ["second coffee in reach", "feet on the floor"],
        smell: ["coffee"],
        taste: ["coffee or water"],
        other: ["phone face down"],
      },
    },
    mind: {
      userGoal: {
        userid: "maya-chen",
        priority: mayaProfile.onboarding.lifePriority,
        goal_1: {
          answers: mayaGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      prioritySchedule: [
        { rank: 1, title: "Draft related work section", kind: "task", priority: "high", linkedValue: "Success", energyCost: "high", durationMinutes: 90, scheduledStart: "09:00", scheduledEnd: "10:30" },
        { rank: 2, title: "Answer TA emails", kind: "task", priority: "medium", linkedValue: "Open-Mindedness", energyCost: "low", durationMinutes: 20, scheduledStart: "13:00", scheduledEnd: "13:20" },
        { rank: 3, title: "Prepare two reading group questions", kind: "task", priority: "medium", linkedValue: "Open-Mindedness", energyCost: "medium", durationMinutes: 30, scheduledStart: "15:00", scheduledEnd: "15:30" },
      ],
    },
    value: mayaValue,
    baselineInput: {
      preparationOnlyContext: "Daily preparation with three ranked tasks and durations.",
      visibleItems: ["Draft related work section - 90 min", "Answer TA emails - 20 min", "Prepare two reading group questions - 30 min"],
    },
  },
  {
    id: "maya_task",
    scope: "task",
    persona: mayaProfile,
    contextTitle: "Paper writing block",
    energy: {
      currentEnergyLevel: 3,
      bodyState: "Tired and a little avoidant, but able to begin with a small writing target.",
      sleepSummary: mayaShortSleep,
      activitySummary: "light movement so far; morning work block beginning",
      recoverySummary: "resting heart rate elevated relative to usual; HRV low",
      energyCurveInputs: { sleep_hours: 5.5, sleep_quality: 68, resting_heart_rate: 73, hrv_ms: 29 },
      hourlyEnergy: lowMorningEnergy,
      focusCues: {
        visual: ["paper draft open", "anchor papers beside the keyboard", "cursor at the related work section"],
        auditory: ["quiet apartment hum"],
        tactileBody: ["feet on the floor", "warm mug nearby"],
        smell: ["coffee"],
        taste: ["coffee or water"],
        other: ["phone face down"],
      },
    },
    mind: {
      userGoal: {
        userid: "maya-chen",
        priority: mayaProfile.onboarding.lifePriority,
        goal_1: {
          answers: mayaGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      focusTask: {
        taskId: "maya-related-work",
        title: "Draft related work section",
        projectTitle: "CHI workshop paper",
        scheduledStart: "09:00",
        scheduledEnd: "10:30",
        priority: "high",
        linkedValue: "Success",
        energyCost: "high",
        durationMinutes: 90,
      },
      focusSubtasks: [
        { subtaskId: "maya-rw-1", title: "Re-read the three anchor papers' findings sections", order: 1, durationMinutes: 15 },
        { subtaskId: "maya-rw-2", title: "Draft the gap statement", order: 2, durationMinutes: 20 },
        { subtaskId: "maya-rw-3", title: "Connect related work back to the gap", order: 3, durationMinutes: 25 },
      ],
    },
    value: mayaValue,
    baselineInput: {
      preparationOnlyContext: "Specific task preparation for the related work writing block.",
      visibleItems: ["Draft related work section - 90 min", "Re-read anchor findings - 15 min", "Draft gap statement - 20 min", "Connect related work to gap - 25 min"],
    },
  },
  {
    id: "jonah_daily",
    scope: "daily",
    persona: jonahProfile,
    contextTitle: "Launch review preparation day",
    energy: {
      currentEnergyLevel: 6,
      bodyState: "Good morning energy, with a likely dip after lunch and meeting pressure later.",
      sleepSummary: jonahSteadySleep,
      activitySummary: "2300 steps; 18 active minutes before work",
      recoverySummary: "resting heart rate 62 bpm; HRV 48 ms",
      energyCurveInputs: { sleep_hours: 7.1, sleep_quality: 82, steps: 2300, active_minutes: 18, resting_heart_rate: 62, hrv_ms: 48 },
      hourlyEnergy: steadyDayEnergy,
      focusCues: {
        visual: ["launch dashboard pinned", "stakeholder notes open", "risk doc in split view"],
        auditory: ["low office noise", "calendar alerts muted"],
        tactileBody: ["hands on keyboard", "water bottle beside laptop"],
        smell: [],
        taste: ["coffee"],
        other: ["Slack set to focus mode"],
      },
    },
    mind: {
      userGoal: {
        userid: "jonah-rivera",
        priority: jonahProfile.onboarding.lifePriority,
        goal_1: {
          answers: jonahGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      prioritySchedule: [
        { rank: 1, title: "Finalize launch risk brief", kind: "task", priority: "high", linkedValue: "Responsibility", energyCost: "high", durationMinutes: 60, scheduledStart: "09:30", scheduledEnd: "10:30" },
        { rank: 2, title: "Review support escalation notes", kind: "task", priority: "medium", linkedValue: "Clarity", energyCost: "medium", durationMinutes: 30, scheduledStart: "11:00", scheduledEnd: "11:30" },
        { rank: 3, title: "Draft meeting opening", kind: "task", priority: "medium", linkedValue: "Calm Leadership", energyCost: "low", durationMinutes: 20, scheduledStart: "14:10", scheduledEnd: "14:30" },
      ],
    },
    value: jonahValue,
    baselineInput: {
      preparationOnlyContext: "Daily preparation for launch review work.",
      visibleItems: ["Finalize launch risk brief - 60 min", "Review support escalation notes - 30 min", "Draft meeting opening - 20 min"],
    },
  },
  {
    id: "jonah_task",
    scope: "task",
    persona: jonahProfile,
    contextTitle: "Finalize launch risk brief",
    energy: {
      currentEnergyLevel: 6,
      bodyState: "Clear enough to work through risk details before meetings begin.",
      sleepSummary: jonahSteadySleep,
      activitySummary: "light commute movement; morning desk block",
      recoverySummary: "recovery signals near normal",
      energyCurveInputs: { sleep_hours: 7.1, sleep_quality: 82, resting_heart_rate: 62, hrv_ms: 48 },
      hourlyEnergy: steadyDayEnergy,
      focusCues: {
        visual: ["risk brief outline open", "dashboard tab pinned", "owner list beside the doc"],
        auditory: ["quiet meeting room", "notifications paused"],
        tactileBody: ["laptop on conference table", "water bottle nearby"],
        smell: [],
        taste: ["coffee"],
        other: ["meeting invite minimized"],
      },
    },
    mind: {
      userGoal: {
        userid: "jonah-rivera",
        priority: jonahProfile.onboarding.lifePriority,
        goal_1: {
          answers: jonahGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      focusTask: {
        taskId: "jonah-risk-brief",
        title: "Finalize launch risk brief",
        projectTitle: "Feature launch review",
        scheduledStart: "09:30",
        scheduledEnd: "10:30",
        priority: "high",
        linkedValue: "Responsibility",
        energyCost: "high",
        durationMinutes: 60,
      },
      focusSubtasks: [
        { subtaskId: "jonah-risk-1", title: "Name top unresolved launch risks", order: 1, durationMinutes: 20 },
        { subtaskId: "jonah-risk-2", title: "Assign owners and decision points", order: 2, durationMinutes: 20 },
        { subtaskId: "jonah-risk-3", title: "Write the meeting-ready summary", order: 3, durationMinutes: 20 },
      ],
    },
    value: jonahValue,
    baselineInput: {
      preparationOnlyContext: "Specific task preparation for the launch risk brief.",
      visibleItems: ["Name top risks - 20 min", "Assign owners - 20 min", "Write meeting-ready summary - 20 min"],
    },
  },
  {
    id: "priya_daily",
    scope: "daily",
    persona: priyaProfile,
    contextTitle: "Exam and clinical paperwork day",
    energy: {
      currentEnergyLevel: 4,
      bodyState: "Tired legs after a shift, but alert enough for short study intervals.",
      sleepSummary: priyaPostShiftSleep,
      activitySummary: "6800 steps yesterday; 12 active minutes this morning",
      recoverySummary: "resting heart rate 70 bpm; HRV 35 ms",
      energyCurveInputs: { sleep_hours: 6.0, sleep_quality: 72, steps: 6800, active_minutes: 12, resting_heart_rate: 70, hrv_ms: 35 },
      hourlyEnergy: lowMorningEnergy,
      focusCues: {
        visual: ["flashcards stacked by topic", "scrubs folded on chair", "timer set for study intervals"],
        auditory: ["quiet kitchen", "timer chime ready"],
        tactileBody: ["feet heavy from shift", "water bottle nearby"],
        smell: ["tea"],
        taste: ["tea"],
        other: ["phone on silent"],
      },
    },
    mind: {
      userGoal: {
        userid: "priya-shah",
        priority: priyaProfile.onboarding.lifePriority,
        goal_1: {
          answers: priyaExamGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      prioritySchedule: [
        { rank: 1, title: "Review cardiac medication flashcards", kind: "task", priority: "high", linkedValue: "Competence", energyCost: "medium", durationMinutes: 45, scheduledStart: "08:15", scheduledEnd: "09:00" },
        { rank: 2, title: "Complete clinical reflection note", kind: "task", priority: "medium", linkedValue: "Care", energyCost: "medium", durationMinutes: 35, scheduledStart: "10:20", scheduledEnd: "10:55" },
        { rank: 3, title: "Pack materials for afternoon class", kind: "task", priority: "low", linkedValue: "Presence", energyCost: "low", durationMinutes: 15, scheduledStart: "12:30", scheduledEnd: "12:45" },
      ],
    },
    value: priyaValue,
    baselineInput: {
      preparationOnlyContext: "Daily preparation for exam review and clinical paperwork.",
      visibleItems: ["Review cardiac medication flashcards - 45 min", "Complete clinical reflection note - 35 min", "Pack class materials - 15 min"],
    },
  },
  {
    id: "priya_task",
    scope: "task",
    persona: priyaProfile,
    contextTitle: "Practice assessment sequence",
    energy: {
      currentEnergyLevel: 5,
      bodyState: "Nervous energy before simulation, with attention improving when the sequence is visible.",
      sleepSummary: priyaSimulationSleep,
      activitySummary: "short walk to campus; light morning movement",
      recoverySummary: "recovery signals moderate",
      energyCurveInputs: { sleep_hours: 6.7, sleep_quality: 76, resting_heart_rate: 68, hrv_ms: 38 },
      hourlyEnergy: steadyDayEnergy,
      focusCues: {
        visual: ["skills checklist printed", "stethoscope in bag", "simulation notes highlighted"],
        auditory: ["campus hallway noise", "phone timer ready"],
        tactileBody: ["hands around water bottle", "shoulders slightly tense"],
        smell: [],
        taste: ["water"],
        other: ["study partner message pinned"],
      },
    },
    mind: {
      userGoal: {
        userid: "priya-shah",
        priority: priyaProfile.onboarding.lifePriority,
        goal_1: {
          answers: priyaSimulationGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      focusTask: {
        taskId: "priya-assessment-sequence",
        title: "Practice assessment sequence",
        projectTitle: "Simulation lab preparation",
        scheduledStart: "09:20",
        scheduledEnd: "10:00",
        priority: "high",
        linkedValue: "Care",
        energyCost: "medium",
        durationMinutes: 40,
      },
      focusSubtasks: [
        { subtaskId: "priya-assess-1", title: "Review opening patient safety checks", order: 1, durationMinutes: 10 },
        { subtaskId: "priya-assess-2", title: "Walk through assessment sequence aloud", order: 2, durationMinutes: 20 },
        { subtaskId: "priya-assess-3", title: "Mark one question to ask instructor", order: 3, durationMinutes: 10 },
      ],
    },
    value: priyaValue,
    baselineInput: {
      preparationOnlyContext: "Specific task preparation for simulation assessment practice.",
      visibleItems: ["Review safety checks - 10 min", "Walk through sequence aloud - 20 min", "Mark one instructor question - 10 min"],
    },
  },
  {
    id: "alex_daily",
    scope: "daily",
    persona: alexProfile,
    contextTitle: "Client pitch assembly day",
    energy: {
      currentEnergyLevel: 7,
      bodyState: "Strong creative energy early, with lower tolerance for admin later.",
      sleepSummary: alexRestedSleep,
      activitySummary: "1800 steps; light morning stretch",
      recoverySummary: "resting heart rate 60 bpm; HRV 52 ms",
      energyCurveInputs: { sleep_hours: 7.6, sleep_quality: 84, steps: 1800, active_minutes: 10, resting_heart_rate: 60, hrv_ms: 52 },
      hourlyEnergy: steadyDayEnergy,
      focusCues: {
        visual: ["moodboard wall visible", "deck outline open", "tablet charged"],
        auditory: ["playlist ready"],
        tactileBody: ["stylus in hand", "feet tucked under chair"],
        smell: ["coffee"],
        taste: ["coffee"],
        other: ["client call reminder visible"],
      },
    },
    mind: {
      userGoal: {
        userid: "alex-morgan",
        priority: alexProfile.onboarding.lifePriority,
        goal_1: {
          answers: alexGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      prioritySchedule: [
        { rank: 1, title: "Build pitch deck narrative", kind: "task", priority: "high", linkedValue: "Originality", energyCost: "high", durationMinutes: 80, scheduledStart: "09:00", scheduledEnd: "10:20" },
        { rank: 2, title: "Export client-ready mockups", kind: "task", priority: "medium", linkedValue: "Reliability", energyCost: "medium", durationMinutes: 35, scheduledStart: "11:00", scheduledEnd: "11:35" },
        { rank: 3, title: "Send invoice reminder", kind: "task", priority: "low", linkedValue: "Freedom", energyCost: "low", durationMinutes: 10, scheduledStart: "14:40", scheduledEnd: "14:50" },
      ],
    },
    value: alexValue,
    baselineInput: {
      preparationOnlyContext: "Daily preparation for pitch deck and client admin.",
      visibleItems: ["Build pitch deck narrative - 80 min", "Export client-ready mockups - 35 min", "Send invoice reminder - 10 min"],
    },
  },
  {
    id: "alex_task",
    scope: "task",
    persona: alexProfile,
    contextTitle: "Build pitch deck narrative",
    energy: {
      currentEnergyLevel: 7,
      bodyState: "Creative energy is high, and the task needs a clear story before visuals expand.",
      sleepSummary: alexRestedSleep,
      activitySummary: "light morning stretch before desk work",
      recoverySummary: "recovery signals strong",
      energyCurveInputs: { sleep_hours: 7.6, sleep_quality: 84, resting_heart_rate: 60, hrv_ms: 52 },
      hourlyEnergy: steadyDayEnergy,
      focusCues: {
        visual: ["deck outline open", "three concept thumbnails visible", "moodboard wall nearby"],
        auditory: ["playlist ready"],
        tactileBody: ["stylus in hand", "tablet warm from charging"],
        smell: ["coffee"],
        taste: ["coffee"],
        other: ["client notes minimized but available"],
      },
    },
    mind: {
      userGoal: {
        userid: "alex-morgan",
        priority: alexProfile.onboarding.lifePriority,
        goal_1: {
          answers: alexGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      focusTask: {
        taskId: "alex-pitch-narrative",
        title: "Build pitch deck narrative",
        projectTitle: "Client brand pitch",
        scheduledStart: "09:00",
        scheduledEnd: "10:20",
        priority: "high",
        linkedValue: "Originality",
        energyCost: "high",
        durationMinutes: 80,
      },
      focusSubtasks: [
        { subtaskId: "alex-pitch-1", title: "Choose the core story arc", order: 1, durationMinutes: 20 },
        { subtaskId: "alex-pitch-2", title: "Sequence the strongest concept slides", order: 2, durationMinutes: 35 },
        { subtaskId: "alex-pitch-3", title: "Write transition notes for the client call", order: 3, durationMinutes: 25 },
      ],
    },
    value: alexValue,
    baselineInput: {
      preparationOnlyContext: "Specific task preparation for building the pitch deck narrative.",
      visibleItems: ["Choose core story arc - 20 min", "Sequence concept slides - 35 min", "Write transition notes - 25 min"],
    },
  },
  {
    id: "serena_daily",
    scope: "daily",
    persona: serenaProfile,
    contextTitle: "Brief deadline day",
    energy: {
      currentEnergyLevel: 4,
      bodyState: "Sleep was interrupted, but the morning has a usable quiet pocket.",
      sleepSummary: serenaInterruptedSleep,
      activitySummary: "school drop-off walk planned; light morning movement",
      recoverySummary: "resting heart rate 69 bpm; HRV 33 ms",
      energyCurveInputs: { sleep_hours: 5.9, sleep_quality: 70, resting_heart_rate: 69, hrv_ms: 33 },
      hourlyEnergy: lowMorningEnergy,
      focusCues: {
        visual: ["case notes printed", "phone on do-not-disturb", "argument outline open"],
        auditory: ["quiet apartment", "email alerts muted"],
        tactileBody: ["mug warming hands", "chair pulled close to desk"],
        smell: ["tea"],
        taste: ["tea"],
        other: ["pickup reminder visible"],
      },
    },
    mind: {
      userGoal: {
        userid: "serena-park",
        priority: serenaProfile.onboarding.lifePriority,
        goal_1: {
          answers: serenaGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      prioritySchedule: [
        { rank: 1, title: "Draft argument section", kind: "task", priority: "high", linkedValue: "Justice", energyCost: "high", durationMinutes: 85, scheduledStart: "08:30", scheduledEnd: "09:55" },
        { rank: 2, title: "Confirm pickup logistics", kind: "task", priority: "medium", linkedValue: "Care", energyCost: "low", durationMinutes: 15, scheduledStart: "10:15", scheduledEnd: "10:30" },
        { rank: 3, title: "Send case update to co-counsel", kind: "task", priority: "medium", linkedValue: "Diligence", energyCost: "medium", durationMinutes: 25, scheduledStart: "11:05", scheduledEnd: "11:30" },
      ],
    },
    value: serenaValue,
    baselineInput: {
      preparationOnlyContext: "Daily preparation for brief drafting and time-sensitive logistics.",
      visibleItems: ["Draft argument section - 85 min", "Confirm pickup logistics - 15 min", "Send case update - 25 min"],
    },
  },
  {
    id: "serena_task",
    scope: "task",
    persona: serenaProfile,
    contextTitle: "Draft argument section",
    energy: {
      currentEnergyLevel: 4,
      bodyState: "Compressed morning energy, with enough quiet to make a focused start.",
      sleepSummary: serenaInterruptedSleep,
      activitySummary: "light movement around morning logistics",
      recoverySummary: "recovery signals somewhat constrained",
      energyCurveInputs: { sleep_hours: 5.9, sleep_quality: 70, resting_heart_rate: 69, hrv_ms: 33 },
      hourlyEnergy: lowMorningEnergy,
      focusCues: {
        visual: ["argument outline open", "case notes printed", "highlighted precedent beside laptop"],
        auditory: ["quiet apartment", "email alerts muted"],
        tactileBody: ["mug warming hands", "feet planted under desk"],
        smell: ["tea"],
        taste: ["tea"],
        other: ["phone on do-not-disturb"],
      },
    },
    mind: {
      userGoal: {
        userid: "serena-park",
        priority: serenaProfile.onboarding.lifePriority,
        goal_1: {
          answers: serenaGoalAnswers,
          completed: true,
          source: "onboarding",
        },
      },
      focusTask: {
        taskId: "serena-argument-section",
        title: "Draft argument section",
        projectTitle: "Public-interest case brief",
        scheduledStart: "08:30",
        scheduledEnd: "09:55",
        priority: "high",
        linkedValue: "Justice",
        energyCost: "high",
        durationMinutes: 85,
      },
      focusSubtasks: [
        { subtaskId: "serena-arg-1", title: "Review argument outline", order: 1, durationMinutes: 15 },
        { subtaskId: "serena-arg-2", title: "Draft the strongest claim paragraph", order: 2, durationMinutes: 35 },
        { subtaskId: "serena-arg-3", title: "Tie precedent back to client facts", order: 3, durationMinutes: 35 },
      ],
    },
    value: serenaValue,
    baselineInput: {
      preparationOnlyContext: "Specific task preparation for drafting the argument section.",
      visibleItems: ["Review argument outline - 15 min", "Draft strongest claim paragraph - 35 min", "Tie precedent to client facts - 35 min"],
    },
  },
];
