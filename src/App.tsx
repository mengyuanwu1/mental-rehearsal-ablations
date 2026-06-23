import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type SyntheticEvent,
} from "react";
import { getScenario, scenarios } from "./data/scenarios";
import {
  audioSegmentsForCondition,
  scriptForCondition,
  scriptMetadataForCondition,
  textSegmentsForCondition,
  type AudioSegmentId,
  type AudioSegmentMap,
} from "./data/scripts";
import { assignmentIdFromParams, assignmentSlotCount, buildAssignment, hashString } from "./lib/assignment";
import {
  postQuestionnaire,
  postResponse,
  postStateCheck,
  readStoredQuestionnaire,
  readStoredResponses,
  readStoredStateCheck,
  storeQuestionnaire,
  storeResponse,
  storeStateCheck,
} from "./lib/responses";
import type {
  QuestionnaireAnswers,
  QuestionnaireResponse,
  Scenario,
  StateCheckAnswers,
  StateCheckResponse,
  TrialResponse,
} from "./types";

const params = new URLSearchParams(window.location.search);
const initialProlificId =
  params.get("PROLIFIC_PID") ??
  params.get("prolific_pid") ??
  params.get("participant_id") ??
  params.get("participant") ??
  "";

const returnUrl = params.get("return_url") ?? params.get("redirect_url") ?? "";
const debugMode = params.get("debug") === "1";
const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const minimumComparisonSeconds = 45;
const minimumScenarioReviewSeconds = 10;
const adminModePassword = "mrmrmr";
const questionnaireVersion = "personalization-v3";
const stateCheckVersion = "state-check-v1";
const attentionCheckTrialIndexes = [1];
const attentionCheckTrialIndexSet = new Set(attentionCheckTrialIndexes);
const attentionCheckKinds = ["task", "values", "energy"] as const;
const lastAdminAssignmentStorageKey = "mra-last-admin-assignment-id";
const audioSeekToleranceSeconds = 1.5;
const audioCompletionToleranceSeconds = 1.5;

type AttentionCheckKind = (typeof attentionCheckKinds)[number];

type AttentionCheckOption = {
  id: string;
  label: string;
};

type AttentionCheck = {
  id: string;
  kind: AttentionCheckKind;
  prompt: string;
  options: AttentionCheckOption[];
  correctAnswer: string;
};

type AttentionCheckDefinition = {
  prompt: string;
  correctAnswer: string;
  distractors: string[];
};

type AudioSide = "left" | "right";

type AudioMetrics = {
  playCount: number;
  maxPositionSeconds: number;
  ended: boolean;
  segmentProgress: Record<AudioSegmentId, AudioSegmentMetrics>;
};

type AudioSegmentMetrics = {
  playCount: number;
  maxPositionSeconds: number;
  ended: boolean;
};

type AudioMetricsBySide = Record<AudioSide, AudioMetrics>;

type ScriptMeasureId = "bodyState" | "taskGoal" | "valueConnection" | "ease" | "overall";

type ScriptMeasureRatings = Record<ScriptMeasureId, number | null>;

type ScriptRatingsBySide = Record<AudioSide, ScriptMeasureRatings>;

const audioSegmentOrder: AudioSegmentId[] = ["introduction", "middle", "ending", "complete"];
const audioSegmentLabels: Record<AudioSegmentId, string> = {
  introduction: "Introduction",
  middle: "Middle",
  ending: "Ending",
  complete: "Complete script",
};

const scriptMeasures: Array<{
  id: ScriptMeasureId;
  label: string;
  lowAnchor: string;
  highAnchor: string;
}> = [
  {
    id: "bodyState",
    label: "Bodily state",
    lowAnchor: "Did not address their body or energy",
    highAnchor: "Addressed their body and energy very well",
  },
  {
    id: "taskGoal",
    label: "Daily priorities and goal",
    lowAnchor: "Did not address their priorities or goal",
    highAnchor: "Addressed their priorities and goal very well",
  },
  {
    id: "valueConnection",
    label: "Value connection",
    lowAnchor: "Did not connect to their values",
    highAnchor: "Connected to their values very well",
  },
  {
    id: "ease",
    label: "Flow and fit",
    lowAnchor: "Too short, too long, or awkward to rehearse",
    highAnchor: "Smooth, well-paced, and easy to rehearse",
  },
  {
    id: "overall",
    label: "Overall rating",
    lowAnchor: "Not helpful",
    highAnchor: "Very helpful",
  },
];

type StateCheckQuestionId = keyof StateCheckAnswers;

const stateCheckScale = [1, 2, 3, 4, 5, 6, 7];

const stateCheckQuestions: Array<{
  id: StateCheckQuestionId;
  prompt: string;
  lowAnchor: string;
  highAnchor: string;
}> = [
  {
    id: "currentMood",
    prompt: "How would you describe your mood right now?",
    lowAnchor: "Very negative",
    highAnchor: "Very positive",
  },
  {
    id: "currentEnergy",
    prompt: "How much energy do you have right now?",
    lowAnchor: "Depleted",
    highAnchor: "Energized",
  },
  {
    id: "planningStyle",
    prompt: "In general, which feels more like you?",
    lowAnchor: "I prefer to go with the flow",
    highAnchor: "I prefer to make a plan",
  },
];

const emptyScriptMeasureRatings = (): ScriptMeasureRatings => ({
  bodyState: null,
  taskGoal: null,
  valueConnection: null,
  ease: null,
  overall: null,
});

const emptyScriptRatings = (): ScriptRatingsBySide => ({
  left: emptyScriptMeasureRatings(),
  right: emptyScriptMeasureRatings(),
});

const scriptRatingsComplete = (ratings: ScriptRatingsBySide) =>
  Object.values(ratings).every((sideRatings) =>
    scriptMeasures.every((measure) => sideRatings[measure.id] !== null),
  );

const requiredRating = (value: number | null) => {
  if (value === null) throw new Error("Missing script rating.");
  return value;
};

const scriptRatingsFromResponse = (response?: TrialResponse): ScriptRatingsBySide => ({
  left: {
    bodyState: response?.leftBodyStateRating ?? null,
    taskGoal: response?.leftTaskGoalRating ?? null,
    valueConnection: response?.leftValueConnectionRating ?? null,
    ease: response?.leftEaseRating ?? null,
    overall: response?.leftRating ?? null,
  },
  right: {
    bodyState: response?.rightBodyStateRating ?? null,
    taskGoal: response?.rightTaskGoalRating ?? null,
    valueConnection: response?.rightValueConnectionRating ?? null,
    ease: response?.rightEaseRating ?? null,
    overall: response?.rightRating ?? null,
  },
});

const emptySegmentProgress = (): Record<AudioSegmentId, AudioSegmentMetrics> => ({
  introduction: { playCount: 0, maxPositionSeconds: 0, ended: false },
  middle: { playCount: 0, maxPositionSeconds: 0, ended: false },
  ending: { playCount: 0, maxPositionSeconds: 0, ended: false },
  complete: { playCount: 0, maxPositionSeconds: 0, ended: false },
});

const emptyAudioMetrics = (): AudioMetricsBySide => ({
  left: { playCount: 0, maxPositionSeconds: 0, ended: false, segmentProgress: emptySegmentProgress() },
  right: { playCount: 0, maxPositionSeconds: 0, ended: false, segmentProgress: emptySegmentProgress() },
});

const parseSegmentProgress = (value?: string): Record<AudioSegmentId, AudioSegmentMetrics> => {
  if (!value) return emptySegmentProgress();
  try {
    return { ...emptySegmentProgress(), ...(JSON.parse(value) as Record<AudioSegmentId, AudioSegmentMetrics>) };
  } catch {
    return emptySegmentProgress();
  }
};

const audioMetricsFromResponse = (response?: TrialResponse): AudioMetricsBySide => ({
  left: {
    playCount: response?.leftAudioPlayCount ?? 0,
    maxPositionSeconds: response?.leftAudioMaxPositionSeconds ?? 0,
    ended: response?.leftAudioEnded ?? false,
    segmentProgress: parseSegmentProgress(response?.leftAudioSegmentProgress),
  },
  right: {
    playCount: response?.rightAudioPlayCount ?? 0,
    maxPositionSeconds: response?.rightAudioMaxPositionSeconds ?? 0,
    ended: response?.rightAudioEnded ?? false,
    segmentProgress: parseSegmentProgress(response?.rightAudioSegmentProgress),
  },
});

const roundedAudioSeconds = (value: number) => Math.round(Math.max(0, value) * 10) / 10;

const continuousPlayedSeconds = (audio: HTMLAudioElement) => {
  let continuousEnd = 0;
  for (let index = 0; index < audio.played.length; index += 1) {
    const rangeStart = audio.played.start(index);
    const rangeEnd = audio.played.end(index);
    if (rangeStart > continuousEnd + audioSeekToleranceSeconds) continue;
    continuousEnd = Math.max(continuousEnd, rangeEnd);
  }
  return roundedAudioSeconds(continuousEnd);
};

const orderedAudioSegments = (segments: AudioSegmentMap) =>
  audioSegmentOrder.filter((segmentId) => Boolean(segments[segmentId]));

const stepFromMetrics = (segmentIds: AudioSegmentId[], metrics: AudioMetrics) => {
  const firstIncomplete = segmentIds.findIndex((segmentId) => !metrics.segmentProgress[segmentId]?.ended);
  if (firstIncomplete >= 0) return firstIncomplete;
  return Math.max(0, segmentIds.length - 1);
};

const seededOptions = (options: AttentionCheckOption[], seed: string) =>
  [...options].sort((first, second) => {
    const firstHash = hashString(`${seed}:${first.id}`);
    const secondHash = hashString(`${seed}:${second.id}`);
    return firstHash - secondHash || first.label.localeCompare(second.label);
  });

const attentionCheckPromptForKind = (kind: AttentionCheckKind) => {
  switch (kind) {
    case "task":
      return "Attention check: select the exact scenario title shown at the top of this page.";
    case "values":
      return "Attention check: select the exact text shown under Life priority.";
    case "energy":
      return "Attention check: select the exact text shown under Energy background.";
  }
};

