import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { getScenario } from "./data/scenarios";
import { scriptForCondition } from "./data/scripts";
import { assignmentIdFromParams, buildAssignment } from "./lib/assignment";
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
const ratingScale = [1, 2, 3, 4, 5, 6, 7];
const questionnaireVersion = "personalization-v1";

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
  prompt: string;
  options: Array<{
    value: string;
    label: string;
    description: string;
  }>;
};

const questionnaireQuestions: QuestionnaireQuestion[] = [
  {
    id: "perspectivePreference",
    otherId: "perspectivePreferenceOther",
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
    prompt: "What rehearsal length would fit you best?",
    options: [
      {
        value: "under_1_min",
        label: "Under 1 minute",
        description: "Fast reset.",
      },
      {
        value: "1_to_2_min",
        label: "1-2 minutes",
        description: "Short daily guide.",
      },
      {
        value: "3_to_5_min",
        label: "3-5 minutes",
        description: "More immersive practice.",
      },
      {
        value: "varies",
        label: "Depends",
        description: "Length should match the task or day.",
      },
    ],
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
    prompt: "Which personalization would matter most to you?",
    options: [
      {
        value: "schedule_tasks",
        label: "Schedule and tasks",
        description: "Uses the exact plan for the day.",
      },
      {
        value: "energy_mood",
        label: "Energy and mood",
        description: "Matches how you feel right now.",
      },
      {
        value: "values_goals",
        label: "Values and goals",
        description: "Connects action to what matters.",
      },
      {
        value: "obstacles",
        label: "Likely obstacles",
        description: "Prepares for friction and recovery.",
      },
    ],
  },
  {
    id: "deliveryFormat",
    otherId: "deliveryFormatOther",
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

const emptyQuestionnaireAnswers: QuestionnaireAnswers = {
  perspectivePreference: "",
  perspectivePreferenceOther: "",
  guidanceLevel: "",
  guidanceLevelOther: "",
  backgroundAudio: "",
  backgroundAudioOther: "",
  scriptLength: "",
  scriptLengthOther: "",
  toneStyle: "",
  toneStyleOther: "",
  personalizationFocus: "",
  personalizationFocusOther: "",
  deliveryFormat: "",
  deliveryFormatOther: "",
};

export default function App() {
  const [participantInput, setParticipantInput] = useState(initialProlificId);
  const [participantId, setParticipantId] = useState("");

  function beginStudy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = participantInput.trim();
    if (!trimmed) return;
    setParticipantId(trimmed);
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
                onChange={(event) => setParticipantInput(event.target.value)}
                placeholder="Enter Prolific ID"
              />
            </label>
            <button className="primary-button" disabled={!participantInput.trim()} type="submit">
              Begin comparison
            </button>
          </form>
        </section>
      </main>
    );
  }

  return <StudyTask participantId={participantId} />;
}

function StudyTask({ participantId }: { participantId: string }) {
  const assignmentId = useMemo(() => assignmentIdFromParams(params, participantId), [participantId]);
  const assignment = useMemo(() => buildAssignment(assignmentId), [assignmentId]);
  const [responses, setResponses] = useState<TrialResponse[]>(() =>
    readStoredResponses(participantId, assignment.assignmentId),
  );
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse | null>(() =>
    readStoredQuestionnaire(participantId, assignment.assignmentId),
  );
  const [trialIndex, setTrialIndex] = useState(() => Math.min(responses.length, assignment.trials.length - 1));
  const [choice, setChoice] = useState<"left" | "right" | "">("");
  const [leftRating, setLeftRating] = useState<number | null>(null);
  const [rightRating, setRightRating] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const comparisonComplete = responses.length >= assignment.trials.length;
  const complete = comparisonComplete && questionnaire !== null;
  const trial = assignment.trials[Math.min(trialIndex, assignment.trials.length - 1)];
  const scenario = getScenario(trial.scenarioId);
  const leftScript = scriptForCondition(scenario, trial.leftCondition);
  const rightScript = scriptForCondition(scenario, trial.rightCondition);
  const progressPercent = Math.round((Math.min(responses.length, assignment.trials.length) / assignment.trials.length) * 100);
  const canContinue = Boolean(choice && leftRating !== null && rightRating !== null && !isSubmitting);

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
    setStartedAt(new Date().toISOString());
    setTrialIndex((current) => Math.min(current + 1, assignment.trials.length - 1));
  }

  if (comparisonComplete && !questionnaire) {
    return (
      <QuestionnaireForm
        assignmentId={assignment.assignmentId}
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
        <div className="progress-block" aria-label={`Progress ${responses.length + 1} of ${assignment.trials.length}`}>
          <span>
            {responses.length + 1} / {assignment.trials.length}
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
        <article className={`script-panel ${choice === "left" ? "selected" : ""}`}>
          <div className="script-heading">
            <h2>Script A</h2>
            {debugMode ? <span>{trial.leftCondition}</span> : null}
          </div>
          <div className="script-copy">{leftScript}</div>
          <button className="choice-button" onClick={() => setChoice("left")}>
            Choose Script A
          </button>
        </article>

        <article className={`script-panel ${choice === "right" ? "selected" : ""}`}>
          <div className="script-heading">
            <h2>Script B</h2>
            {debugMode ? <span>{trial.rightCondition}</span> : null}
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
          <p>Choose one and rate both scripts before continuing.</p>
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
          <small>1 = not helpful, 7 = very helpful</small>
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
          <small>1 = not helpful, 7 = very helpful</small>
        </div>

        <label className="reason-field">
          <span>Optional note</span>
          <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} />
        </label>

        <div className="footer-actions">
          <p>{postingError || (isSubmitting ? "Saving..." : "Response saves after each trial.")}</p>
          <button className="primary-button" disabled={!canContinue} onClick={submit}>
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </div>
      </section>
    </main>
  );
}

