import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import ts from "typescript";

const repoRoot = path.resolve(".");
const workspaceRoot = path.resolve("..");
const backendRoot = path.join(workspaceRoot, "backend");
const outputDir = path.join(repoRoot, "outputs");
const jsonPath = path.join(outputDir, "llm_study_scripts.json");
const mdPath = path.join(outputDir, "llm_study_scripts.md");
const bundledJsonPath = path.join(repoRoot, "src", "data", "llmStudyScripts.json");
const requestPlanPath = path.join(outputDir, "backend_study_request_plan.json");
const backendResultPath = path.join(outputDir, "backend_study_generation_results.json");
const backendRunnerPath = path.join(repoRoot, "scripts", "runBackendStudyGeneration.py");

const studyDate = "2026-05-28";
const conditions = ["baseline", "mind", "body", "soul", "full"];
const backendArms = ["mind", "body", "soul", "full"];

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

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function firstName(name) {
  return String(name || "").trim().split(/\s+/)[0] || "Participant";
}

function snakeFocusCues(focusCues) {
  return {
    visual: focusCues?.visual ?? [],
    auditory: focusCues?.auditory ?? [],
    tactile_body: focusCues?.tactileBody ?? [],
    smell: focusCues?.smell ?? [],
    taste: focusCues?.taste ?? [],
    other: focusCues?.other ?? [],
  };
}

function backendCalendarEvent(event) {
  return {
    event_id: event.eventId,
    title: event.title,
    date: studyDate,
    start_time: event.scheduledStart,
    end_time: event.scheduledEnd,
    duration_minutes: event.durationMinutes,
    description: event.description ?? event.notes ?? event.note ?? undefined,
    source: "native",
  };
}

function backendTaskFromPriority(scenarioId, item) {
  return {
    task_id: `${scenarioId}-priority-${item.rank}`,
    title: item.title,
    status: item.rank === 1 ? "in_progress" : "pending",
    priority: item.priority,
    linked_value: item.linkedValue,
    energy_cost: item.energyCost,
    duration_minutes: item.durationMinutes,
  };
}

function backendFocusTask(task) {
  return {
    task_id: task.taskId,
    title: task.title,
    status: "in_progress",
    priority: task.priority,
    project_title: task.projectTitle,
    linked_value: task.linkedValue,
    energy_cost: task.energyCost,
    duration_minutes: task.durationMinutes,
  };
}

function backendSubtasks(scenario) {
  const focusTaskId = scenario.mind.focusTask?.taskId;
  return (scenario.mind.focusSubtasks ?? []).map((subtask) => ({
    subtask_id: subtask.subtaskId,
    parent_task_id: focusTaskId,
    title: subtask.title,
    status: "pending",
    order: subtask.order,
    duration_minutes: subtask.durationMinutes,
  }));
}

function backendHealth(scenario) {
  const sleep = scenario.energy.sleepSummary ?? {};
  return {
    snapshot_date: studyDate,
    source: "fitbit",
    energy_level: scenario.energy.currentEnergyLevel,
    sleep_hours: sleep.durationHours,
    sleep_quality: sleep.sleepQualityScore,
    raw_data: {
      sleep_summary: sleep.summary,
      activity_summary: scenario.energy.activitySummary,
      stress_summary: scenario.energy.stressSummary,
    },
  };
}

function backendUserGoal(scenario) {
  const userGoal = scenario.mind.userGoal;
  return {
    userid: userGoal.userid,
    priority: {
      title: userGoal.priority?.title,
      description: userGoal.priority?.description,
      detail: userGoal.priority?.detail,
    },
    goal_1: {
      answers: userGoal.goal_1?.answers ?? {},
      completed: userGoal.goal_1?.completed,
      source: userGoal.goal_1?.source,
    },
  };
}

function backendValueClarifications(scenario) {
  return (scenario.value.topValues ?? []).map((value) => ({
    value_id: value.name,
    feels_like_labels: value.feelsLikeLabels ?? [],
    daily_sign_labels: value.dailySignLabels ?? [],
    emoji: value.emoji,
  }));
}

