const SHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "responses";
const RESPONSE_SECRET = "PASTE_SHARED_SECRET_HERE";

const HEADERS = [
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

function setup() {
  const sheet = getOrCreateSheet_();
  ensureHeaders_(sheet);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || "{}");

    if (RESPONSE_SECRET && payload.secret !== RESPONSE_SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }

    const response = payload.response || {};
    const sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);

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

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: "Mental rehearsal response collector is running." });
}

function getOrCreateSheet_() {
  if (!SHEET_ID || SHEET_ID === "PASTE_GOOGLE_SHEET_ID_HERE") {
    throw new Error("Set SHEET_ID in Code.gs before deploying.");
  }

  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = range.getValues()[0];
  const hasHeaders = HEADERS.every((header, index) => current[index] === header);

  if (!hasHeaders) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
