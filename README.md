# Mental Rehearsal Ablation Study UI

Small static web UI for Prolific / Qualtrics pairwise comparison tasks.

## Design

- 5 conditions: `baseline`, `mind`, `body`, `soul`, `full`
- 10 condition pairs
- 10 scenarios: 5 seed profiles x 2 daily contexts
- 50 assignment slots
- 6 trials per participant
- Each trial shows one scenario and two scripts from different conditions
- Script order randomized per assignment slot / trial
- Participants must choose one script and rate both scripts before continuing

Across assignment ids `0` through `49`:

- each condition pair appears 30 times
- each scenario appears 30 times
- each pair x scenario cell appears 3 times
- no participant sees the same scenario twice

## Qualtrics / Prolific link

Preferred URL shape:

```text
https://YOUR_DEPLOYED_APP/?PROLIFIC_PID=${e://Field/PROLIFIC_PID}&assignment_id=${e://Field/assignment_id}&return_url=https%3A%2F%2FYOUR_QUALTRICS_RETURN_URL
```

Best practice: assign `assignment_id` in Qualtrics from `0` to `49` as embedded data.
If `assignment_id` is absent, the app hashes `PROLIFIC_PID` into a slot. That is useful
for pilots, but exact balancing depends on Qualtrics assigning slots.

## Responses

Each trial saves immediately to `localStorage`.

For production collection, use the included Google Apps Script collector:

1. Create a Google Sheet.
2. Copy the sheet ID from the URL.
3. In Google Drive, create a new Apps Script project.
4. Paste `google-apps-script/Code.gs` into the script editor.
5. Replace:
   - `PASTE_GOOGLE_SHEET_ID_HERE`
   - `PASTE_SHARED_SECRET_HERE`
6. Run `setup()` once from the Apps Script editor and grant permissions.
7. Deploy as Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
8. Copy the deployed `/exec` URL.

Then set these frontend env vars before deploying the Vite app:

```bash
VITE_RESPONSE_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_RESPONSE_SECRET=replace-with-the-same-shared-secret
VITE_STUDY_ID=mental-rehearsal-ablation-v1
```

The frontend sends one row per trial. It uses `text/plain` + `no-cors` so Google Apps
Script accepts browser posts without a CORS preflight. This means the browser cannot
confirm the sheet write response, so `localStorage` remains the participant-side backup.

Without an endpoint, the completion screen lets you download CSV. This is fine for pilots,
not for production Prolific collection.

Sheet columns:

```text
receivedAt, studyId, participantId, assignmentId, trialIndex, scenarioId,
leftCondition, rightCondition, choice, leftRating, rightRating, reason,
startedAt, submittedAt, elapsedMs, userAgent
```

## Scripts

Current scripts are deterministic seed scripts in `src/data/scripts.ts`. Replace those
with final model-generated scripts before launch. Keep condition labels hidden from
participants; use `?debug=1` only for researcher QA.

## Development

```bash
npm install
npm run verify:assignments
npm run dev
npm run build
```
