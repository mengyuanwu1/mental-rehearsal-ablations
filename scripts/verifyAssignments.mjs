const slotCount = 15;
const trialsPerSlot = 2;
const conditions = ["baseline", "mind", "body", "soul", "full"];
const scenarioCount = 5;
const pairScheduleByAssignment = [
  [0, 9],
  [2, 7],
  [3, 8],
  [1, 6],
  [0, 4],
  [2, 5],
  [1, 9],
  [1, 7],
  [3, 5],
  [3, 6],
  [4, 2],
  [0, 8],
  [9, 5],
  [7, 4],
  [6, 8],
];
const swapScheduleByAssignment = [
  [false, false],
  [false, false],
  [true, false],
  [false, false],
  [true, false],
  [true, true],
  [true, true],
  [false, false],
  [true, false],
  [true, false],
  [true, false],
  [false, true],
  [false, true],
  [true, false],
  [true, false],
];
const expectedPairCounts = Array(10).fill(3);

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
const leftConditionCounts = Object.fromEntries(conditions.map((condition) => [condition, 0]));
const rightConditionCounts = Object.fromEntries(conditions.map((condition) => [condition, 0]));

for (let assignmentId = 0; assignmentId < slotCount; assignmentId += 1) {
  const seenScenarios = new Set();
  let baselineCount = 0;
  let fullCount = 0;

  for (let trialIndex = 0; trialIndex < trialsPerSlot; trialIndex += 1) {
    const pairIndex = pairScheduleByAssignment[assignmentId][trialIndex];
    const scenarioIndex = (assignmentId * trialsPerSlot + trialIndex) % scenarioCount;
    const pair = pairs[pairIndex];
    const swap = swapScheduleByAssignment[assignmentId][trialIndex];
    const leftCondition = swap ? pair[1] : pair[0];
    const rightCondition = swap ? pair[0] : pair[1];
    if (pair.includes("baseline")) baselineCount += 1;
    if (pair.includes("full")) fullCount += 1;
    leftConditionCounts[leftCondition] += 1;
    rightConditionCounts[rightCondition] += 1;
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
const expectedBaselineSlots = 12;
const expectedSideCount = (slotCount * trialsPerSlot * 2) / conditions.length / 2;
const sideBalanced =
  Object.values(leftConditionCounts).every((count) => count === expectedSideCount) &&
  Object.values(rightConditionCounts).every((count) => count === expectedSideCount);

console.log({
  pairCounts,
  scenarioCounts,
  repeatedPairScenarioCells,
  duplicateSlots,
  baselineCountsBySlot,
  fullCountsBySlot,
  leftConditionCounts,
  rightConditionCounts,
  baselineSlots,
});

if (
  !pairBalanced ||
  !scenarioBalanced ||
  repeatedPairScenarioCells.length > 0 ||
  !noDuplicates ||
  baselineSlots !== expectedBaselineSlots ||
  !sideBalanced
) {
  process.exitCode = 1;
}
