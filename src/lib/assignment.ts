import { scenarios } from "../data/scenarios";
import type { Assignment, ConditionId, TrialAssignment } from "../types";

export const conditions: ConditionId[] = ["baseline", "mind", "body", "soul", "full"];

export const conditionPairs: Array<[ConditionId, ConditionId]> = (() => {
  const pairs: Array<[ConditionId, ConditionId]> = [];
  for (let i = 0; i < conditions.length; i += 1) {
    for (let j = i + 1; j < conditions.length; j += 1) {
      pairs.push([conditions[i], conditions[j]]);
    }
  }
  return pairs;
})();

export const assignmentSlotCount = 10;
const TRIALS_PER_SLOT = 2;

// V7: 10 slots. Trial 0 is always soul-full (pair 9) for every participant.
// Slots 0-3 (existing): trial 1 rotates mind-soul / body-soul.
// Slots 4-9 (new, 6 extra soul-full direct comps): trial 1 focuses on body comparisons.
// soul-full left/right: 5 soul-left (even slots), 5 full-left (odd slots).
//
// Pair index reference:
//   0=baseline-mind  1=baseline-body  2=baseline-soul  3=baseline-full
//   4=mind-body      5=mind-soul      6=mind-full      7=body-soul
//   8=body-full      9=soul-full
// V7: 10 slots total.
// Slots 0-3: existing batch — kept unchanged so prior participants are unaffected.
// Slots 4-9: new batch of 6 — all get soul-full (trial 0), exactly 3 get body-soul (trial 1).
// soul-full left/right: 5 soul-left (even), 5 full-left (odd).
const pairScheduleByAssignment: number[][] = [
  [9, 5], // soul-full, mind-soul       ← existing
  [9, 7], // soul-full, body-soul       ← existing
  [9, 5], // soul-full, mind-soul       ← existing
  [9, 7], // soul-full, body-soul       ← existing
  [9, 7], // soul-full, body-soul       ← new
  [9, 7], // soul-full, body-soul       ← new
  [9, 7], // soul-full, body-soul       ← new
  [9, 8], // soul-full, body-full       ← new
  [9, 4], // soul-full, mind-body       ← new
  [9, 1], // soul-full, baseline-body   ← new
];

const swapScheduleByAssignment: boolean[][] = [
  [false, false], // soul-left, ...
  [true,  false], // full-left, ...
  [false, true],  // soul-left, ...
  [true,  false], // full-left, ...
  [false, false], // soul-left, ...
  [true,  false], // full-left, ...
  [false, true],  // soul-left, ...
  [true,  true],  // full-left, ...
  [false, false], // soul-left, ...
  [true,  false], // full-left, ...
];

export function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shouldSwapOrder(assignmentId: number, trialIndex: number): boolean {
  return swapScheduleByAssignment[assignmentId]?.[trialIndex] ?? false;
}

export function buildAssignment(assignmentId: number): Assignment {
  const normalizedId = ((assignmentId % assignmentSlotCount) + assignmentSlotCount) % assignmentSlotCount;
  const pairSchedule = pairScheduleByAssignment[normalizedId];
  const trials: TrialAssignment[] = [];

  for (let trialIndex = 0; trialIndex < TRIALS_PER_SLOT; trialIndex += 1) {
    const pairIndex = pairSchedule[trialIndex];
    const scenarioIndex = (normalizedId * TRIALS_PER_SLOT + trialIndex) % scenarios.length;
    const [firstCondition, secondCondition] = conditionPairs[pairIndex];
    const swap = shouldSwapOrder(normalizedId, trialIndex);

    trials.push({
      trialIndex,
      scenarioId: scenarios[scenarioIndex].id,
      pairIndex,
      leftCondition: swap ? secondCondition : firstCondition,
      rightCondition: swap ? firstCondition : secondCondition,
    });
  }

  return { assignmentId: normalizedId, trials };
}

export function assignmentIdFromParams(params: URLSearchParams, participantIdOverride?: string): number {
  const explicit = params.get("assignment_id") ?? params.get("assignment") ?? params.get("a");
  if (explicit && Number.isFinite(Number(explicit))) {
    return Number(explicit);
  }

  const prolificId =
    participantIdOverride ||
    (params.get("PROLIFIC_PID") ??
    params.get("prolific_pid") ??
    params.get("participant_id") ??
    params.get("participant"));

  if (prolificId) {
    return hashString(prolificId) % assignmentSlotCount;
  }

  const key = "mra-local-assignment-id";
  const cached = window.localStorage.getItem(key);
  if (cached && Number.isFinite(Number(cached))) {
    return Number(cached);
  }
  const generated = Math.floor(Math.random() * assignmentSlotCount);
  window.localStorage.setItem(key, String(generated));
  return generated;
}

export function verifyAssignmentBalance(): {
  pairCounts: number[];
  scenarioCounts: number[];
  pairScenarioCounts: number[][];
  duplicateScenarioSlots: number[];
  baselineCountsBySlot: number[];
  fullCountsBySlot: number[];
} {
  const pairCounts = Array(conditionPairs.length).fill(0);
  const scenarioCounts = Array(scenarios.length).fill(0);
  const pairScenarioCounts = Array.from({ length: conditionPairs.length }, () =>
    Array(scenarios.length).fill(0),
  );
  const duplicateScenarioSlots: number[] = [];
  const baselineCountsBySlot: number[] = [];
  const fullCountsBySlot: number[] = [];

  for (let assignmentId = 0; assignmentId < assignmentSlotCount; assignmentId += 1) {
    const assignment = buildAssignment(assignmentId);
    const seen = new Set<string>();
    let baselineCount = 0;
    let fullCount = 0;
    for (const trial of assignment.trials) {
      const scenarioIndex = scenarios.findIndex((scenario) => scenario.id === trial.scenarioId);
      if (trial.leftCondition === "baseline" || trial.rightCondition === "baseline") baselineCount += 1;
      if (trial.leftCondition === "full" || trial.rightCondition === "full") fullCount += 1;
      pairCounts[trial.pairIndex] += 1;
      scenarioCounts[scenarioIndex] += 1;
      pairScenarioCounts[trial.pairIndex][scenarioIndex] += 1;
      seen.add(trial.scenarioId);
    }
    if (seen.size !== assignment.trials.length) {
      duplicateScenarioSlots.push(assignmentId);
    }
    baselineCountsBySlot.push(baselineCount);
    fullCountsBySlot.push(fullCount);
  }

  return { pairCounts, scenarioCounts, pairScenarioCounts, duplicateScenarioSlots, baselineCountsBySlot, fullCountsBySlot };
}
