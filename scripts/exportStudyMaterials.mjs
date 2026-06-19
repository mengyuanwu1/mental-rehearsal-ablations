import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("outputs");
const assignmentPath = path.join(outputDir, "assignment_slots.csv");
const previewPath = path.join(outputDir, "maya_daily_scripts.md");
const generatedScriptsPath = path.resolve("src/data/llmStudyScripts.json");

const slotCount = 10;
const trialsPerSlot = 2;
const conditions = ["baseline", "mind", "body", "soul", "full"];
const scenarios = [
  "maya_daily",
  "jonah_daily",
  "priya_daily",
  "alex_daily",
  "serena_daily",
];

const conditionPairs = [];
for (let i = 0; i < conditions.length; i += 1) {
  for (let j = i + 1; j < conditions.length; j += 1) {
    conditionPairs.push([conditions[i], conditions[j]]);
  }
}

const pairScheduleByAssignment = [
  [0, 3],
  [0, 6],
  [1, 3],
  [2, 6],
  [0, 8],
  [9, 1],
  [3, 2],
  [6, 1],
  [8, 2],
  [9, 0],
];

function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shouldSwapOrder(assignmentId, trialIndex) {
  return hashString(`${assignmentId}:${trialIndex}:script-order`) % 2 === 0;
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportAssignments() {
  const rows = [
    [
      "assignmentId",
      "trialIndex",
      "scenarioId",
      "pairIndex",
      "leftCondition",
      "rightCondition",
    ],
  ];

  for (let assignmentId = 0; assignmentId < slotCount; assignmentId += 1) {
    const pairSchedule = pairScheduleByAssignment[assignmentId];

    for (let trialIndex = 0; trialIndex < trialsPerSlot; trialIndex += 1) {
      const pairIndex = pairSchedule[trialIndex];
      const scenarioIndex = (assignmentId * trialsPerSlot + trialIndex) % scenarios.length;
      const [firstCondition, secondCondition] = conditionPairs[pairIndex];
      const swap = shouldSwapOrder(assignmentId, trialIndex);
      rows.push([
        assignmentId,
        trialIndex,
        scenarios[scenarioIndex],
        pairIndex,
        swap ? secondCondition : firstCondition,
        swap ? firstCondition : secondCondition,
      ]);
    }
  }

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function wordCount(text) {
  return text.trim().split(/\s+/).length;
}

async function exportPreview() {
  const artifact = JSON.parse(await readFile(generatedScriptsPath, "utf8"));
  const scripts = artifact.scripts?.maya_daily ?? {};
  const wordCounts = artifact.wordCounts?.maya_daily ?? {};
  const sections = conditions.map((condition) => {
    const script = scripts[condition] ?? "";
    const count = wordCounts[condition] ?? wordCount(script);
    return `## ${condition} (${count} words)\n\n${script}`;
  });

  return [
    "# Maya Daily Script Preview",
    "",
    "Scenario: `maya_daily`",
    "Goal: similar reading load across baseline, mind, body, soul, full.",
    "",
    ...sections,
    "",
  ].join("\n");
}

await mkdir(outputDir, { recursive: true });
await writeFile(assignmentPath, `${exportAssignments()}\n`);
await writeFile(previewPath, await exportPreview());

console.log(`Wrote ${assignmentPath}`);
console.log(`Wrote ${previewPath}`);
