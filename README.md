# Mental Rehearsal Ablation Study UI

Small static web UI for Prolific / Qualtrics pairwise comparison tasks.

## Design

- 5 conditions: `baseline`, `mind`, `body`, `soul`, `full`
- 10 condition pairs
- 10 scenarios: 5 seed profiles x 2 scopes (`daily` + `task`)
- 50 assignment slots
- 6 trials per participant
- Each trial shows one scenario and two scripts from different conditions
- Script order randomized per assignment slot / trial
- After entering a Prolific ID, participants see a brief introduction to mental rehearsal and the study task
- Each comparison requires a 1-minute review period before the participant can continue
- Participants must choose one script and rate both scripts before continuing
- After the 6 comparisons, participants complete a final personalization questionnaire

Across assignment ids `0` through `49`:

- each condition pair appears 30 times
- each scenario appears 30 times
- each pair x scenario cell appears 3 times
- no participant sees the same scenario twice

## Final personalization questionnaire

The final screen asks multiple-choice questions about:

- preferred rehearsal perspective: first-person, guide voice, third-person, or no preference
- desired guidance level: light cues, moderate guidance, step-by-step, or adaptive
- preferred background audio: none, ambient, nature sounds, piano/lo-fi, or energizing
- preferred script length: under 1 minute, 1-2 minutes, 3-5 minutes, or depends
- useful tone: calm/supportive, practical/direct, encouraging, or reflective
- most important personalization focus: schedule/tasks, energy/mood, values/goals, or obstacles
- delivery format: readable text, spoken audio, text and audio, or interactive steps
- ideal morning mental rehearsal guidance, as a free-text response

Each multiple-choice question also includes an "Other / free response" option with a text field.

## Qualtrics / Prolific link

Preferred URL shape:

```text
https://YOUR_DEPLOYED_APP/?PROLIFIC_PID=${e://Field/PROLIFIC_PID}&assignment_id=${e://Field/assignment_id}&return_url=https%3A%2F%2FYOUR_QUALTRICS_RETURN_URL
```

Best practice: assign `assignment_id` in Qualtrics from `0` to `49` as embedded data.
If `assignment_id` is absent, the app hashes `PROLIFIC_PID` into a slot. That is useful
for pilots, but exact balancing depends on Qualtrics assigning slots.
The app asks participants to enter their Prolific ID before the comparison UI appears.
If `PROLIFIC_PID` is present in the URL, the field is prefilled for confirmation.

## Responses

Each trial saves immediately to `localStorage`.

For production collection, use the included Google Apps Script collector:

1. Create a Google Sheet.
2. Copy the sheet ID from the URL.
3. In Google Drive, create a new Apps Script project.
4. Paste `google-apps-script/Code.gs` into the script editor.
5. Confirm `SHEET_ID` and `RESPONSE_SECRET` match the deployed study settings.
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

The frontend sends one row per trial to the `responses` sheet, then one final row to the
`questionnaire_responses` sheet. It uses `text/plain` + `no-cors` so Google Apps Script
accepts browser posts without a CORS preflight. This means the browser cannot confirm the
sheet write response, so `localStorage` remains the participant-side backup.
Trial rows use `responseId = participantId:assignmentId:trialIndex`, and the questionnaire
uses `responseId = participantId:assignmentId:questionnaire`. The Apps Script collector
updates an existing row with the same `responseId`, so Back edits replace the prior save.

Trial sheet columns:

```text
receivedAt, studyId, responseId, participantId, assignmentId, trialIndex, scenarioId,
leftCondition, rightCondition, choice, leftRating, rightRating, reason,
startedAt, submittedAt, elapsedMs, userAgent
```

Questionnaire sheet columns:

```text
receivedAt, studyId, responseId, participantId, assignmentId, questionnaireVersion,
perspectivePreference, perspectivePreferenceOther, guidanceLevel, guidanceLevelOther,
backgroundAudio, backgroundAudioOther, scriptLength, scriptLengthOther, toneStyle,
toneStyleOther, personalizationFocus, personalizationFocusOther, deliveryFormat,
deliveryFormatOther,
startedAt, submittedAt, elapsedMs, userAgent, idealMorningGuidance
```

## Scripts

Current scripts are deterministic seed scripts in `src/data/scripts.ts`. Replace those
with final model-generated scripts before launch. Keep condition labels hidden from
participants; use `?debug=1` only for researcher QA.

Scenario inputs live in `src/data/studyInputs.ts`. The UI derives its context banner
from those inputs: daily scenarios show the top 3 ranked priorities, and task scenarios
show the focus task plus subtasks.

## Development

```bash
npm install
npm run verify:assignments
npm run dev
npm run build
```

## GitHub Pages

The Vite build uses relative asset URLs (`base: "./"`) so the app can load when
GitHub Pages serves it from a repository path such as `/mental-rehearsal-ablations/`.
The included `.github/workflows/deploy-pages.yml` workflow builds the app and publishes
the compiled `dist` folder. In GitHub repository settings, set Pages source to
`GitHub Actions`; serving the repository root directly will show a blank page because
GitHub Pages cannot run the Vite TypeScript source file.
