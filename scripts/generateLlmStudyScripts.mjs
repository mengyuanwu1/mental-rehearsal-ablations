import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const repoRoot = path.resolve(".");
const workspaceRoot = path.resolve("..");
const outputDir = path.join(repoRoot, "outputs");
const jsonPath = path.join(outputDir, "llm_study_scripts.json");
const mdPath = path.join(outputDir, "llm_study_scripts.md");

const arms = ["baseline", "mind", "body", "soul", "full"];

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

async function loadStudyInputs() {
  const sourcePath = path.join(repoRoot, "src", "data", "studyInputs.ts");
  const source = await readFile(sourcePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: false,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(transpiled)}`;
  const mod = await import(moduleUrl);
  return mod.studyInputScenarios;
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

function mindInputForScenario(scenario) {
  const mind = { userGoal: scenario.mind.userGoal };
  if (scenario.scope === "daily") {
    mind.prioritySchedule = scenario.mind.prioritySchedule;
  } else {
    mind.focusTask = scenario.mind.focusTask;
    mind.focusSubtasks = scenario.mind.focusSubtasks;
  }
  return mind;
}

function inputsForScenario(scenario) {
  const mind = mindInputForScenario(scenario);
  return {
    baseline: scenario.baselineInput,
    mind,
    body: scenario.energy,
    soul: scenario.value,
    full: {
      mind,
      body: scenario.energy,
      value: scenario.value,
    },
  };
}

const systemPrompt = `You write experimental study stimuli for a mental-preparation comparison.

Write one participant-facing script only. Do not mention arms, modules, bundles, prompts, models, missing fields, or experimental conditions.

Critical ablation rule:
- Use only the input JSON provided in the user message.
- Treat every other module as unavailable, even if you can infer plausible details from names or context.
- Do not import details from other conditions.

Length target:
- The script must be 220-300 words.
- Keep it close in reading load to the other scripts.
- Use three paragraphs.

Style for mind/body/soul/full:
- Cue-guided mental rehearsal imagery, sports-psychology-inspired but adapted for daily life.
- Open a scene and invite the reader to imagine the rest.
- Use imagery questions evenly: what might it feel like, what might the mind be thinking, what might the body notice.
- Avoid direct commands like "you are doing X" as much as possible.

Baseline special rule:
- Baseline is not mental rehearsal imagery.
- Baseline should simply help the user mentally prepare from the visible schedule or preparation list, in plain planning language.
- Baseline should not include imagery questions.`;

function armRule(arm, scenario) {
  if (arm === "baseline") {
    return `Generate the baseline script.

Use only the visible schedule/preparation list and durations.
Do not mention priority, rank, goals, life priority, values, desired feelings, body state, energy, sleep, HRV, recovery, activity, focus cues, environment cues, or sensory imagery.
Use plain mental-preparation and planning language, not guided imagery.`;
  }

  if (arm === "mind") {
    const scopeRule =
      scenario.scope === "daily"
        ? "For daily scope, use only the top 3 priority tasks in prioritySchedule as the task imagery sequence based on rank. Use each item's title, durationMinutes, priority, linkedValue, and order as light grounding cues. Use duration to ground the length and relative weight of the rehearsal."
        : "For task scope, use focusTask plus focusSubtasks as the task imagery sequence. Use task title, durationMinutes, priority, linkedValue, subtask order, and subtask durations as light grounding cues.";
    return `Generate the mind-only script.

Use only MIND fields: userGoal plus the schedule/task fields provided.
${scopeRule}
Use userGoal and life priority only for larger-goal context.
Do not mention body state, energy, sleep, HRV, recovery, activity, focus cues, environment cues, sensory scene details, value definitions, ideal life, or desired-feeling labels.`;
  }

  if (arm === "body") {
    return `Generate the body-only script.

Use only BODY fields: currentEnergyLevel, bodyState, sleepSummary, activitySummary, recoverySummary, hourlyEnergy, energyCurveInputs, and focusCues.
Primary goal: grounding the body before activity. Start with breath, posture, physical sensation, current energy, and concrete focus cues.
Translate sleep, activity, and recovery signals into plain body-state language.
Do not mention schedule, priority, rank, goals, life priority, values, ideal life, desired feelings, or task titles not present in focusCues.`;
  }

  if (arm === "soul") {
    return `Generate the value-only script.

Use only VALUE fields: topValues, personalDefinition, feelsLikeLabels, dailySignLabels, and idealLife.
Primary goal: remind the user what matters and help them imagine moving through the day with those values.
Do not mention tasks, schedule, priority, rank, goals, life priority, body state, energy, sleep, HRV, recovery, activity, focus cues, or environment cues.`;
  }

  const taskRule =
    scenario.scope === "daily"
      ? "Task visualization: use the top 3 priority tasks in rank order, proportionally weighting longer tasks more than shorter tasks."
      : "Task visualization: use focusTask and focusSubtasks in order, proportionally weighting longer subtasks more than shorter subtasks.";
  return `Generate the full script.

Use MIND, BODY, and VALUE fields together.
Introduction: ground the body first with breath, posture, current energy, sleep/recovery language, and focus cues.
${taskRule}
Ending: connect back to the larger goal, life priority, values, ideal life, and credible belief that the user can move toward them.`;
}

const schema = {
  type: "object",
  properties: {
    script: { type: "string" },
  },
  required: ["script"],
  additionalProperties: false,
};

function buildArmPrompt({ arm, scenario, allowedInput, repairNote }) {
  return [
    `Generate ONLY the ${arm} script for scenario ${scenario.id}.`,
    `Scenario scope: ${scenario.scope}.`,
    "",
    armRule(arm, scenario),
    "",
    "Return JSON matching this shape exactly:",
    '{ "script": "string" }',
    "",
    "Allowed input JSON:",
    JSON.stringify(allowedInput, null, 2),
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

function validationIssues(script) {
  const count = wordCount(script);
  const issues = [];
  if (count < 190 || count > 340) issues.push(`word count ${count} is outside 190-340`);
  return issues;
}

async function generateArm({ apiKey, baseUrl, model, scenario, arm, allowedInput }) {
  let repairNote = "";
  let lastIssues = [];

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const raw = await requestScript({
      apiKey,
      baseUrl,
      payload: {
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: buildArmPrompt({ arm, scenario, allowedInput, repairNote }) },
        ],
        reasoning: { effort: "low" },
        text: {
          format: {
            type: "json_schema",
            name: `${scenario.id}_${arm}_script`,
            strict: true,
            schema,
          },
        },
        max_output_tokens: 2048,
      },
    });

    const script = parseScript(raw);
    const issues = validationIssues(script);
    if (issues.length === 0) {
      return { script, model: raw.model || model, wordCount: wordCount(script) };
    }

    lastIssues = issues;
    repairNote = `Previous attempt failed validation: ${issues.join("; ")}. Regenerate this script only. Keep 220-300 words and obey the ablation boundaries exactly.`;
  }

  throw new Error(`Could not generate ${scenario.id}/${arm}: ${lastIssues.join("; ")}`);
}

function scenarioMeta(scenario) {
  return {
    id: scenario.id,
    scope: scenario.scope,
    persona: {
      name: scenario.persona.name,
      demographic: scenario.persona.demo,
      onboarding: scenario.persona.onboarding,
    },
    contextTitle: scenario.contextTitle,
  };
}

async function writeArtifacts(artifact) {
  const markdown = [
    "# Real LLM Study Scripts",
    "",
    `Generated at: ${artifact.generatedAt}`,
    `Requested model: ${artifact.requestedModel}`,
    "Used mock: false",
    "",
    ...Object.keys(artifact.scripts).flatMap((scenarioId) => [
      `# ${scenarioId}`,
      "",
      `Models by arm: ${JSON.stringify(artifact.modelsByScenarioArm[scenarioId])}`,
      `Word counts: ${JSON.stringify(artifact.wordCounts[scenarioId])}`,
      "",
      ...arms.flatMap((arm) => [
        `## ${arm} input`,
        "",
        "```json",
        JSON.stringify(artifact.inputsByScenarioArm[scenarioId][arm], null, 2),
        "```",
        "",
        `## ${arm} script (${artifact.wordCounts[scenarioId][arm]} words)`,
        "",
        artifact.scripts[scenarioId][arm],
        "",
      ]),
    ]),
  ].join("\n");

  await mkdir(outputDir, { recursive: true });
  await writeFile(jsonPath, `${JSON.stringify(artifact, null, 2)}\n`);
  await writeFile(mdPath, markdown);
}