const attentionCheckAnswerForKind = (scenario: Scenario, kind: AttentionCheckKind) => {
  switch (kind) {
    case "task":
      return scenario.contextTitle;
    case "values":
      return scenario.lifePriority;
    case "energy":
      return scenario.bodyState;
  }
};

function exactAttentionCheckDefinition(
  assignmentId: number,
  trialIndex: number,
  scenario: Scenario,
  kind: AttentionCheckKind,
): AttentionCheckDefinition {
  const correctAnswer = attentionCheckAnswerForKind(scenario, kind);
  const distractorOptions = scenarios
    .filter((candidate) => candidate.id !== scenario.id)
    .map((candidate, index) => ({
      id: `${candidate.id}:${kind}:exact-distractor-${index}`,
      label: attentionCheckAnswerForKind(candidate, kind),
    }))
    .filter((option) => option.label !== correctAnswer);

  return {
    prompt: attentionCheckPromptForKind(kind),
    correctAnswer,
    distractors: seededOptions(
      distractorOptions,
      `${assignmentId}:${trialIndex}:${kind}:exact-attention-distractors`,
    )
      .slice(0, 3)
      .map((option) => option.label),
  };
}

function attentionCheckForTrial(
  assignmentId: number,
  trialIndex: number,
  scenario: Scenario,
): AttentionCheck | null {
  if (!attentionCheckTrialIndexSet.has(trialIndex)) return null;

  const checkIndex = attentionCheckTrialIndexes.indexOf(trialIndex);
  const kind = attentionCheckKinds[(assignmentId + checkIndex) % attentionCheckKinds.length];
  const definition = exactAttentionCheckDefinition(assignmentId, trialIndex, scenario, kind);
  const correctAnswer = definition.correctAnswer;
  const correctOption = { id: `${scenario.id}:${kind}`, label: correctAnswer };
  const seenLabels = new Set([correctAnswer]);
  const distractors: AttentionCheckOption[] = [];

  for (const [index, label] of definition.distractors.entries()) {
    if (seenLabels.has(label)) continue;
    seenLabels.add(label);
    distractors.push({ id: `${scenario.id}:${kind}:distractor-${index}`, label });
    if (distractors.length === 3) break;
  }

  return {
    id: `scenario-${kind}-${trialIndex + 1}`,
    kind,
    prompt: definition.prompt,
    options: seededOptions([correctOption, ...distractors], `${assignmentId}:${trialIndex}:${kind}:attention-options`),
    correctAnswer,
  };
}

type QuestionnaireChoiceId =
  | "perspectivePreference"
  | "guidanceLevel"
  | "backgroundAudio"
  | "scriptLength"
  | "toneStyle"
  | "personalizationFocus"
  | "deliveryFormat";

type QuestionnaireOtherId =
  | "perspectivePreferenceOther"
  | "guidanceLevelOther"
  | "backgroundAudioOther"
  | "scriptLengthOther"
  | "toneStyleOther"
  | "personalizationFocusOther"
  | "deliveryFormatOther";

type QuestionnaireQuestion = {
  id: QuestionnaireChoiceId;
  otherId: QuestionnaireOtherId;
  mode?: "single" | "multiple" | "range" | "ranking";
  prompt: string;
  options?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
};

const questionnaireQuestions: QuestionnaireQuestion[] = [
  {
    id: "perspectivePreference",
    otherId: "perspectivePreferenceOther",
    mode: "multiple",
    prompt: "What point of view would you prefer for your own rehearsal scripts?",
    options: [
      {
        value: "first_person",
        label: "First-person",
        description: 'Uses "I" and feels self-directed.',
      },
      {
        value: "second_person",
        label: "Guide voice",
        description: 'Uses "you" and feels coached.',
      },
      {
        value: "third_person",
        label: "Third-person",
        description: "Uses your name or they/them framing.",
      },
      {
        value: "no_preference",
        label: "No preference",
        description: "Any perspective is fine.",
      },
    ],
  },
  {
    id: "guidanceLevel",
    otherId: "guidanceLevelOther",
    mode: "multiple",
    prompt: "How much guidance would you want from the rehearsal guide?",
    options: [
      {
        value: "light",
        label: "Light cues",
        description: "Brief prompts with room to imagine.",
      },
      {
        value: "moderate",
        label: "Moderate guidance",
        description: "Clear structure without too much detail.",
      },
      {
        value: "step_by_step",
        label: "Step-by-step",
        description: "Specific actions and transitions.",
      },
      {
        value: "adaptive",
        label: "Adaptive",
        description: "More help when the day feels harder.",
      },
    ],
  },
  {
    id: "backgroundAudio",
    otherId: "backgroundAudioOther",
    mode: "multiple",
    prompt: "What background audio would you prefer, if any?",
    options: [
      {
        value: "none",
        label: "No music",
        description: "Voice only.",
      },
      {
        value: "ambient",
        label: "Ambient",
        description: "Soft instrumental texture.",
      },
      {
        value: "nature",
        label: "Nature sounds",
        description: "Rain, forest, ocean, or similar.",
      },
      {
        value: "piano_lofi",
        label: "Piano or lo-fi",
        description: "Gentle rhythm and melody.",
      },
      {
        value: "energizing",
        label: "Energizing",
        description: "More upbeat focus music.",
      },
    ],
  },
  {
    id: "scriptLength",
    otherId: "scriptLengthOther",
    mode: "range",
    prompt: "What rehearsal length would fit you best?",
  },
  {
    id: "toneStyle",
    otherId: "toneStyleOther",
    mode: "multiple",
    prompt: "What tone would make a rehearsal most useful?",
    options: [
      {
        value: "calm_supportive",
        label: "Calm and supportive",
        description: "Warm, steady, low pressure.",
      },
      {
        value: "practical_direct",
        label: "Practical and direct",
        description: "Clear, efficient, action-focused.",
      },
      {
        value: "encouraging",
        label: "Encouraging",
        description: "Motivating and confidence-building.",
      },
      {
        value: "reflective",
        label: "Reflective",
        description: "Meaning, values, and identity-focused.",
      },
    ],
  },
  {
    id: "personalizationFocus",
    otherId: "personalizationFocusOther",
    mode: "ranking",
    prompt: "Which personalization would matter most to you?",
    options: [
      {
        value: "mind_grounding",
        label: "Mind grounding",
        description: "Ground attention before the rehearsal begins.",
      },
      {
        value: "day_success_visualization",
        label: "Success visualization of day",
        description: "Imagine the day going well overall.",
      },
      {
        value: "task_success_visualization",
        label: "Success visualization of task",
        description: "Imagine a specific task reaching a successful outcome.",
      },
      {
        value: "body_grounding",
        label: "Body grounding",
        description: "Use energy level, environmental cues, and physical state.",
      },
      {
        value: "value_grounding",
        label: "Value grounding",
        description: "Remember personal values and the larger picture.",
      },
      {
        value: "potential_obstacle_visualization",
        label: "Potential obstacle visualization",
        description: "Preview likely obstacles and recovery moves.",
      },
    ],
  },
  {
    id: "deliveryFormat",
    otherId: "deliveryFormatOther",
    mode: "multiple",
    prompt: "Which delivery format would you prefer?",
    options: [
      {
        value: "readable_text",
        label: "Readable text",
        description: "A script I can read silently.",
      },
      {
        value: "spoken_audio",
        label: "Spoken audio",
        description: "A guided audio rehearsal.",
      },
      {
        value: "text_and_audio",
        label: "Text and audio",
        description: "Both formats available.",
      },
      {
        value: "interactive_steps",
        label: "Interactive steps",
        description: "One section at a time.",
      },
    ],
  },
];

const scriptLengthMin = 0;
const scriptLengthMax = 15;
const defaultScriptLengthRange = {
  lower: 0,
  upper: 5,
};

const selectedValuesFromAnswer = (answer: string) =>
  answer
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

const answerFromSelectedValues = (values: string[]) => values.join(",");

const emptyRankingSlotValue = "__empty__";

const rankingSlotsForQuestion = (question: QuestionnaireQuestion, answer: string) => {
  const optionValues = (question.options ?? []).map((option) => option.value);
  const seenValues = new Set<string>();
  const slots = Array(optionValues.length).fill("") as string[];

  selectedValuesFromAnswer(answer)
    .slice(0, optionValues.length)
    .forEach((value, index) => {
      if (value === emptyRankingSlotValue || !optionValues.includes(value) || seenValues.has(value)) return;
      seenValues.add(value);
      slots[index] = value;
    });

  return slots;
};

const rankingValuesForQuestion = (question: QuestionnaireQuestion, answer: string) =>
  rankingSlotsForQuestion(question, answer).filter(Boolean);

const answerFromRankingSlots = (slots: string[]) =>
  slots.some(Boolean) ? slots.map((value) => value || emptyRankingSlotValue).join(",") : "";

const clampScriptLengthMinutes = (minutes: number) =>
  Number.isFinite(minutes) ? Math.min(scriptLengthMax, Math.max(scriptLengthMin, minutes)) : scriptLengthMin;

const upperScriptLengthAnswer = (minutes: number) =>
  minutes >= scriptLengthMax ? `${scriptLengthMax}_plus` : String(minutes);

const scriptLengthAnswerFromRange = (lower: number, upper: number) => {
  const nextLower = clampScriptLengthMinutes(lower);
  const nextUpper = clampScriptLengthMinutes(Math.max(nextLower, upper));
  return `${nextLower}-${upperScriptLengthAnswer(nextUpper)}`;
};

const minutesFromLegacyScriptLengthAnswer = (answer: string) => {
  if (answer.endsWith("_plus")) return scriptLengthMax;

  const minutes = Number.parseInt(answer, 10);
  if (Number.isFinite(minutes)) return clampScriptLengthMinutes(minutes);

  return defaultScriptLengthRange.upper;
};

const scriptLengthRangeFromAnswer = (answer: string) => {
  if (!answer.includes("-")) {
    return {
      lower: scriptLengthMin,
      upper: minutesFromLegacyScriptLengthAnswer(answer),
    };
  }

  const [lowerAnswer, upperAnswer] = answer.split("-");
  const lower = clampScriptLengthMinutes(Number.parseInt(lowerAnswer, 10));
  const upper = Math.max(lower, minutesFromLegacyScriptLengthAnswer(upperAnswer));

  return {
    lower,
    upper: clampScriptLengthMinutes(upper),
  };
};

