const slotCount = 50;
const trialsPerSlot = 6;
const pairStep = 3;
const conditions = ["baseline", "mind", "body", "soul", "full"];
const scenarioCount = 10;

const pairs = [];
for (let i = 0; i < conditions.length; i += 1) {
  for (let j = i + 1; j < conditions.length; j += 1) {
    pairs.push([conditions[i], conditions[j]]);
  }
}

const pairCounts = Array(pairs.length).fill(0);
const scenarioCounts = Array(scenarioCount).fill(0);
const pairScenarioCounts = Array.from({ length: pairs.length }, () => Array(scenarioCount).fill(0));
const duplicateSlots = [];
const baselineCountsBySlot = [];

for (let assignmentId = 0; assignmentId < slotCount; assignmentId += 1) {
  const block = Math.floor(assignmentId / pairs.length);
  const offset = assignmentId % pairs.length;
  const seenScenarios = new Set();
  let baselineCount = 0;

  for (let trialIndex = 0; trialIndex < trialsPerSlot; trialIndex += 1) {
    const pairIndex = (offset + pairStep * trialIndex) % pairs.length;
    const scenarioIndex = (trialIndex + 2 * block) % scenarioCount;
    const pair = pairs[pairIndex];
    if (pair.includes("baseline")) baselineCount += 1;
    pairCounts[pairIndex] += 1;
    scenarioCounts[scenarioIndex] += 1;
    pairScenarioCounts[pairIndex][scenarioIndex] += 1;
    seenScenarios.add(scenarioIndex);
  }

  if (seenScenarios.size !== trialsPerSlot) {
    duplicateSlots.push(assignmentId);
  }
  baselineCountsBySlot.push(baselineCount);
}

const pairScenarioBalanced = pairScenarioCounts.every((row) => row.every((count) => count === 3));
const pairBalanced = pairCounts.every((count) => count === 30);
const scenarioBalanced = scenarioCounts.every((count) => count === 30);
const noDuplicates = duplicateSlots.length === 0;
const baselinePresentEverySlot = baselineCountsBySlot.every((count) => count > 0);

console.log({ pairCounts, scenarioCounts, pairScenarioBalanced, duplicateSlots, baselineCountsBySlot });

if (!pairBalanced || !scenarioBalanced || !pairScenarioBalanced || !noDuplicates || !baselinePresentEverySlot) {
  process.exitCode = 1;
}
