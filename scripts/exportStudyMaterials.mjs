import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("outputs");
const assignmentPath = path.join(outputDir, "assignment_slots.csv");
const previewPath = path.join(outputDir, "maya_daily_scripts.md");

const slotCount = 50;
const trialsPerSlot = 6;
const pairStep = 3;
const conditions = ["baseline", "mind", "body", "soul", "full"];
const scenarios = [
  "maya_daily",
  "maya_task",
  "jonah_daily",
  "jonah_task",
  "priya_daily",
  "priya_task",
  "alex_daily",
  "alex_task",
  "serena_daily",
  "serena_task",
];

const conditionPairs = [];
for (let i = 0; i < conditions.length; i += 1) {
  for (let j = i + 1; j < conditions.length; j += 1) {
    conditionPairs.push([conditions[i], conditions[j]]);
  }
}

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
    const block = Math.floor(assignmentId / conditionPairs.length);
    const offset = assignmentId % conditionPairs.length;

    for (let trialIndex = 0; trialIndex < trialsPerSlot; trialIndex += 1) {
      const pairIndex = (offset + pairStep * trialIndex) % conditionPairs.length;
      const scenarioIndex = (trialIndex + 2 * block) % scenarios.length;
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

const mayaDailyScripts = {
  baseline: `Use the available schedule to help the user mentally prepare for the day. The listed items are: Draft related work section - 90 min, Answer TA emails - 20 min, Prepare two reading group questions - 30 min.

A useful preparation plan is to check what materials are needed for each scheduled item, make sure those materials are easy to find, and reduce avoidable interruptions before the day begins. For the writing item, the user may need the paper draft and relevant sources. For the email item, the user may need the inbox and any needed context. For the reading group item, the user may need the reading materials and a place to write questions.

Each item can be handled as its own block, with a clear start, a simple stopping point, and a quick note about anything unfinished. The user can keep the schedule visible, move through the listed items one at a time, mark what was completed, note any follow-up, and continue to the next scheduled item.`,

  mind: `Let the larger aim appear in the background: submitting a strong workshop paper this month. It stays present but light, like context around today's ranked work. This image is not the whole paper and not the whole month. It is one day with three priority anchors. Let the sequence become visible before the details sharpen: first the related work section, then the TA emails, then the reading group questions.

Picture rank 1 first: 09:00-10:30, 90 minutes on drafting the related work section. Imagine the paper open and the block finding its place in the larger goal. What might the mind be thinking when one paragraph starts to become clearer? What might feel different when the draft has one useful connection that was not there before? Let that block take the most mental space because it is the highest-priority anchor.

Then let rank 2 arrive: 13:00-13:20, 20 minutes on TA emails. It is smaller, contained, and finite. After that, rank 3 appears: 15:00-15:30, 30 minutes to prepare two reading group questions. Imagine each item as one visible step toward becoming an independent researcher. Notice how the day can hold different scales of work: deep writing, small responsibility, thoughtful preparation. The sequence can feel ordered and doable without needing the whole goal finished today.`,

  body: `Imagine the first slow breath of the rehearsal, and the body state available today: low but usable energy, with a steadier window later in the morning. The pace begins from the energy actually here. There is no need for the body in the image to seem fully rested. It can arrive as it is: a little tired, still capable, needing a clean start and a gentle ramp into focus.

Let the scene become the anchor. There is a laptop open to the paper draft. Three anchor papers sit beside the keyboard. Morning light comes through the window. The apartment is quiet except for a low hum. There is coffee or water nearby. Let attention move through those cues slowly. What might feet feel like on the floor? How might the chair support the body? Where could the shoulders soften without collapsing?

Now imagine the first stretch of work beginning at a pace the body can hold. The cursor is there. The papers are there. The light is there. One line is read, then another, and the body settles as the task becomes more concrete. What might the body feel like when attention comes back without force? What might feel steadier after one honest restart? As the day moves in the image, these cues return before each next block. Steadiness grows from the environment and the body, not from force.`,

  soul: `Let the first image be about what matters: Independent Thinking, Success, and Open-Mindedness. Those values set the emotional color before any task details appear. Independent Thinking can feel like trusting one's own questions before borrowing someone else's frame. Success can feel like finishing what matters and making visible progress. Open-Mindedness can feel like staying curious about answers that were not expected.

Imagine the day unfolding in a way that lets those values become visible. What might it look like to begin from mental clarity rather than pressure? What might it look like for one paragraph to sound more like independent thinking? What might progress look like while still leaving room to discover something unexpected? Let the day unfold slowly and gently around those questions.

The image does not need perfect work. It only needs work that carries the feeling being practiced: self-trusting, competent, curious, and accomplished enough. Picture the day ending with one small sign that these values were lived: a clearer section, a useful question, a task finished without losing its own direction. Close with one grounded word from the day: clear. Let that word remain nearby as a quiet standard for what a good-enough start can feel like today, in this imagined scene.`,

  full: `Imagine arriving with today's real body state: low but usable energy, with a steadier window later in the morning. The scene does not need to turn into a perfect day. It only needs to hold some of the work: the laptop open to the paper draft, three anchor papers beside the keyboard, morning light coming through the window, quiet apartment hum, coffee or water nearby.

Let the sequence unfold as imagery. First, 09:00-10:30: 90 minutes on the related work section. This longer block takes the most mental space. Imagine one anchor paper being read, the gap becoming visible, and one useful connection appearing in the draft. What might the mind be thinking when the important stretch begins to work? What might the body feel like when the task becomes concrete? Then 13:00-13:20 appears for TA emails, shorter and contained. After that, 15:00-15:30 appears for two reading group questions, enough to arrive prepared without overbuilding it.

This image supports submitting a strong workshop paper and building an independent research life. Independent Thinking shows up as writing from one's own questions. Success shows up as visible progress. Open-Mindedness shows up as curiosity when the draft changes. What might it feel like to end not with everything solved, but with the work moved forward in a way that feels mentally clear, competent, and still self-directed?`,
};

function wordCount(text) {
  return text.trim().split(/\s+/).length;
}

function exportPreview() {
  const sections = Object.entries(mayaDailyScripts).map(([condition, script]) => {
    return `## ${condition} (${wordCount(script)} words)\n\n${script}`;
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
await writeFile(previewPath, exportPreview());

console.log(`Wrote ${assignmentPath}`);
console.log(`Wrote ${previewPath}`);
