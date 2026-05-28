# Study Inputs Review

Draft input set: 5 personas x 2 scopes.

Canonical input shape is documented in `docs/study-input-shape.md`. The current seed rows now follow that shape structurally, but final persona/scenario content should be regenerated only after the shape is approved.

## Condition Inputs

- `baseline`: visible schedule/task preparation only. No body energy, values, ideal life, or life priority.
- `mind`: user goal + full daily calendar for day-shape context + top 3 ranked priority tasks for daily rehearsal, or focus task + subtasks for task rehearsal. Task value tags are not verbalized in mind-only scripts.
- `body`: energy, observed sleep/activity/recovery summaries, hourly energy, focus cues only.
- `soul`: values, personal definitions, desired feelings, daily signs, ideal life.
- `full`: mind + body + soul.

## Scenarios

| Scenario | Scope | Persona | Energy | Mind input |
| --- | --- | --- | --- | --- |
| `maya_daily` | daily | 24, woman, HCI PhD / academic research | low but usable, steadier late morning | full calendar + top 3 priorities |
| `maya_task` | task | 24, woman, HCI PhD / academic research | tired and avoidant, small writing target | draft related work section + 3 subtasks |
| `jonah_daily` | daily | 34, man, product management / software | good morning energy, afternoon dip | full calendar + top 3 priorities |
| `jonah_task` | task | 34, man, product management / software | clear enough before meetings | finalize launch risk brief + 3 subtasks |
| `priya_daily` | daily | 22, woman, nursing / healthcare training | tired legs, short study bursts | full calendar + top 3 priorities |
| `priya_task` | task | 22, woman, nursing / healthcare training | nervous simulation energy | practice assessment sequence + 3 subtasks |
| `alex_daily` | daily | 31, nonbinary, freelance design / creative services | strong early creative energy | full calendar + top 3 priorities |
| `alex_task` | task | 31, nonbinary, freelance design / creative services | high creative energy, needs story | build pitch deck narrative + 3 subtasks |
| `serena_daily` | daily | 39, woman, public-interest law | interrupted sleep, usable quiet pocket | full calendar + top 3 priorities |
| `serena_task` | task | 39, woman, public-interest law | compressed but quiet morning | draft argument section + 3 subtasks |

## Remaining Confirmation

- Are these 5 seed personas acceptable?
- Should `gender` use self-description labels like `woman/man/nonbinary`, or more survey-like labels?
- Should `baseline` see only task titles + durations, or also the short energy sentence?

Implemented in the UI: daily scenarios display the full day schedule with notes and rank badges for the top 3 priorities; task scenarios display the focus task plus subtasks.
