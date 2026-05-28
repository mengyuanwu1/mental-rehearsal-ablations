import type { QuestionnaireResponse, TrialResponse } from "../types";

const responseKey = (participantId: string, assignmentId: number) =>
  `mra-responses:${participantId || "anonymous"}:${assignmentId}`;

const questionnaireKey = (participantId: string, assignmentId: number) =>
  `mra-questionnaire:${participantId || "anonymous"}:${assignmentId}`;

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

export function readStoredQuestionnaire(
  participantId: string,
  assignmentId: number,
): QuestionnaireResponse | null {
  const raw = window.localStorage.getItem(questionnaireKey(participantId, assignmentId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuestionnaireResponse;
  } catch {
    return null;
  }
}

export function storeQuestionnaire(response: QuestionnaireResponse): QuestionnaireResponse {
  window.localStorage.setItem(
    questionnaireKey(response.participantId, response.assignmentId),
    JSON.stringify(response),
  );
  return response;
}

async function postPayload(payload: Record<string, unknown>): Promise<void> {
  const endpoint = import.meta.env.VITE_RESPONSE_ENDPOINT as string | undefined;
  if (!endpoint) return;

  const body = {
    secret: (import.meta.env.VITE_RESPONSE_SECRET as string | undefined) ?? "",
    studyId: (import.meta.env.VITE_STUDY_ID as string | undefined) ?? "mental-rehearsal-ablation",
    ...payload,
  };

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    keepalive: true,
  });
}

export async function postResponse(response: TrialResponse): Promise<void> {
  await postPayload({ response });
}

export async function postQuestionnaire(questionnaire: QuestionnaireResponse): Promise<void> {
  await postPayload({ questionnaire });
}

const escapeCsvValue = (value: unknown) => {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
};

export function responsesToCsv(responses: TrialResponse[]): string {
  const headers = [
    "responseId",
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

  return [
    headers.join(","),
    ...responses.map((response) =>
      headers.map((key) => escapeCsvValue(response[key as keyof TrialResponse])).join(","),
    ),
  ].join("\n");
}

export function questionnaireToCsv(response: QuestionnaireResponse | null): string {
  const headers = [
    "responseId",
    "participantId",
    "assignmentId",
    "questionnaireVersion",
    "perspectivePreference",
    "perspectivePreferenceOther",
    "guidanceLevel",
    "guidanceLevelOther",
    "backgroundAudio",
    "backgroundAudioOther",
    "scriptLength",
    "scriptLengthOther",
    "toneStyle",
    "toneStyleOther",
    "personalizationFocus",
    "personalizationFocusOther",
    "deliveryFormat",
    "deliveryFormatOther",
    "startedAt",
    "submittedAt",
    "elapsedMs",
    "userAgent",
  ];

  if (!response) return headers.join(",");

  return [
    headers.join(","),
    headers.map((key) => escapeCsvValue(response[key as keyof QuestionnaireResponse])).join(","),
  ].join("\n");
}
