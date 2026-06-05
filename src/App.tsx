import { useEffect, useMemo, useRef, useState, type CSSProperties, type ChangeEvent, type FormEvent } from "react";
import { getScenario, scenarios } from "./data/scenarios";
import { scriptForCondition, scriptMetadataForCondition } from "./data/scripts";
import { assignmentIdFromParams, assignmentSlotCount, buildAssignment, hashString } from "./lib/assignment";
import {
  postQuestionnaire,
  postResponse,
  readStoredQuestionnaire,
  readStoredResponses,
  storeQuestionnaire,
  storeResponse,
} from "./lib/responses";
import type { QuestionnaireAnswers, QuestionnaireResponse, Scenario, TrialResponse } from "./types";

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
const minimumImprovementWords = 3;
const adminModePassword = "mrmrmr";
const questionnaireVersion = "personalization-v3";
const attentionCheckTrialIndexes = [1, 4];
const attentionCheckTrialIndexSet = new Set(attentionCheckTrialIndexes);
const attentionCheckKinds = ["task", "values", "energy"] as const;
const lastAdminAssignmentStorageKey = "mra-last-admin-assignment-id";

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

const seededOptions = (options: AttentionCheckOption[], seed: string) =>
  [...options].sort((first, second) => {
    const firstHash = hashString(`${seed}:${first.id}`);
    const secondHash = hashString(`${seed}:${second.id}`);
    return firstHash - secondHash || first.label.localeCompare(second.label);
  });

const attentionCheckLabel = (scenario: Scenario, kind: AttentionCheckKind) => {
  switch (kind) {
    case "task":
      return scenario.contextTitle;
    case "values":
      return scenario.values.slice(0, 3).join(", ");
    case "energy":
      return scenario.bodyState;
  }
};

const attentionCheckPrompt = (kind: AttentionCheckKind) => {
  switch (kind) {
    case "task":
      return "Quick check: what was the scenario mainly about?";
    case "values":
      return "Quick check: which values were listed for this person?";
    case "energy":
      return "Quick check: which energy state was described for this person?";
  }
};

