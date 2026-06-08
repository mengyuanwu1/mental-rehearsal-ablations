var SHEET_ID = "1eon1CqFnKt7IR2_SsDSI2GlojeLQIkdW_KPl7Dxox20";
var TRIAL_SHEET_NAME = "responses";
var QUESTIONNAIRE_SHEET_NAME = "questionnaire_responses";
var RESPONSE_SECRET = "6e5080ee019452f3275167dbd230593744baed57d6cea68b";

var TRIAL_HEADERS = ["receivedAt", "studyId", "responseId", "participantId", "assignmentId", "trialIndex", "scenarioId", "leftCondition", "rightCondition", "choice", "leftRating", "rightRating", "improvement", "attentionCheckId", "attentionCheckKind", "attentionCheckPrompt", "attentionCheckAnswer", "attentionCheckCorrectAnswer", "attentionCheckPassed", "startedAt", "submittedAt", "elapsedMs", "userAgent"];
var QUESTIONNAIRE_HEADERS = ["receivedAt", "studyId", "responseId", "participantId", "assignmentId", "questionnaireVersion", "perspectivePreference", "perspectivePreferenceOther", "guidanceLevel", "guidanceLevelOther", "backgroundAudio", "backgroundAudioOther", "scriptLength", "scriptLengthOther", "toneStyle", "toneStyleOther", "personalizationFocus", "personalizationFocusOther", "deliveryFormat", "deliveryFormatOther", "startedAt", "submittedAt", "elapsedMs", "userAgent", "idealMorningGuidance"];

function setup() {
  ensureHeaders_(getOrCreateSheet_(TRIAL_SHEET_NAME), TRIAL_HEADERS);
  ensureHeaders_(getOrCreateSheet_(QUESTIONNAIRE_SHEET_NAME), QUESTIONNAIRE_HEADERS);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var payload = JSON.parse((e.postData && e.postData.contents) || "{}");
    if (RESPONSE_SECRET && payload.secret !== RESPONSE_SECRET) return json_({ ok: false, error: "unauthorized" });
    if (payload.questionnaire) appendQuestionnaire_(payload);
    else appendTrialResponse_(payload);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function appendTrialResponse_(payload) {
  var r = payload.response || {};
  var sheet = getOrCreateSheet_(TRIAL_SHEET_NAME);
  ensureHeaders_(sheet, TRIAL_HEADERS);
  var responseId = r.responseId || [r.participantId || "anonymous", valueOrBlank_(r.assignmentId), valueOrBlank_(r.trialIndex)].join(":");
  var row = [new Date().toISOString(), payload.studyId || "", responseId, r.participantId || "", valueOrBlank_(r.assignmentId), valueOrBlank_(r.trialIndex), r.scenarioId || "", r.leftCondition || "", r.rightCondition || "", r.choice || "", valueOrBlank_(r.leftRating), valueOrBlank_(r.rightRating), r.improvement || r.improvements || r.reason || "", r.attentionCheckId || "", r.attentionCheckKind || "", r.attentionCheckPrompt || "", r.attentionCheckAnswer || "", r.attentionCheckCorrectAnswer || "", valueOrBlank_(r.attentionCheckPassed), r.startedAt || "", r.submittedAt || "", valueOrBlank_(r.elapsedMs), r.userAgent || ""];
  upsertRow_(sheet, TRIAL_HEADERS, responseId, row);
}

function appendQuestionnaire_(payload) {
  var q = payload.questionnaire || {};
  var sheet = getOrCreateSheet_(QUESTIONNAIRE_SHEET_NAME);
  ensureHeaders_(sheet, QUESTIONNAIRE_HEADERS);
  var responseId = q.responseId || [q.participantId || "anonymous", valueOrBlank_(q.assignmentId), "questionnaire"].join(":");
  var row = [new Date().toISOString(), payload.studyId || "", responseId, q.participantId || "", valueOrBlank_(q.assignmentId), q.questionnaireVersion || "", q.perspectivePreference || "", q.perspectivePreferenceOther || "", q.guidanceLevel || "", q.guidanceLevelOther || "", q.backgroundAudio || "", q.backgroundAudioOther || "", q.scriptLength || "", q.scriptLengthOther || "", q.toneStyle || "", q.toneStyleOther || "", q.personalizationFocus || "", q.personalizationFocusOther || "", q.deliveryFormat || "", q.deliveryFormatOther || "", q.startedAt || "", q.submittedAt || "", valueOrBlank_(q.elapsedMs), q.userAgent || "", q.idealMorningGuidance || ""];
  upsertRow_(sheet, QUESTIONNAIRE_HEADERS, responseId, row);
}

function doGet() {
  return json_({ ok: true, message: "Mental rehearsal response collector is running." });
}

function getOrCreateSheet_(sheetName) {
  if (!SHEET_ID || SHEET_ID === "PASTE_GOOGLE_SHEET_ID_HERE") throw new Error("Set SHEET_ID in Code.gs before deploying.");
  var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders_(sheet, headers) {
  var lastColumn = Math.max(sheet.getLastColumn(), headers.length);
  var existing = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  if (headers === TRIAL_HEADERS && rowHasAnyValue_(existing) && existing.indexOf("responseId") === -1 && existing[0] === "receivedAt" && existing[1] === "studyId") sheet.insertColumnAfter(2);
  var range = sheet.getRange(1, 1, 1, headers.length);
  var current = range.getValues()[0];
  if (!headersMatch_(current, headers)) {
    range.setValues([headers]);
    sheet.setFrozenRows(1);
  }
  if (headers === TRIAL_HEADERS) backfillTrialResponseIds_(sheet);
}

function upsertRow_(sheet, headers, responseId, row) {
  var existingRow = findResponseRow_(sheet, headers, responseId);
  if (existingRow) sheet.getRange(existingRow, 1, 1, headers.length).setValues([row]);
  else sheet.appendRow(row);
}

function findResponseRow_(sheet, headers, responseId) {
  if (!responseId || sheet.getLastRow() < 2) return null;
  var responseIdColumn = headers.indexOf("responseId") + 1;
  var values = sheet.getRange(2, responseIdColumn, sheet.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < values.length; i += 1) if (values[i][0] === responseId) return i + 2;
  return null;
}

function backfillTrialResponseIds_(sheet) {
  if (sheet.getLastRow() < 2) return;
  var rowCount = sheet.getLastRow() - 1;
  var values = sheet.getRange(2, 1, rowCount, TRIAL_HEADERS.length).getValues();
  var responseIds = [];
  var needsBackfill = false;
  for (var i = 0; i < values.length; i += 1) {
    var row = values[i];
    if (row[2]) responseIds.push([row[2]]);
    else if (!rowHasAnyValue_(row)) responseIds.push([""]);
    else {
      responseIds.push([[row[3] || "anonymous", valueOrBlank_(row[4]), valueOrBlank_(row[5])].join(":")]);
      needsBackfill = true;
    }
  }
  if (needsBackfill) sheet.getRange(2, 3, rowCount, 1).setValues(responseIds);
}

function headersMatch_(current, headers) {
  for (var i = 0; i < headers.length; i += 1) if (current[i] !== headers[i]) return false;
  return true;
}

function rowHasAnyValue_(row) {
  for (var i = 0; i < row.length; i += 1) if (row[i] !== "") return true;
  return false;
}

function valueOrBlank_(value) {
  if (value === null || typeof value === "undefined") return "";
  return value;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
