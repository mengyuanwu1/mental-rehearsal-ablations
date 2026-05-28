import { useMemo, useState } from "react";
import { getScenario } from "./data/scenarios";
import { scriptForCondition } from "./data/scripts";
import { assignmentIdFromParams, buildAssignment } from "./lib/assignment";
import { postResponse, readStoredResponses, responsesToCsv, storeResponse } from "./lib/responses";
import type { TrialResponse } from "./types";

const params = new URLSearchParams(window.location.search);
const prolificId =
  params.get("PROLIFIC_PID") ??
  params.get("prolific_pid") ??
  params.get("participant_id") ??
  params.get("participant") ??
  "anonymous";

const returnUrl = params.get("return_url") ?? params.get("redirect_url") ?? "";
const debugMode = params.get("debug") === "1";
const ratingScale = [1, 2, 3, 4, 5, 6, 7];

function downloadCsv(responses: TrialResponse[]) {
  const blob = new Blob([responsesToCsv(responses)], { type: "text/csv;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = `mental-rehearsal-responses-${prolificId}.csv`;
  link.click();
  URL.revokeObjectURL(href);
}

export default function App() {
  const assignmentId = useMemo(() => assignmentIdFromParams(params), []);
  const assignment = useMemo(() => buildAssignment(assignmentId), [assignmentId]);
  const [responses, setResponses] = useState<TrialResponse[]>(() =>
    readStoredResponses(prolificId, assignment.assignmentId),
  );
  const [trialIndex, setTrialIndex] = useState(() => Math.min(responses.length, assignment.trials.length - 1));
  const [choice, setChoice] = useState<"left" | "right" | "">("");
  const [leftRating, setLeftRating] = useState<number | null>(null);
  const [rightRating, setRightRating] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());
  const [postingError, setPostingError] = useState("");

  const complete = responses.length >= assignment.trials.length;
  const trial = assignment.trials[trialIndex];
  const scenario = getScenario(trial.scenarioId);
  const leftScript = scriptForCondition(scenario, trial.leftCondition);
  const rightScript = scriptForCondition(scenario, trial.rightCondition);
  const progressPercent = Math.round((responses.length / assignment.trials.length) * 100);
  const canContinue = Boolean(choice && leftRating !== null && rightRating !== null);

  async function submit() {
    if (!canContinue || leftRating === null || rightRating === null || !choice) return;
    const now = new Date().toISOString();
    const response: TrialResponse = {
      participantId: prolificId,
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
      await postResponse(response);
      setPostingError("");
    } catch {
      setPostingError("Saved locally. Network post failed.");
    }

    setChoice("");
    setLeftRating(null);
    setRightRating(null);
    setReason("");
    setStartedAt(new Date().toISOString());
    setTrialIndex((current) => Math.min(current + 1, assignment.trials.length - 1));
  }

  if (complete) {
    return (
      <main className="app-shell">
        <section className="complete-panel">
          <p className="overline">Study complete</p>
          <h1>Thank you.</h1>
          <p>Your responses are saved in this browser and submitted if a response endpoint is configured.</p>
          <div className="complete-actions">
            {returnUrl ? (
              <a className="primary-button" href={returnUrl}>
                Return to survey
              </a>
            ) : null}
            <button className="secondary-button" onClick={() => downloadCsv(responses)}>
              Download CSV
            </button>
          </div>
          <pre className="payload-preview">{JSON.stringify(responses, null, 2)}</pre>
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
        <div>
          <p className="context-label">{scenario.profileName}</p>
          <h2>{scenario.contextTitle}</h2>
          <p>{scenario.profileSummary}</p>
        </div>
        <div className="context-grid">
          <div>
            <span>Today</span>
            <p>{scenario.dayFrame}</p>
          </div>
          <div>
            <span>Goal</span>
            <p>{scenario.userGoal}</p>
          </div>
          <div>
            <span>Top priorities</span>
            <ol>
              {scenario.topTasks.map((task) => (
                <li key={task.rank}>
                  {task.title} <small>{task.durationMinutes} min</small>
                </li>
              ))}
            </ol>
          </div>
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
          <p>{postingError || "Response saves after each trial."}</p>
          <button className="primary-button" disabled={!canContinue} onClick={submit}>
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