function backendRequestFor(scenario, arm) {
  const isDaily = scenario.scope === "daily";
  const tasks = isDaily
    ? (scenario.mind.prioritySchedule ?? []).map((item) =>
        backendTaskFromPriority(scenario.id, item),
      )
    : [backendFocusTask(scenario.mind.focusTask)];

  return {
    arm,
    scope: scenario.scope,
    focus_task_id: isDaily ? null : scenario.mind.focusTask?.taskId,
    user_id: scenario.persona.id,
    date: studyDate,
    display_name: firstName(scenario.persona.name),
    selected_values: (scenario.value.topValues ?? []).map((value) => value.name),
    sub_goals: scenario.persona.onboarding.customSubGoals ?? [],
    goal_state: {
      stage: "execute",
      goal_title: scenario.mind.userGoal.goal_1?.answers?.what,
      objective: scenario.mind.userGoal.goal_1?.answers?.what,
      horizon: scenario.persona.onboarding.timeframe,
      success_criteria: scenario.mind.userGoal.goal_1?.answers?.keySteps?.map(
        (step) => step.target || step.label,
      ) ?? [],
    },
    value_profile: {
      active_values: (scenario.value.topValues ?? []).map((value) => value.name),
      ideal_life_themes: scenario.value.idealLife?.lifeShapeLabels ?? [],
    },
    tasks,
    calendar_events: isDaily
      ? (scenario.mind.calendarEvents ?? []).map(backendCalendarEvent)
      : [],
    latest_health: backendHealth(scenario),
    onboarding_values: (scenario.value.topValues ?? []).map((value) => ({
      label: value.name,
      definition: value.personalDefinition,
    })),
    onboarding_goal_label: scenario.mind.userGoal.goal_1?.answers?.what,
    user_goal: backendUserGoal(scenario),
    ideal_life: {
      statement: scenario.value.idealLife?.statement,
      life_shape_labels: scenario.value.idealLife?.lifeShapeLabels ?? [],
    },
    value_clarifications: backendValueClarifications(scenario),
    focus_cues: snakeFocusCues(scenario.energy.focusCues),
    subtasks: isDaily ? [] : backendSubtasks(scenario),
  };
}

function scenarioMeta(scenario) {
  return {
    id: scenario.id,
    scope: scenario.scope,
    contextTitle: scenario.contextTitle,
    persona: {
      name: scenario.persona.name,
      demographic: scenario.persona.demo,
      onboarding: scenario.persona.onboarding,
    },
  };
}

function buildRequestPlan(scenarios, requestedModel) {
  return {
    generatedAt: new Date().toISOString(),
    requestedModel,
    studyDate,
    scenarios: scenarios.map((scenario) => ({
      id: scenario.id,
      scope: scenario.scope,
      meta: scenarioMeta(scenario),
      baseline: scenario.baselineInput,
      requests: Object.fromEntries(
        backendArms.map((arm) => [arm, backendRequestFor(scenario, arm)]),
      ),
    })),
  };
}