const normalizeScriptLengthAnswer = (answer: string) => {
  const range = scriptLengthRangeFromAnswer(answer);
  return scriptLengthAnswerFromRange(range.lower, range.upper);
};

const formatScriptLengthRangeAnswer = (answer: string) => {
  const { lower, upper } = scriptLengthRangeFromAnswer(answer);
  const upperLabel = upper >= scriptLengthMax ? `${scriptLengthMax}+` : String(upper);
  const unit = upper === 1 && lower === 1 ? "minute" : "minutes";
  if (lower === upper) return `${upperLabel} ${unit}`;
  return `${lower}-${upperLabel} ${unit}`;
};

const createAdminSession = (participantLabel: string) => {
  const sessionKey = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const proposedAssignmentId = hashString(`${participantLabel}:admin:${sessionKey}`) % assignmentSlotCount;
  const previousAssignmentId = Number(window.localStorage.getItem(lastAdminAssignmentStorageKey));
  const assignmentId =
    assignmentSlotCount > 1 && Number.isFinite(previousAssignmentId) && proposedAssignmentId === previousAssignmentId
      ? (proposedAssignmentId + 1) % assignmentSlotCount
      : proposedAssignmentId;

  window.localStorage.setItem(lastAdminAssignmentStorageKey, String(assignmentId));

  return {
    participantId: `${participantLabel || "admin"}__admin_${sessionKey}`,
    assignmentId,
  };
};

const emptyQuestionnaireAnswers: QuestionnaireAnswers = {
  perspectivePreference: "",
  perspectivePreferenceOther: "",
  guidanceLevel: "",
  guidanceLevelOther: "",
  backgroundAudio: "",
  backgroundAudioOther: "",
  scriptLength: scriptLengthAnswerFromRange(defaultScriptLengthRange.lower, defaultScriptLengthRange.upper),
  scriptLengthOther: "",
  toneStyle: "",
  toneStyleOther: "",
  personalizationFocus: "",
  personalizationFocusOther: "",
  deliveryFormat: "",
  deliveryFormatOther: "",
  idealMorningGuidance: "",
};

const emptyStateCheckAnswers: StateCheckAnswers = {
  currentMood: "",
  currentEnergy: "",
  planningStyle: "",
};

const stateCheckAnswersFromResponse = (response: StateCheckResponse | null): StateCheckAnswers => ({
  currentMood: response?.currentMood ?? "",
  currentEnergy: response?.currentEnergy ?? "",
  planningStyle: response?.planningStyle ?? "",
});

const questionnaireAnswersFromResponse = (response: QuestionnaireResponse | null): QuestionnaireAnswers => ({
  perspectivePreference: response?.perspectivePreference ?? "",
  perspectivePreferenceOther: response?.perspectivePreferenceOther ?? "",
  guidanceLevel: response?.guidanceLevel ?? "",
  guidanceLevelOther: response?.guidanceLevelOther ?? "",
  backgroundAudio: response?.backgroundAudio ?? "",
  backgroundAudioOther: response?.backgroundAudioOther ?? "",
  scriptLength: normalizeScriptLengthAnswer(response?.scriptLength ?? emptyQuestionnaireAnswers.scriptLength),
  scriptLengthOther: response?.scriptLengthOther ?? "",
  toneStyle: response?.toneStyle ?? "",
  toneStyleOther: response?.toneStyleOther ?? "",
  personalizationFocus: response?.personalizationFocus ?? "",
  personalizationFocusOther: response?.personalizationFocusOther ?? "",
  deliveryFormat: response?.deliveryFormat ?? "",
  deliveryFormatOther: response?.deliveryFormatOther ?? "",
  idealMorningGuidance: response?.idealMorningGuidance ?? "",
});

const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

export default function App() {
  const [participantInput, setParticipantInput] = useState(initialProlificId);
  const [participantId, setParticipantId] = useState("");
  const [introAccepted, setIntroAccepted] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminModeError, setAdminModeError] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminParticipantId, setAdminParticipantId] = useState("");
  const [adminAssignmentId, setAdminAssignmentId] = useState<number | null>(null);
  const [stateCheck, setStateCheck] = useState<StateCheckResponse | null>(null);
  const [stateCheckDraft, setStateCheckDraft] = useState<StateCheckAnswers>(emptyStateCheckAnswers);

  const activeParticipantId = adminMode && adminParticipantId ? adminParticipantId : participantId;
  const activeAssignmentId = useMemo(() => {
    if (!activeParticipantId) return null;
    return adminMode && adminAssignmentId !== null
      ? adminAssignmentId
      : assignmentIdFromParams(params, activeParticipantId);
  }, [activeParticipantId, adminAssignmentId, adminMode]);

  function beginStudy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = participantInput.trim();
    if (!trimmed && !adminMode) return;

    const nextParticipantId = adminMode ? adminParticipantId || trimmed || "admin" : trimmed;
    const nextAssignmentId =
      adminMode && adminAssignmentId !== null
        ? adminAssignmentId
        : assignmentIdFromParams(params, nextParticipantId);
    const storedStateCheck = readStoredStateCheck(nextParticipantId, nextAssignmentId);

    setParticipantId(nextParticipantId);
    setStateCheck(storedStateCheck);
    setStateCheckDraft(stateCheckAnswersFromResponse(storedStateCheck));
    setIntroAccepted(false);
  }

  function resetAdminMode() {
    setAdminMode(false);
    setAdminPasswordInput("");
    setAdminModeError("");
    setShowAdminPassword(false);
    setAdminParticipantId("");
    setAdminAssignmentId(null);
  }

  function toggleAdminMode() {
    if (adminMode) {
      resetAdminMode();
      return;
    }

    if (showAdminPassword) {
      setAdminPasswordInput("");
      setAdminModeError("");
      setShowAdminPassword(false);
      return;
    }

    setShowAdminPassword(true);
    setAdminModeError("");
  }

  function updateAdminPassword(event: ChangeEvent<HTMLInputElement>) {
    const password = event.currentTarget.value;
    setAdminPasswordInput(password);

    if (password === adminModePassword) {
      const adminSession = createAdminSession(participantInput.trim() || "admin");
      setAdminMode(true);
      setAdminParticipantId(adminSession.participantId);
      setAdminAssignmentId(adminSession.assignmentId);
      setAdminPasswordInput("");
      setAdminModeError("");
      setShowAdminPassword(false);
      return;
    }

    setAdminModeError(password.length >= adminModePassword.length ? "Admin password incorrect." : "");
  }

  if (!participantId) {
    return (
      <main className="app-shell">
        <section className="start-panel">
          <p className="overline">Mental rehearsal comparison</p>
          <h1>Enter your Prolific ID to begin.</h1>
          <p>
            Please use the exact Prolific ID shown on Prolific. Your responses will be linked to
            this ID for study payment and data quality checks.
          </p>
          <form className="participant-form" onSubmit={beginStudy}>
            <label>
              <span>Prolific ID</span>
              <input
                autoComplete="off"
                autoFocus
                value={participantInput}
                onChange={(event) => {
                  setParticipantInput(event.target.value);
                  if (adminMode || showAdminPassword) {
                    resetAdminMode();
                  }
                }}
                placeholder="Enter Prolific ID"
              />
            </label>
            <label className="admin-mode-toggle">
              <input checked={adminMode} onChange={toggleAdminMode} type="checkbox" />
              <span>Admin mode</span>
            </label>
            {showAdminPassword ? (
              <label className="admin-password-field">
                <span>Admin password</span>
                <input
                  autoComplete="off"
                  autoFocus
                  onChange={updateAdminPassword}
                  type="password"
                  value={adminPasswordInput}
                />
              </label>
            ) : null}
            {adminModeError ? <p className="admin-mode-error">{adminModeError}</p> : null}
            <button className="primary-button" disabled={!adminMode && !participantInput.trim()} type="submit">
              Continue
            </button>
          </form>
        </section>
      </main>
    );
  }

  if (!stateCheck && activeAssignmentId !== null) {
    return (
      <StateCheckForm
        adminMode={adminMode}
        assignmentId={activeAssignmentId}
        initialAnswers={stateCheckDraft}
        onBack={() => {
          setParticipantId("");
          setStateCheck(null);
          setStateCheckDraft(emptyStateCheckAnswers);
          setIntroAccepted(false);
        }}
        onDraftChange={setStateCheckDraft}
        onSubmitted={setStateCheck}
        participantId={activeParticipantId}
      />
    );
  }

  if (!introAccepted) {
    return (
      <main className="app-shell">
        <section className="start-panel intro-panel">
          <p className="overline">Before you begin</p>
          <h1>About mental rehearsal and this study.</h1>

          <div className="intro-copy">
            <section>
              <h2>What is mental rehearsal?</h2>
              <p>
                Mental rehearsal is a short guided preview of a future situation. It asks you to
                imagine the setting, the actions you might take, and the way you want to feel before
                the moment actually happens.
              </p>
            </section>

            <section>
              <h2>What is this study about?</h2>
              <p>
                This study compares different styles of mental rehearsal guidance. You will listen
                to two pairs of rehearsal scripts and choose which script would better help
                someone prepare for their day.
              </p>
            </section>

            <section>
              <h2>How does each comparison work?</h2>
              <p>
                Each script is played in three audio parts: introduction, middle, and ending. Listen
                to each part all the way through, then tap Continue to move to the next part.
              </p>
              <p>
                Please complete all three audio parts for Script A first. Script B will unlock after
                Script A is complete. Once a script is fully complete, its full text will appear so
                you can review it before choosing.
              </p>
            </section>

            <section>
              <h2>How should you answer?</h2>
              <p>
                There are no right or wrong answers. Please focus on which script feels more useful,
                clear, and supportive for the person in the scenario. After the comparisons, you will
                answer a few questions about your own preferences for a rehearsal guide.
              </p>
              <p>
                Each comparison has a 45-second review timer and requires both audio sequences to be
                completed before you can continue. Please take time to listen to both scripts before
                making your final choice.
              </p>
            </section>
          </div>

          <div className="intro-id">Prolific ID: {participantId}</div>
          <div className="intro-actions">
            <button
              className="secondary-button"
              onClick={() => {
                setParticipantId("");
                setStateCheck(null);
                setStateCheckDraft(emptyStateCheckAnswers);
                setIntroAccepted(false);
              }}
              type="button"
            >
              Back
            </button>
            <button
              className="primary-button"
              onClick={() => setIntroAccepted(true)}
              type="button"
            >
              Start comparisons
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <StudyTask
      adminMode={adminMode}
      forcedAssignmentId={activeAssignmentId}
      key={`${activeParticipantId}:${activeAssignmentId ?? "auto"}`}
      participantId={activeParticipantId}
    />
  );
}

