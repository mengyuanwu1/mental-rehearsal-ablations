import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(".");
const artifactPath = path.join(repoRoot, "outputs", "llm_study_scripts.json");
const outputDir = path.join(repoRoot, "outputs");
const markdownPath = path.join(outputDir, "maya_daily_task_io_example.md");

const scenarioIds = ["maya_daily", "maya_task"];
const conditions = ["baseline", "mind", "body", "soul", "full"];

function fence(value, language = "") {
  return ["```" + language, value, "```"].join("\n");
}

function jsonFence(value) {
  return fence(JSON.stringify(value, null, 2), "json");
}

function headingForScenario(scenarioId, meta) {
  const scope = meta?.scope === "task" ? "Task Scope" : "Daily Scope";
  const title = meta?.contextTitle ?? scenarioId;
  const name = meta?.persona?.name ?? "Maya Chen";
  return `${scope}: ${name} - ${title}`;
}

function sectionOutput(sections, script) {
  if (!sections) {
    return [`### Output Script`, "", script].join("\n");
  }

  return [
    "### Output Sections",
    "",
    "#### Introduction",
    "",
    sections.introduction,
    "",
    "#### Task Visualization",
    "",
    sections.task_completion,
    "",
    "#### Ending",
    "",
    sections.ending,
    "",
    "### Output Script",
    "",
    script,
  ].join("\n");
}

async function main() {
  const artifact = JSON.parse(await readFile(artifactPath, "utf8"));
  const lines = [
    "---",
    "title: Maya Chen Daily + Task Mental Rehearsal Ablation Example",
    "geometry: margin=0.65in",
    "fontsize: 9pt",
    "colorlinks: true",
    "header-includes:",
    "  - \\lstset{breaklines=true,breakatwhitespace=false,basicstyle=\\ttfamily\\scriptsize,columns=fullflexible}",
    "---",
    "",
    "# Overview",
    "",
    `Generated at: ${artifact.generatedAt}`,
    "",
    `Requested model: ${artifact.requestedModel}`,
    "",
    `Generation source: ${artifact.generationSource}`,
    "",
    `Mock used: ${artifact.usedMock}`,
    "",
    "This PDF shows one matched persona across both scopes: Maya Chen daily rehearsal and Maya Chen task rehearsal. Each condition includes the input visible to that condition and the generated output shown in the experiment UI.",
    "",
  ];

  for (const scenarioId of scenarioIds) {
    const meta = artifact.scenarioMeta[scenarioId];
    lines.push("\\newpage", "", `# ${headingForScenario(scenarioId, meta)}`, "");

    if (meta) {
      lines.push(
        "## Scenario Metadata",
        "",
        jsonFence(meta),
        "",
      );
    }

    for (const condition of conditions) {
      const input = artifact.inputsByScenarioArm[scenarioId]?.[condition];
      const script = artifact.scripts[scenarioId]?.[condition];
      const sections = artifact.sectionsByScenarioArm[scenarioId]?.[condition];
      const model = artifact.modelsByScenarioArm[scenarioId]?.[condition];
      const source = artifact.generationSourceByScenarioArm[scenarioId]?.[condition];
      const words = artifact.wordCounts[scenarioId]?.[condition];
      const confidence = artifact.confidenceByScenarioArm[scenarioId]?.[condition];
      const omissions = artifact.omissionsByScenarioArm[scenarioId]?.[condition] ?? [];

      lines.push(
        `## Condition: ${condition}`,
        "",
        `Source: ${source}`,
        "",
        `Model: ${model}`,
        "",
        `Word count: ${words}`,
        "",
        `Confidence: ${confidence}`,
        "",
      );

      if (omissions.length) {
        lines.push("Omissions:", "", ...omissions.map((item) => `- ${item}`), "");
      }

      lines.push(
        "### Input",
        "",
        jsonFence(input),
        "",
        sectionOutput(sections, script),
        "",
      );
    }
  }

  await mkdir(outputDir, { recursive: true });
  await writeFile(markdownPath, `${lines.join("\n")}\n`, "utf8");
  console.log(markdownPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