function runBackendGeneration() {
  const pythonPath = path.join(backendRoot, ".venv", "bin", "python");
  const result = spawnSync(pythonPath, [backendRunnerPath, requestPlanPath, backendResultPath], {
    cwd: backendRoot,
    env: {
      ...process.env,
      OPENAI_MODEL:
        process.env.ABLATION_OPENAI_MODEL || process.env.OPENAI_MODEL || "gpt-5.5",
      REUSE_EXISTING_BACKEND_RESULTS:
        process.env.REUSE_BACKEND_RESULTS === "1" ||
        process.env.REUSE_EXISTING_BACKEND_RESULTS === "1"
          ? "1"
          : "",
      REUSE_BASELINE_RESULTS:
        process.env.REUSE_BASELINE_RESULTS === "1" ? "1" : "",
      OVERRIDE_REHEARSAL_SYSTEM_PROMPT_PATH:
        process.env.OVERRIDE_REHEARSAL_SYSTEM_PROMPT_PATH || "",
      SCENARIO_FILTER: process.env.SCENARIO_FILTER || "",
      ARM_FILTER: process.env.ARM_FILTER || "",
    },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) {
    throw new Error(`Backend generation failed with exit code ${result.status}`);
  }
}

function buildArtifact({ scenarios, requestPlan, backendResults }) {
  const artifact = {
    generatedAt: new Date().toISOString(),
    requestedModel: requestPlan.requestedModel,
    usedMock: false,
    generationSource:
      backendResults.generationSource
      ?? "baseline=openai.vanilla_baseline_prompt; rehearsal=backend.generate_ablation_rehearsal",
    scenarioMeta: {},
    inputsByScenarioArm: {},
    generationSourceByScenarioArm: {},
    modelsByScenarioArm: {},
    wordCounts: {},
    scripts: {},
    sectionsByScenarioArm: {},
    omissionsByScenarioArm: {},
    confidenceByScenarioArm: {},
  };

  for (const scenario of scenarios) {
    const scenarioId = scenario.id;
    artifact.scenarioMeta[scenarioId] = scenarioMeta(scenario);
    artifact.inputsByScenarioArm[scenarioId] = {};
    artifact.generationSourceByScenarioArm[scenarioId] = {};
    artifact.modelsByScenarioArm[scenarioId] = {};
    artifact.wordCounts[scenarioId] = {};
    artifact.scripts[scenarioId] = {};
    artifact.sectionsByScenarioArm[scenarioId] = {};
    artifact.omissionsByScenarioArm[scenarioId] = {};
    artifact.confidenceByScenarioArm[scenarioId] = {};

    const baseline = backendResults.responses[scenarioId].baseline;
    if (!baseline) {
      throw new Error(`Missing generated baseline response for ${scenarioId}`);
    }
    artifact.inputsByScenarioArm[scenarioId].baseline = baseline.input;
    artifact.generationSourceByScenarioArm[scenarioId].baseline =
      baseline.generation_source ?? "openai.vanilla_baseline_prompt";
    artifact.modelsByScenarioArm[scenarioId].baseline = baseline.model;
    artifact.wordCounts[scenarioId].baseline = wordCount(baseline.script);
    artifact.scripts[scenarioId].baseline = baseline.script;
    artifact.sectionsByScenarioArm[scenarioId].baseline = null;
    artifact.omissionsByScenarioArm[scenarioId].baseline = [];
    artifact.confidenceByScenarioArm[scenarioId].baseline = "n/a";

    for (const arm of backendArms) {
      const response = backendResults.responses[scenarioId][arm];
      artifact.inputsByScenarioArm[scenarioId][arm] = response.input;
      artifact.generationSourceByScenarioArm[scenarioId][arm] =
        response.generation_source ?? "backend.generate_ablation_rehearsal";
      artifact.modelsByScenarioArm[scenarioId][arm] = response.model;
      artifact.wordCounts[scenarioId][arm] = wordCount(response.script);
      artifact.scripts[scenarioId][arm] = response.script;
      artifact.sectionsByScenarioArm[scenarioId][arm] = {
        introduction: response.introduction,
        task_completion: response.task_completion,
        ending: response.ending,
      };
      artifact.omissionsByScenarioArm[scenarioId][arm] = response.omissions ?? [];
      artifact.confidenceByScenarioArm[scenarioId][arm] = response.confidence;
    }
  }

  artifact.usedMock = Object.values(backendResults.responses).some((scenarioResponses) =>
    conditions.some((arm) => scenarioResponses[arm]?.used_mock),
  );

  return artifact;
}

function markdownForArtifact(artifact) {
  return [
    "# Backend Mental Rehearsal Study Scripts",
    "",
    `Generated at: ${artifact.generatedAt}`,
    `Requested model: ${artifact.requestedModel}`,
    `Generation source: ${artifact.generationSource}`,
    `Any backend mock used: ${artifact.usedMock}`,
    "",
    ...Object.keys(artifact.scripts).flatMap((scenarioId) => [
      `# ${scenarioId}`,
      "",
      `Models by arm: ${JSON.stringify(artifact.modelsByScenarioArm[scenarioId])}`,
      `Generation sources by arm: ${JSON.stringify(artifact.generationSourceByScenarioArm[scenarioId])}`,
      `Word counts: ${JSON.stringify(artifact.wordCounts[scenarioId])}`,
      "",
      ...conditions.flatMap((arm) => {
        const sections = artifact.sectionsByScenarioArm[scenarioId][arm];
        return [
          `## ${arm} input`,
          "",
          "```json",
          JSON.stringify(artifact.inputsByScenarioArm[scenarioId][arm], null, 2),
          "```",
          "",
          sections
            ? [
                `## ${arm} sections`,
                "",
                `### Introduction\n${sections.introduction}`,
                "",
                `### Task visualization\n${sections.task_completion}`,
                "",
                `### Ending\n${sections.ending}`,
                "",
              ].join("\n")
            : "",
          `## ${arm} script (${artifact.wordCounts[scenarioId][arm]} words)`,
          "",
          artifact.scripts[scenarioId][arm],
          "",
        ];
      }),
    ]),
  ].join("\n");
}

async function main() {
  const requestedModel = process.env.ABLATION_OPENAI_MODEL || process.env.OPENAI_MODEL || "gpt-5.5";
  const scenarios = await loadStudyInputs();
  const requestPlan = buildRequestPlan(scenarios, requestedModel);

  await mkdir(outputDir, { recursive: true });
  await writeFile(requestPlanPath, `${JSON.stringify(requestPlan, null, 2)}\n`);

  runBackendGeneration();

  const backendResults = JSON.parse(await readFile(backendResultPath, "utf8"));
  const artifact = buildArtifact({ scenarios, requestPlan, backendResults });
  const markdown = markdownForArtifact(artifact);

  await writeFile(jsonPath, `${JSON.stringify(artifact, null, 2)}\n`);
  await writeFile(bundledJsonPath, `${JSON.stringify(artifact, null, 2)}\n`);
  await writeFile(mdPath, markdown);

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${bundledJsonPath}`);
  console.log(`Wrote ${mdPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
