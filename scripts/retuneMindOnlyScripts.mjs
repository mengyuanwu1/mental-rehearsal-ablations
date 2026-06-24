import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(".");
const artifactPaths = [
  path.join(repoRoot, "src", "data", "llmStudyScripts.json"),
  path.join(repoRoot, "outputs", "llm_study_scripts.json"),
];
const markdownPath = path.join(repoRoot, "outputs", "llm_study_scripts.md");
const conditions = ["baseline", "mind", "body", "soul", "full"];

const mindSections = {
  maya_daily: {
    introduction:
      "Today's work stays close to the workshop paper. The related work section gets the clearest attention, while TA emails and reading group questions stay contained parts of the day without turning into a full schedule rehearsal.",
    task_completion:
      "The useful finish is a related work section with papers grouped, a plain gap statement, and enough connection back to the paper's contribution to revise later. The 90-minute writing block does not need a perfect literature map; it needs a coherent draft that can survive feedback. Teaching email and reading group prep can remain short, defined tasks after that main writing pass. If the order of prior work feels uncertain, choose the strongest current order and leave one revision note.",
    ending:
      "The next doable action is opening the section and writing the first paragraph in the current best order today, without reopening every decision. Once that exists, the paper has moved forward.",
  },
  maya_task: {
    introduction:
      "I keep the CHI workshop paper as the frame and Draft related work section as the focus for this writing session. The useful target is one coherent section draft, not a final literature review or a perfect map of the field.",
    task_completion:
      "I start by re-reading the three anchor papers' findings sections and pulling forward only the claims that matter for this paper. Then I draft the gap statement in direct language, enough for an advisor to respond to without guessing the point. After that, I connect the related work back to the gap so the section points toward the contribution instead of only summarizing prior studies. The section can remain rough and still be useful as a base for revision.",
    ending:
      "I move the paper forward by making the next paragraph usable. The next doable action is choosing the current best order and writing into it.",
  },
  jonah_daily: {
    introduction:
      "Today's work centers on the launch review. The risk brief is the main document, with the meeting opening and support escalation notes kept close enough to make the review usable without spreading attention across every calendar item.",
    task_completion:
      "The brief needs three to five unresolved risks, owners, decision points, and a short opening summary before the 3:00 PM review. The 60-minute block is mostly for turning scattered risk knowledge into a document the meeting can start from. The opening can stay short, and the support notes only need to sharpen what the review should not miss. If wording starts to sprawl, keep the clearest current version and mark uncertain language for later.",
    ending:
      "The next doable action is opening the brief and naming the first unresolved risk in usable language for the review today. One clear risk makes the rest easier to place in the document before review.",
  },
  jonah_task: {
    introduction:
      "I keep the Feature launch review as the frame and Finalize launch risk brief as the focus for this hour. The useful target is a meeting-ready brief before the review, clear enough for discussion rather than final forever.",
    task_completion:
      "I start by naming the top unresolved launch risks, narrowing the list to the few items that actually need review attention. Then I assign owners and decision points so each risk has a clear place in the conversation. After that, I write the meeting-ready summary in plain language, showing what is at stake, what needs a decision, and what is ready to discuss. The brief does not need to answer every issue to be usable before people enter the room.",
    ending:
      "I move the launch review forward by making the first risk clear enough to discuss today. From there, each owner and decision point has somewhere to attach.",
  },
  priya_daily: {
    introduction:
      "Today is organized around pharmacology review and staying current on coursework. The flashcard set leads, with the clinical reflection note and afternoon materials kept simple enough that the morning does not become scattered.",
    task_completion:
      "The useful finish is one cardiac medication set reviewed, one clinical reflection note completed, and materials packed before class. The flashcards get the clearest attention because they support Friday's exam and make the rest of the morning easier to place. The reflection note can be complete without becoming elaborate, and packing materials is a short closing task that should not take over the review block. If a few medication details are confusing, mark them and continue through the set before circling back.",
    ending:
      "The next doable action is opening the cardiac set and taking the first clean pass through it before lecture this morning. That gives the morning a clear, useful start point.",
  },
  priya_task: {
    introduction:
      "I keep Simulation lab preparation as the frame and Practice assessment sequence as the focus for this pass before the lab. The useful target is one complete walk-through before lab, enough to show what is known and what needs one question.",
    task_completion:
      "I start by reviewing the opening patient safety checks so the first moves are clear. Then I walk through the assessment sequence aloud, keeping the order intact from start to finish. After that, I mark one question to ask the instructor, based on the part of the pass that most needs clarification. The task is complete enough when the sequence has been spoken once and the learning question is specific rather than vague.",
    ending:
      "I move preparation forward by starting with the safety checks and keeping the sequence in order through the whole pass today. One complete pass gives the lab a clearer entry point.",
  },
  alex_daily: {
    introduction:
      "Today is centered on the client pitch deck before the 4:00 PM call. The narrative comes first, then mockup export and the invoice reminder stay bounded so the deck does not lose its through-line.",
    task_completion:
      "The useful finish is a deck narrative with one core story arc, the strongest concept slides in sequence, and enough call notes to present the flow. The 80-minute narrative block matters most because it decides what the later export is actually exporting. Mockups can follow once the story is coherent, and the invoice reminder can stay brief instead of becoming another open thread. If slide order starts expanding again, choose the strongest current sequence and keep the deck moving toward export.",
    ending:
      "The next doable action is choosing the core story arc and placing the first slide around it for the client call today. That decision moves the whole deck forward today.",
  },
  alex_task: {
    introduction:
      "I keep the Client brand pitch as the frame and Build pitch deck narrative as the focus for this work period. The useful target is a coherent deck story for the call, not a perfect final presentation.",
    task_completion:
      "I start by choosing the core story arc, letting one narrative direction lead instead of keeping every angle alive. Then I sequence the strongest concept slides so the deck has a clear opening, a persuasive middle, and a usable close. After that, I write transition notes for the client call, giving each handoff enough language to be presented without rebuilding the deck. The narrative can be client-ready before every slide is perfect or every alternate route is resolved.",
    ending:
      "I move the pitch forward by making the next slide decision and letting that choice organize the sequence. Once the arc is chosen, the rest of the deck has a path.",
  },
  serena_daily: {
    introduction:
      "Today's main work is the argument section draft due by noon. Pickup logistics and the co-counsel update stay contained around the morning writing block, so the draft remains the center.",
    task_completion:
      "The useful finish is a complete first draft of the argument section, with an outline pass, a strongest-claim paragraph, and precedent tied back to client facts. The 85-minute writing block matters most because it turns the section from open material into something reviewable. The logistics item can be brief, and the co-counsel update can use what the draft clarifies without pulling the morning away from writing. If a sentence starts absorbing too much time, mark it and keep the section moving.",
    ending:
      "The next doable action is opening the argument outline and starting the first pass before the noon target today. A reviewable draft begins with that narrow entry point into the section itself right now.",
  },
  serena_task: {
    introduction:
      "I keep the Public-interest case brief as the frame and Draft argument section as the focus for this writing block today. The useful target is one clear first pass of the argument, complete enough to revise later without treating every sentence as final.",
    task_completion:
      "I start by reviewing the argument outline so the section has a workable path. Then I draft the strongest claim paragraph, stating the main point directly enough for revision later. After that, I tie precedent back to client facts, connecting the rule, the facts, and the requested conclusion in order. The draft is complete enough when the argument exists as a full section instead of separate pieces scattered across notes.",
    ending:
      "I move the brief forward by beginning with the outline pass and keeping the argument in one sequence from the start. Each paragraph has a clearer job once the path is visible.",
  },
};

const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

for (const artifactPath of artifactPaths) {
  const artifact = JSON.parse(await readFile(artifactPath, "utf8"));

  for (const [scenarioId, sections] of Object.entries(mindSections)) {
    if (!artifact.scripts?.[scenarioId]?.mind) {
      throw new Error(`Missing mind script for ${scenarioId} in ${artifactPath}`);
    }

    const script = [
      sections.introduction,
      sections.task_completion,
      sections.ending,
    ].join("\n\n");

    artifact.scripts[scenarioId].mind = script;
    artifact.sectionsByScenarioArm[scenarioId].mind = sections;
    artifact.wordCounts[scenarioId].mind = wordCount(script);
    artifact.generationSourceByScenarioArm[scenarioId].mind =
      "manual.mind_less_structured_work_orientation";
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

for (const [scenarioId, sections] of Object.entries(mindSections)) {
  const script = [
    sections.introduction,
    sections.task_completion,
    sections.ending,
  ].join("\n\n");
  console.log(`${scenarioId}: ${wordCount(script)} words`);
}