async function main() {
  const apiKey = await readEnvValue(["OPENAI_API_KEY", "EXPO_PUBLIC_OPENAI_API_KEY"]);
  if (!apiKey) {
    throw new Error("No OPENAI_API_KEY or EXPO_PUBLIC_OPENAI_API_KEY found.");
  }

  const model = (await readEnvValue(["ABLATION_OPENAI_MODEL", "OPENAI_MODEL"])) || "gpt-5.5";
  const baseUrl =
    (await readEnvValue(["OPENAI_BASE_URL", "EXPO_PUBLIC_OPENAI_BASE_URL"])) ||
    "https://api.openai.com/v1";
  const scenarios = await loadStudyInputs();

  const artifact = {
    generatedAt: new Date().toISOString(),
    requestedModel: model,
    usedMock: false,
    scenarioMeta: Object.fromEntries(scenarios.map((scenario) => [scenario.id, scenarioMeta(scenario)])),
    inputsByScenarioArm: {},
    modelsByScenarioArm: {},
    wordCounts: {},
    scripts: {},
  };

  for (const scenario of scenarios) {
    const inputs = inputsForScenario(scenario);
    artifact.inputsByScenarioArm[scenario.id] = inputs;
    artifact.modelsByScenarioArm[scenario.id] = {};
    artifact.wordCounts[scenario.id] = {};
    artifact.scripts[scenario.id] = {};

    for (const arm of arms) {
      const result = await generateArm({
        apiKey,
        baseUrl,
        model,
        scenario,
        arm,
        allowedInput: inputs[arm],
      });

      artifact.scripts[scenario.id][arm] = result.script;
      artifact.modelsByScenarioArm[scenario.id][arm] = result.model;
      artifact.wordCounts[scenario.id][arm] = result.wordCount;
      console.log(`${scenario.id}/${arm}: ${result.model}, ${result.wordCount} words`);
      await writeArtifacts(artifact);
    }
  }

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
