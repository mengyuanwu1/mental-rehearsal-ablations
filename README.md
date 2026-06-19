# Mental Rehearsal Ablation Study UI

Small static web UI for Prolific / Qualtrics pairwise comparison tasks.

## Design

- 5 conditions: `baseline`, `mind`, `body`, `soul`, `full`
- 10 condition pairs
- 5 scenarios: 5 seed profiles, daily scope only
- 10 assignment slots for the pilot
- 2 trials per participant
- Each trial shows one scenario and two scripts from different conditions
- Script order randomized per assignment slot / trial
- 8 of 10 assignment slots include a direct `baseline` comparison
- After entering a Prolific ID, participants see a brief introduction to mental rehearsal and the study task
- Each comparison requires a 45-second review period before the participant can continue
- Participants must choose one script and rate both scripts before continuing
- Comparison 2 includes a short inference-based attention check that rotates across
  scenario focus, values, and energy-state questions
- After the 2 comparisons, participants complete a final personalization questionnaire

Across assignment ids `0` through `9`:

- each condition pair appears 2 times
- each scenario appears 4 times
- no repeated pair x scenario cell appears in the pilot assignment table
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

Best practice: assign `assignment_id` in Qualtrics from `0` to `9` as embedded data.
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

Generated audio is served as static MP3 files from `public/audio/<scenario>/<condition>.mp3`.
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