function StateCheckForm({
  adminMode,
  assignmentId,
  initialAnswers,
  onBack,
  onDraftChange,
  onSubmitted,
  participantId,
}: {
  adminMode: boolean;
  assignmentId: number;
  initialAnswers: StateCheckAnswers;
  onBack: () => void;
  onDraftChange: (answers: StateCheckAnswers) => void;
  onSubmitted: (response: StateCheckResponse) => void;
  participantId: string;
}) {
  const [answers, setAnswers] = useState<StateCheckAnswers>(initialAnswers);
  const [startedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const stateCheckComplete = stateCheckQuestions.every((question) => Boolean(answers[question.id]));
  const canSubmit = (adminMode || stateCheckComplete) && !isSubmitting;

  useEffect(() => {
    onDraftChange(answers);
  }, [answers, onDraftChange]);

  function setAnswer(questionId: StateCheckQuestionId, value: number) {
    setAnswers((current) => ({ ...current, [questionId]: String(value) }));
  }

  async function submitStateCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submittingRef.current) return;

    const now = new Date().toISOString();
    const response: StateCheckResponse = {
      ...answers,
      responseId: `${participantId}:${assignmentId}:state-check`,
      participantId,
      assignmentId,
      stateCheckVersion,
      startedAt,
      submittedAt: now,
      elapsedMs: Date.now() - new Date(startedAt).getTime(),
      userAgent: navigator.userAgent,
    };

    submittingRef.current = true;
    setIsSubmitting(true);
    storeStateCheck(response);

    try {
      await postStateCheck(response);
      setPostingError("");
    } catch {
      setPostingError("Saved locally. Network post failed.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
      onSubmitted(response);
    }
  }

  return (
    <main className="app-shell questionnaire-shell">
      <header className="study-header">
        <div>
          <p className="overline">Before you begin</p>
          <h1>Tell us how you are starting today.</h1>
        </div>
        <div className="progress-block" aria-label="State check">
          <span>State check</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "20%" }} />
          </div>
        </div>
      </header>

      <form className="questionnaire-panel state-check-panel" onSubmit={submitStateCheck}>
        {stateCheckQuestions.map((question, questionIndex) => (
          <fieldset className="questionnaire-question state-check-question" key={question.id}>
            <legend>
              <span>{questionIndex + 1}</span>
              {question.prompt}
            </legend>
            <div className="state-scale" role="group" aria-label={question.prompt}>
              <div className="state-scale-anchors">
                <span>{question.lowAnchor}</span>
                <span>{question.highAnchor}</span>
              </div>
              <div className="rating-buttons state-scale-buttons">
                {stateCheckScale.map((rating) => (
                  <button
                    aria-pressed={answers[question.id] === String(rating)}
                    className={answers[question.id] === String(rating) ? "rating-button selected" : "rating-button"}
                    key={`${question.id}-${rating}`}
                    onClick={() => setAnswer(question.id, rating)}
                    type="button"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        ))}

        <div className="footer-actions">
          <p>{postingError || (isSubmitting ? "Saving..." : "State check saves when submitted.")}</p>
          <div className="nav-actions">
            <button className="secondary-button" disabled={isSubmitting} onClick={onBack} type="button">
              Back
            </button>
            <button className="primary-button" disabled={!canSubmit} type="submit">
              {isSubmitting ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

function StudyTask({
  adminMode,
  forcedAssignmentId,
  participantId,
}: {
  adminMode: boolean;
  forcedAssignmentId: number | null;
  participantId: string;
}) {
  const assignmentId = useMemo(
    () => forcedAssignmentId ?? assignmentIdFromParams(params, participantId),
    [forcedAssignmentId, participantId],
  );
  const assignment = useMemo(() => buildAssignment(assignmentId), [assignmentId]);
  const [responses, setResponses] = useState<TrialResponse[]>(() =>
    readStoredResponses(participantId, assignment.assignmentId),
  );
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse | null>(() =>
    readStoredQuestionnaire(participantId, assignment.assignmentId),
  );
  const [questionnaireDraft, setQuestionnaireDraft] = useState<QuestionnaireAnswers>(() =>
    questionnaireAnswersFromResponse(readStoredQuestionnaire(participantId, assignment.assignmentId)),
  );
  const [trialIndex, setTrialIndex] = useState(() => Math.min(responses.length, assignment.trials.length));
  const [choice, setChoice] = useState<"left" | "right" | "">("");
  const [scriptRatings, setScriptRatings] = useState<ScriptRatingsBySide>(emptyScriptRatings);
  const [attentionCheckAnswer, setAttentionCheckAnswer] = useState("");
  const [audioMetrics, setAudioMetrics] = useState<AudioMetricsBySide>(emptyAudioMetrics);
  const [audioStepBySide, setAudioStepBySide] = useState<Record<AudioSide, number>>({ left: 0, right: 0 });
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readingSecondsRemaining, setReadingSecondsRemaining] = useState(
    adminMode ? 0 : minimumComparisonSeconds,
  );
  const [scenarioReviewGate, setScenarioReviewGate] = useState(() => ({
    trialIndex,
    secondsRemaining: adminMode ? 0 : minimumScenarioReviewSeconds,
  }));
  const submittingRef = useRef(false);

  const comparisonComplete = trialIndex >= assignment.trials.length;
  const complete = questionnaire !== null;
  const trial = assignment.trials[Math.min(trialIndex, assignment.trials.length - 1)];
  const scenario = getScenario(trial.scenarioId);
  const leftScript = scriptForCondition(scenario, trial.leftCondition);
  const rightScript = scriptForCondition(scenario, trial.rightCondition);
  const leftScriptMeta = scriptMetadataForCondition(scenario, trial.leftCondition);
  const rightScriptMeta = scriptMetadataForCondition(scenario, trial.rightCondition);
  const leftAudioSegments = useMemo(
    () => audioSegmentsForCondition(scenario, trial.leftCondition),
    [scenario.id, trial.leftCondition],
  );
  const rightAudioSegments = useMemo(
    () => audioSegmentsForCondition(scenario, trial.rightCondition),
    [scenario.id, trial.rightCondition],
  );
  const leftAudioSegmentIds = useMemo(() => orderedAudioSegments(leftAudioSegments), [leftAudioSegments]);
  const rightAudioSegmentIds = useMemo(() => orderedAudioSegments(rightAudioSegments), [rightAudioSegments]);
  const leftTextSegments = useMemo(
    () => textSegmentsForCondition(scenario, trial.leftCondition),
    [scenario.id, trial.leftCondition],
  );
  const rightTextSegments = useMemo(
    () => textSegmentsForCondition(scenario, trial.rightCondition),
    [scenario.id, trial.rightCondition],
  );
  const attentionCheck = attentionCheckForTrial(assignment.assignmentId, trialIndex, scenario);
  const progressPercent = Math.round(
    ((Math.min(trialIndex, assignment.trials.length - 1) + 1) / assignment.trials.length) * 100,
  );
  const currentTrialResponse = responses.find((response) => response.trialIndex === trialIndex);
  const scenarioSecondsRemaining =
    adminMode || currentTrialResponse
      ? 0
      : scenarioReviewGate.trialIndex === trialIndex
        ? scenarioReviewGate.secondsRemaining
        : minimumScenarioReviewSeconds;
  const scenarioReviewComplete = scenarioSecondsRemaining <= 0;
  const readingComplete = readingSecondsRemaining <= 0;
  const leftRating = scriptRatings.left.overall;
  const rightRating = scriptRatings.right.overall;
  const ratingsComplete = scriptRatingsComplete(scriptRatings);
  const leftAudioComplete =
    leftAudioSegmentIds.length === 0 ||
    leftAudioSegmentIds.every((segmentId) => audioMetrics.left.segmentProgress[segmentId]?.ended);
  const rightAudioComplete =
    rightAudioSegmentIds.length === 0 ||
    rightAudioSegmentIds.every((segmentId) => audioMetrics.right.segmentProgress[segmentId]?.ended);
  const rightAudioLocked = !adminMode && !leftAudioComplete;
  const missingAudioLabels = [
    leftAudioSegmentIds.length > 0 && !leftAudioComplete ? "Script A" : "",
    rightAudioSegmentIds.length > 0 && !rightAudioComplete ? "Script B" : "",
  ].filter(Boolean);
  const audioListeningComplete = adminMode || missingAudioLabels.length === 0;
  const audioInstruction = adminMode
    ? "Admin mode: audio completion is not required."
    : "Complete Script A first. Script B unlocks after Script A is complete, and the full script text appears after each script finishes.";
  const canContinue = adminMode
    ? !isSubmitting
    : Boolean(
        choice &&
          ratingsComplete &&
          audioListeningComplete &&
          scenarioReviewComplete &&
          readingComplete &&
          (!attentionCheck || attentionCheckAnswer) &&
          !isSubmitting,
      );
  const canGoBack = trialIndex > 0 && !isSubmitting;
  const footerStatus = postingError
    || (isSubmitting
      ? "Saving..."
      : adminMode
        ? "Admin mode: Continue saves partial responses before advancing."
        : readingComplete
          ? audioListeningComplete
            ? "Response saves after each trial."
            : rightAudioLocked
              ? "Please listen to Script A all the way through to unlock Script B."
              : `Please listen to ${missingAudioLabels.join(" and ")} all the way through before continuing.`
          : `Please spend at least 45 seconds reviewing both scripts. Continue unlocks in ${formatCountdown(
            readingSecondsRemaining,
          )}.`);

  useEffect(() => {
    if (trialIndex >= assignment.trials.length) return;

    if (currentTrialResponse) {
      const restoredMetrics = audioMetricsFromResponse(currentTrialResponse);
      setChoice(currentTrialResponse.choice);
      setScriptRatings(scriptRatingsFromResponse(currentTrialResponse));
      setAttentionCheckAnswer(currentTrialResponse.attentionCheckAnswer ?? "");
      setAudioMetrics(restoredMetrics);
      setAudioStepBySide({
        left: stepFromMetrics(leftAudioSegmentIds, restoredMetrics.left),
        right: stepFromMetrics(rightAudioSegmentIds, restoredMetrics.right),
      });
      setStartedAt(currentTrialResponse.startedAt || new Date().toISOString());
    } else {
      setChoice("");
      setScriptRatings(emptyScriptRatings());
      setAttentionCheckAnswer("");
      setAudioMetrics(emptyAudioMetrics());
      setAudioStepBySide({ left: 0, right: 0 });
      setStartedAt(new Date().toISOString());
    }
    setPostingError("");
  }, [assignment.trials.length, currentTrialResponse, leftAudioSegmentIds, rightAudioSegmentIds, trialIndex]);

  useEffect(() => {
    if (adminMode || trialIndex >= assignment.trials.length || currentTrialResponse) {
      setScenarioReviewGate({ trialIndex, secondsRemaining: 0 });
      return;
    }

    const unlockAt = Date.now() + minimumScenarioReviewSeconds * 1000;
    setScenarioReviewGate({ trialIndex, secondsRemaining: minimumScenarioReviewSeconds });

    const intervalId = window.setInterval(() => {
      const secondsRemaining = Math.max(0, Math.ceil((unlockAt - Date.now()) / 1000));
      setScenarioReviewGate((current) =>
        current.trialIndex === trialIndex ? { ...current, secondsRemaining } : current,
      );

      if (secondsRemaining === 0) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [adminMode, assignment.trials.length, currentTrialResponse, trialIndex]);

  useEffect(() => {
    if (adminMode || trialIndex >= assignment.trials.length || currentTrialResponse) {
      setReadingSecondsRemaining(0);
      return;
    }

    if (!scenarioReviewComplete) {
      setReadingSecondsRemaining(minimumComparisonSeconds);
      return;
    }

    const unlockAt = Date.now() + minimumComparisonSeconds * 1000;
    setReadingSecondsRemaining(minimumComparisonSeconds);

    const intervalId = window.setInterval(() => {
      const secondsRemaining = Math.max(0, Math.ceil((unlockAt - Date.now()) / 1000));
      setReadingSecondsRemaining(secondsRemaining);

      if (secondsRemaining === 0) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [adminMode, assignment.trials.length, currentTrialResponse, scenarioReviewComplete, trialIndex]);

  useEffect(() => {
    if (!complete || !returnUrl) return;
    const timeoutId = window.setTimeout(() => {
      window.location.assign(returnUrl);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [complete]);

  function updateAudioMetrics(side: AudioSide, updater: (current: AudioMetrics) => AudioMetrics) {
    setAudioMetrics((current) => ({ ...current, [side]: updater(current[side]) }));
  }

  function recordAudioPlay(side: AudioSide, segmentId: AudioSegmentId) {
    updateAudioMetrics(side, (current) => {
      const segment = current.segmentProgress[segmentId] ?? {
        playCount: 0,
        maxPositionSeconds: 0,
        ended: false,
      };
      return {
        ...current,
        playCount: current.playCount + 1,
        segmentProgress: {
          ...current.segmentProgress,
          [segmentId]: { ...segment, playCount: segment.playCount + 1 },
        },
      };
    });
  }

  function recordAudioPosition(side: AudioSide, segmentId: AudioSegmentId, event: SyntheticEvent<HTMLAudioElement>) {
    const audio = event.currentTarget;
    const currentTime = roundedAudioSeconds(audio.currentTime);
    const continuousTime = continuousPlayedSeconds(audio);

    if (!adminMode && currentTime > continuousTime + audioSeekToleranceSeconds) {
      audio.currentTime = continuousTime;
      return;
    }

    updateAudioMetrics(side, (current) => {
      const segment = current.segmentProgress[segmentId] ?? {
        playCount: 0,
        maxPositionSeconds: 0,
        ended: false,
      };
      const maxPositionSeconds = Math.max(current.maxPositionSeconds, currentTime, continuousTime);
      return {
        ...current,
        maxPositionSeconds,
        segmentProgress: {
          ...current.segmentProgress,
          [segmentId]: {
            ...segment,
            maxPositionSeconds: Math.max(segment.maxPositionSeconds, currentTime, continuousTime),
          },
        },
      };
    });
  }

  function recordAudioEnded(side: AudioSide, segmentId: AudioSegmentId, event: SyntheticEvent<HTMLAudioElement>) {
    const audio = event.currentTarget;
    const currentTime = roundedAudioSeconds(audio.currentTime);
    const continuousTime = continuousPlayedSeconds(audio);
    const duration = roundedAudioSeconds(audio.duration);
    const durationForMetrics = Number.isFinite(duration) ? duration : currentTime;
    const listenedThrough =
      adminMode ||
      (Number.isFinite(duration) && continuousTime >= Math.max(0, duration - audioCompletionToleranceSeconds));

    if (!listenedThrough) {
      audio.currentTime = continuousTime;
      return;
    }

    updateAudioMetrics(side, (current) => {
      const segment = current.segmentProgress[segmentId] ?? {
        playCount: 0,
        maxPositionSeconds: 0,
        ended: false,
      };
      const maxPositionSeconds = Math.max(
        current.maxPositionSeconds,
        currentTime,
        continuousTime,
        durationForMetrics,
      );
      return {
        ...current,
        ended: true,
        maxPositionSeconds,
        segmentProgress: {
          ...current.segmentProgress,
          [segmentId]: {
            ...segment,
            ended: true,
            maxPositionSeconds: Math.max(segment.maxPositionSeconds, currentTime, continuousTime, durationForMetrics),
          },
        },
      };
    });

  }

  function preventAudioSeekAhead(
    side: AudioSide,
    segmentId: AudioSegmentId,
    event: SyntheticEvent<HTMLAudioElement>,
  ) {
    if (adminMode) return;
    const audio = event.currentTarget;
    const currentTime = roundedAudioSeconds(audio.currentTime);
    const segment = audioMetrics[side].segmentProgress[segmentId];
    const continuousTime = Math.max(continuousPlayedSeconds(audio), segment?.maxPositionSeconds ?? 0);
    if (currentTime <= continuousTime + audioSeekToleranceSeconds) return;
    audio.currentTime = continuousTime;
  }

  function advanceAudioSegment(side: AudioSide, segmentIds: AudioSegmentId[]) {
    setAudioStepBySide((current) => ({
      ...current,
      [side]: Math.min(current[side] + 1, Math.max(0, segmentIds.length - 1)),
    }));
  }

  function markAudioSegmentComplete(side: AudioSide, segmentId: AudioSegmentId) {
    updateAudioMetrics(side, (current) => {
      const segment = current.segmentProgress[segmentId] ?? {
        playCount: 0,
        maxPositionSeconds: 0,
        ended: false,
      };
      return {
        ...current,
        ended: true,
        segmentProgress: {
          ...current.segmentProgress,
          [segmentId]: {
            ...segment,
            ended: true,
          },
        },
      };
    });
  }

  function continueAudioSegment(
    side: AudioSide,
    segmentId: AudioSegmentId,
    segmentIds: AudioSegmentId[],
    isFinalSegment: boolean,
  ) {
    if (adminMode) {
      markAudioSegmentComplete(side, segmentId);
    }
    if (!isFinalSegment) {
      advanceAudioSegment(side, segmentIds);
    }
  }

  function renderScriptBody({
    label,
    script,
    segmentIds,
    segments,
    side,
    textSegments,
  }: {
    label: "Script A" | "Script B";
    script: string;
    segmentIds: AudioSegmentId[];
    segments: AudioSegmentMap;
    side: AudioSide;
    textSegments: AudioSegmentMap;
  }) {
    const sideMetrics = audioMetrics[side];
    const sideComplete =
      segmentIds.length === 0 ||
      segmentIds.every((segmentId) => sideMetrics.segmentProgress[segmentId]?.ended);

    if (sideComplete) {
      return <div className="script-copy">{script}</div>;
    }

    const stepIndex = Math.min(audioStepBySide[side], Math.max(0, segmentIds.length - 1));
    const segmentId = segmentIds[stepIndex];
    const audioPath = segments[segmentId] ?? "";
    const segmentText = textSegments[segmentId] || script;
    const segmentEnded = Boolean(sideMetrics.segmentProgress[segmentId]?.ended);
    const isFinalSegment = stepIndex >= segmentIds.length - 1;
    const canAdvanceSegment = adminMode || segmentEnded;
    const nextButtonText = isFinalSegment ? "Show full script" : "Continue";

    return (
      <div className="script-audio-flow">
        <div className="audio-step-header">
          <span>{label}</span>
          <strong>
            Part {stepIndex + 1} of {segmentIds.length}: {audioSegmentLabels[segmentId]}
          </strong>
        </div>
        <audio
          aria-label={`Listen to ${label} ${audioSegmentLabels[segmentId]}`}
          className="script-audio"
          controls
          key={`${trial.scenarioId}:${side}:${segmentId}:${audioPath}`}
          onEnded={(event) => recordAudioEnded(side, segmentId, event)}
          onPlay={() => recordAudioPlay(side, segmentId)}
          onSeeking={(event) => preventAudioSeekAhead(side, segmentId, event)}
          onTimeUpdate={(event) => recordAudioPosition(side, segmentId, event)}
          preload="none"
          src={audioPath}
        />
        <div className="script-segment-copy">{segmentText}</div>
        {isFinalSegment && !adminMode ? (
          <p>Listen to the final part all the way through. The complete script text will appear afterward.</p>
        ) : null}
        {!isFinalSegment || adminMode ? (
          <button
            className="secondary-button audio-next-button"
            disabled={!canAdvanceSegment}
            onClick={() => continueAudioSegment(side, segmentId, segmentIds, isFinalSegment)}
            type="button"
          >
            {nextButtonText}
          </button>
        ) : null}
      </div>
    );
  }

  function renderLockedScriptBody(label: "Script B") {
    return (
      <div className="script-locked-body">
        <div className="script-lock-icon" aria-hidden="true">
          B
        </div>
        <h3>{label} locked</h3>
        <p>Finish all Script A audio parts to unlock this audio set.</p>
      </div>
    );
  }

  function setScriptRating(side: AudioSide, measureId: ScriptMeasureId, rating: number) {
    setScriptRatings((current) => ({
      ...current,
      [side]: {
        ...current[side],
        [measureId]: rating,
      },
    }));
  }

  function renderScriptRatings(side: AudioSide, label: "Script A" | "Script B") {
    const sideRatings = scriptRatings[side];

    return (
      <div className="script-rating-card" aria-label={`Rate ${label}`}>
        <h3>{label}</h3>
        {scriptMeasures.map((measure) => (
          <div className="rating-field" key={`${side}-${measure.id}`} role="group" aria-label={`${label} ${measure.label}`}>
            <span>{measure.label}</span>
            <div className="rating-buttons">
              {ratingScale.map((rating) => (
                <button
                  key={rating}
                  className={sideRatings[measure.id] === rating ? "rating-button selected" : "rating-button"}
                  onClick={() => setScriptRating(side, measure.id, rating)}
                  type="button"
                >
                  {rating}
                </button>
              ))}
            </div>
            <small>
              1 = {measure.lowAnchor}; 10 = {measure.highAnchor}
            </small>
          </div>
        ))}
      </div>
    );
  }

  function resetTrialStateAndAdvance() {
    setChoice("");
    setScriptRatings(emptyScriptRatings());
    setAttentionCheckAnswer("");
    setAudioMetrics(emptyAudioMetrics());
    setStartedAt(new Date().toISOString());
    setTrialIndex((current) => Math.min(current + 1, assignment.trials.length));
  }

  async function submit() {
    if (submittingRef.current || !canContinue) return;
    if (!adminMode && (!ratingsComplete || !choice)) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    const now = new Date().toISOString();
    const ratingForResponse = (value: number | null) => (adminMode ? value : requiredRating(value));
    const response: TrialResponse = {
      responseId: `${participantId}:${assignment.assignmentId}:${trial.trialIndex}`,
      participantId,
      assignmentId: assignment.assignmentId,
      trialIndex: trial.trialIndex,
      scenarioId: scenario.id,
      leftCondition: trial.leftCondition,
      rightCondition: trial.rightCondition,
      leftAudioAvailable: leftAudioSegmentIds.length > 0,
      rightAudioAvailable: rightAudioSegmentIds.length > 0,
      leftAudioPath: JSON.stringify(leftAudioSegments),
      rightAudioPath: JSON.stringify(rightAudioSegments),
      leftAudioPlayCount: audioMetrics.left.playCount,
      rightAudioPlayCount: audioMetrics.right.playCount,
      leftAudioMaxPositionSeconds: audioMetrics.left.maxPositionSeconds,
      rightAudioMaxPositionSeconds: audioMetrics.right.maxPositionSeconds,
      leftAudioEnded: leftAudioComplete,
      rightAudioEnded: rightAudioComplete,
      leftAudioSegmentProgress: JSON.stringify(audioMetrics.left.segmentProgress),
      rightAudioSegmentProgress: JSON.stringify(audioMetrics.right.segmentProgress),
      choice,
      leftBodyStateRating: ratingForResponse(scriptRatings.left.bodyState),
      rightBodyStateRating: ratingForResponse(scriptRatings.right.bodyState),
      leftTaskGoalRating: ratingForResponse(scriptRatings.left.taskGoal),
      rightTaskGoalRating: ratingForResponse(scriptRatings.right.taskGoal),
      leftValueConnectionRating: ratingForResponse(scriptRatings.left.valueConnection),
      rightValueConnectionRating: ratingForResponse(scriptRatings.right.valueConnection),
      leftEaseRating: ratingForResponse(scriptRatings.left.ease),
      rightEaseRating: ratingForResponse(scriptRatings.right.ease),
      leftRating: ratingForResponse(leftRating),
      rightRating: ratingForResponse(rightRating),
      improvement: "",
      ...(attentionCheck
        ? {
            attentionCheckId: attentionCheck.id,
            attentionCheckKind: attentionCheck.kind,
            attentionCheckPrompt: attentionCheck.prompt,
            attentionCheckAnswer,
            attentionCheckCorrectAnswer: attentionCheck.correctAnswer,
            attentionCheckPassed: attentionCheckAnswer
              ? attentionCheckAnswer === attentionCheck.correctAnswer
              : null,
          }
        : {}),
      startedAt,
      submittedAt: now,
      elapsedMs: Date.now() - new Date(startedAt).getTime(),
      userAgent: navigator.userAgent,
    };

    const nextResponses = storeResponse(response);
    setResponses(nextResponses);

    try {
      try {
        await postResponse(response);
        setPostingError("");
      } catch {
        setPostingError("Saved locally. Network post failed.");
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }

    resetTrialStateAndAdvance();
  }

  function goBack() {
    if (!canGoBack) return;
    setTrialIndex((current) => Math.max(current - 1, 0));
  }

  async function skipToFinalStep() {
    setPostingError("");
    if (adminMode && trialIndex < assignment.trials.length) {
      await submit();
    }
    setTrialIndex(assignment.trials.length);
  }

  if (comparisonComplete && !questionnaire) {
    return (
      <QuestionnaireForm
        adminMode={adminMode}
        assignmentId={assignment.assignmentId}
        initialAnswers={questionnaireDraft}
        onBack={() => setTrialIndex(assignment.trials.length - 1)}
        onDraftChange={setQuestionnaireDraft}
        participantId={participantId}
        onSubmitted={setQuestionnaire}
      />
    );
  }

  if (complete) {
    return (
      <main className="app-shell thank-you-shell">
        <section className="complete-panel thank-you-panel">
          <h1>Thank you.</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="study-header">
        <div>
          <p className="overline">Mental rehearsal comparison</p>
          <h1>Choose the script that would better help you prepare.</h1>
        </div>
        <div className="progress-block" aria-label={`Progress ${trialIndex + 1} of ${assignment.trials.length}`}>
          <span>
            {trialIndex + 1} / {assignment.trials.length}
          </span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </header>

      <section className="context-band" aria-label="Scenario context">
        <div className="profile-summary">
          <p className="context-label">
            {scenario.profileName} - {scenario.scope === "daily" ? "Daily scenario" : "Task scenario"}
          </p>
          <h2>{scenario.contextTitle}</h2>
          <p>{scenario.profileSummary}</p>
          <dl className="profile-meta">
            <div>
              <dt>Age</dt>
              <dd>{scenario.age}</dd>
            </div>
            <div>
              <dt>Gender</dt>
              <dd>{scenario.gender}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{scenario.industry}</dd>
            </div>
          </dl>
        </div>
        <div className="context-grid">
          <div>
            <span>Life priority</span>
            <p>{scenario.lifePriority}</p>
          </div>
          <div>
            <span>Values</span>
            <p>{scenario.values.join(", ")}</p>
          </div>
          <div>
            <span>Energy background</span>
            <p>{scenario.bodyState}</p>
          </div>
          {scenario.scope === "task" ? (
            <div className="task-context-row">
              <ScenarioFocusCues scenario={scenario} />
              <ScenarioTaskSummary scenario={scenario} />
            </div>
          ) : (
            <>
              <ScenarioFocusCues scenario={scenario} />
              <ScenarioTaskSummary scenario={scenario} />
            </>
          )}
        </div>
      </section>

      {!scenarioReviewComplete ? (
        <section className="scenario-review-gate" aria-live="polite" aria-label="Scenario review timer">
          <p className="overline">Review scenario</p>
          <h2>Scripts unlock in {formatCountdown(scenarioSecondsRemaining)}.</h2>
          <p>Take a moment to read the scenario before listening to the scripts.</p>
        </section>
      ) : (
        <>
          <section className="script-grid" aria-label="Script comparison">
            <p className="script-choice-instruction">
              Choose either Script A or Script B. You will still rate both scripts before continuing.
            </p>
            <p className="audio-requirement">{audioInstruction}</p>

            <article className={`script-panel ${choice === "left" ? "selected" : ""}`}>
              <div className="script-heading">
                <h2>Script A</h2>
                {debugMode || adminMode ? (
                  <span title={`${leftScriptMeta.source} / ${leftScriptMeta.model}`}>
                    {trial.leftCondition}
                  </span>
                ) : null}
              </div>
              {renderScriptBody({
                label: "Script A",
                script: leftScript,
                segmentIds: leftAudioSegmentIds,
                segments: leftAudioSegments,
                side: "left",
                textSegments: leftTextSegments,
              })}
              <button
                className="choice-button"
                disabled={!adminMode && !leftAudioComplete}
                onClick={() => setChoice("left")}
                type="button"
              >
                {leftAudioComplete || adminMode ? "Choose Script A" : "Finish Script A audio first"}
              </button>
            </article>

            <article
              aria-disabled={rightAudioLocked}
              className={`script-panel ${choice === "right" ? "selected" : ""} ${rightAudioLocked ? "locked" : ""}`}
            >
              <div className="script-heading">
                <h2>Script B</h2>
                {debugMode || adminMode ? (
                  <span title={`${rightScriptMeta.source} / ${rightScriptMeta.model}`}>
                    {trial.rightCondition}
                  </span>
                ) : null}
              </div>
              {rightAudioLocked
                ? renderLockedScriptBody("Script B")
                : renderScriptBody({
                    label: "Script B",
                    script: rightScript,
                    segmentIds: rightAudioSegmentIds,
                    segments: rightAudioSegments,
                    side: "right",
                    textSegments: rightTextSegments,
                  })}
              <button
                className="choice-button"
                disabled={!adminMode && (rightAudioLocked || !rightAudioComplete)}
                onClick={() => setChoice("right")}
                type="button"
              >
                {rightAudioComplete || adminMode
                  ? "Choose Script B"
                  : rightAudioLocked
                    ? "Finish Script A to unlock Script B"
                    : "Finish Script B audio first"}
              </button>
            </article>
          </section>

          <section className="response-panel" aria-label="Response">
        <div className="question-block">
          <h2>Which script would better help this person prepare for the day?</h2>
          <p>Choose either Script A or Script B, then rate both scripts on each measure before continuing.</p>
        </div>

        {renderScriptRatings("left", "Script A")}
        {renderScriptRatings("right", "Script B")}

        {attentionCheck ? (
          <fieldset className="attention-check">
            <legend>{attentionCheck.prompt}</legend>
            <div className="attention-options">
              {attentionCheck.options.map((option) => (
                <label
                  className={
                    attentionCheckAnswer === option.label
                      ? "attention-option selected"
                      : "attention-option"
                  }
                  key={option.id}
                >
                  <input
                    checked={attentionCheckAnswer === option.label}
                    name={`attention-check-${attentionCheck.id}`}
                    onChange={() => setAttentionCheckAnswer(option.label)}
                    type="radio"
                    value={option.label}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="footer-actions">
          <p className={readingComplete || postingError || isSubmitting ? "" : "reading-gate"}>
            {footerStatus}
          </p>
          <div className="nav-actions">
            {adminMode ? (
              <button className="secondary-button" disabled={isSubmitting} onClick={skipToFinalStep} type="button">
                Skip to final step
              </button>
            ) : null}
            <button className="secondary-button" disabled={!canGoBack} onClick={goBack} type="button">
              Back
            </button>
            <button className="primary-button" disabled={!canContinue} onClick={submit}>
              {isSubmitting
                ? "Saving..."
                : readingComplete
                  ? "Continue"
                  : `Continue in ${formatCountdown(readingSecondsRemaining)}`}
            </button>
          </div>
        </div>
          </section>
        </>
      )}
    </main>
  );
}

function QuestionnaireForm({
  adminMode,
  assignmentId,
  initialAnswers,
  onBack,
  onDraftChange,
  participantId,
  onSubmitted,
}: {
  adminMode: boolean;
  assignmentId: number;
  initialAnswers: QuestionnaireAnswers;
  onBack: () => void;
  onDraftChange: (answers: QuestionnaireAnswers) => void;
  participantId: string;
  onSubmitted: (response: QuestionnaireResponse) => void;
}) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);
  const [startedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggedRankingValue, setDraggedRankingValue] = useState<string | null>(null);
  const submittingRef = useRef(false);

  function isQuestionAnswered(question: QuestionnaireQuestion) {
    const selected = answers[question.id];
    const mode = question.mode ?? "single";

    if (mode === "range") return Boolean(selected);

    if (mode === "ranking") {
      return rankingSlotsForQuestion(question, selected).every(Boolean);
    }

    if (mode === "multiple") {
      const selectedValues = selectedValuesFromAnswer(selected);
      return (
        selectedValues.length > 0 &&
        (!selectedValues.includes("other") || Boolean(answers[question.otherId].trim()))
      );
    }

    return Boolean(selected) && (selected !== "other" || Boolean(answers[question.otherId].trim()));
  }

  const questionnaireComplete =
    questionnaireQuestions.every(isQuestionAnswered) &&
    Boolean(answers.idealMorningGuidance.trim());
  const canSubmit = (adminMode || questionnaireComplete) && !isSubmitting;

  useEffect(() => {
    onDraftChange(answers);
  }, [answers, onDraftChange]);

  function setAnswer(questionId: QuestionnaireChoiceId, value: string) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function setRangeAnswer(questionId: QuestionnaireChoiceId, bound: "lower" | "upper", value: string) {
    const minutes = Number.parseInt(value, 10);
    const normalizedMinutes = Number.isFinite(minutes)
      ? clampScriptLengthMinutes(minutes)
      : bound === "lower"
        ? defaultScriptLengthRange.lower
        : defaultScriptLengthRange.upper;

    setAnswers((current) => ({
      ...current,
      [questionId]: (() => {
        const currentRange = scriptLengthRangeFromAnswer(current[questionId]);
        const nextRange =
          bound === "lower"
            ? {
                lower: Math.min(normalizedMinutes, currentRange.upper),
                upper: currentRange.upper,
              }
            : {
                lower: currentRange.lower,
                upper: Math.max(normalizedMinutes, currentRange.lower),
              };

        return scriptLengthAnswerFromRange(nextRange.lower, nextRange.upper);
      })(),
    }));
  }

  function toggleMultipleAnswer(question: QuestionnaireQuestion, value: string) {
    setAnswers((current) => {
      const selectedValues = selectedValuesFromAnswer(current[question.id]);
      const nextValues = selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value];

      return {
        ...current,
        [question.id]: answerFromSelectedValues(nextValues),
        ...(value === "other" && selectedValues.includes("other") ? { [question.otherId]: "" } : {}),
      };
    });
  }

  function placeRankingAnswer(question: QuestionnaireQuestion, value: string, targetIndex: number) {
    setAnswers((current) => {
      const optionValues = (question.options ?? []).map((option) => option.value);
      if (!optionValues.includes(value) || targetIndex < 0 || targetIndex >= optionValues.length) return current;

      const nextSlots = rankingSlotsForQuestion(question, current[question.id]);
      const sourceIndex = nextSlots.indexOf(value);
      const replacedValue = nextSlots[targetIndex];

      if (sourceIndex === targetIndex) return current;

      if (sourceIndex >= 0) {
        nextSlots[sourceIndex] = replacedValue && replacedValue !== value ? replacedValue : "";
      }
      nextSlots[targetIndex] = value;

      return {
        ...current,
        [question.id]: answerFromRankingSlots(nextSlots),
      };
    });
  }

  function addRankingAnswer(question: QuestionnaireQuestion, value: string) {
    const slots = rankingSlotsForQuestion(question, answers[question.id]);
    const targetIndex = slots.findIndex((slotValue) => !slotValue);
    if (targetIndex < 0) return;
    placeRankingAnswer(question, value, targetIndex);
  }

  function clearRankingSlot(question: QuestionnaireQuestion, targetIndex: number) {
    setAnswers((current) => {
      const nextSlots = rankingSlotsForQuestion(question, current[question.id]);
      if (targetIndex < 0 || targetIndex >= nextSlots.length) return current;
      nextSlots[targetIndex] = "";

      return {
        ...current,
        [question.id]: answerFromRankingSlots(nextSlots),
      };
    });
  }

  function startRankingDrag(event: DragEvent<HTMLElement>, value: string) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", value);
    setDraggedRankingValue(value);
  }

  function dropRankingAnswer(event: DragEvent<HTMLElement>, question: QuestionnaireQuestion, targetIndex: number) {
    event.preventDefault();
    const value = event.dataTransfer.getData("text/plain") || draggedRankingValue;
    if (value) placeRankingAnswer(question, value, targetIndex);
    setDraggedRankingValue(null);
  }

  function setOtherAnswer(question: QuestionnaireQuestion, value: string) {
    if ((question.mode ?? "single") === "multiple") {
      setAnswers((current) => {
        const selectedValues = selectedValuesFromAnswer(current[question.id]);
        const nextValues = selectedValues.includes("other") ? selectedValues : [...selectedValues, "other"];

        return {
          ...current,
          [question.id]: answerFromSelectedValues(nextValues),
          [question.otherId]: value,
        };
      });
      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: "other",
      [question.otherId]: value,
    }));
  }

  async function submitQuestionnaire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submittingRef.current) return;

    const now = new Date().toISOString();
    const personalizationFocusQuestion = questionnaireQuestions.find((question) => question.id === "personalizationFocus");
    const response: QuestionnaireResponse = {
      ...answers,
      scriptLength: normalizeScriptLengthAnswer(answers.scriptLength),
      perspectivePreferenceOther: answers.perspectivePreferenceOther.trim(),
      guidanceLevelOther: answers.guidanceLevelOther.trim(),
      backgroundAudioOther: answers.backgroundAudioOther.trim(),
      scriptLengthOther: "",
      toneStyleOther: answers.toneStyleOther.trim(),
      personalizationFocus: personalizationFocusQuestion
        && (!adminMode || questionnaireComplete || answers.personalizationFocus)
        ? answerFromSelectedValues(rankingValuesForQuestion(personalizationFocusQuestion, answers.personalizationFocus))
        : answers.personalizationFocus,
      personalizationFocusOther: "",
      deliveryFormatOther: answers.deliveryFormatOther.trim(),
      idealMorningGuidance: answers.idealMorningGuidance.trim(),
      responseId: `${participantId}:${assignmentId}:questionnaire`,
      participantId,
      assignmentId,
      questionnaireVersion,
      startedAt,
      submittedAt: now,
      elapsedMs: Date.now() - new Date(startedAt).getTime(),
      userAgent: navigator.userAgent,
    };

    submittingRef.current = true;
    setIsSubmitting(true);
    storeQuestionnaire(response);

    try {
      await postQuestionnaire(response);
      setPostingError("");
    } catch {
      setPostingError("Saved locally. Network post failed.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
      onSubmitted(response);
    }
  }

  return (
    <main className="app-shell questionnaire-shell">
      <header className="study-header">
        <div>
          <p className="overline">Final personalization questions</p>
          <h1>Tell us how you would want the rehearsal guide designed.</h1>
        </div>
        <div className="progress-block" aria-label="Comparison complete">
          <span>Final step</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "100%" }} />
          </div>
        </div>
      </header>

      <form className="questionnaire-panel" onSubmit={submitQuestionnaire}>
        {questionnaireQuestions.map((question, questionIndex) => {
          const mode = question.mode ?? "single";
          const selectedValues = selectedValuesFromAnswer(answers[question.id]);

          if (mode === "ranking") {
            const rankingSlots = rankingSlotsForQuestion(question, answers[question.id]);
            const rankedValues = rankingSlots.filter(Boolean);
            const unrankedOptions = (question.options ?? []).filter(
              (option) => !rankedValues.includes(option.value),
            );
            const optionsByValue = new Map((question.options ?? []).map((option) => [option.value, option]));

            return (
              <fieldset className="questionnaire-question" key={question.id}>
                <legend>
                  <span>{questionIndex + 1}</span>
                  {question.prompt}
                </legend>
                <div className="ranking-builder">
                  <ol className="ranking-list">
                  {rankingSlots.map((value, rankIndex) => {
                    const option = optionsByValue.get(value);

                    return (
                      <li
                        className={option ? "ranking-slot filled" : "ranking-slot"}
                        key={`${question.id}-slot-${rankIndex}`}
                        onDragOver={(event) => {
                          event.preventDefault();
                          event.dataTransfer.dropEffect = "move";
                        }}
                        onDrop={(event) => dropRankingAnswer(event, question, rankIndex)}
                      >
                        <div className="ranking-rank">{rankIndex + 1}</div>
                        {option ? (
                          <div
                            className={
                              draggedRankingValue === option.value
                                ? "ranking-choice ranking-slot-choice dragging"
                                : "ranking-choice ranking-slot-choice"
                            }
                            draggable
                            onDragEnd={() => setDraggedRankingValue(null)}
                            onDragStart={(event) => startRankingDrag(event, option.value)}
                          >
                            <div>
                              <span>{option.label}</span>
                              <small>{option.description}</small>
                            </div>
                            <button
                              className="ranking-clear-button"
                              onClick={() => clearRankingSlot(question, rankIndex)}
                              type="button"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="ranking-placeholder">Position {rankIndex + 1}</div>
                        )}
                      </li>
                    );
                  })}
                  </ol>

                  {unrankedOptions.length > 0 ? (
                    <div className="ranking-pool" aria-label="Available personalization choices">
                      {unrankedOptions.map((option) => (
                        <button
                          className={
                            draggedRankingValue === option.value
                              ? "ranking-choice ranking-pool-choice dragging"
                              : "ranking-choice ranking-pool-choice"
                          }
                          draggable
                          key={option.value}
                          onClick={() => addRankingAnswer(question, option.value)}
                          onDragEnd={() => setDraggedRankingValue(null)}
                          onDragStart={(event) => startRankingDrag(event, option.value)}
                          type="button"
                        >
                          <div>
                            <span>{option.label}</span>
                            <small>{option.description}</small>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </fieldset>
            );
          }

          if (mode === "range") {
            const rangeValue = scriptLengthRangeFromAnswer(answers[question.id]);
            const rangeStyle = {
              "--range-lower": `${(rangeValue.lower / scriptLengthMax) * 100}%`,
              "--range-upper": `${(rangeValue.upper / scriptLengthMax) * 100}%`,
            } as CSSProperties;

            return (
              <fieldset className="questionnaire-question" key={question.id}>
                <legend>
                  <span>{questionIndex + 1}</span>
                  {question.prompt}
                </legend>
                <div className="range-response">
                  <div className="range-value">{formatScriptLengthRangeAnswer(answers[question.id])}</div>
                  <div className="range-slider-stack" style={rangeStyle}>
                    <input
                      aria-label="Minimum rehearsal length minutes"
                      className="range-slider range-slider-lower"
                      max={scriptLengthMax}
                      min={scriptLengthMin}
                      onChange={(event) => setRangeAnswer(question.id, "lower", event.currentTarget.value)}
                      type="range"
                      value={rangeValue.lower}
                    />
                    <input
                      aria-label="Maximum rehearsal length minutes"
                      className="range-slider range-slider-upper"
                      max={scriptLengthMax}
                      min={scriptLengthMin}
                      onChange={(event) => setRangeAnswer(question.id, "upper", event.currentTarget.value)}
                      type="range"
                      value={rangeValue.upper}
                    />
                  </div>
                  <div className="range-scale">
                    <span>0 min</span>
                    <span>{scriptLengthMax}+ min</span>
                  </div>
                  <div className="range-number-fields">
                    <label className="range-number-field">
                      <span>Minimum</span>
                      <input
                        aria-label="Minimum rehearsal length minutes"
                        max={rangeValue.upper}
                        min={scriptLengthMin}
                        onChange={(event) => setRangeAnswer(question.id, "lower", event.currentTarget.value)}
                        type="number"
                        value={rangeValue.lower}
                      />
                    </label>
                    <label className="range-number-field">
                      <span>Maximum</span>
                      <input
                        aria-label="Maximum rehearsal length minutes"
                        max={scriptLengthMax}
                        min={rangeValue.lower}
                        onChange={(event) => setRangeAnswer(question.id, "upper", event.currentTarget.value)}
                        type="number"
                        value={rangeValue.upper}
                      />
                    </label>
                  </div>
                </div>
              </fieldset>
            );
          }

          return (
            <fieldset className="questionnaire-question" key={question.id}>
              <legend>
                <span>{questionIndex + 1}</span>
                {question.prompt}
              </legend>
              <div className="option-grid">
                {(question.options ?? []).map((option) => {
                  const optionId = `${question.id}-${option.value}`;
                  const selected =
                    mode === "multiple"
                      ? selectedValues.includes(option.value)
                      : answers[question.id] === option.value;
                  return (
                    <label
                      className={selected ? "option-choice selected" : "option-choice"}
                      htmlFor={optionId}
                      key={option.value}
                    >
                      <input
                        checked={selected}
                        id={optionId}
                        name={question.id}
                        onChange={() =>
                          mode === "multiple"
                            ? toggleMultipleAnswer(question, option.value)
                            : setAnswer(question.id, option.value)
                        }
                        type={mode === "multiple" ? "checkbox" : "radio"}
                        value={option.value}
                      />
                      <span>{option.label}</span>
                      <small>{option.description}</small>
                    </label>
                  );
                })}
                <label
                  className={
                    (mode === "multiple" ? selectedValues.includes("other") : answers[question.id] === "other")
                      ? "option-choice free-text-option selected"
                      : "option-choice free-text-option"
                  }
                  htmlFor={`${question.id}-other`}
                >
                  <input
                    checked={mode === "multiple" ? selectedValues.includes("other") : answers[question.id] === "other"}
                    id={`${question.id}-other`}
                    name={question.id}
                    onChange={() =>
                      mode === "multiple" ? toggleMultipleAnswer(question, "other") : setAnswer(question.id, "other")
                    }
                    type={mode === "multiple" ? "checkbox" : "radio"}
                    value="other"
                  />
                  <span>Other / free response</span>
                  <textarea
                    aria-label={`${question.prompt} other response`}
                    onChange={(event) => setOtherAnswer(question, event.target.value)}
                    onFocus={() =>
                      mode === "multiple" ? setOtherAnswer(question, answers[question.otherId]) : setAnswer(question.id, "other")
                    }
                    placeholder="Type your preference"
                    rows={2}
                    value={answers[question.otherId]}
                  />
                </label>
              </div>
            </fieldset>
          );
        })}

        <fieldset className="questionnaire-question">
          <legend>
            <span>{questionnaireQuestions.length + 1}</span>
            What is your ideal mental rehearsal guidance to start your day?
          </legend>
          <label className="long-text-response">
            <span>Your ideal guidance</span>
            <textarea
              onChange={(event) =>
                setAnswers((current) => ({
                  ...current,
                  idealMorningGuidance: event.target.value,
                }))
              }
              placeholder="Describe what would feel most useful before your day begins"
              rows={4}
              value={answers.idealMorningGuidance}
            />
          </label>
        </fieldset>

        <div className="footer-actions">
          <p>{postingError || (isSubmitting ? "Saving..." : "Questionnaire saves when submitted.")}</p>
          <div className="nav-actions">
            <button className="secondary-button" disabled={isSubmitting} onClick={onBack} type="button">
              Back
            </button>
            <button className="primary-button" disabled={!canSubmit} type="submit">
              {isSubmitting ? "Saving..." : "Submit final questions"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

function ScenarioFocusCues({ scenario }: { scenario: Scenario }) {
  if (!scenario.focusCues.length) return null;

  return (
    <div className={scenario.scope === "task" ? "focus-cues-card compact" : "focus-cues-card"}>
      <span>Focus cues</span>
      <ul className="focus-cue-list">
        {scenario.focusCues.map((cue, index) => (
          <li key={`${cue}-${index}`}>{cue}</li>
        ))}
      </ul>
    </div>
  );
}

function ScenarioTaskSummary({ scenario }: { scenario: Scenario }) {
  if (scenario.scope === "task" && scenario.focusTask) {
    return (
      <div className="focus-task-card">
        <span>Focus task</span>
        <p className="focus-task-title">
          {scenario.focusTask.title}{" "}
          <small>
            {scenario.focusTask.scheduledStart && scenario.focusTask.scheduledEnd
              ? `${scenario.focusTask.scheduledStart}-${scenario.focusTask.scheduledEnd}, `
              : ""}
            {scenario.focusTask.durationMinutes} min
          </small>
        </p>
        {scenario.focusTask.projectTitle ? <p className="task-project">{scenario.focusTask.projectTitle}</p> : null}
        {scenario.focusSubtasks?.length ? (
          <ol>
            {scenario.focusSubtasks.map((subtask) => (
              <li key={subtask.order}>
                {subtask.title} {subtask.durationMinutes ? <small>{subtask.durationMinutes} min</small> : null}
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    );
  }

  return (
    <div className="day-schedule-card">
      <span>Day schedule</span>
      <ol className="day-schedule-list">
        {scenario.daySchedule.map((item) => {
          const topPriorityRank = scenario.topTasks.find(
            (task) =>
              task.title === item.title &&
              task.scheduledStart === item.scheduledStart &&
              task.scheduledEnd === item.scheduledEnd,
          )?.rank;

          return (
            <li className={topPriorityRank ? "ranked-schedule-item" : ""} key={item.eventId}>
              <div className="schedule-item-heading">
                {topPriorityRank ? (
                  <span className="schedule-rank-badge" aria-label={`Top priority ${topPriorityRank}`}>
                    {topPriorityRank}
                  </span>
                ) : null}
                <div>
                  <strong>{item.title}</strong>
                  <small>
                    {item.scheduledStart}-{item.scheduledEnd}, {item.durationMinutes} min
                  </small>
                </div>
              </div>
              {item.note ? <p>{item.note}</p> : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
