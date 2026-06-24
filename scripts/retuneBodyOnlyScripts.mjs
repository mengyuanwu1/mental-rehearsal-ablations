import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(".");
const artifactPaths = [
  path.join(repoRoot, "src", "data", "llmStudyScripts.json"),
  path.join(repoRoot, "outputs", "llm_study_scripts.json"),
];
const markdownPath = path.join(repoRoot, "outputs", "llm_study_scripts.md");
const conditions = ["baseline", "mind", "body", "soul", "full"];

const bodySections = {
  maya_daily: {
    introduction:
      "Notice the breath arriving on its own, with the chair under you and both feet meeting the floor. After short, restless sleep, the body may feel undercharged, so let contact, a quiet room sound, and the taste of coffee become enough to locate you.",
    task_completion:
      "Let the phone turned face down stay only as a soft boundary in the background. Morning light can register softly, not as a signal to move faster, but as one more sensation the body can receive. Some light movement is already in the legs, while stress may sit as tightness in the chest, face, stomach, or hands. You can sense the tiredness without turning it into a problem, and let one small area release.",
    ending:
      "The body does not need to be brighter before it can be here right now. Stay with one breath, one point of weight, and one small sound.",
  },
  maya_task: {
    introduction:
      "I feel one natural breath move in and out, and I let the chair take some of my weight without changing anything yet. My feet press into the floor, my hands rest, and the quiet apartment hum gives my attention a simple edge.",
    task_completion:
      "I notice low energy after shorter, restless sleep as a slower body, not a failure. Coffee warmth, floor contact, and the phone facedown become anchors that help me stay inside this moment. The warmth near my hands and muted room sound give me places to return when my attention scatters. Stress may show up in my chest, face, stomach, or hands, and I can soften one place without forcing calm.",
    ending:
      "I let my body keep its honest pace. I am here with breath, weight, sound, and enough steadiness for now, even if the body stays tired and uneven in this quiet space.",
  },
  jonah_daily: {
    introduction:
      "Begin with one breath that does not need to be improved, then feel the chair, feet, and hands as three steady contact points. A steady-enough night and moderate energy can feel like a middle charge in the body, awake but not overflowing.",
    task_completion:
      "Hand contact, low room noise, a water bottle, and coffee taste can gather attention without asking anything more from you. Earlier movement may leave a faint hum in the legs, while desk stillness may collect in the back, hips, or jaw. If pressure appears in the ribs, face, stomach, or fingers, let it be a signal you can feel without chasing.",
    ending:
      "The body does not need a verdict; it only needs clear contact and a little space around the pressure. Let the next exhale make a little more room. Stay with feet down, hands soft, and a body that can settle at its own pace.",
  },
  jonah_task: {
    introduction:
      "I feel one breath settle through my chest and belly without needing to change its rhythm, and I notice the chair holding my weight. My feet meet the floor, my hands touch the surface near me, and the water bottle gives the room a simple anchor.",
    task_completion:
      "I slept enough to be present in the body, with moderate pressure showing as tightness, alertness, or a quicker edge in my breathing. The room can stay simple around me: surface, bottle, breath, chair, and the pressure of my feet, all giving my attention enough places to land. Light movement is still in my legs, while sitting may gather in my back, hips, and hands. I can sense both without correcting either one.",
    ending:
      "I let my jaw soften and my shoulders make a little more space. I stay with feet down, breath steady, body here while the room stays simple around me.",
  },
  priya_daily: {
    introduction:
      "Notice the breath first, simple and unforced, then feel the feet heavy on the floor after the shift, exactly where they are. The chair holds the body, the hands rest, and the quiet kitchen, tea, or silenced phone can become plain anchors.",
    task_completion:
      "Six hours of sleep may feel like enough to be here but not enough to push hard or to pretend it has more. Tea warmth and background quiet can mark the present moment without asking the body to become more energetic. Low-to-moderate energy can show up as heaviness in the legs, a middle pace in the chest, and alertness left over from moving this morning. Let stress be felt as tightness or speed, then return to contact with the floor.",
    ending:
      "Nothing has to be solved in the body right now. Let one breath, one grounded seat, and one small release be enough for the next few breaths.",
  },
  priya_task: {
    introduction:
      "I feel one slow breath in and a longer breath out, without trying to improve it, with my feet settling under me. My back lengthens a little, my shoulders show their tension, and my hands notice the water bottle or another nearby surface.",
    task_completion:
      "I feel 6.7 hours of sleep today as a body that is awake enough, not fully topped up. The morning walk is still in my legs, water taste is still available as useful information, and moderate stress shows itself as tightness or quickness rather than danger. The room can remain plain: sound, bottle, floor, breath, and the weight of my body. I can let hallway sound, breathing, and floor contact keep me oriented when my attention lifts.",
    ending:
      "I do not need to force calm to soften a fraction. I stay somewhat alert, somewhat tense, and steadily here inside this ordinary body state.",
  },
  alex_daily: {
    introduction:
      "Take a natural breath and feel the body supported before noticing anything around it, without asking it to perform. The chair, tucked feet, resting hands, and a soft jaw can hold attention while the room sound stays in the background.",
    task_completion:
      "Usable sleep may leave the body relatively rested, with steady energy that does not need to be pushed. The morning stretch and early steps can still appear as warmth, circulation, or ease through the shoulders, back, and legs. The screen glow and nearby surface can be noticed only as light, shape, and hand sensation. Let the stylus, coffee smell, and nearby shapes be simple sensory marks, not demands.",
    ending:
      "If stress appears as pressure or speed, give it a little room beside the support already here. Let one breath and one point of contact carry the body into a calmer pace today, without needing a bigger shift.",
  },
  alex_task: {
    introduction:
      "I feel one slow breath move through my body without changing it, and I notice where the chair supports me. My feet meet the floor, my hand senses the stylus, and the warmth nearby gives my fingers a simple place to settle.",
    task_completion:
      "I feel relatively rested from sleep, with usable energy and a mild echo of morning stretch in my shoulders and back. The object in my hand is only texture and weight, something simple for attention to touch. Some stress may appear as pressure in my chest, jaw, or hands, and I can make room for it without trying to erase it. Coffee smell, surface contact, and background sound keep my attention close to the body.",
    ending:
      "I let my face soften with the next exhale and my shoulders drop a little now. I am here with feet down and breath steady inside this small room.",
  },
  serena_daily: {
    introduction:
      "Let the next natural breath arrive right now, and feel the body meet whatever is holding it. Feet on the floor, hands around the mug, muted alerts, and the quiet apartment can become gentle anchors without asking attention to sharpen or effort to rise.",
    task_completion:
      "Less than a full night of sleep may leave the morning slightly compressed inside the body. Limited energy and present stress can feel like heaviness, tightness, or a quicker pace under the ribs and skin. The rest of the day can stay distant while the body listens to warmth, sound, and contact. Let the warmth in the hands, the tea smell, and the chair pulled close keep the body from rushing past tiredness.",
    ending:
      "This can be a steady arrival rather than a push, just enough. Stay with contact, breath, and one small softening in the jaw or shoulders for a few breaths.",
  },
  serena_task: {
    introduction:
      "I notice one natural breath moving in and out, without needing to deepen it. My feet plant under the desk, the chair supports me, and the mug warms my hands as my fingers feel heat and shape.",
    task_completion:
      "I feel a body that has slept some, but not fully, with the morning a little compressed and slightly heavy inside it. The room can be nothing more than support, warmth, muted sound, and the small rhythm of breathing. Moderate stress shows up as a tighter pace in my chest, face, or hands, while tea smell and tea taste keep me close to the present. I can let muted alerts stay in the background as sound.",
    ending:
      "I stay with contact, breath, and warmth, moving at an honest pace that does not need force or hurry right now. I am here enough for this moment now inside this small, warm boundary.",
  },
};

