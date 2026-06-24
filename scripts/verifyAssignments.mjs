const slotCount = 20;
const trialsPerSlot = 2;
const conditions = ["baseline", "mind", "body", "soul", "full"];
const scenarioCount = 5;
const fullPairSchedule = [3, 6, 8, 9];
const fullPairSet = new Set(fullPairSchedule);
const targetPairCounts = [4, 4, 3, 7, 4, 3, 5, 2, 5, 3];
const targetConditionCounts = { baseline: 18, mind: 16, body: 15, soul: 11, full: 20 };
const targetFullOpponentCounts = { baseline: 7, mind: 5, body: 5, soul: 3 };
const targetSecondPairCounts = {
  "baseline/mind": 4,
  "baseline/body": 4,
  "baseline/soul": 3,
  "body/mind": 4,
  "mind/soul": 3,
  "body/soul": 2,
};
const firstFifteenTargetConditionCounts = { baseline: 14, mind: 12, body: 11, soul: 8, full: 15 };
const firstFifteenTargetFullOpponentCounts = { baseline: 5, mind: 4, body: 4, soul: 2 };
const pairScheduleByAssignment = [
  [2, 8],
  [4, 3],
  [6, 1],
  [2, 8],
  [3, 5],
  [0, 9],
  [3, 5],
  [3, 4],
  [1, 6],
  [6, 7],
  [8, 2],
  [9, 0],
  [1, 6],
  [4, 3],
  [0, 8],
  [7, 6],
  [1, 9],
  [4, 3],
  [3, 5],
  [8, 0],
];
const swapScheduleByAssignment = [
  [true, false],
  [true, true],
  [false, false],
  [true, true],
  [false, true],
  [false, false],
  [false, true],
  [false, true],
  [false, false],
  [true, false],
  [false, false],
  [true, true],
  [false, false],
  [true, true],
  [true, true],
  [false, true],
  [true, true],
  [false, false],
  [true, false],
  [true, true],
];

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
const fullSideByPair = Object.fromEntries(fullPairSchedule.map((pairIndex) => [pairIndex, { left: 0, right: 0 }]));
const pairPositionCounts = Array.from({ length: pairs.length }, () => Array(trialsPerSlot).fill(0));
const repeatedConditionsBySlot = [];
const fullOpponentCounts = Object.fromEntries(
  conditions.filter((condition) => condition !== "full").map((condition) => [condition, 0]),
);
const secondPairCounts = {};

for (let assignmentId = 0; assignmentId < slotCount; assignmentId += 1) {
  const seenScenarios = new Set();
  const seenConditions = new Set();
  let baselineCount = 0;
  let fullCount = 0;

  for (let trialIndex = 0; trialIndex < trialsPerSlot; trialIndex += 1) {
    const pairIndex = pairScheduleByAssignment[assignmentId][trialIndex];
    const scenarioIndex = (assignmentId * trialsPerSlot + trialIndex) % scenarioCount;
    const pair = pairs[pairIndex];
    const swap = swapScheduleByAssignment[assignmentId][trialIndex];
    const leftCondition = swap ? pair[1] : pair[0];
    const rightCondition = swap ? pair[0] : pair[1];
    const hasFull = pair.includes("full");
    const fullSide = leftCondition === "full" ? "left" : "right";

    if (pair.includes("baseline")) baselineCount += 1;
    if (pair.includes("full")) fullCount += 1;
    seenConditions.add(leftCondition);
    seenConditions.add(rightCondition);

    if (hasFull) {
      fullOpponentCounts[pair.find((condition) => condition !== "full")] += 1;
    } else {
      const key = [...pair].sort().join("/");
      secondPairCounts[key] = (secondPairCounts[key] ?? 0) + 1;
    }

    leftConditionCounts[leftCondition] += 1;
    rightConditionCounts[rightCondition] += 1;
    pairPositionCounts[pairIndex][trialIndex] += 1;
    if (fullPairSet.has(pairIndex)) fullSideByPair[pairIndex][fullSide] += 1;
    pairCounts[pairIndex] += 1;
    scenarioCounts[scenarioIndex] += 1;
    pairScenarioCounts[pairIndex][scenarioIndex] += 1;
    seenScenarios.add(scenarioIndex);
  }

  if (seenScenarios.size !== trialsPerSlot) {
    duplicateSlots.push(assignmentId);
  }
  if (seenConditions.size !== trialsPerSlot * 2) {
    repeatedConditionsBySlot.push(assignmentId);
  }
  baselineCountsBySlot.push(baselineCount);
  fullCountsBySlot.push(fullCount);
}

