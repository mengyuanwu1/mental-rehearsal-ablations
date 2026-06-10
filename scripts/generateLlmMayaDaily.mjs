import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(".");
const workspaceRoot = path.resolve("..");
const outputDir = path.join(repoRoot, "outputs");
const jsonPath = path.join(outputDir, "maya_daily_llm_scripts.json");
const mdPath = path.join(outputDir, "maya_daily_llm_scripts.md");

function parseEnvFile(text) {
  const values = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [rawKey, ...rest] = line.split("=");
    const key = rawKey.replace(/^export\s+/, "").trim();
    let value = rest.join("=").trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

async function readEnvValue(keys) {
  for (const key of keys) {
    if (process.env[key]) return process.env[key].trim();
  }

  const envPaths = [
    path.join(repoRoot, ".env.local"),
    path.join(repoRoot, ".env"),
    path.join(workspaceRoot, "backend", ".env.local"),
    path.join(workspaceRoot, "backend", ".env"),
    path.join(workspaceRoot, "frontend", ".env.local"),
    path.join(workspaceRoot, "frontend", ".env"),
  ];

  for (const filePath of envPaths) {
    let parsed;
    try {
      parsed = parseEnvFile(await readFile(filePath, "utf8"));
    } catch {
      continue;
    }
    for (const key of keys) {
      if (parsed[key]) return parsed[key].trim();
    }
  }

  return "";
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const chunks = [];
  for (const item of payload.output ?? []) {
    for (const part of item.content ?? []) {
      if (part.type === "output_text" && typeof part.text === "string") {
        chunks.push(part.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const mayaDailyInput = {
  scenarioId: "maya_daily",
  scope: "daily",
  baseline: {
    visibleScheduleOnly: [
      { title: "Review paper plan", scheduledStart: "08:15", scheduledEnd: "08:35", durationMinutes: 20 },
      { title: "Draft related work section", scheduledStart: "09:00", scheduledEnd: "10:30", durationMinutes: 90 },
      { title: "Lab standup", scheduledStart: "10:45", scheduledEnd: "11:15", durationMinutes: 30 },
      { title: "Lunch break", scheduledStart: "12:10", scheduledEnd: "12:40", durationMinutes: 30 },
      { title: "Answer TA emails", scheduledStart: "13:00", scheduledEnd: "13:20", durationMinutes: 20 },
      { title: "Teaching support tasks", scheduledStart: "14:00", scheduledEnd: "14:45", durationMinutes: 45 },
      { title: "Prepare two reading group questions", scheduledStart: "15:00", scheduledEnd: "15:30", durationMinutes: 30 },
      { title: "Send advisor progress note", scheduledStart: "16:15", scheduledEnd: "16:35", durationMinutes: 20 },
    ],
  },
  mind: {
    userGoal: {
      priority: {
        title: "Become an independent researcher",
        description:
          "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend.",
      },
      goal_1: {
        answers: {
          what: "Submit a strong workshop paper this month",
          exactQuantity: {
            value: 1,
            unit: "workshop paper submission",
            description: "one complete draft submitted to the workshop",
          },
          exactDate: { label: "by the end of June 2026", isoDate: "2026-06-30" },
          keySteps: [
            {
              id: "related-work",
              label: "Complete the related work section",
              target: "one coherent section draft",
            },
            {
              id: "gap-statement",
              label: "Write the gap statement",
              target: "one paragraph the advisor can react to",
            },
            {
              id: "full-draft",
              label: "Assemble the workshop paper draft",
              target: "one submission-ready PDF",
            },
          ],
          metric: "one strong workshop paper draft submitted",
          deadline: "2026-06-30",
        },
      },
    },
    calendarEvents: [
      { eventId: "maya-plan", title: "Review paper plan", kind: "planning", scheduledStart: "08:15", scheduledEnd: "08:35", durationMinutes: 20 },
      { eventId: "maya-related-work", title: "Draft related work section", kind: "task", scheduledStart: "09:00", scheduledEnd: "10:30", durationMinutes: 90 },
      { eventId: "maya-lab-standup", title: "Lab standup", kind: "meeting", scheduledStart: "10:45", scheduledEnd: "11:15", durationMinutes: 30 },
      { eventId: "maya-lunch", title: "Lunch break", kind: "break", scheduledStart: "12:10", scheduledEnd: "12:40", durationMinutes: 30 },
      { eventId: "maya-ta-email", title: "Answer TA emails", kind: "task", scheduledStart: "13:00", scheduledEnd: "13:20", durationMinutes: 20 },
      { eventId: "maya-teaching-support", title: "Teaching support tasks", kind: "admin", scheduledStart: "14:00", scheduledEnd: "14:45", durationMinutes: 45 },
      { eventId: "maya-reading-questions", title: "Prepare two reading group questions", kind: "task", scheduledStart: "15:00", scheduledEnd: "15:30", durationMinutes: 30 },
      { eventId: "maya-advisor-note", title: "Send advisor progress note", kind: "admin", scheduledStart: "16:15", scheduledEnd: "16:35", durationMinutes: 20 },
    ],
    prioritySchedule: [
      {
        rank: 1,
        title: "Draft related work section",
        scheduledStart: "09:00",
        scheduledEnd: "10:30",
        durationMinutes: 90,
        priority: "high",
        linkedValue: "Success",
        energyCost: "high",
      },
      {
        rank: 2,
        title: "Answer TA emails",
        scheduledStart: "13:00",
        scheduledEnd: "13:20",
        durationMinutes: 20,
        priority: "medium",
        linkedValue: "Open-Mindedness",
        energyCost: "low",
      },
      {
        rank: 3,
        title: "Prepare two reading group questions",
        scheduledStart: "15:00",
        scheduledEnd: "15:30",
        durationMinutes: 30,
        priority: "medium",
        linkedValue: "Open-Mindedness",
        energyCost: "medium",
      },
    ],
  },
  body: {
    currentEnergyLevel: 3,
    bodyState:
      "Sleep: 5.5 hours after a late bedtime; quality 68/100 with short duration and some restlessness. Activity: 4200 steps and 22 active minutes. Stress: elevated by short sleep and paper pressure.",
    sleepSummary: {
      summary:
        "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration and some restlessness.",
      durationHours: 5.5,
      targetHours: 7.5,
      bedtime: "01:05",
      wakeTime: "06:40",
      sleepQualityScore: 68,
      sleepEfficiencyPercent: 83,
      awakeMinutes: 28,
      restlessMinutes: 46,
    },
    activitySummary: "4200 steps and 22 active minutes; mostly light movement before a morning writing block.",
    stressSummary: "Stress is elevated by short sleep and paper pressure, so focus may need a softer start.",
    focusCues: {
      visual: [
        "laptop open to the paper draft",
        "three anchor papers beside the keyboard",
        "morning light coming through the window",
      ],
      auditory: ["quiet apartment hum"],
      tactileBody: ["second coffee in reach", "feet on the floor"],
      smell: ["coffee"],
      taste: ["coffee or water"],
      other: ["phone face down"],
    },
  },
  value: {
    topValues: [
      {
        name: "Independent Thinking",
        personalDefinition: "trusting my own questions before borrowing other people's",
        feelsLikeLabels: ["mentally clear", "self-trusting", "unboxed"],
        dailySignLabels: ["having room to think", "making decisions faster"],
      },
      {
        name: "Success",
        personalDefinition: "finishing what matters",
        feelsLikeLabels: ["accomplished", "focused", "competent"],
        dailySignLabels: ["finishing what matters", "visible progress"],
      },
      {
        name: "Open-Mindedness",
        personalDefinition: "staying curious about answers I did not expect",
        feelsLikeLabels: ["curious", "supported"],
        dailySignLabels: ["learning something"],
      },
    ],
    idealLife: {
      statement: "A life where I think and write on my own questions",
      lifeShapeLabels: ["independent research", "deep work mornings"],
    },
  },
};

const armOrder = ["baseline", "mind", "body", "soul", "full"];

function taskForMindInput(task) {
  const { linkedValue, energyCost, ...visibleTask } = task;
  return visibleTask;
}

function mindInputForGeneration(mind) {
  return {
    userGoal: mind.userGoal,
    calendarEvents: mind.calendarEvents,
    prioritySchedule: mind.prioritySchedule.map(taskForMindInput),
  };
}

const mayaMindInput = mindInputForGeneration(mayaDailyInput.mind);

const armInputs = {
  baseline: mayaDailyInput.baseline,
  mind: mayaMindInput,
  body: mayaDailyInput.body,
  soul: mayaDailyInput.value,
  full: {
    mind: mayaMindInput,
    body: mayaDailyInput.body,
    value: mayaDailyInput.value,
  },
};

const systemPrompt = `You write experimental study stimuli for a daily mental-preparation comparison.

Write one participant-facing script only. Do not mention arms, modules, bundles, prompts, models, or missing fields.

Critical ablation rule:
- Use only the input JSON provided in the user message.
- Treat every other module as unavailable, even if you can infer plausible details from the scenario name.
- Do not import details from other conditions.

Length target:
- The script must be 145-175 words.
- Do not produce a script under 140 words.
- Use three paragraphs.

Style for mind/body/soul/full:
- Cue-guided mental rehearsal imagery, sports-psychology-inspired but adapted for daily life.
- Open a scene and invite the reader to imagine the rest.
- Use imagery questions evenly: what might it feel like, what might the mind be thinking, what might the body notice.
- Avoid direct commands like "you are doing X" as much as possible.

Baseline special rule:
- Baseline is not mental rehearsal imagery.
- Baseline should simply help the user mentally prepare for the day from the visible schedule, in plain planning language.
- Baseline should not include imagery questions.`;

const armRules = {
  baseline: `Generate the baseline script.

Use only the visible schedule and durations.
Do not mention priority, rank, goals, life priority, values, desired feelings, body state, energy, sleep, stress, activity, focus cues, environment cues, or sensory imagery.
Use plain mental-preparation and planning language, not guided imagery.`,

  mind: `Generate the mind-only script.

Use only MIND fields: userGoal and calendarEvents.
For daily scope, use the full calendarEvents list in time order as the rehearsal sequence.
Use each event's title, scheduled time, durationMinutes, and notes/descriptions as grounding cues.
Do not convert the day into a top-three list, priority ranking, or rank/order sequence.
For task scope in other scenarios, use subtask durations only if they are present; do not invent timing estimates for subtasks.
Use userGoal and life priority only for larger-goal context.
Do not mention linked value tags, task value labels, or phrases like "linked with" / "connected to [value]".
Do not mention body state, energy, sleep, stress, activity, focus cues, environment cues, sensory scene details, value definitions, ideal life, or desired-feeling labels.`,

  body: `Generate the body-only script.

Use only BODY fields: currentEnergyLevel, bodyState as coarse energy background, sleepSummary, activitySummary, stressSummary, and focusCues.
Primary goal: grounding the body before activity. Start with breath, posture, physical sensation, current energy, and concrete focus cues.
Translate sleep, activity, and stress summaries into plain body-state language.
Do not mention tasks, schedule, priority, rank, goals, life priority, values, ideal life, desired feelings, or task titles not present in focusCues.`,

  soul: `Generate the value-only script.

Use only VALUE fields: topValues, personalDefinition, feelsLikeLabels, dailySignLabels, and idealLife.
Primary goal: remind the user what matters and help them imagine moving through the day with those values.
Do not mention tasks, schedule, priority, rank, goals, life priority, body state, energy, sleep, stress, activity, focus cues, or environment cues.`,

  full: `Generate the full script.

Use MIND, BODY, and VALUE fields together.
Introduction: ground the body first with breath, posture, current energy, sleep/stress language, and focus cues.
Task visualization: use the full calendarEvents list in time order as the rehearsal sequence, including event notes/descriptions when present. Do not convert the day into a top-three list, priority ranking, or rank/order sequence.
Ending: connect back to the larger goal, life priority, values, ideal life, and credible belief that the user can move toward them.`,
};

const forbiddenPatterns = {
  baseline: [
    ["priority/rank", /\b(priorit(?:y|ies|ized)|rank(?:ed)?|top[- ]priority|highest[- ]priority)\b/i],
    ["mind goal", /\b(workshop paper|independent researcher|life priority|larger goal|own questions)\b/i],
    ["body data", /\b(energy|sleep|slept|stress|body state|coffee|morning light|apartment|feet on the floor|phone face down)\b/i],
    ["values", /\b(Independent Thinking|Open-Mindedness|values?|self-trusting|unboxed|mentally clear|accomplished|curious)\b/i],
  ],
  mind: [
    ["body data", /\b(energy|sleep|slept|stress|coffee|morning light|apartment|feet on the floor|phone face down|quiet apartment|body state)\b/i],
    ["value definitions", /\b(self-trusting|unboxed|mentally clear|accomplished|competent|curious|supported|ideal life)\b/i],
  ],
  body: [
    ["mind tasks", /\b(related work|TA emails?|reading group|workshop paper|independent researcher|life priority|rank|priority)\b/i],
    ["values", /\b(Independent Thinking|Open-Mindedness|Success|self-trusting|unboxed|mentally clear|accomplished|competent|curious|ideal life|own questions)\b/i],
  ],
  soul: [
    ["mind tasks", /\b(related work|TA emails?|reading group|workshop paper|rank|priority|90[- ]minute|20[- ]minute|30[- ]minute)\b/i],
    ["body data", /\b(energy|sleep|slept|stress|activity|steps|coffee|morning light|apartment|laptop|keyboard|anchor papers|feet on the floor|phone face down)\b/i],
  ],
  full: [],
};

const schema = {
  type: "object",
  properties: {
    script: { type: "string" },
  },
  required: ["script"],
  additionalProperties: false,
};

async function main() {
  const apiKey = await readEnvValue(["OPENAI_API_KEY", "EXPO_PUBLIC_OPENAI_API_KEY"]);
  if (!apiKey) {
    throw new Error("No OPENAI_API_KEY or EXPO_PUBLIC_OPENAI_API_KEY found.");
  }

  const model = (await readEnvValue(["ABLATION_OPENAI_MODEL", "OPENAI_MODEL"])) || "gpt-5.5";
  const baseUrl =
    (await readEnvValue(["OPENAI_BASE_URL", "EXPO_PUBLIC_OPENAI_BASE_URL"])) ||
    "https://api.openai.com/v1";

  const scripts = {};
  const wordCounts = {};
  const modelsByArm = {};

  for (const arm of armOrder) {
    const result = await generateArm({ arm, apiKey, baseUrl, model });
    scripts[arm] = result.script;
    wordCounts[arm] = result.wordCount;
    modelsByArm[arm] = result.model;
    console.log(`Generated ${arm}: ${result.model}, ${result.wordCount} words`);
  }

  await writeArtifacts({ requestedModel: model, modelsByArm, scripts, wordCounts });
}

async function generateArm({ arm, apiKey, baseUrl, model }) {
  let repairNote = "";
  let lastIssue = "";

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const raw = await requestScript({
      apiKey,
      baseUrl,
      payload: {
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: buildArmPrompt(arm, repairNote) },
        ],
        reasoning: { effort: "low" },
        text: {
          format: {
            type: "json_schema",
            name: `${arm}_maya_daily_script`,
            strict: true,
            schema,
          },
        },
        max_output_tokens: 900,
      },
    });

    const script = parseScript(raw);
    const count = wordCount(script);
    const leaks = findLeaks(arm, script);
    const countIssue = count < 140 || count > 185 ? `word count ${count} is outside 140-185` : "";

    if (!countIssue && leaks.length === 0) {
      return {
        script,
        wordCount: count,
        model: raw.model || model,
      };
    }

    lastIssue = [countIssue, leaks.length ? `possible leakage: ${leaks.join(", ")}` : ""]
      .filter(Boolean)
      .join("; ");
    repairNote = `Previous attempt failed validation: ${lastIssue}. Regenerate the ${arm} script only. Keep 145-175 words and obey the ablation boundaries exactly.`;
  }

  throw new Error(`Could not generate a valid ${arm} script after 3 attempts: ${lastIssue}`);
}

function buildArmPrompt(arm, repairNote) {
  return [
    `Generate ONLY the ${arm} script for scenario maya_daily.`,
    "",
    armRules[arm],
    "",
    "Return JSON matching this shape exactly:",
    '{ "script": "string" }',
    "",
    "Allowed input JSON:",
    JSON.stringify(armInputs[arm], null, 2),
    repairNote ? `\n${repairNote}` : "",
  ].join("\n");
}

async function requestScript({ apiKey, baseUrl, payload }) {
  const endpoint = `${baseUrl.replace(/\/$/, "")}/responses`;
  let response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    if (text.includes("reasoning.effort") && text.includes("unsupported_parameter")) {
      const retryPayload = { ...payload };
      delete retryPayload.reasoning;
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(retryPayload),
      });
      if (response.ok) return response.json();
    }
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  return response.json();
}

function parseScript(raw) {
  const parsed = JSON.parse(extractOutputText(raw));
  if (!parsed || typeof parsed.script !== "string" || !parsed.script.trim()) {
    throw new Error("OpenAI response did not include a non-empty script.");
  }
  return parsed.script.trim();
}

function findLeaks(arm, script) {
  return forbiddenPatterns[arm]
    .filter(([, pattern]) => pattern.test(script))
    .map(([label]) => label);
}

async function writeArtifacts({ requestedModel, modelsByArm, scripts, wordCounts }) {
  const artifact = {
    scenarioId: "maya_daily",
    generatedAt: new Date().toISOString(),
    model: Object.values(modelsByArm)[0] || requestedModel,
    requestedModel,
    modelsByArm,
    usedMock: false,
    inputsByArm: armInputs,
    wordCounts,
    scripts,
  };

  const markdown = [
    "# Maya Daily LLM Scripts",
    "",
    `Generated at: ${artifact.generatedAt}`,
    `Requested model: ${artifact.requestedModel}`,
    `Models by arm: ${JSON.stringify(modelsByArm)}`,
    "Used mock: false",
    "",
    ...Object.entries(scripts).flatMap(([arm, script]) => {
      return [
        `## ${arm} input`,
        "",
        "```json",
        JSON.stringify(armInputs[arm], null, 2),
        "```",
        "",
        `## ${arm} script (${wordCounts[arm]} words)`,
        "",
        script,
      ];
    }),
    "",
  ].join("\n");

  await mkdir(outputDir, { recursive: true });
  await writeFile(jsonPath, `${JSON.stringify(artifact, null, 2)}\n`);
  await writeFile(mdPath, markdown);
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
  console.log(`Requested model: ${artifact.requestedModel}`);
  console.log(`Models by arm: ${JSON.stringify(modelsByArm)}`);
  console.log(`Word counts: ${JSON.stringify(wordCounts)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