function attentionCheckForTrial(
  assignmentId: number,
  trialIndex: number,
  scenario: Scenario,
): AttentionCheck | null {
  if (!attentionCheckTrialIndexSet.has(trialIndex)) return null;

  const checkIndex = attentionCheckTrialIndexes.indexOf(trialIndex);
  const kind = attentionCheckKinds[(assignmentId + checkIndex) % attentionCheckKinds.length];
  const correctAnswer = attentionCheckLabel(scenario, kind);
  const correctOption = { id: `${scenario.id}:${kind}`, label: correctAnswer };
  const seenLabels = new Set([correctAnswer]);
  const candidateDistractors = seededOptions(
    scenarios.map((item) => ({
      id: `${item.id}:${kind}`,
      label: attentionCheckLabel(item, kind),
    })),
    `${assignmentId}:${trialIndex}:${kind}:attention-distractors`,
  );
  const distractors: AttentionCheckOption[] = [];

  for (const option of candidateDistractors) {
    if (seenLabels.has(option.label)) continue;
    seenLabels.add(option.label);
    distractors.push(option);
    if (distractors.length === 3) break;
  }

  return {
    id: `scenario-${kind}-${trialIndex + 1}`,
    kind,
    prompt: attentionCheckPrompt(kind),
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

const rankingValuesForQuestion = (question: QuestionnaireQuestion, answer: string) => {
  const optionValues = (question.options ?? []).map((option) => option.value);
  const rankedValues = selectedValuesFromAnswer(answer).filter((value) => optionValues.includes(value));
  const missingValues = optionValues.filter((value) => !rankedValues.includes(value));

  return [...rankedValues, ...missingValues];
};

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

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

  function beginStudy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = participantInput.trim();
    if (!trimmed) return;
    setParticipantId(trimmed);
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
            <button className="primary-button" disabled={!participantInput.trim()} type="submit">
              Continue
            </button>
          </form>
        </section>
      </main>
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
                This study compares different styles of mental rehearsal guidance. You will read
                six pairs of rehearsal scripts and choose which script would better help someone
                prepare for their day or an important task.
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
                Each comparison has a 45-second review timer before you can continue, so please take
                time to read both scripts before making your final choice.
              </p>
            </section>
          </div>

          <div className="intro-id">Prolific ID: {participantId}</div>
          <div className="intro-actions">
            <button
              className="secondary-button"
              onClick={() => {
                setParticipantId("");
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

  const activeParticipantId = adminMode && adminParticipantId ? adminParticipantId : participantId;
  const activeAssignmentId = adminMode ? adminAssignmentId : null;

  return (
    <StudyTask
      adminMode={adminMode}
      forcedAssignmentId={activeAssignmentId}
      key={`${activeParticipantId}:${activeAssignmentId ?? "auto"}`}
      participantId={activeParticipantId}
    />
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
  const [leftRating, setLeftRating] = useState<number | null>(null);
  const [rightRating, setRightRating] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [attentionCheckAnswer, setAttentionCheckAnswer] = useState("");
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readingSecondsRemaining, setReadingSecondsRemaining] = useState(
    adminMode ? 0 : minimumComparisonSeconds,
  );
  const submittingRef = useRef(false);

  const comparisonComplete = trialIndex >= assignment.trials.length;
  const complete = questionnaire !== null;
  const trial = assignment.trials[Math.min(trialIndex, assignment.trials.length - 1)];
  const scenario = getScenario(trial.scenarioId);
  const leftScript = scriptForCondition(scenario, trial.leftCondition);
  const rightScript = scriptForCondition(scenario, trial.rightCondition);
  const leftScriptMeta = scriptMetadataForCondition(scenario, trial.leftCondition);
  const rightScriptMeta = scriptMetadataForCondition(scenario, trial.rightCondition);
  const attentionCheck = attentionCheckForTrial(assignment.assignmentId, trialIndex, scenario);
  const progressPercent = Math.round(
    ((Math.min(trialIndex, assignment.trials.length - 1) + 1) / assignment.trials.length) * 100,
  );
  const currentTrialResponse = responses.find((response) => response.trialIndex === trialIndex);
  const readingComplete = readingSecondsRemaining <= 0;
  const chosenScriptLabel = choice === "left" ? "Script A" : choice === "right" ? "Script B" : "the chosen script";
  const improvementWordCount = wordCount(reason);
  const improvementComplete = adminMode || improvementWordCount >= minimumImprovementWords;
  const canContinue = Boolean(
    choice &&
      leftRating !== null &&
      rightRating !== null &&
      improvementComplete &&
      readingComplete &&
      (!attentionCheck || attentionCheckAnswer) &&
      !isSubmitting,
  );
  const canGoBack = trialIndex > 0 && !isSubmitting;
  const footerStatus = postingError
    || (isSubmitting
      ? "Saving..."
      : readingComplete
        ? improvementComplete
          ? "Response saves after each trial."
          : `Please write at least ${minimumImprovementWords} words about how you would improve the chosen script.`
        : `Please spend at least 45 seconds reviewing both scripts. Continue unlocks in ${formatCountdown(
          readingSecondsRemaining,
        )}.`);

  useEffect(() => {
    if (trialIndex >= assignment.trials.length) return;

    if (currentTrialResponse) {
      setChoice(currentTrialResponse.choice);
      setLeftRating(currentTrialResponse.leftRating);
      setRightRating(currentTrialResponse.rightRating);
      setReason(currentTrialResponse.reason);
      setAttentionCheckAnswer(currentTrialResponse.attentionCheckAnswer ?? "");
      setStartedAt(currentTrialResponse.startedAt || new Date().toISOString());
    } else {
      setChoice("");
      setLeftRating(null);
      setRightRating(null);
      setReason("");
      setAttentionCheckAnswer("");
      setStartedAt(new Date().toISOString());
    }
    setPostingError("");
  }, [assignment.trials.length, currentTrialResponse, trialIndex]);

  useEffect(() => {
    if (adminMode || trialIndex >= assignment.trials.length || currentTrialResponse) {
      setReadingSecondsRemaining(0);
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
  }, [adminMode, assignment.trials.length, currentTrialResponse, trialIndex]);

  useEffect(() => {
    if (!complete || !returnUrl) return;
    const timeoutId = window.setTimeout(() => {
      window.location.assign(returnUrl);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [complete]);

  async function submit() {
    if (submittingRef.current || !canContinue || leftRating === null || rightRating === null || !choice) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    const now = new Date().toISOString();
    const response: TrialResponse = {
      responseId: `${participantId}:${assignment.assignmentId}:${trial.trialIndex}`,
      participantId,
      assignmentId: assignment.assignmentId,
      trialIndex: trial.trialIndex,
      scenarioId: scenario.id,
      leftCondition: trial.leftCondition,
      rightCondition: trial.rightCondition,
      choice,
      leftRating,
      rightRating,
      reason,
      ...(attentionCheck
        ? {
            attentionCheckId: attentionCheck.id,
            attentionCheckKind: attentionCheck.kind,
            attentionCheckPrompt: attentionCheck.prompt,
            attentionCheckAnswer,
            attentionCheckCorrectAnswer: attentionCheck.correctAnswer,
            attentionCheckPassed: attentionCheckAnswer === attentionCheck.correctAnswer,
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

    setChoice("");
    setLeftRating(null);
    setRightRating(null);
    setReason("");
    setAttentionCheckAnswer("");
    setStartedAt(new Date().toISOString());
    setTrialIndex((current) => Math.min(current + 1, assignment.trials.length));
  }

  function goBack() {
    if (!canGoBack) return;
    setTrialIndex((current) => Math.max(current - 1, 0));
  }

  function skipToFinalStep() {
    setPostingError("");
    setTrialIndex(assignment.trials.length);
  }

  if (comparisonComplete && !questionnaire) {
    return (
      <QuestionnaireForm
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
            <span>Energy</span>
            <p>{scenario.bodyState}</p>
          </div>
          <ScenarioTaskSummary scenario={scenario} />
        </div>
      </section>

      <section className="script-grid" aria-label="Script comparison">
        <p className="script-choice-instruction">
          Choose either Script A or Script B. You will still rate both scripts before continuing.
        </p>

        <article className={`script-panel ${choice === "left" ? "selected" : ""}`}>
          <div className="script-heading">
            <h2>Script A</h2>
            {debugMode ? (
              <span title={`${leftScriptMeta.source} / ${leftScriptMeta.model}`}>
                {trial.leftCondition}
              </span>
            ) : null}
          </div>
          <div className="script-copy">{leftScript}</div>
          <button className="choice-button" onClick={() => setChoice("left")}>
            Choose Script A
          </button>
        </article>

        <article className={`script-panel ${choice === "right" ? "selected" : ""}`}>
          <div className="script-heading">
            <h2>Script B</h2>
            {debugMode ? (
              <span title={`${rightScriptMeta.source} / ${rightScriptMeta.model}`}>
                {trial.rightCondition}
              </span>
            ) : null}
          </div>
          <div className="script-copy">{rightScript}</div>
          <button className="choice-button" onClick={() => setChoice("right")}>
            Choose Script B
          </button>
        </article>
      </section>

      <section className="response-panel" aria-label="Response">
        <div className="question-block">
          <h2>Which script would better help this person prepare for the day?</h2>
          <p>Choose either Script A or Script B, then rate both scripts before continuing.</p>
        </div>

        <div className="rating-field" role="group" aria-label="Rate Script A">
          <span>Script A rating</span>
          <div className="rating-buttons">
            {ratingScale.map((rating) => (
              <button
                key={rating}
                className={leftRating === rating ? "rating-button selected" : "rating-button"}
                onClick={() => setLeftRating(rating)}
                type="button"
              >
                {rating}
              </button>
            ))}
          </div>
          <small>1 = not helpful, 10 = very helpful</small>
        </div>

        <div className="rating-field" role="group" aria-label="Rate Script B">
          <span>Script B rating</span>
          <div className="rating-buttons">
            {ratingScale.map((rating) => (
              <button
                key={rating}
                className={rightRating === rating ? "rating-button selected" : "rating-button"}
                onClick={() => setRightRating(rating)}
                type="button"
              >
                {rating}
              </button>
            ))}
          </div>
          <small>1 = not helpful, 10 = very helpful</small>
        </div>

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

        <label className="reason-field">
          <span>If you could make {chosenScriptLabel} better, how would you improve it?</span>
          <textarea
            aria-describedby="improvement-note-requirement"
            aria-required={!adminMode}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={3}
          />
          <small id="improvement-note-requirement">
            {adminMode
              ? "Admin mode: no word minimum"
              : `${Math.min(improvementWordCount, minimumImprovementWords)} / ${minimumImprovementWords} words minimum`}
          </small>
        </label>

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
    </main>
  );
}

function QuestionnaireForm({
  assignmentId,
  initialAnswers,
  onBack,
  onDraftChange,
  participantId,
  onSubmitted,
}: {
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
  const submittingRef = useRef(false);

  function isQuestionAnswered(question: QuestionnaireQuestion) {
    const selected = answers[question.id];
    const mode = question.mode ?? "single";

    if (mode === "range") return Boolean(selected);

    if (mode === "ranking") {
      return rankingValuesForQuestion(question, selected).length === (question.options ?? []).length;
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

  const canSubmit =
    questionnaireQuestions.every(isQuestionAnswered) &&
    Boolean(answers.idealMorningGuidance.trim()) &&
    !isSubmitting;

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

  function moveRankingAnswer(question: QuestionnaireQuestion, value: string, direction: -1 | 1) {
    setAnswers((current) => {
      const rankingValues = rankingValuesForQuestion(question, current[question.id]);
      const currentIndex = rankingValues.indexOf(value);
      const nextIndex = currentIndex + direction;

      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= rankingValues.length) return current;

      const nextValues = [...rankingValues];
      [nextValues[currentIndex], nextValues[nextIndex]] = [nextValues[nextIndex], nextValues[currentIndex]];

      return {
        ...current,
        [question.id]: answerFromSelectedValues(nextValues),
      };
    });
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

    submittingRef.current = true;
    setIsSubmitting(true);
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
            const rankingValues = rankingValuesForQuestion(question, answers[question.id]);
            const optionsByValue = new Map((question.options ?? []).map((option) => [option.value, option]));

            return (
              <fieldset className="questionnaire-question" key={question.id}>
                <legend>
                  <span>{questionIndex + 1}</span>
                  {question.prompt}
                </legend>
                <ol className="ranking-list">
                  {rankingValues.map((value, rankIndex) => {
                    const option = optionsByValue.get(value);
                    if (!option) return null;

                    return (
                      <li className="ranking-choice" key={option.value}>
                        <div className="ranking-rank">{rankIndex + 1}</div>
                        <div>
                          <span>{option.label}</span>
                          <small>{option.description}</small>
                        </div>
                        <div className="ranking-controls">
                          <button
                            disabled={rankIndex === 0}
                            onClick={() => moveRankingAnswer(question, option.value, -1)}
                            type="button"
                          >
                            Up
                          </button>
                          <button
                            disabled={rankIndex === rankingValues.length - 1}
                            onClick={() => moveRankingAnswer(question, option.value, 1)}
                            type="button"
                          >
                            Down
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
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

function ScenarioTaskSummary({ scenario }: { scenario: Scenario }) {
  if (scenario.scope === "task" && scenario.focusTask) {
    return (
      <div>
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