const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

for (const artifactPath of artifactPaths) {
  const artifact = JSON.parse(await readFile(artifactPath, "utf8"));

  for (const [scenarioId, sections] of Object.entries(bodySections)) {
    if (!artifact.scripts?.[scenarioId]?.body) {
      throw new Error(`Missing body script for ${scenarioId} in ${artifactPath}`);
    }

    const script = [
      sections.introduction,
      sections.task_completion,
      sections.ending,
    ].join("\n\n");

    artifact.scripts[scenarioId].body = script;
    artifact.sectionsByScenarioArm[scenarioId].body = sections;
    artifact.wordCounts[scenarioId].body = wordCount(script);
    artifact.generationSourceByScenarioArm[scenarioId].body =
      "manual.body_only_section_flex_retune";
  }

  await writeFile(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(`Updated ${artifactPath}`);
}

const markdownForArtifact = (artifact) =>
  [
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

const outputArtifact = JSON.parse(await readFile(artifactPaths[1], "utf8"));
await writeFile(markdownPath, markdownForArtifact(outputArtifact));
console.log(`Updated ${markdownPath}`);

for (const [scenarioId, sections] of Object.entries(bodySections)) {
  const script = [sections.introduction, sections.task_completion, sections.ending].join("\n\n");
  console.log(`${scenarioId}: ${wordCount(script)} words`);
}
