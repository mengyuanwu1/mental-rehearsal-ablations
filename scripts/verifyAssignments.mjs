const slotCount = 10;
const trialsPerSlot = 2;
const conditions = ["baseline", "mind", "body", "soul", "full"];
const scenarioCount = 5;
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
const expectedPairCounts = [4, 3, 3, 3, 0, 0, 3, 0, 2, 2];

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
const baselineSlots = baselineCountsBySlot.filter((count) => count > 0).length;
const expectedBaselineSlots = 10;
const fullPresentEverySlot = fullCountsBySlot.every((count) => count === 1);
const fullTrial0Count = pairScheduleByAssignment.filter(([firstPair]) =>
  pairs[firstPair].includes("full"),
).length;
const fullTrial1Count = pairScheduleByAssignment.filter(([, secondPair]) =>
  pairs[secondPair].includes("full"),
).length;
const fullTrialPositionBalanced = fullTrial0Count === fullTrial1Count;

console.log({
  pairCounts,
  scenarioCounts,
  repeatedPairScenarioCells,
  duplicateSlots,
  baselineCountsBySlot,
  fullCountsBySlot,
  baselineSlots,
  fullTrial0Count,
  fullTrial1Count,
});

if (
  !pairBalanced ||
  !scenarioBalanced ||
  repeatedPairScenarioCells.length > 0 ||
  !noDuplicates ||
  baselineSlots !== expectedBaselineSlots ||
  !fullPresentEverySlot ||
  !fullTrialPositionBalanced
) {
  process.exitCode = 1;
}
