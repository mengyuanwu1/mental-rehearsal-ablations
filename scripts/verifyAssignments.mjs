const slotCount = 10;
const trialsPerSlot = 3;
const conditions = ["baseline", "mind", "body", "soul", "full"];
const scenarioCount = 5;
const pairScheduleByAssignment = [
  [3, 6, 4],
  [9, 8, 0],
  [3, 8, 5],
  [6, 9, 1],
  [3, 7, 9],
  [8, 2, 6],
  [3, 4, 6],
  [9, 0, 8],
  [3, 7, 8],
  [9, 6, 1],
];
const expectedPairCounts = [2, 2, 1, 5, 2, 1, 5, 2, 5, 5];

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
const fullCountsBySlot = [];

for (let assignmentId = 0; assignmentId < slotCount; assignmentId += 1) {
  const seenScenarios = new Set();
  let baselineCount = 0;
  let fullCount = 0;

  for (let trialIndex = 0; trialIndex < trialsPerSlot; trialIndex += 1) {
    const pairIndex = pairScheduleByAssignment[assignmentId][trialIndex];
    const scenarioIndex = (assignmentId * trialsPerSlot + trialIndex) % scenarioCount;
    const pair = pairs[pairIndex];
    if (pair.includes("baseline")) baselineCount += 1;
    if (pair.includes("full")) fullCount += 1;
    pairCounts[pairIndex] += 1;
    scenarioCounts[scenarioIndex] += 1;
    pairScenarioCounts[pairIndex][scenarioIndex] += 1;
    seenScenarios.add(scenarioIndex);
  }

  if (seenScenarios.size !== trialsPerSlot) {
    duplicateSlots.push(assignmentId);
  }
  baselineCountsBySlot.push(baselineCount);
  fullCountsBySlot.push(fullCount);
}

const repeatedPairScenarioCells = pairScenarioCounts
  .flatMap((row, pairIndex) =>
    row.map((count, scenarioIndex) => ({ count, pairIndex, scenarioIndex })),
  )
  .filter((cell) => cell.count > 1);
const expectedScenarioCount = (slotCount * trialsPerSlot) / scenarioCount;
const pairBalanced = pairCounts.every((count, index) => count === expectedPairCounts[index]);
const scenarioBalanced = scenarioCounts.every((count) => count === expectedScenarioCount);
const noDuplicates = duplicateSlots.length === 0;
const baselinePresentEverySlot = baselineCountsBySlot.every((count) => count > 0);
const fullShownTwiceEverySlot = fullCountsBySlot.every((count) => count === 2);

console.log({ pairCounts, scenarioCounts, repeatedPairScenarioCells, duplicateSlots, baselineCountsBySlot, fullCountsBySlot });

if (
  !pairBalanced ||
  !scenarioBalanced ||
  repeatedPairScenarioCells.length > 0 ||
  !noDuplicates ||
  !baselinePresentEverySlot ||
  !fullShownTwiceEverySlot
) {
  process.exitCode = 1;
}