function QuestionnaireForm({
  assignmentId,
  participantId,
  onSubmitted,
}: {
  assignmentId: number;
  participantId: string;
  onSubmitted: (response: QuestionnaireResponse) => void;
}) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(emptyQuestionnaireAnswers);
  const [startedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const canSubmit =
    questionnaireQuestions.every((question) => {
      const selected = answers[question.id];
      return Boolean(selected) && (selected !== "other" || Boolean(answers[question.otherId].trim()));
    }) && !isSubmitting;

  function setAnswer(questionId: QuestionnaireChoiceId, value: string) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function setOtherAnswer(question: QuestionnaireQuestion, value: string) {
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
    const response: QuestionnaireResponse = {
      ...answers,
      perspectivePreferenceOther: answers.perspectivePreferenceOther.trim(),
      guidanceLevelOther: answers.guidanceLevelOther.trim(),
      backgroundAudioOther: answers.backgroundAudioOther.trim(),
      scriptLengthOther: answers.scriptLengthOther.trim(),
      toneStyleOther: answers.toneStyleOther.trim(),
      personalizationFocusOther: answers.personalizationFocusOther.trim(),
      deliveryFormatOther: answers.deliveryFormatOther.trim(),
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
        {questionnaireQuestions.map((question, questionIndex) => (
          <fieldset className="questionnaire-question" key={question.id}>
            <legend>
              <span>{questionIndex + 1}</span>
              {question.prompt}
            </legend>
            <div className="option-grid">
              {question.options.map((option) => {
                const optionId = `${question.id}-${option.value}`;
                const selected = answers[question.id] === option.value;
                return (
                  <label className={selected ? "option-choice selected" : "option-choice"} htmlFor={optionId} key={option.value}>
                    <input
                      checked={selected}
                      id={optionId}
                      name={question.id}
                      onChange={() => setAnswer(question.id, option.value)}
                      type="radio"
                      value={option.value}
                    />
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </label>
                );
              })}
              <label
                className={answers[question.id] === "other" ? "option-choice free-text-option selected" : "option-choice free-text-option"}
                htmlFor={`${question.id}-other`}
              >
                <input
                  checked={answers[question.id] === "other"}
                  id={`${question.id}-other`}
                  name={question.id}
                  onChange={() => setAnswer(question.id, "other")}
                  type="radio"
                  value="other"
                />
                <span>Other / free response</span>
                <textarea
                  aria-label={`${question.prompt} other response`}
                  onChange={(event) => setOtherAnswer(question, event.target.value)}
                  onFocus={() => setAnswer(question.id, "other")}
                  placeholder="Type your preference"
                  rows={2}
                  value={answers[question.otherId]}
                />
              </label>
            </div>
          </fieldset>
        ))}

        <div className="footer-actions">
          <p>{postingError || (isSubmitting ? "Saving..." : "Questionnaire saves when submitted.")}</p>
          <button className="primary-button" disabled={!canSubmit} type="submit">
            {isSubmitting ? "Saving..." : "Submit final questions"}
          </button>
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
                {subtask.title} <small>{subtask.durationMinutes} min</small>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <span>Top priorities</span>
      <ol>
        {scenario.topTasks.map((task) => (
          <li key={task.rank}>
            {task.title}{" "}
            <small>
              {task.scheduledStart && task.scheduledEnd ? `${task.scheduledStart}-${task.scheduledEnd}, ` : ""}
              {task.durationMinutes} min
            </small>
          </li>
        ))}
      </ol>
    </div>
  );
}
