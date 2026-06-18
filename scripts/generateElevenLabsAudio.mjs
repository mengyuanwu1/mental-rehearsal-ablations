import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const conditions = ["baseline", "mind", "body", "soul", "full"];
const segments = [
  ["introduction", "introduction"],
  ["middle", "task_completion"],
  ["ending", "ending"],
];
const envPaths = [
  path.resolve(".env.local"),
  path.resolve(".env"),
  path.resolve("../frontend/.env.local"),
];
const artifactPath = path.resolve("src/data/llmStudyScripts.json");
const manifestPath = path.resolve("src/data/audioManifest.json");
const outputManifestPath = path.resolve("outputs/audio_manifest.json");
const publicAudioDir = path.resolve("public/audio");

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (!match) return null;
  const [, key, rawValue] = match;
  const value = rawValue.replace(/^['"]|['"]$/g, "");
  return [key, value];
}

async function loadLocalEnv() {
  const values = {};
  for (const filePath of envPaths) {
    try {
      const contents = await readFile(filePath, "utf8");
      for (const line of contents.split(/\r?\n/)) {
        const parsed = parseEnvLine(line);
        if (parsed && values[parsed[0]] === undefined) {
          values[parsed[0]] = parsed[1];
        }
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return { ...values, ...process.env };
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function envFilterSet(value) {
  return new Set(
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function splitTextIntoThree(text) {
  const paragraphs = text.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  if (paragraphs.length >= 3) {
    return {
      introduction: paragraphs[0],
      middle: paragraphs.slice(1, -1).join("\n\n"),
      ending: paragraphs[paragraphs.length - 1],
    };
  }

  const sentences = text
    .replace(/\s+/g, " ")
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((item) => item.trim())
    .filter(Boolean) ?? [text.trim()];
  const firstCut = Math.max(1, Math.ceil(sentences.length / 3));
  const secondCut = Math.max(firstCut + 1, Math.ceil((sentences.length * 2) / 3));
  return {
    introduction: sentences.slice(0, firstCut).join(" "),
    middle: sentences.slice(firstCut, secondCut).join(" "),
    ending: sentences.slice(secondCut).join(" ") || sentences[sentences.length - 1],
  };
}

function scriptSegmentsFor(artifact, scenarioId, condition) {
  const sections = artifact.sectionsByScenarioArm?.[scenarioId]?.[condition];
  if (sections) {
    return {
      introduction: sections.introduction,
      middle: sections.task_completion,
      ending: sections.ending,
    };
  }

  return splitTextIntoThree(artifact.scripts?.[scenarioId]?.[condition] ?? "");
}

async function fileSize(filePath) {
  try {
    return (await stat(filePath)).size;
  } catch (error) {
    if (error.code === "ENOENT") return 0;
    throw error;
  }
}

async function synthesize({ apiKey, modelId, outputFormat, speed, text, voiceId }) {
  const url = new URL(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`);
  url.searchParams.set("output_format", outputFormat);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability: 0.78,
        similarity_boost: 0.82,
        style: 0,
        speed,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `ElevenLabs ${response.status} ${response.statusText}: ${errorText.slice(0, 500)}`,
    );
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const env = await loadLocalEnv();
  const apiKey = env.ELEVENLABS_API_KEY || env.XI_API_KEY || env.ELEVEN_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing ELEVENLABS_API_KEY. Add it to mental-rehearsal-ablations/.env.local or export it in the shell.",
    );
  }

  const voiceId = env.ELEVENLABS_VOICE_ID || "jwjWpCFQUCpnHneBySsF";
  const modelId = env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
  const outputFormat = env.ELEVENLABS_OUTPUT_FORMAT || "mp3_44100_128";
  const speed = Number(env.ELEVENLABS_SPEED || "0.8");
  if (!Number.isFinite(speed) || speed <= 0) {
    throw new Error("ELEVENLABS_SPEED must be a positive number.");
  }
  const force = env.FORCE_AUDIO === "1" || process.argv.includes("--force");
  const scenarioFilter = envFilterSet(env.SCENARIO_FILTER);
  const conditionFilter = envFilterSet(env.ARM_FILTER || env.CONDITION_FILTER);
  const segmentFilter = envFilterSet(env.SEGMENT_FILTER);
  const artifact = JSON.parse(await readFile(artifactPath, "utf8"));
  const audioByScenarioArm = {};
  const files = [];

  await mkdir(publicAudioDir, { recursive: true });
  await mkdir(path.dirname(outputManifestPath), { recursive: true });

  for (const scenarioId of Object.keys(artifact.scripts ?? {})) {
    if (scenarioFilter.size > 0 && !scenarioFilter.has(scenarioId)) continue;
    audioByScenarioArm[scenarioId] = {};
    const scenarioDir = path.join(publicAudioDir, scenarioId);
    await mkdir(scenarioDir, { recursive: true });

    for (const condition of conditions) {
      if (conditionFilter.size > 0 && !conditionFilter.has(condition)) continue;
      const script = artifact.scripts?.[scenarioId]?.[condition];
      if (!script) continue;

      const conditionDir = path.join(scenarioDir, condition);
      await mkdir(conditionDir, { recursive: true });
      audioByScenarioArm[scenarioId][condition] = {};
      const segmentTexts = scriptSegmentsFor(artifact, scenarioId, condition);

      for (const [segmentId] of segments) {
        const text = segmentTexts[segmentId]?.trim();
        if (!text) continue;

        const relativePath = `audio/${scenarioId}/${condition}/${segmentId}.mp3`;
        const absolutePath = path.join(conditionDir, `${segmentId}.mp3`);
        const existingSize = await fileSize(absolutePath);

        const forceSegment = force && (segmentFilter.size === 0 || segmentFilter.has(segmentId));

        if (existingSize > 0 && !forceSegment) {
          audioByScenarioArm[scenarioId][condition][segmentId] = relativePath;
          files.push({
            scenarioId,
            condition,
            segmentId,
            path: relativePath,
            bytes: existingSize,
            words: wordCount(text),
            status: "reused",
          });
          console.log(`${scenarioId}/${condition}/${segmentId}: reused ${relativePath}`);
          continue;
        }

        console.log(`${scenarioId}/${condition}/${segmentId}: generating ${wordCount(text)} words`);
        const audio = await synthesize({
          apiKey,
          modelId,
          outputFormat,
          speed,
          text,
          voiceId,
        });
        await writeFile(absolutePath, audio);
        audioByScenarioArm[scenarioId][condition][segmentId] = relativePath;
        files.push({
          scenarioId,
          condition,
          segmentId,
          path: relativePath,
          bytes: audio.length,
          words: wordCount(text),
          status: "generated",
        });
        console.log(`${scenarioId}/${condition}/${segmentId}: wrote ${audio.length} bytes`);
      }
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    provider: "elevenlabs",
    modelId,
    voiceId,
    outputFormat,
    speed,
    audioByScenarioArm,
    files,
  };
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  await writeFile(manifestPath, serialized);
  await writeFile(outputManifestPath, serialized);
  console.log(`Wrote ${manifestPath}`);
  console.log(`Wrote ${outputManifestPath}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
