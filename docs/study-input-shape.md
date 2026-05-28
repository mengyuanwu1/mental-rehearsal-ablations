# Study Input Shape

This is the shape to approve before regenerating final scenario inputs.

## Persona

`persona` mirrors the user document fields we actually have. It should not contain a synthetic `summary`.

```ts
persona: {
  id: string;
  name: string;
  demo: {
    age: string;
    birthDate: string | null;
    sex: string;
    citizenship: string | null;
    occupation: string;
    race: string | null;
    englishSkill: string | null;
  };
  onboarding: {
    priorityCategory: string[];
    timeframe: string;
    customSubGoals: string[];
    goalDetail: string;
    goalSummaryFields: Array<{ id: string; label: string; value: string; inputType?: string }>;
    goalBaselineFields?: Array<{ id: string; label: string; value: string; inputType?: string }>;
    wakeTime?: string;
    sleepTime?: string;
    lifePriority: { title: string; description: string; detail?: string };
  };
}
```

## Energy

`energy.sleepSummary` is structured, not a one-line label. It should contain enough source-like fields to support an energy curve without adding coaching guidance.

```ts
sleepSummary: {
  summary: string;
  durationHours: number;
  targetHours?: number;
  bedtime?: string;
  wakeTime?: string;
  sleepQualityScore?: number;
  sleepEfficiencyPercent?: number;
  awakeMinutes?: number;
  restlessMinutes?: number;
  hrvMs?: number;
  restingHeartRate?: number;
}
```

## Mind

`userGoal` follows `user_goals/{uid}`. The synthetic `goal_1.answers` should include exact quantity, exact date, and key steps.

```ts
goal_1: {
  answers: {
    what: string;
    exactQuantity: { value: number; unit: string; description?: string };
    exactDate: { label: string; isoDate: string };
    keySteps: Array<{ id: string; label: string; target?: string }>;
    metric: string;
    deadline: string;
    how?: Record<string, string | boolean>;
  };
  completed: boolean;
  source: "onboarding";
}
```

For daily scope, `calendarEvents` should include the full day schedule in time order.
`prioritySchedule` should separately contain only the top 3 ranked priority tasks. The
mind-only rehearsal generator can use the full calendar for day-shape context, but the
task imagery sequence should come from `prioritySchedule` only. Include `note`, `notes`,
or `description` when the backend has extra context the participant should see:

```ts
calendarEvents: Array<{
  eventId: string;
  title: string;
  kind: string;
  scheduledStart: string;
  scheduledEnd: string;
  durationMinutes: number;
  note?: string;
  notes?: string;
  description?: string;
}>
```

The daily top-three priority schedule uses:

```ts
prioritySchedule: Array<{
  rank: number;
  title: string;
  kind: "task";
  priority: "high" | "medium" | "low";
  linkedValue: string;
  energyCost: "high" | "medium" | "low";
  durationMinutes: number;
  scheduledStart: string;
  scheduledEnd: string;
}>
```

For task scope, use `focusTask` plus ordered `focusSubtasks` instead of the whole daily
priority schedule. Subtask timing is optional; omit `durationMinutes` when the backend
does not have a reliable estimate.

```ts
focusSubtasks: Array<{
  subtaskId: string;
  title: string;
  order: number;
  durationMinutes?: number;
}>
```
