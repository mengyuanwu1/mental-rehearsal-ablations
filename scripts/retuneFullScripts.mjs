import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(".");
const artifactPaths = [
  path.join(repoRoot, "src", "data", "llmStudyScripts.json"),
  path.join(repoRoot, "outputs", "llm_study_scripts.json"),
];
const markdownPath = path.join(repoRoot, "outputs", "llm_study_scripts.md");
const conditions = ["baseline", "mind", "body", "soul", "full"];

const fullSections = {
  maya_daily: {
    introduction:
      "Take a slow breath in, and let the exhale give your ribs a little room. <pause 2 sec> Feel the chair holding you, feet on the floor, hands settling, and jaw softening. <pause 5 sec> With short, restless sleep and low energy, set morning light and coffee as anchors for focus.",
    task_completion:
      "You are on track toward becoming an independent researcher and submitting a strong workshop paper this month. Today's three priorities are Draft related work section at 9 AM, Answer TA emails at 1 PM, and Prepare two reading group questions at 3 PM. Imagine moving through those priorities one at a time. <pause 10 sec> How do you feel in your body as the writing block, emails, and reading questions move forward, and what do you sense in touch, sight, and sound? <pause 10 sec> How does it feel mentally as it connects to self-trust, competence, and curiosity? <pause 10 sec> You can complete the important pieces without forcing intensity.",
    ending:
      "Return to the core values underneath the work: independent thinking, finishing what matters, and staying open. I am becoming someone who can be tired and still think for myself. Say it slowly: My own questions deserve a clear voice, and one honest paragraph gives them one.",
  },
  maya_task: {
    introduction:
      "I take a quiet breath in, and let the exhale make a little space in my chest. <pause 2 sec> I feel the chair holding me, feet on the floor, hands settling, and jaw loosening. <pause 5 sec> With low energy and paper pressure, I set the paper draft and coffee as anchors for focus.",
    task_completion:
      "The feeling to rehearse is mentally clear and self-trusting as I complete Draft related work section for the CHI workshop paper. I move through the anchor papers, the gap statement, and the related-work connection as one honest pass. <pause 10 sec> How do I feel in my body as the section takes shape, and what do I sense in my hands, on the page, and in the quiet around me? <pause 10 sec> How does it feel mentally as it connects to my own questions, visible progress, and curiosity? <pause 10 sec> I can make the section complete enough for the next revision.",
    ending:
      "I return to independent thinking and work I can stand behind. I am becoming someone who writes from my own questions, even on a tired morning. Say it slowly: One honest pass gives my own questions a clearer voice.",
  },
  jonah_daily: {
    introduction:
      "Take one steady breath, and let the exhale lower the pace by a notch. <pause 2 sec> Feel the chair holding you, feet on the floor, hands settling, and jaw releasing. <pause 5 sec> With steady energy and manageable pressure, set the launch dashboard and water nearby as anchors for focus.",
    task_completion:
      "You are on track toward leading the launch review with clarity and responsibility. Today's three priorities are Finalize launch risk brief at 9:30 AM, Review support escalation notes at 11 AM, and Draft meeting opening at 2:10 PM. Imagine moving through those priorities one at a time. <pause 10 sec> How do you feel in your body as risks, notes, and the opening become easier to hold, and what do you notice in touch, sight, and sound? <pause 10 sec> How does it feel mentally as it connects to calm leadership, ownership, and useful decisions? <pause 10 sec> You can make the next decision visible without carrying the whole launch alone.",
    ending:
      "Return to the values underneath the work: clarity, responsibility, and steadiness. I am becoming someone who creates calm when the room gets noisy. Say it slowly: I can lead clearly without living in urgency.",
  },
  jonah_task: {
    introduction:
      "I take one steady breath, and let the exhale slow the pressure in my chest. <pause 2 sec> I feel the chair holding me, feet on the floor, hands settling, and jaw releasing. <pause 5 sec> With enough rest and moderate pressure, I set the risk brief outline and water bottle as anchors for focus.",
    task_completion:
      "The feeling to rehearse is calm, decisive clarity as I complete Finalize launch risk brief for the Feature launch review. I move through unresolved risks, owners, decision points, and the meeting summary as one useful pass. <pause 10 sec> How do I feel in my body as the brief becomes easier to discuss, and what do I sense in my hands, screen, and room sound? <pause 10 sec> How does it feel mentally as it connects to responsibility, clarity, and shared ownership? <pause 10 sec> I can make the brief complete enough for the review.",
    ending:
      "I return to calm leadership and the next visible decision. I am becoming someone who names the risk and shares the weight today. Say it slowly: Clear risk, clear owner, clear next decision.",
  },
  priya_daily: {
    introduction:
      "Let the next breath come in gently, then leave without hurry. <pause 2 sec> Feel the chair holding you, feet heavy on the floor, hands resting, and shoulders dropping. <pause 5 sec> With low energy after a long shift, set the tea and timer as anchors for focus.",
    task_completion:
      "You are on track toward building calm clinical judgment and staying current for Friday's exam. Today's three priorities are Review cardiac medication flashcards at 8:15 AM, Complete clinical reflection note at 10:20 AM, and Pack materials at 12:30 PM. Imagine moving through those priorities one at a time. <pause 10 sec> How do you feel in your body as the cards, note, and materials settle into order, and what do you sense in touch, sight, and sound? <pause 10 sec> How does it feel mentally as it connects to skilled care, steady presence, and learning? <pause 10 sec> You can complete the important pieces at a humane pace.",
    ending:
      "Return to the core values underneath the work: skilled care, learning, and steady presence. I am becoming someone who can be tired and still practice carefully. Say it slowly: My care deserves steady attention, one honest practice pass at a time.",
  },
  priya_task: {
    introduction:
      "I let the next breath come in gently, then leave without hurry. <pause 2 sec> I feel my feet settle, hands release, and shoulders soften. <pause 5 sec> With medium energy, I can make one complete pass. I set the checklist and water bottle as anchors for focus.",
    task_completion:
      "The feeling to rehearse is steady, capable, and present as I complete Practice assessment sequence for Simulation lab preparation. I move through safety checks, the spoken assessment sequence, and one instructor question as one complete walk-through. <pause 10 sec> How do I feel in my body as the sequence becomes easier to follow, and what do I sense in touch, sight, and hallway sound? <pause 10 sec> How does it feel mentally as it connects to careful learning, skilled care, and steady presence? <pause 10 sec> I can practice the sequence without forcing confidence.",
    ending:
      "I return to skilled care and the learning that comes from one full pass. I am becoming someone who can learn under pressure and stay present. Say it slowly: One steady practice pass builds the judgment I trust.",
  },
  alex_daily: {
    introduction:
      "Take one breath that gives the body a clear starting point. <pause 2 sec> Feel the chair holding you, feet meeting the floor, hands settling, and jaw loosening. <pause 5 sec> With steady energy and delivery stress nearby, set the deck outline and playlist as anchors for focus.",
    task_completion:
      "You are on track toward sending a strong pitch deck before the 4 PM client call. Today's three priorities are Build pitch deck narrative at 9 AM, Export client-ready mockups at 11 AM, and Send invoice reminder at 2:40 PM. Imagine moving through those priorities one at a time. <pause 10 sec> How do you feel in your body as the narrative, mockups, and reminder take shape, and what do you sense in touch, sight, and sound? <pause 10 sec> How does it feel mentally as it connects to originality, reliability, and creative freedom? <pause 10 sec> You can make the deck coherent without making every slide perfect.",
    ending:
      "Return to the core values underneath the work: original voice, reliable delivery, and sustainable freedom. I am becoming someone whose creative work becomes trustworthy by taking shape. Say it slowly: My original work moves steadily when I give it one clear form.",
  },
  alex_task: {
    introduction:
      "I take one breath that gives my body a clear starting point. <pause 2 sec> I feel my feet meet the floor, hands settling, and jaw softening. <pause 5 sec> With available energy and some direction stress, I can choose one clear shape. I set the deck outline and warm tablet as anchors for focus.",
    task_completion:
      "The feeling to rehearse is inventive, solid, and self-directed as I complete Build pitch deck narrative for the Client brand pitch. I move through the core story arc, strongest concept slides, and client transition notes as one clean pass. <pause 10 sec> How do I feel in my body as the deck story becomes easier to present, and what do I sense in touch, screen light, and sound? <pause 10 sec> How does it feel mentally as it connects to originality, visible trust, and freedom? <pause 10 sec> I can make the narrative complete enough for the call.",
    ending:
      "I return to original work delivered with steadiness. I am becoming someone whose creative practice stays independent because my delivery is clear. Say it slowly: My original voice becomes reliable when I give it one solid shape.",
  },
  serena_daily: {
    introduction:
      "Let the breath arrive quietly, and let the exhale make the next moment smaller. <pause 2 sec> Feel the chair holding you, feet on the floor, hands settling, and jaw softening. <pause 5 sec> With low energy and moderate stress, set mug warmth and the open outline as anchors for focus.",
    task_completion:
      "You are on track toward humane advocacy and a clear first draft by noon. Today's three priorities are Draft argument section, Confirm pickup logistics, and Send case update to co-counsel. Imagine moving through those priorities one at a time. <pause 10 sec> How do you feel in your body as the draft, logistics, and update become manageable, and what do you sense in touch, sight, and sound? <pause 10 sec> How does it feel mentally as it connects to justice, care, and diligence? <pause 10 sec> You can move the argument forward without losing your humanity.",
    ending:
      "Return to the core values underneath the work: justice, care, and humane advocacy. I am becoming someone who can be tired and still protect what matters. Say it slowly: My care deserves clear words, and my clarity can move at a humane pace.",
  },
  serena_task: {
    introduction:
      "I let the breath arrive quietly, and let the exhale make the next moment smaller. <pause 2 sec> I feel the chair holding me, feet on the floor, hands settling, and jaw softening. <pause 5 sec> With low energy and a compressed window, I set mug warmth and the argument outline as anchors for focus.",
    task_completion:
      "The feeling to rehearse is clear, steady, purposeful care as I complete Draft argument section for the Public-interest case brief. I move through the outline, strongest claim paragraph, and precedent tied to client facts as one coherent draft. <pause 10 sec> How do I feel in my body as the argument becomes easier to revise, and what do I sense in touch, screen light, and quiet sound? <pause 10 sec> How does it feel mentally as it connects to justice, care, and diligence? <pause 10 sec> I can make the section complete enough for review.",
    ending:
      "I return to humane advocacy and one clear next paragraph. I am becoming someone who does rigorous work without losing care. Say it slowly: My care deserves clear words, and one steady draft protects what matters.",
  },
};

