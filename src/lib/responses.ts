import type { TrialResponse } from "../types";

const responseKey = (participantId: string, assignmentId: number) =>
  `mra-responses:${participantId || "anonymous"}:${assignmentId}`;

export function readStoredResponses(participantId: string, assignmentId: number): TrialResponse[] {
  const raw = window.localStorage.getItem(responseKey(participantId, assignmentId));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TrialResponse[];
  } catch {
    return [];
  }
}

export function storeResponse(response: TrialResponse): TrialResponse[] {
  const current = readStoredResponses(response.participantId, response.assignmentId).filter(
    (item) => item.trialIndex !== response.trialIndex,
  );
  const next = [...current, response].sort((a, b) => a.trialIndex - b.trialIndex);
  window.localStorage.setItem(responseKey(response.participantId, response.assignmentId), JSON.stringify(next));
  return next;
}

export async function postResponse(response: TrialResponse): Promise<void> {
  const endpoint = import.meta.env.VITE_RESPONSE_ENDPOINT as string | undefined;
  if (!endpoint) return;

  const payload = {
    secret: (import.meta.env.VITE_RESPONSE_SECRET as string | undefined) ?? "",
    studyId: (import.meta.env.VITE_STUDY_ID as string | undefined) ?? "mental-rehearsal-ablation",
    response,
  };

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    keepalive: true,
  });
}

export function responsesToCsv(responses: TrialResponse[]): string {
  const headers = [
    "participantId",
    "assignmentId",
    "trialIndex",
    "scenarioId",
    "leftCondition",
    "rightCondition",
    "choice",
    "leftRating",
    "rightRating",
    "reason",
    "startedAt",
    "submittedAt",
    "elapsedMs",
    "userAgent",
  ];

  const escape = (value: unknown) => {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  };

  return [
    headers.join(","),
    ...responses.map((response) => headers.map((key) => escape(response[key as keyof TrialResponse])).join(",")),
  ].join("\n");
}