const expectedScenarioCount = (slotCount * trialsPerSlot) / scenarioCount;
const pairBalanced = pairCounts.every((count, index) => count === targetPairCounts[index]);
const scenarioBalanced = scenarioCounts.every((count) => count === expectedScenarioCount);
const noDuplicates = duplicateSlots.length === 0;
const baselineSlots = baselineCountsBySlot.filter((count) => count > 0).length;
const expectedBaselineSlots = 18;
const fullEverySlot = fullCountsBySlot.every((count) => count === 1);
const noRepeatedConditions = repeatedConditionsBySlot.length === 0;
const fullOpponentBalanced = Object.entries(targetFullOpponentCounts).every(
  ([condition, count]) => fullOpponentCounts[condition] === count,
);
const conditionExposureBalanced = conditions.every((condition) => {
  const total = leftConditionCounts[condition] + rightConditionCounts[condition];
  return total === targetConditionCounts[condition];
});
const sideExposureBalanced = conditions.every((condition) => {
  const left = leftConditionCounts[condition];
  const right = rightConditionCounts[condition];
  return Math.abs(left - right) <= 1;
});
const scenarioPairBalanced = fullPairSchedule.every((pairIndex) => {
  const counts = pairScenarioCounts[pairIndex];
  return Math.max(...counts) - Math.min(...counts) <= 1;
});
const positionBalanced = fullPairSchedule.every((pairIndex) =>
  Math.abs(pairPositionCounts[pairIndex][0] - pairPositionCounts[pairIndex][1]) <= 1,
);
const sideBalanced = fullPairSchedule.every((pairIndex) => {
  const counts = fullSideByPair[pairIndex];
  return Math.abs(counts.left - counts.right) <= 1;
});
const fullSideBalanced = Object.values(fullSideByPair).reduce((sum, counts) => sum + counts.left, 0) === 10;
const secondPairBalanced =
  Object.keys(secondPairCounts).length === Object.keys(targetSecondPairCounts).length &&
  Object.entries(targetSecondPairCounts).every(([pair, count]) => secondPairCounts[pair] === count);

const firstFifteenConditionCounts = Object.fromEntries(conditions.map((condition) => [condition, 0]));
const firstFifteenFullOpponentCounts = Object.fromEntries(
  conditions.filter((condition) => condition !== "full").map((condition) => [condition, 0]),
);
for (let assignmentId = 0; assignmentId < 15; assignmentId += 1) {
  for (let trialIndex = 0; trialIndex < trialsPerSlot; trialIndex += 1) {
    const pairIndex = pairScheduleByAssignment[assignmentId][trialIndex];
    const pair = pairs[pairIndex];
    for (const condition of pair) firstFifteenConditionCounts[condition] += 1;
    if (pair.includes("full")) {
      firstFifteenFullOpponentCounts[pair.find((condition) => condition !== "full")] += 1;
    }
  }
}
const firstFifteenConditionBalanced = conditions.every(
  (condition) => firstFifteenConditionCounts[condition] === firstFifteenTargetConditionCounts[condition],
);
const firstFifteenFullOpponentBalanced = Object.entries(firstFifteenTargetFullOpponentCounts).every(
  ([condition, count]) => firstFifteenFullOpponentCounts[condition] === count,
);

console.log({
  pairCounts,
  scenarioCounts,
  pairScenarioCounts,
  duplicateSlots,
  baselineCountsBySlot,
  fullCountsBySlot,
  leftConditionCounts,
  rightConditionCounts,
  fullSideByPair,
  fullOpponentCounts,
  secondPairCounts,
  pairPositionCounts,
  repeatedConditionsBySlot,
  baselineSlots,
  firstFifteenConditionCounts,
  firstFifteenFullOpponentCounts,
});

if (
  !pairBalanced ||
  !scenarioBalanced ||
  !scenarioPairBalanced ||
  !positionBalanced ||
  !noDuplicates ||
  baselineSlots !== expectedBaselineSlots ||
  !fullEverySlot ||
  !noRepeatedConditions ||
  !fullOpponentBalanced ||
  !conditionExposureBalanced ||
  !sideExposureBalanced ||
  !sideBalanced ||
  !fullSideBalanced ||
  !secondPairBalanced ||
  !firstFifteenConditionBalanced ||
  !firstFifteenFullOpponentBalanced
) {
  process.exitCode = 1;
}
