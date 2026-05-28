const SHEET_ID = "1eon1CqFnKt7IR2_SsDSI2GlojeLQIkdW_KPl7Dxox20";
const TRIAL_SHEET_NAME = "responses";
const QUESTIONNAIRE_SHEET_NAME = "questionnaire_responses";
const RESPONSE_SECRET = "6e5080ee019452f3275167dbd230593744baed57d6cea68b";

const TRIAL_HEADERS = [
  "receivedAt",
  "studyId",
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

const QUESTIONNAIRE_HEADERS = [
  "receivedAt",
  "studyId",
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

function setup() {
  ensureHeaders_(getOrCreateSheet_(TRIAL_SHEET_NAME), TRIAL_HEADERS);
  ensureHeaders_(getOrCreateSheet_(QUESTIONNAIRE_SHEET_NAME), QUESTIONNAIRE_HEADERS);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || "{}");

    if (RESPONSE_SECRET && payload.secret !== RESPONSE_SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }

    if (payload.questionnaire) {
      appendQuestionnaire_(payload);
    } else {
      appendTrialResponse_(payload);
    }

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function appendTrialResponse_(payload) {
  const response = payload.response || {};
  const sheet = getOrCreateSheet_(TRIAL_SHEET_NAME);
  ensureHeaders_(sheet, TRIAL_HEADERS);

  sheet.appendRow([
    new Date().toISOString(),
    payload.studyId || "",
    response.participantId || "",
    response.assignmentId ?? "",
    response.trialIndex ?? "",
    response.scenarioId || "",
    response.leftCondition || "",
    response.rightCondition || "",
    response.choice || "",
    response.leftRating ?? "",
    response.rightRating ?? "",
    response.reason || "",
    response.startedAt || "",
    response.submittedAt || "",
    response.elapsedMs ?? "",
    response.userAgent || "",
  ]);
}

function appendQuestionnaire_(payload) {
  const questionnaire = payload.questionnaire || {};
  const sheet = getOrCreateSheet_(QUESTIONNAIRE_SHEET_NAME);
  ensureHeaders_(sheet, QUESTIONNAIRE_HEADERS);

  sheet.appendRow([
    new Date().toISOString(),
    payload.studyId || "",
    questionnaire.responseId || "",
    questionnaire.participantId || "",
    questionnaire.assignmentId ?? "",
    questionnaire.questionnaireVersion || "",
    questionnaire.perspectivePreference || "",
    questionnaire.perspectivePreferenceOther || "",
    questionnaire.guidanceLevel || "",
    questionnaire.guidanceLevelOther || "",
    questionnaire.backgroundAudio || "",
    questionnaire.backgroundAudioOther || "",
    questionnaire.scriptLength || "",
    questionnaire.scriptLengthOther || "",
    questionnaire.toneStyle || "",
    questionnaire.toneStyleOther || "",
    questionnaire.personalizationFocus || "",
    questionnaire.personalizationFocusOther || "",
    questionnaire.deliveryFormat || "",
    questionnaire.deliveryFormatOther || "",
    questionnaire.startedAt || "",
    questionnaire.submittedAt || "",
    questionnaire.elapsedMs ?? "",
    questionnaire.userAgent || "",
  ]);
}

function doGet() {
  return json_({ ok: true, message: "Mental rehearsal response collector is running." });
}

function getOrCreateSheet_(sheetName) {
  if (!SHEET_ID || SHEET_ID === "PASTE_GOOGLE_SHEET_ID_HERE") {
    throw new Error("Set SHEET_ID in Code.gs before deploying.");
  }

  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders_(sheet, headers) {
  const range = sheet.getRange(1, 1, 1, headers.length);
  const current = range.getValues()[0];
  const hasHeaders = headers.every((header, index) => current[index] === header);

  if (!hasHeaders) {
    range.setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
