# Mental Rehearsal Ablation Study UI

Small static web UI for Prolific / Qualtrics pairwise comparison tasks.

## Design

- 5 conditions: `baseline`, `mind`, `body`, `soul`, `full`
- V4 targeted 2-comparison block
- 5 scenarios: 5 seed profiles, daily scope only
- 20 assignment slots for launch
- 2 trials per participant
- Each trial shows one scenario and two scripts from different conditions
- Each participant sees four unique conditions, so no condition is rated twice by the same participant
- Each participant sees `full` exactly once, directly against `baseline`, `mind`, `body`, or `soul`
- The second comparison uses two fresh non-full conditions, with a mix of baseline-vs-middle and middle-vs-middle comparisons
- Script order balanced across assignment slots so `full` appears 10 times as Script A and 10 times as Script B
- After entering a Prolific ID, participants answer a 3-item state check, then see the brief introduction
- Each comparison requires a 45-second review period before the participant can continue
- Participants must choose one script and rate both scripts before continuing
- Comparison 2 includes a short exact-recall attention check that rotates across
  scenario title, life priority, and energy background text
- After the 2 comparisons, participants complete a final personalization questionnaire

Across assignment ids `0` through `19`:

- direct `full` comparisons include win-rate-friendly `full` vs `baseline` 7 times
- direct middle comparisons are `full` vs `mind` 5 times, `full` vs `body` 5 times, and `full` vs `soul` 3 times
- filler comparisons include `baseline/mind` 4, `baseline/body` 4, `baseline/soul` 3, `mind/body` 4, `mind/soul` 3, and `body/soul` 2
- each direct `full` comparison pair appears across scenarios, with near-balanced scenario spread
- each scenario appears 8 times
- `full` appears 10 times as Script A and 10 times as Script B
- v4 condition exposure totals are `full` 20, `baseline` 18, `mind` 16, `body` 15, and `soul` 11
- combined with the current no-fast-10 attention-filtered 3-dim counts, projected totals are approximately `full` 36, `baseline` 36, `mind` 35, `body` 36, and `soul` 35
- no participant sees the same scenario twice

If launch stops at 15 participants, use assignment ids `0` through `14`; each
participant still sees four unique conditions and `full` exactly once. In the
first 15 slots, direct `full` comparisons are `baseline` 5, `mind` 4, `body` 4,
and `soul` 2, which keeps projected cumulative condition counts near 31-32 each.

## Final personalization questionnaire

The final screen asks multiple-choice questions about:

- preferred rehearsal perspective: first-person, guide voice, third-person, or no preference
- desired guidance level: light cues, moderate guidance, step-by-step, or adaptive
- preferred background audio: none, ambient, nature sounds, piano/lo-fi, or energizing
- preferred script length: under 1 minute, 1-2 minutes, 3-5 minutes, or depends
- useful tone: calm/supportive, practical/direct, encouraging, or reflective
- most important personalization focus: drag-fill rank order across grounding and visualization options
- delivery format: readable text, spoken audio, text and audio, or interactive steps
- ideal morning mental rehearsal guidance, as a free-text response

Each multiple-choice question also includes an "Other / free response" option with a text field.

## Qualtrics / Prolific link

Preferred URL shape:

```text
https://YOUR_DEPLOYED_APP/?PROLIFIC_PID=${e://Field/PROLIFIC_PID}&assignment_id=${e://Field/assignment_id}&return_url=https%3A%2F%2FYOUR_QUALTRICS_RETURN_URL
```

Best practice: assign `assignment_id` in Qualtrics from `0` to `19` as embedded data.
If `assignment_id` is absent, the app hashes `PROLIFIC_PID` into a slot. That is useful
for pilots, but exact balancing depends on Qualtrics assigning slots.
The app asks participants to enter their Prolific ID before the comparison UI appears.
If `PROLIFIC_PID` is present in the URL, the field is prefilled for confirmation.
Admin mode defaults to assignment `0`, or `admin_assignment_id` / `assignment_id`
when provided, and saves only locally. Admin state checks, trial responses, and
questionnaires are not posted to the Google Apps Script collector, so admin QA
does not count toward assignment balance.

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

The frontend sends one pre-study row to the `state_check_responses` sheet, one row per
trial to the `responses` sheet, then one final row to the `questionnaire_responses` sheet.
It uses `text/plain` + `no-cors` so Google Apps Script
accepts browser posts without a CORS preflight. This means the browser cannot confirm the
sheet write response, so `localStorage` remains the participant-side backup.
Pre-study rows use `responseId = participantId:assignmentId:state-check`, trial rows use
`responseId = participantId:assignmentId:trialIndex`, and the questionnaire uses
`responseId = participantId:assignmentId:questionnaire`. The Apps Script collector updates
an existing row with the same `responseId`, so Back edits replace the prior save.

Trial sheet columns:

```text
receivedAt, studyId, responseId, participantId, assignmentId, trialIndex, scenarioId,
leftCondition, rightCondition,
leftAudioAvailable, rightAudioAvailable, leftAudioPath, rightAudioPath,
leftAudioPlayCount, rightAudioPlayCount,
leftAudioMaxPositionSeconds, rightAudioMaxPositionSeconds,
leftAudioEnded, rightAudioEnded,
leftAudioSegmentProgress, rightAudioSegmentProgress,
choice, leftRating, rightRating, improvement,
attentionCheckId, attentionCheckKind, attentionCheckPrompt, attentionCheckAnswer,
attentionCheckCorrectAnswer, attentionCheckPassed,
startedAt, submittedAt, elapsedMs, userAgent,
leftBodyStateRating, rightBodyStateRating,
leftTaskGoalRating, rightTaskGoalRating,
leftValueConnectionRating, rightValueConnectionRating,
leftEaseRating, rightEaseRating
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
from those inputs: daily scenarios show the full day schedule with event notes and
rank badges for the top 3 priorities, and task scenarios show the focus task plus subtasks.

## Audio

Generated audio is served as static MP3 files from `public/audio/<scenario>/<condition>/<segment>.mp3`.
The UI reads `src/data/audioManifest.json`; audio players appear only for scripts present
in that manifest.

To generate audio with ElevenLabs:

```bash
ELEVENLABS_API_KEY=... npm run generate:audio
```

Optional env vars:

```bash
ELEVENLABS_VOICE_ID=jwjWpCFQUCpnHneBySsF
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
ELEVENLABS_OUTPUT_FORMAT=mp3_44100_128
FORCE_AUDIO=1
```

The generator skips existing MP3s by default. Use `FORCE_AUDIO=1` only when you want
to regenerate and spend credits again.

## Development

```bash
npm install
npm run verify:assignments
npm run generate:audio
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