const pauseMarkerPattern = /<pause\s+\d+(?:\.\d+)?\s*(?:s|sec|secs|second|seconds)>/gi;
const wordCount = (text) =>
  text.replace(pauseMarkerPattern, " ").trim().split(/\s+/).filter(Boolean).length;

function addFullFlowCues(sections) {
  return {
    introduction: `${sections.introduction} Tap next once you feel grounded.`,
    task_completion: `${sections.task_completion} Take time with the image, and tap next when ready.`,
    ending: `${sections.ending} Tap next when you are ready to carry it forward.`,
  };
}

for (const artifactPath of artifactPaths) {
  const artifact = JSON.parse(await readFile(artifactPath, "utf8"));

  for (const [scenarioId, sections] of Object.entries(fullSections)) {
    if (!artifact.scripts?.[scenarioId]?.full) {
      throw new Error(`Missing full script for ${scenarioId} in ${artifactPath}`);
    }

    const cuedSections = addFullFlowCues(sections);
    const script = [
      cuedSections.introduction,
      cuedSections.task_completion,
      cuedSections.ending,
    ].join("\n\n");

    artifact.scripts[scenarioId].full = script;
    artifact.sectionsByScenarioArm[scenarioId].full = cuedSections;
    artifact.wordCounts[scenarioId].full = wordCount(script);
    artifact.generationSourceByScenarioArm[scenarioId].full =
      "manual.full_final_pause_question_retune";
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

for (const [scenarioId, sections] of Object.entries(fullSections)) {
  const cuedSections = addFullFlowCues(sections);
  const script = [
    cuedSections.introduction,
    cuedSections.task_completion,
    cuedSections.ending,
  ].join("\n\n");
  const sentences = script
    .replace(pauseMarkerPattern, " ")
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((item) => item.trim())
    .filter(Boolean) ?? [];
  const maxSentenceWords = Math.max(
    ...sentences.map((sentence) => sentence.split(/\s+/).filter(Boolean).length),
  );
  console.log(
    `${scenarioId}: ${wordCount(script)} words, ${sentences.length} sentences, max ${maxSentenceWords}`,
  );
}
