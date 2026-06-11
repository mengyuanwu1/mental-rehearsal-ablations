# Backend Mental Rehearsal Study Scripts

Generated at: 2026-06-11T02:05:19.662Z
Requested model: gpt-5.5
Generation source: baseline=openai.simple_baseline_prompt; rehearsal=backend.generate_ablation_rehearsal
Any backend mock used: false

# maya_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":157,"mind":169,"body":177,"soul":159,"full":179}

## baseline input

```json
{
  "preparationOnlyContext": "Daily preparation with the full calendar schedule and durations, without priority ranking.",
  "visibleItems": [
    "08:15-08:35 Review paper plan - 20 min",
    "09:00-10:30 Draft related work section - 90 min",
    "10:45-11:15 Lab standup - 30 min",
    "12:10-12:40 Lunch break - 30 min",
    "13:00-13:20 Answer TA emails - 20 min",
    "14:00-14:45 Teaching support tasks - 45 min",
    "15:00-15:30 Prepare two reading group questions - 30 min",
    "16:15-16:35 Send advisor progress note - 20 min"
  ]
}
```


## baseline script (157 words)

This is only the visible schedule for the day, listed with the times and durations shown.

The day has an item from 08:15 to 08:35 called Review paper plan. It is 20 minutes. Later, from 09:00 to 10:30, there is Draft related work section. That one is 90 minutes.

From 10:45 to 11:15, there is Lab standup. This is a meeting item, and it is 30 minutes. From 12:10 to 12:40, there is Lunch break. This is a lunch item, and it is also 30 minutes.

At 13:00, there is Answer TA emails, ending at 13:20. This is an email item, and it lasts 20 minutes. From 14:00 to 14:45, there is Teaching support tasks, which is 45 minutes.

From 15:00 to 15:30, there is Prepare two reading group questions. It is 30 minutes. The last visible item is from 16:15 to 16:35, Send advisor progress note. This is a note item, and it lasts 20 minutes.

## mind input

```json
{
  "arm": "mind",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "user_goal": {
      "userid": "maya-chen",
      "priority": {
        "title": "Become an independent researcher",
        "description": "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a strong workshop paper this month",
          "exactQuantity": {
            "value": 1,
            "unit": "workshop paper submission",
            "description": "one complete draft submitted to the workshop"
          },
          "exactDate": {
            "label": "by the end of June 2026",
            "isoDate": "2026-06-30"
          },
          "keySteps": [
            {
              "id": "related-work",
              "label": "Complete the related work section",
              "target": "one coherent section draft"
            },
            {
              "id": "gap-statement",
              "label": "Write the gap statement",
              "target": "one paragraph the advisor can react to"
            },
            {
              "id": "full-draft",
              "label": "Assemble the workshop paper draft",
              "target": "one submission-ready PDF"
            }
          ],
          "metric": "one strong workshop paper draft submitted",
          "deadline": "2026-06-30"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "08:15-08:35",
        "title": "Review paper plan",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "09:00-10:30",
        "title": "Draft related work section",
        "kind": "event",
        "duration_minutes": 90
      },
      {
        "time": "10:45-11:15",
        "title": "Lab standup",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "12:10-12:40",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:00-13:20",
        "title": "Answer TA emails",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "14:00-14:45",
        "title": "Teaching support tasks",
        "kind": "event",
        "duration_minutes": 45
      },
      {
        "time": "15:00-15:30",
        "title": "Prepare two reading group questions",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "16:15-16:35",
        "title": "Send advisor progress note",
        "kind": "event",
        "duration_minutes": 20
      }
    ],
    "priority_schedule": [
      {
        "title": "Draft related work section",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 90
      },
      {
        "title": "Answer TA emails",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "low",
        "duration_minutes": 20
      },
      {
        "title": "Prepare two reading group questions",
        "kind": "task",
        "rank": 3,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 30
      }
    ],
    "open_carry_overs": [
      "Draft related work section"
    ]
  }
}
```

## mind sections

### Introduction
The larger goal is becoming an independent researcher, with this month’s workshop paper moving toward a complete June submission. Today’s work context centers on turning the related work section into a coherent draft.

### Task visualization
Today’s top sequence is Draft related work section for 90 minutes, then Answer TA emails for 20 minutes, then Prepare two reading group questions for 30 minutes. You see the first task as the main work: opening the paper plan, choosing the next cluster of sources, writing connective sentences, and letting a rough but coherent section take shape. A good-enough finish is a draft that an advisor can read and react to, even if some citations still need tightening. What tells you the section is done enough for today? If attention stalls on wording or source order, what returns you to the next concrete pass?

### Ending
You close by seeing the work move forward through one doable next action: add the next paragraph, mark any unresolved citation, and keep the section becoming something that can be revised.

## mind script (169 words)

The larger goal is becoming an independent researcher, with this month’s workshop paper moving toward a complete June submission. Today’s work context centers on turning the related work section into a coherent draft.

Today’s top sequence is Draft related work section for 90 minutes, then Answer TA emails for 20 minutes, then Prepare two reading group questions for 30 minutes. You see the first task as the main work: opening the paper plan, choosing the next cluster of sources, writing connective sentences, and letting a rough but coherent section take shape. A good-enough finish is a draft that an advisor can read and react to, even if some citations still need tightening. What tells you the section is done enough for today? If attention stalls on wording or source order, what returns you to the next concrete pass?

You close by seeing the work move forward through one doable next action: add the next paragraph, mark any unresolved citation, and keep the section becoming something that can be revised.

## body input

```json
{
  "arm": "body",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "body"
  ],
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration and some restlessness.",
      "activity_summary": "4200 steps and 22 active minutes; mostly light movement before a morning writing block.",
      "stress_summary": "Stress is elevated by short sleep and paper pressure, so focus may need a softer start."
    },
    "sleep_hours": 5.5,
    "current_energy_level": 3,
    "focus_cues": {
      "visual": [
        "laptop open to the paper draft",
        "three anchor papers beside the keyboard",
        "morning light coming through the window"
      ],
      "auditory": [
        "quiet apartment hum"
      ],
      "tactile_body": [
        "second coffee in reach",
        "feet on the floor"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee or water"
      ],
      "other": [
        "phone face down"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
Begin with the breath already here, not forcing it deeper, just noticing the inhale and the exhale. Feel your posture held by the chair, your feet meeting the floor, the weight of a shorter night sitting in the body. Let the jaw loosen a little. Let the shoulders notice how much they are carrying.

### Task visualization
With 5.5 hours of sleep, your body may feel slower, a little restless, and still waking up. Let that be true. There has been some light movement already, enough to remind your legs and back that they are present. Notice the quiet apartment hum. Notice morning light at the edge of attention. Notice the smell of coffee, the taste of coffee or water, the cup within reach, the phone face down. Your energy is low, so focus begins softly: feet on the floor, breath moving, eyes resting on one simple point.

### Ending
Let the next breath arrive without rushing. Let the floor hold your feet and the chair hold your weight. Keep the pace honest and steady. One breath, both feet, this body here.

## body script (177 words)

Begin with the breath already here, not forcing it deeper, just noticing the inhale and the exhale. Feel your posture held by the chair, your feet meeting the floor, the weight of a shorter night sitting in the body. Let the jaw loosen a little. Let the shoulders notice how much they are carrying.

With 5.5 hours of sleep, your body may feel slower, a little restless, and still waking up. Let that be true. There has been some light movement already, enough to remind your legs and back that they are present. Notice the quiet apartment hum. Notice morning light at the edge of attention. Notice the smell of coffee, the taste of coffee or water, the cup within reach, the phone face down. Your energy is low, so focus begins softly: feet on the floor, breath moving, eyes resting on one simple point.

Let the next breath arrive without rushing. Let the floor hold your feet and the chair hold your weight. Keep the pace honest and steady. One breath, both feet, this body here.

## soul input

```json
{
  "arm": "soul",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "value"
  ],
  "value": {
    "top_values": [
      {
        "value_id": "Independent Thinking",
        "name": "Independent Thinking",
        "emoji": "compass",
        "feels_like_labels": [
          "mentally clear",
          "self-trusting",
          "unboxed"
        ],
        "daily_sign_labels": [
          "having room to think",
          "making decisions faster"
        ],
        "personal_definition": "trusting my own questions before borrowing other people's"
      },
      {
        "value_id": "Success",
        "name": "Success",
        "emoji": "trophy",
        "feels_like_labels": [
          "accomplished",
          "focused",
          "competent"
        ],
        "daily_sign_labels": [
          "finishing what matters",
          "visible progress"
        ],
        "personal_definition": "finishing what matters"
      },
      {
        "value_id": "Open-Mindedness",
        "name": "Open-Mindedness",
        "emoji": "telescope",
        "feels_like_labels": [
          "curious",
          "supported"
        ],
        "daily_sign_labels": [
          "learning something"
        ],
        "personal_definition": "staying curious about answers I did not expect"
      }
    ],
    "ideal_life": {
      "statement": "A life where I think and write on my own questions",
      "life_shape_labels": [
        "independent research",
        "deep work mornings"
      ]
    }
  }
}
```

## soul sections

### Introduction
Let what matters come into view: trusting your own questions before borrowing other people’s, staying curious about answers you did not expect, and feeling the quiet competence of finishing what matters without needing to shrink your thinking.

### Task visualization
As you move through this day, imagine carrying a little more mental clarity, self-trust, and room to think. Notice what it feels like to be unboxed: not rejecting every outside voice, not chasing every outside answer, simply letting your own questions have first place. You can stay open without becoming scattered; you can be curious and still feel supported by your own judgment. A life where you think and write on your own questions begins in this inner posture, in the way you meet uncertainty with attention rather than surrendering your compass.

### Ending
Repeat this once, if it feels right: I do not have to borrow my direction; I stay curious, trust my questions, and move with the quiet competence of what matters.

## soul script (159 words)

Let what matters come into view: trusting your own questions before borrowing other people’s, staying curious about answers you did not expect, and feeling the quiet competence of finishing what matters without needing to shrink your thinking.

As you move through this day, imagine carrying a little more mental clarity, self-trust, and room to think. Notice what it feels like to be unboxed: not rejecting every outside voice, not chasing every outside answer, simply letting your own questions have first place. You can stay open without becoming scattered; you can be curious and still feel supported by your own judgment. A life where you think and write on your own questions begins in this inner posture, in the way you meet uncertainty with attention rather than surrendering your compass.

Repeat this once, if it feels right: I do not have to borrow my direction; I stay curious, trust my questions, and move with the quiet competence of what matters.

## full input

```json
{
  "arm": "full",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "user_goal": {
      "userid": "maya-chen",
      "priority": {
        "title": "Become an independent researcher",
        "description": "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a strong workshop paper this month",
          "exactQuantity": {
            "value": 1,
            "unit": "workshop paper submission",
            "description": "one complete draft submitted to the workshop"
          },
          "exactDate": {
            "label": "by the end of June 2026",
            "isoDate": "2026-06-30"
          },
          "keySteps": [
            {
              "id": "related-work",
              "label": "Complete the related work section",
              "target": "one coherent section draft"
            },
            {
              "id": "gap-statement",
              "label": "Write the gap statement",
              "target": "one paragraph the advisor can react to"
            },
            {
              "id": "full-draft",
              "label": "Assemble the workshop paper draft",
              "target": "one submission-ready PDF"
            }
          ],
          "metric": "one strong workshop paper draft submitted",
          "deadline": "2026-06-30"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "08:15-08:35",
        "title": "Review paper plan",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "09:00-10:30",
        "title": "Draft related work section",
        "kind": "event",
        "duration_minutes": 90
      },
      {
        "time": "10:45-11:15",
        "title": "Lab standup",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "12:10-12:40",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:00-13:20",
        "title": "Answer TA emails",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "14:00-14:45",
        "title": "Teaching support tasks",
        "kind": "event",
        "duration_minutes": 45
      },
      {
        "time": "15:00-15:30",
        "title": "Prepare two reading group questions",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "16:15-16:35",
        "title": "Send advisor progress note",
        "kind": "event",
        "duration_minutes": 20
      }
    ],
    "priority_schedule": [
      {
        "title": "Draft related work section",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 90
      },
      {
        "title": "Answer TA emails",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "low",
        "duration_minutes": 20
      },
      {
        "title": "Prepare two reading group questions",
        "kind": "task",
        "rank": 3,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 30
      }
    ],
    "open_carry_overs": [
      "Draft related work section"
    ]
  },
  "value": {
    "top_values": [
      {
        "value_id": "Independent Thinking",
        "name": "Independent Thinking",
        "emoji": "compass",
        "feels_like_labels": [
          "mentally clear",
          "self-trusting",
          "unboxed"
        ],
        "daily_sign_labels": [
          "having room to think",
          "making decisions faster"
        ],
        "personal_definition": "trusting my own questions before borrowing other people's"
      },
      {
        "value_id": "Success",
        "name": "Success",
        "emoji": "trophy",
        "feels_like_labels": [
          "accomplished",
          "focused",
          "competent"
        ],
        "daily_sign_labels": [
          "finishing what matters",
          "visible progress"
        ],
        "personal_definition": "finishing what matters"
      },
      {
        "value_id": "Open-Mindedness",
        "name": "Open-Mindedness",
        "emoji": "telescope",
        "feels_like_labels": [
          "curious",
          "supported"
        ],
        "daily_sign_labels": [
          "learning something"
        ],
        "personal_definition": "staying curious about answers I did not expect"
      }
    ],
    "ideal_life": {
      "statement": "A life where I think and write on my own questions",
      "life_shape_labels": [
        "independent research",
        "deep work mornings"
      ]
    }
  },
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration and some restlessness.",
      "activity_summary": "4200 steps and 22 active minutes; mostly light movement before a morning writing block.",
      "stress_summary": "Stress is elevated by short sleep and paper pressure, so focus may need a softer start."
    },
    "sleep_hours": 5.5,
    "current_energy_level": 3,
    "focus_cues": {
      "visual": [
        "laptop open to the paper draft",
        "three anchor papers beside the keyboard",
        "morning light coming through the window"
      ],
      "auditory": [
        "quiet apartment hum"
      ],
      "tactile_body": [
        "second coffee in reach",
        "feet on the floor"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee or water"
      ],
      "other": [
        "phone face down"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
Breath is already here; you notice one inhale and one longer exhale without forcing either. The chair holds your posture, feet meet the floor, jaw and shoulders soften, and with short sleep and low energy, the morning light becomes a quiet place to begin.

### Task visualization
The feeling to rehearse is mentally clear, self-trusting, and competent: one strong workshop paper submitted by June 30, in service of becoming an independent researcher; today the anchors are Draft related work section for 90 minutes, Answer TA emails for 20, then Prepare two reading group questions for 30. Imagine Draft related work section moving to one coherent draft section, not perfect, but real visible progress toward the paper you can defend. What does done enough feel like in your body, attention, and thoughts? If energy dips, what helps you return to the next honest paragraph?

### Ending
You can move through the three priorities today: the related work is the main win, and the emails and questions are lighter completions. Start with one paragraph. Repeat this once: Low energy can still carry one clear question forward.

## full script (179 words)

Breath is already here; you notice one inhale and one longer exhale without forcing either. The chair holds your posture, feet meet the floor, jaw and shoulders soften, and with short sleep and low energy, the morning light becomes a quiet place to begin.

The feeling to rehearse is mentally clear, self-trusting, and competent: one strong workshop paper submitted by June 30, in service of becoming an independent researcher; today the anchors are Draft related work section for 90 minutes, Answer TA emails for 20, then Prepare two reading group questions for 30. Imagine Draft related work section moving to one coherent draft section, not perfect, but real visible progress toward the paper you can defend. What does done enough feel like in your body, attention, and thoughts? If energy dips, what helps you return to the next honest paragraph?

You can move through the three priorities today: the related work is the main win, and the emails and questions are lighter completions. Start with one paragraph. Repeat this once: Low energy can still carry one clear question forward.

# maya_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":163,"mind":166,"body":158,"soul":162,"full":179}

## baseline input

```json
{
  "preparationOnlyContext": "Specific task preparation for the related work writing block.",
  "visibleItems": [
    "Draft related work section - 90 min",
    "Re-read anchor findings - 15 min",
    "Draft gap statement - 20 min",
    "Connect related work to gap - 25 min"
  ]
}
```


## baseline script (163 words)

This is the visible task preparation context for the related work writing block. The list has four visible items. The first item is “Draft related work section,” and it is listed as 90 minutes. This is the longest listed item, and it is related to the writing block.

The second item is “Re-read anchor findings,” and it is listed as 15 minutes. This item is also related to the related work writing block. It appears as a shorter item in the visible list.

The third item is “Draft gap statement,” and it is listed as 20 minutes. This is another writing-related item. It is separate from the 90-minute related work section item, even though the wording is connected to the same area.

The fourth item is “Connect related work to gap,” and it is listed as 25 minutes. This item mentions both related work and the gap. It is the last visible item in the list.

That is the visible task preparation context.

## mind input

```json
{
  "arm": "mind",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "maya-chen",
      "priority": {
        "title": "Become an independent researcher",
        "description": "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a strong workshop paper this month",
          "exactQuantity": {
            "value": 1,
            "unit": "workshop paper submission",
            "description": "one complete draft submitted to the workshop"
          },
          "exactDate": {
            "label": "by the end of June 2026",
            "isoDate": "2026-06-30"
          },
          "keySteps": [
            {
              "id": "related-work",
              "label": "Complete the related work section",
              "target": "one coherent section draft"
            },
            {
              "id": "gap-statement",
              "label": "Write the gap statement",
              "target": "one paragraph the advisor can react to"
            },
            {
              "id": "full-draft",
              "label": "Assemble the workshop paper draft",
              "target": "one submission-ready PDF"
            }
          ],
          "metric": "one strong workshop paper draft submitted",
          "deadline": "2026-06-30"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "maya-related-work",
      "title": "Draft related work section",
      "project_title": "CHI workshop paper",
      "parent_goal_title": "Submit a strong workshop paper this month",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 90
    },
    "focus_subtasks": [
      {
        "subtask_id": "maya-rw-1",
        "title": "Re-read the three anchor papers' findings sections",
        "order": 1,
        "duration_minutes": 15
      },
      {
        "subtask_id": "maya-rw-2",
        "title": "Draft the gap statement",
        "order": 2,
        "duration_minutes": 20
      },
      {
        "subtask_id": "maya-rw-3",
        "title": "Connect related work back to the gap",
        "order": 3,
        "duration_minutes": 25
      }
    ]
  }
}
```

## mind sections

### Introduction
I picture the larger paper goal clearly: one strong CHI workshop submission by the end of June. The work context is the related work section, a 90-minute session aimed at a coherent draft.

### Task visualization
I see myself begin by re-reading the three anchor papers’ findings sections, noticing the claims that matter for this workshop paper and keeping only the points that support the section. I picture the gap statement taking shape as one direct paragraph the advisor can react to, specific enough to guide the draft without trying to solve every issue at once. I then connect the related work back to that gap, placing each citation where it helps the reader understand why the paper is needed. I can finish with a related work section that is usable, coherent, and ready for the next revision pass.

### Ending
I leave the session with the paper moved forward in a concrete way. The next doable work action is clear: keep building from this section into the full workshop draft.

## mind script (166 words)

I picture the larger paper goal clearly: one strong CHI workshop submission by the end of June. The work context is the related work section, a 90-minute session aimed at a coherent draft.

I see myself begin by re-reading the three anchor papers’ findings sections, noticing the claims that matter for this workshop paper and keeping only the points that support the section. I picture the gap statement taking shape as one direct paragraph the advisor can react to, specific enough to guide the draft without trying to solve every issue at once. I then connect the related work back to that gap, placing each citation where it helps the reader understand why the paper is needed. I can finish with a related work section that is usable, coherent, and ready for the next revision pass.

I leave the session with the paper moved forward in a concrete way. The next doable work action is clear: keep building from this section into the full workshop draft.

## body input

```json
{
  "arm": "body",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "body"
  ],
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration and some restlessness.",
      "activity_summary": "light movement so far; morning work block beginning",
      "stress_summary": "Stress is elevated around the morning writing block, so the start may feel effortful."
    },
    "sleep_hours": 5.5,
    "current_energy_level": 3,
    "focus_cues": {
      "visual": [
        "paper draft open",
        "anchor papers beside the keyboard",
        "cursor at the related work section"
      ],
      "auditory": [
        "quiet apartment hum"
      ],
      "tactile_body": [
        "feet on the floor",
        "warm mug nearby"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee or water"
      ],
      "other": [
        "phone face down"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
I take a slow breath in and let the breath leave without forcing it. I feel my posture as it is, not needing it to be perfect. My feet meet the floor. My shoulders may hold some effort from short, restless sleep. I notice the weight of my body supported here.

### Task visualization
I let my energy be low and real. There is no need to pretend I am sharper than I feel. I sense the quiet hum around me, the warmth of the mug nearby, and the smell of coffee. Stress may be present as tightness, pressure, or a quickened pace inside. I can soften my jaw, lower my shoulders, and feel one breath at a time. When I am ready, my eyes can rest on the paper draft, the anchor papers, or the cursor, using them only as simple places to land.

### Ending
I stay with a steady body and an honest pace. Feet on floor, breath in body.

## body script (158 words)

I take a slow breath in and let the breath leave without forcing it. I feel my posture as it is, not needing it to be perfect. My feet meet the floor. My shoulders may hold some effort from short, restless sleep. I notice the weight of my body supported here.

I let my energy be low and real. There is no need to pretend I am sharper than I feel. I sense the quiet hum around me, the warmth of the mug nearby, and the smell of coffee. Stress may be present as tightness, pressure, or a quickened pace inside. I can soften my jaw, lower my shoulders, and feel one breath at a time. When I am ready, my eyes can rest on the paper draft, the anchor papers, or the cursor, using them only as simple places to land.

I stay with a steady body and an honest pace. Feet on floor, breath in body.

## soul input

```json
{
  "arm": "soul",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "value"
  ],
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Independent Thinking",
        "name": "Independent Thinking",
        "emoji": "compass",
        "feels_like_labels": [
          "mentally clear",
          "self-trusting",
          "unboxed"
        ],
        "daily_sign_labels": [
          "having room to think",
          "making decisions faster"
        ],
        "personal_definition": "trusting my own questions before borrowing other people's"
      },
      {
        "value_id": "Success",
        "name": "Success",
        "emoji": "trophy",
        "feels_like_labels": [
          "accomplished",
          "focused",
          "competent"
        ],
        "daily_sign_labels": [
          "finishing what matters",
          "visible progress"
        ],
        "personal_definition": "finishing what matters"
      },
      {
        "value_id": "Open-Mindedness",
        "name": "Open-Mindedness",
        "emoji": "telescope",
        "feels_like_labels": [
          "curious",
          "supported"
        ],
        "daily_sign_labels": [
          "learning something"
        ],
        "personal_definition": "staying curious about answers I did not expect"
      }
    ],
    "ideal_life": {
      "statement": "A life where I think and write on my own questions",
      "life_shape_labels": [
        "independent research",
        "deep work mornings"
      ]
    }
  }
}
```

## soul sections

### Introduction
I let what matters come into view: trusting my own questions before borrowing other people’s, finishing what matters in a way that feels competent, and staying curious about answers I did not expect.

### Task visualization
I move through this day with room inside my mind, not needing every answer to arrive already approved by someone else. I can feel mentally clear, self-trusting, and unboxed, letting curiosity sit beside competence instead of replacing it. I notice the quiet signs of alignment: a little more room to think, a cleaner decision, a moment of learning, a sense that my own questions are allowed to lead. I let the life I want feel near, a life where I think and write from my own questions, not as a performance, but as a way of being honest with my mind.

### Ending
Repeat this once: I do not have to borrow certainty; I can move with my own questions, stay curious, and let what matters become clear from the inside.

## soul script (162 words)

I let what matters come into view: trusting my own questions before borrowing other people’s, finishing what matters in a way that feels competent, and staying curious about answers I did not expect.

I move through this day with room inside my mind, not needing every answer to arrive already approved by someone else. I can feel mentally clear, self-trusting, and unboxed, letting curiosity sit beside competence instead of replacing it. I notice the quiet signs of alignment: a little more room to think, a cleaner decision, a moment of learning, a sense that my own questions are allowed to lead. I let the life I want feel near, a life where I think and write from my own questions, not as a performance, but as a way of being honest with my mind.

Repeat this once: I do not have to borrow certainty; I can move with my own questions, stay curious, and let what matters become clear from the inside.

## full input

```json
{
  "arm": "full",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Maya",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "maya-chen",
      "priority": {
        "title": "Become an independent researcher",
        "description": "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a strong workshop paper this month",
          "exactQuantity": {
            "value": 1,
            "unit": "workshop paper submission",
            "description": "one complete draft submitted to the workshop"
          },
          "exactDate": {
            "label": "by the end of June 2026",
            "isoDate": "2026-06-30"
          },
          "keySteps": [
            {
              "id": "related-work",
              "label": "Complete the related work section",
              "target": "one coherent section draft"
            },
            {
              "id": "gap-statement",
              "label": "Write the gap statement",
              "target": "one paragraph the advisor can react to"
            },
            {
              "id": "full-draft",
              "label": "Assemble the workshop paper draft",
              "target": "one submission-ready PDF"
            }
          ],
          "metric": "one strong workshop paper draft submitted",
          "deadline": "2026-06-30"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "maya-related-work",
      "title": "Draft related work section",
      "project_title": "CHI workshop paper",
      "parent_goal_title": "Submit a strong workshop paper this month",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 90
    },
    "focus_subtasks": [
      {
        "subtask_id": "maya-rw-1",
        "title": "Re-read the three anchor papers' findings sections",
        "order": 1,
        "duration_minutes": 15
      },
      {
        "subtask_id": "maya-rw-2",
        "title": "Draft the gap statement",
        "order": 2,
        "duration_minutes": 20
      },
      {
        "subtask_id": "maya-rw-3",
        "title": "Connect related work back to the gap",
        "order": 3,
        "duration_minutes": 25
      }
    ]
  },
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Independent Thinking",
        "name": "Independent Thinking",
        "emoji": "compass",
        "feels_like_labels": [
          "mentally clear",
          "self-trusting",
          "unboxed"
        ],
        "daily_sign_labels": [
          "having room to think",
          "making decisions faster"
        ],
        "personal_definition": "trusting my own questions before borrowing other people's"
      },
      {
        "value_id": "Success",
        "name": "Success",
        "emoji": "trophy",
        "feels_like_labels": [
          "accomplished",
          "focused",
          "competent"
        ],
        "daily_sign_labels": [
          "finishing what matters",
          "visible progress"
        ],
        "personal_definition": "finishing what matters"
      },
      {
        "value_id": "Open-Mindedness",
        "name": "Open-Mindedness",
        "emoji": "telescope",
        "feels_like_labels": [
          "curious",
          "supported"
        ],
        "daily_sign_labels": [
          "learning something"
        ],
        "personal_definition": "staying curious about answers I did not expect"
      }
    ],
    "ideal_life": {
      "statement": "A life where I think and write on my own questions",
      "life_shape_labels": [
        "independent research",
        "deep work mornings"
      ]
    }
  },
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration and some restlessness.",
      "activity_summary": "light movement so far; morning work block beginning",
      "stress_summary": "Stress is elevated around the morning writing block, so the start may feel effortful."
    },
    "sleep_hours": 5.5,
    "current_energy_level": 3,
    "focus_cues": {
      "visual": [
        "paper draft open",
        "anchor papers beside the keyboard",
        "cursor at the related work section"
      ],
      "auditory": [
        "quiet apartment hum"
      ],
      "tactile_body": [
        "feet on the floor",
        "warm mug nearby"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee or water"
      ],
      "other": [
        "phone face down"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
My breath is already here, moving in and out without needing to be forced. I feel the chair holding my posture, my feet on the floor, my jaw softening a little, and I notice this low, effortful energy after short sleep and elevated morning stress. The paper draft is open, the apartment hums quietly, and my attention has one place to land.

### Task visualization
This work serves becoming an independent researcher: a life where I think and write on my own questions, with mental clarity, self-trust, curiosity, and visible progress. I am rehearsing Draft related work section: first I re-read the three anchor papers' findings sections, then I draft the gap statement, then I connect the related work back to that gap. As each step settles, I trust my own questions before borrowing other people's, and I can see the section becoming coherent enough for the workshop paper to move forward.

### Ending
I begin with the next readable sentence, not the whole ninety minutes at once. Repeat this once: Even with low energy, one honest pass keeps faith with my own questions.

## full script (179 words)

My breath is already here, moving in and out without needing to be forced. I feel the chair holding my posture, my feet on the floor, my jaw softening a little, and I notice this low, effortful energy after short sleep and elevated morning stress. The paper draft is open, the apartment hums quietly, and my attention has one place to land.

This work serves becoming an independent researcher: a life where I think and write on my own questions, with mental clarity, self-trust, curiosity, and visible progress. I am rehearsing Draft related work section: first I re-read the three anchor papers' findings sections, then I draft the gap statement, then I connect the related work back to that gap. As each step settles, I trust my own questions before borrowing other people's, and I can see the section becoming coherent enough for the workshop paper to move forward.

I begin with the next readable sentence, not the whole ninety minutes at once. Repeat this once: Even with low energy, one honest pass keeps faith with my own questions.

# jonah_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":158,"mind":166,"body":165,"soul":155,"full":180}

## baseline input

```json
{
  "preparationOnlyContext": "Daily preparation with the full calendar schedule and durations, without priority ranking.",
  "visibleItems": [
    "08:45-09:05 Inbox triage - 20 min",
    "09:30-10:30 Finalize launch risk brief - 60 min",
    "10:40-10:55 Engineering check-in - 15 min",
    "11:00-11:30 Review support escalation notes - 30 min",
    "12:15-12:45 Lunch break - 30 min",
    "13:00-13:30 Stakeholder sync - 30 min",
    "14:10-14:30 Draft meeting opening - 20 min",
    "15:00-16:00 Launch review meeting - 60 min"
  ]
}
```


## baseline script (158 words)

This is only the visible schedule for the day. It begins with Inbox triage from 08:45 to 09:05, which is 20 minutes. This is an email item.

The next visible item is Finalize launch risk brief from 09:30 to 10:30. That is listed as 60 minutes. After that, there is an Engineering check-in from 10:40 to 10:55, lasting 15 minutes. This is a meeting item.

At 11:00, there is Review support escalation notes until 11:30. That is 30 minutes, and it is a notes review item. Then there is Lunch break from 12:15 to 12:45, also 30 minutes. This is a lunch item.

In the afternoon, there is Stakeholder sync from 13:00 to 13:30, which is 30 minutes. Then Draft meeting opening is listed from 14:10 to 14:30, lasting 20 minutes.

The last visible item is Launch review meeting from 15:00 to 16:00. It is 60 minutes and is another meeting item. That is the visible calendar schedule.

## mind input

```json
{
  "arm": "mind",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "user_goal": {
      "userid": "jonah-rivera",
      "priority": {
        "title": "Lead with clarity",
        "description": "Lead product work with clarity and responsibility, making decisions that help the team move forward without becoming reactive."
      },
      "goal_1": {
        "answers": {
          "what": "Run a launch review that surfaces risks early",
          "exactQuantity": {
            "value": 1,
            "unit": "launch review risk brief",
            "description": "one meeting-ready risk brief before the review"
          },
          "exactDate": {
            "label": "by 3:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "risks",
              "label": "Name top unresolved launch risks",
              "target": "three to five risks"
            },
            {
              "id": "owners",
              "label": "Assign owners and decision points",
              "target": "one owner per risk"
            },
            {
              "id": "summary",
              "label": "Write the meeting-ready summary",
              "target": "one opening summary"
            }
          ],
          "metric": "risk brief ready before review",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "08:45-09:05",
        "title": "Inbox triage",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "09:30-10:30",
        "title": "Finalize launch risk brief",
        "kind": "event",
        "duration_minutes": 60
      },
      {
        "time": "10:40-10:55",
        "title": "Engineering check-in",
        "kind": "event",
        "duration_minutes": 15
      },
      {
        "time": "11:00-11:30",
        "title": "Review support escalation notes",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "12:15-12:45",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:00-13:30",
        "title": "Stakeholder sync",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "14:10-14:30",
        "title": "Draft meeting opening",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "15:00-16:00",
        "title": "Launch review meeting",
        "kind": "event",
        "duration_minutes": 60
      }
    ],
    "priority_schedule": [
      {
        "title": "Finalize launch risk brief",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 60
      },
      {
        "title": "Draft meeting opening",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "low",
        "duration_minutes": 20
      },
      {
        "title": "Review support escalation notes",
        "kind": "task",
        "rank": 3,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 30
      }
    ],
    "open_carry_overs": [
      "Finalize launch risk brief"
    ]
  }
}
```

## mind sections

### Introduction
The larger priority is to lead product work with clarity and responsibility, making decisions that help the team move forward without becoming reactive. Today’s work context centers on the launch review and the risk brief before it.

### Task visualization
First comes Finalize launch risk brief for 60 minutes, then Draft meeting opening for 20 minutes, then Review support escalation notes for 30 minutes. You see the risk brief becoming meeting-ready: three to five unresolved risks named plainly, one owner and decision point attached to each, and an opening summary that makes the review easier to run. Good enough means the brief can be used at 3:00 PM without another full rewrite. What tells you the brief is clear enough to move forward? If attention stalls on one risk, what practical move returns you to the next concrete pass?

### Ending
You can move the work forward by choosing the next unresolved risk, naming it in direct language, and attaching the owner or decision point that makes the review more usable.

## mind script (166 words)

The larger priority is to lead product work with clarity and responsibility, making decisions that help the team move forward without becoming reactive. Today’s work context centers on the launch review and the risk brief before it.

First comes Finalize launch risk brief for 60 minutes, then Draft meeting opening for 20 minutes, then Review support escalation notes for 30 minutes. You see the risk brief becoming meeting-ready: three to five unresolved risks named plainly, one owner and decision point attached to each, and an opening summary that makes the review easier to run. Good enough means the brief can be used at 3:00 PM without another full rewrite. What tells you the brief is clear enough to move forward? If attention stalls on one risk, what practical move returns you to the next concrete pass?

You can move the work forward by choosing the next unresolved risk, naming it in direct language, and attaching the owner or decision point that makes the review more usable.

## body input

```json
{
  "arm": "body",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "body"
  ],
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.1 hours slept with good continuity; sleep quality 82/100 and enough morning readiness for focused planning.",
      "activity_summary": "2300 steps and 18 active minutes before work.",
      "stress_summary": "Stress is manageable, with meeting pressure likely to rise near the launch review."
    },
    "sleep_hours": 7.1,
    "current_energy_level": 6,
    "focus_cues": {
      "visual": [
        "launch dashboard pinned",
        "stakeholder notes open",
        "risk doc in split view"
      ],
      "auditory": [
        "low office noise",
        "calendar alerts muted"
      ],
      "tactile_body": [
        "hands on keyboard",
        "water bottle beside laptop"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "Slack set to focus mode"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
Begin with one easy breath in, and a slower breath out. Feel your posture from the inside: the weight of your body supported, feet meeting the floor, shoulders allowed to drop a little. Notice any tightness in the jaw, neck, or hands, and let it be known without forcing it away. Hear the low sound around you as part of the room.

### Task visualization
You have enough rest in your system to arrive without rushing, and a moderate, usable level of energy. Your body has already moved some today, so notice the quiet aliveness in your legs and hands. If pressure rises, feel it first as sensation: breath, chest, belly, shoulders. Let the pinned screen, open notes, muted alerts, hands on the keyboard, water nearby, and the taste of coffee become simple anchors for where you are now.

### Ending
Take one more steady breath. Let your eyes soften, your hands settle, and your pace become honest. Return to this line when needed: feet down, breath steady, body here.

## body script (165 words)

Begin with one easy breath in, and a slower breath out. Feel your posture from the inside: the weight of your body supported, feet meeting the floor, shoulders allowed to drop a little. Notice any tightness in the jaw, neck, or hands, and let it be known without forcing it away. Hear the low sound around you as part of the room.

You have enough rest in your system to arrive without rushing, and a moderate, usable level of energy. Your body has already moved some today, so notice the quiet aliveness in your legs and hands. If pressure rises, feel it first as sensation: breath, chest, belly, shoulders. Let the pinned screen, open notes, muted alerts, hands on the keyboard, water nearby, and the taste of coffee become simple anchors for where you are now.

Take one more steady breath. Let your eyes soften, your hands settle, and your pace become honest. Return to this line when needed: feet down, breath steady, body here.

## soul input

```json
{
  "arm": "soul",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "value"
  ],
  "value": {
    "top_values": [
      {
        "value_id": "Clarity",
        "name": "Clarity",
        "emoji": "lens",
        "feels_like_labels": [
          "organized",
          "decisive",
          "uncluttered"
        ],
        "daily_sign_labels": [
          "cleaner priorities",
          "fewer ambiguous asks"
        ],
        "personal_definition": "making the next decision visible enough for the team to act"
      },
      {
        "value_id": "Responsibility",
        "name": "Responsibility",
        "emoji": "anchor",
        "feels_like_labels": [
          "prepared",
          "steady",
          "accountable"
        ],
        "daily_sign_labels": [
          "risks named clearly",
          "owners identified"
        ],
        "personal_definition": "owning the risk without carrying every task alone"
      },
      {
        "value_id": "Calm Leadership",
        "name": "Calm Leadership",
        "emoji": "signal",
        "feels_like_labels": [
          "calm",
          "firm",
          "useful"
        ],
        "daily_sign_labels": [
          "clear openings",
          "less reactive Slack checking"
        ],
        "personal_definition": "creating steadiness when the room gets noisy"
      }
    ],
    "ideal_life": {
      "statement": "A work life where I help teams make clear decisions without living in urgency",
      "life_shape_labels": [
        "clear leadership",
        "protected strategy time"
      ]
    }
  }
}
```

## soul sections

### Introduction
Let clarity come forward as the feeling of things becoming visible enough to choose, not perfect, just uncluttered and usable. Responsibility is steady here: you can own what is real without carrying everything alone, naming risk plainly and letting shared ownership exist. Calm leadership feels like a clean signal in a noisy room, firm without harshness, useful without urgency.

### Task visualization
As you move through the day, you notice where a next decision wants to become simpler, where an unclear ask can become cleaner, where steadiness matters more than speed. You do not need to absorb every pressure to be accountable; you can let preparation, plain language, and calm presence do part of the holding. In the kind of work life you are shaping, teams make clearer decisions without everyone having to live inside urgency.

### Ending
Your anchor is: you make the next decision visible, own the real risk lightly, and bring steadiness when the room gets noisy.

## soul script (155 words)

Let clarity come forward as the feeling of things becoming visible enough to choose, not perfect, just uncluttered and usable. Responsibility is steady here: you can own what is real without carrying everything alone, naming risk plainly and letting shared ownership exist. Calm leadership feels like a clean signal in a noisy room, firm without harshness, useful without urgency.

As you move through the day, you notice where a next decision wants to become simpler, where an unclear ask can become cleaner, where steadiness matters more than speed. You do not need to absorb every pressure to be accountable; you can let preparation, plain language, and calm presence do part of the holding. In the kind of work life you are shaping, teams make clearer decisions without everyone having to live inside urgency.

Your anchor is: you make the next decision visible, own the real risk lightly, and bring steadiness when the room gets noisy.

## full input

```json
{
  "arm": "full",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "user_goal": {
      "userid": "jonah-rivera",
      "priority": {
        "title": "Lead with clarity",
        "description": "Lead product work with clarity and responsibility, making decisions that help the team move forward without becoming reactive."
      },
      "goal_1": {
        "answers": {
          "what": "Run a launch review that surfaces risks early",
          "exactQuantity": {
            "value": 1,
            "unit": "launch review risk brief",
            "description": "one meeting-ready risk brief before the review"
          },
          "exactDate": {
            "label": "by 3:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "risks",
              "label": "Name top unresolved launch risks",
              "target": "three to five risks"
            },
            {
              "id": "owners",
              "label": "Assign owners and decision points",
              "target": "one owner per risk"
            },
            {
              "id": "summary",
              "label": "Write the meeting-ready summary",
              "target": "one opening summary"
            }
          ],
          "metric": "risk brief ready before review",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "08:45-09:05",
        "title": "Inbox triage",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "09:30-10:30",
        "title": "Finalize launch risk brief",
        "kind": "event",
        "duration_minutes": 60
      },
      {
        "time": "10:40-10:55",
        "title": "Engineering check-in",
        "kind": "event",
        "duration_minutes": 15
      },
      {
        "time": "11:00-11:30",
        "title": "Review support escalation notes",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "12:15-12:45",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:00-13:30",
        "title": "Stakeholder sync",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "14:10-14:30",
        "title": "Draft meeting opening",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "15:00-16:00",
        "title": "Launch review meeting",
        "kind": "event",
        "duration_minutes": 60
      }
    ],
    "priority_schedule": [
      {
        "title": "Finalize launch risk brief",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 60
      },
      {
        "title": "Draft meeting opening",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "low",
        "duration_minutes": 20
      },
      {
        "title": "Review support escalation notes",
        "kind": "task",
        "rank": 3,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 30
      }
    ],
    "open_carry_overs": [
      "Finalize launch risk brief"
    ]
  },
  "value": {
    "top_values": [
      {
        "value_id": "Clarity",
        "name": "Clarity",
        "emoji": "lens",
        "feels_like_labels": [
          "organized",
          "decisive",
          "uncluttered"
        ],
        "daily_sign_labels": [
          "cleaner priorities",
          "fewer ambiguous asks"
        ],
        "personal_definition": "making the next decision visible enough for the team to act"
      },
      {
        "value_id": "Responsibility",
        "name": "Responsibility",
        "emoji": "anchor",
        "feels_like_labels": [
          "prepared",
          "steady",
          "accountable"
        ],
        "daily_sign_labels": [
          "risks named clearly",
          "owners identified"
        ],
        "personal_definition": "owning the risk without carrying every task alone"
      },
      {
        "value_id": "Calm Leadership",
        "name": "Calm Leadership",
        "emoji": "signal",
        "feels_like_labels": [
          "calm",
          "firm",
          "useful"
        ],
        "daily_sign_labels": [
          "clear openings",
          "less reactive Slack checking"
        ],
        "personal_definition": "creating steadiness when the room gets noisy"
      }
    ],
    "ideal_life": {
      "statement": "A work life where I help teams make clear decisions without living in urgency",
      "life_shape_labels": [
        "clear leadership",
        "protected strategy time"
      ]
    }
  },
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.1 hours slept with good continuity; sleep quality 82/100 and enough morning readiness for focused planning.",
      "activity_summary": "2300 steps and 18 active minutes before work.",
      "stress_summary": "Stress is manageable, with meeting pressure likely to rise near the launch review."
    },
    "sleep_hours": 7.1,
    "current_energy_level": 6,
    "focus_cues": {
      "visual": [
        "launch dashboard pinned",
        "stakeholder notes open",
        "risk doc in split view"
      ],
      "auditory": [
        "low office noise",
        "calendar alerts muted"
      ],
      "tactile_body": [
        "hands on keyboard",
        "water bottle beside laptop"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "Slack set to focus mode"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
Breath is already here, steady enough to notice, as your chair supports your posture and your feet meet the floor. Your jaw softens, your shoulders register what they carry, and today’s rested but moderate energy settles in with low office noise around you.

### Task visualization
Let the day aim for organized, decisive, calm leadership in service of helping the team make clear decisions without urgency: the most important win is Finalize launch risk brief for 60 minutes, then Draft meeting opening for 20, then Review support escalation notes for 30. Imagine the brief becoming done enough: three to five risks named, owners visible, decision points clear, and the 3:00 review feeling less reactive because the next decisions are visible. What does that accomplishment feel like in your body, attention, and thoughts? If meeting pressure rises or attention drifts, what helps you return to the next visible decision?

### Ending
You can carry these three priorities through today: the brief as the main win, the opening and notes as lighter completions. Steady clarity is enough; you own the risk by making the next decision visible.

## full script (180 words)

Breath is already here, steady enough to notice, as your chair supports your posture and your feet meet the floor. Your jaw softens, your shoulders register what they carry, and today’s rested but moderate energy settles in with low office noise around you.

Let the day aim for organized, decisive, calm leadership in service of helping the team make clear decisions without urgency: the most important win is Finalize launch risk brief for 60 minutes, then Draft meeting opening for 20, then Review support escalation notes for 30. Imagine the brief becoming done enough: three to five risks named, owners visible, decision points clear, and the 3:00 review feeling less reactive because the next decisions are visible. What does that accomplishment feel like in your body, attention, and thoughts? If meeting pressure rises or attention drifts, what helps you return to the next visible decision?

You can carry these three priorities through today: the brief as the main win, the opening and notes as lighter completions. Steady clarity is enough; you own the risk by making the next decision visible.

# jonah_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":165,"mind":143,"body":184,"soul":163,"full":178}

## baseline input

```json
{
  "preparationOnlyContext": "Specific task preparation for the launch risk brief.",
  "visibleItems": [
    "Name top risks - 20 min",
    "Assign owners - 20 min",
    "Write meeting-ready summary - 20 min"
  ]
}
```


## baseline script (165 words)

This is the visible task context for the launch risk brief. The list has three items, and each item is shown as 20 minutes. The items are written as short task labels with a duration after each one.

The first listed item is “Name top risks - 20 min.” This item is related to the launch risk brief because it names risks. The duration shown for this item is 20 minutes. It is the first item in the visible list.

The second listed item is “Assign owners - 20 min.” This item is also related to the launch risk brief. It has the same listed duration, 20 minutes. It appears after the risk-naming item.

The third listed item is “Write meeting-ready summary - 20 min.” This is a summary item. It is also listed as 20 minutes. It appears after the owner assignment item.

There are three visible items total. The visible durations add up to 60 minutes. That is the visible task preparation context.

## mind input

```json
{
  "arm": "mind",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "jonah-rivera",
      "priority": {
        "title": "Lead with clarity",
        "description": "Lead product work with clarity and responsibility, making decisions that help the team move forward without becoming reactive."
      },
      "goal_1": {
        "answers": {
          "what": "Run a launch review that surfaces risks early",
          "exactQuantity": {
            "value": 1,
            "unit": "launch review risk brief",
            "description": "one meeting-ready risk brief before the review"
          },
          "exactDate": {
            "label": "by 3:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "risks",
              "label": "Name top unresolved launch risks",
              "target": "three to five risks"
            },
            {
              "id": "owners",
              "label": "Assign owners and decision points",
              "target": "one owner per risk"
            },
            {
              "id": "summary",
              "label": "Write the meeting-ready summary",
              "target": "one opening summary"
            }
          ],
          "metric": "risk brief ready before review",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "jonah-risk-brief",
      "title": "Finalize launch risk brief",
      "project_title": "Feature launch review",
      "parent_goal_title": "Run a launch review that surfaces risks early",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 60
    },
    "focus_subtasks": [
      {
        "subtask_id": "jonah-risk-1",
        "title": "Name top unresolved launch risks",
        "order": 1,
        "duration_minutes": 20
      },
      {
        "subtask_id": "jonah-risk-2",
        "title": "Assign owners and decision points",
        "order": 2,
        "duration_minutes": 20
      },
      {
        "subtask_id": "jonah-risk-3",
        "title": "Write the meeting-ready summary",
        "order": 3,
        "duration_minutes": 20
      }
    ]
  }
}
```

## mind sections

### Introduction
The larger aim is to guide product work responsibly, making decisions that help the team move forward without becoming reactive. I picture the Feature launch review context and the task: Finalize launch risk brief.

### Task visualization
I see the 60-minute work period begin with the brief as the single target. First, I name the top unresolved launch risks, narrowing the list to three to five items that are specific enough for discussion. Next, I assign one owner to each risk and mark the decision point that will matter in the review. Then I write the meeting-ready opening summary, keeping it direct, useful, and ready to read at the start of the conversation.

### Ending
I picture the risk brief complete before 3:00 PM today: risks named, owners attached, decisions visible, and the summary ready. I can move the review forward with this next finished piece of work.

## mind script (143 words)

The larger aim is to guide product work responsibly, making decisions that help the team move forward without becoming reactive. I picture the Feature launch review context and the task: Finalize launch risk brief.

I see the 60-minute work period begin with the brief as the single target. First, I name the top unresolved launch risks, narrowing the list to three to five items that are specific enough for discussion. Next, I assign one owner to each risk and mark the decision point that will matter in the review. Then I write the meeting-ready opening summary, keeping it direct, useful, and ready to read at the start of the conversation.

I picture the risk brief complete before 3:00 PM today: risks named, owners attached, decisions visible, and the summary ready. I can move the review forward with this next finished piece of work.

## body input

```json
{
  "arm": "body",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "body"
  ],
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.1 hours slept with good continuity; sleep quality 82/100 and enough morning readiness for focused planning.",
      "activity_summary": "light commute movement; morning desk block",
      "stress_summary": "Stress is moderate and tied to risk ownership and deadline pressure."
    },
    "sleep_hours": 7.1,
    "current_energy_level": 6,
    "focus_cues": {
      "visual": [
        "risk brief outline open",
        "dashboard tab pinned",
        "owner list beside the doc"
      ],
      "auditory": [
        "quiet meeting room",
        "notifications paused"
      ],
      "tactile_body": [
        "laptop on conference table",
        "water bottle nearby"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "meeting invite minimized"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
I take a slow breath in, and I let the breath leave without forcing it. I feel my posture as it is, supported by the chair and grounded through my feet. I notice any tightness in my jaw, shoulders, chest, or hands, and I give those places a little more room. My body has had enough sleep to be here with some steadiness, even if there is pressure in the background.

### Task visualization
I notice my energy as moderate and usable, not needing to be pushed into something bigger. The quiet room supports my attention. Notifications are paused, so the space around me can feel less sharp. I feel the laptop on the conference table, the water bottle nearby, and the taste of coffee. The open outline, pinned dashboard, owner list, and minimized invite are simply visual anchors. I let them mark the room while I stay with my breath, my hands, and the weight of my body.

### Ending
I let my shoulders settle one more time. I can be alert without bracing. I stay with this pace, this breath, this contact. Anchor line: breath, feet, hands.

## body script (184 words)

I take a slow breath in, and I let the breath leave without forcing it. I feel my posture as it is, supported by the chair and grounded through my feet. I notice any tightness in my jaw, shoulders, chest, or hands, and I give those places a little more room. My body has had enough sleep to be here with some steadiness, even if there is pressure in the background.

I notice my energy as moderate and usable, not needing to be pushed into something bigger. The quiet room supports my attention. Notifications are paused, so the space around me can feel less sharp. I feel the laptop on the conference table, the water bottle nearby, and the taste of coffee. The open outline, pinned dashboard, owner list, and minimized invite are simply visual anchors. I let them mark the room while I stay with my breath, my hands, and the weight of my body.

I let my shoulders settle one more time. I can be alert without bracing. I stay with this pace, this breath, this contact. Anchor line: breath, feet, hands.

## soul input

```json
{
  "arm": "soul",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "value"
  ],
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Clarity",
        "name": "Clarity",
        "emoji": "lens",
        "feels_like_labels": [
          "organized",
          "decisive",
          "uncluttered"
        ],
        "daily_sign_labels": [
          "cleaner priorities",
          "fewer ambiguous asks"
        ],
        "personal_definition": "making the next decision visible enough for the team to act"
      },
      {
        "value_id": "Responsibility",
        "name": "Responsibility",
        "emoji": "anchor",
        "feels_like_labels": [
          "prepared",
          "steady",
          "accountable"
        ],
        "daily_sign_labels": [
          "risks named clearly",
          "owners identified"
        ],
        "personal_definition": "owning the risk without carrying every task alone"
      },
      {
        "value_id": "Calm Leadership",
        "name": "Calm Leadership",
        "emoji": "signal",
        "feels_like_labels": [
          "calm",
          "firm",
          "useful"
        ],
        "daily_sign_labels": [
          "clear openings",
          "less reactive Slack checking"
        ],
        "personal_definition": "creating steadiness when the room gets noisy"
      }
    ],
    "ideal_life": {
      "statement": "A work life where I help teams make clear decisions without living in urgency",
      "life_shape_labels": [
        "clear leadership",
        "protected strategy time"
      ]
    }
  }
}
```

## soul sections

### Introduction
I let what matters come into view before anything else: clarity as making the next decision visible enough for others to act, responsibility as owning risk without carrying everything alone, and calm leadership as creating steadiness when the room gets noisy. I remember the feeling I am practicing: organized, decisive, uncluttered, prepared, steady, accountable, calm, firm, and useful.

### Task visualization
I imagine moving through an ordinary day with cleaner priorities and fewer ambiguous asks, not because everything is perfect, but because I keep returning to what makes direction easier to see. I can name risks clearly, notice where ownership belongs, and let steadiness travel through my presence without turning urgency into my identity. I carry the shape of a work life where clear decisions happen without living in urgency, where leadership feels calm enough to be trusted and firm enough to be useful.

### Ending
When the room gets noisy, I make the next decision visible, hold the risk with steadiness, and lead without living in urgency.

## soul script (163 words)

I let what matters come into view before anything else: clarity as making the next decision visible enough for others to act, responsibility as owning risk without carrying everything alone, and calm leadership as creating steadiness when the room gets noisy. I remember the feeling I am practicing: organized, decisive, uncluttered, prepared, steady, accountable, calm, firm, and useful.

I imagine moving through an ordinary day with cleaner priorities and fewer ambiguous asks, not because everything is perfect, but because I keep returning to what makes direction easier to see. I can name risks clearly, notice where ownership belongs, and let steadiness travel through my presence without turning urgency into my identity. I carry the shape of a work life where clear decisions happen without living in urgency, where leadership feels calm enough to be trusted and firm enough to be useful.

When the room gets noisy, I make the next decision visible, hold the risk with steadiness, and lead without living in urgency.

## full input

```json
{
  "arm": "full",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Jonah",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "jonah-rivera",
      "priority": {
        "title": "Lead with clarity",
        "description": "Lead product work with clarity and responsibility, making decisions that help the team move forward without becoming reactive."
      },
      "goal_1": {
        "answers": {
          "what": "Run a launch review that surfaces risks early",
          "exactQuantity": {
            "value": 1,
            "unit": "launch review risk brief",
            "description": "one meeting-ready risk brief before the review"
          },
          "exactDate": {
            "label": "by 3:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "risks",
              "label": "Name top unresolved launch risks",
              "target": "three to five risks"
            },
            {
              "id": "owners",
              "label": "Assign owners and decision points",
              "target": "one owner per risk"
            },
            {
              "id": "summary",
              "label": "Write the meeting-ready summary",
              "target": "one opening summary"
            }
          ],
          "metric": "risk brief ready before review",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "jonah-risk-brief",
      "title": "Finalize launch risk brief",
      "project_title": "Feature launch review",
      "parent_goal_title": "Run a launch review that surfaces risks early",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 60
    },
    "focus_subtasks": [
      {
        "subtask_id": "jonah-risk-1",
        "title": "Name top unresolved launch risks",
        "order": 1,
        "duration_minutes": 20
      },
      {
        "subtask_id": "jonah-risk-2",
        "title": "Assign owners and decision points",
        "order": 2,
        "duration_minutes": 20
      },
      {
        "subtask_id": "jonah-risk-3",
        "title": "Write the meeting-ready summary",
        "order": 3,
        "duration_minutes": 20
      }
    ]
  },
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Clarity",
        "name": "Clarity",
        "emoji": "lens",
        "feels_like_labels": [
          "organized",
          "decisive",
          "uncluttered"
        ],
        "daily_sign_labels": [
          "cleaner priorities",
          "fewer ambiguous asks"
        ],
        "personal_definition": "making the next decision visible enough for the team to act"
      },
      {
        "value_id": "Responsibility",
        "name": "Responsibility",
        "emoji": "anchor",
        "feels_like_labels": [
          "prepared",
          "steady",
          "accountable"
        ],
        "daily_sign_labels": [
          "risks named clearly",
          "owners identified"
        ],
        "personal_definition": "owning the risk without carrying every task alone"
      },
      {
        "value_id": "Calm Leadership",
        "name": "Calm Leadership",
        "emoji": "signal",
        "feels_like_labels": [
          "calm",
          "firm",
          "useful"
        ],
        "daily_sign_labels": [
          "clear openings",
          "less reactive Slack checking"
        ],
        "personal_definition": "creating steadiness when the room gets noisy"
      }
    ],
    "ideal_life": {
      "statement": "A work life where I help teams make clear decisions without living in urgency",
      "life_shape_labels": [
        "clear leadership",
        "protected strategy time"
      ]
    }
  },
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.1 hours slept with good continuity; sleep quality 82/100 and enough morning readiness for focused planning.",
      "activity_summary": "light commute movement; morning desk block",
      "stress_summary": "Stress is moderate and tied to risk ownership and deadline pressure."
    },
    "sleep_hours": 7.1,
    "current_energy_level": 6,
    "focus_cues": {
      "visual": [
        "risk brief outline open",
        "dashboard tab pinned",
        "owner list beside the doc"
      ],
      "auditory": [
        "quiet meeting room",
        "notifications paused"
      ],
      "tactile_body": [
        "laptop on conference table",
        "water bottle nearby"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "meeting invite minimized"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
My breath is already here, moving in and out without force. I feel the chair hold my posture, my feet meet the floor, my jaw loosen, and my shoulders notice the moderate pressure of ownership and deadline. With steady morning energy, I let the quiet room, paused notifications, and coffee mark the start of focused planning.

### Task visualization
I am practicing calm, useful clarity in service of leading product work with responsibility, so the team can make decisions without living in urgency. I begin Finalize launch risk brief by naming the top unresolved launch risks, seeing three to five real issues become visible enough to act on. Then I assign owners and decision points, owning the risk without carrying every task alone, and I finish by writing a meeting-ready opening summary that feels organized, decisive, and uncluttered. By the end, the brief is ready before the review, and I can sense prepared steadiness in my body and cleaner priorities in my attention.

### Ending
I start with the first unresolved risk. Steady is enough; make the next decision visible; lead without urgency.

## full script (178 words)

My breath is already here, moving in and out without force. I feel the chair hold my posture, my feet meet the floor, my jaw loosen, and my shoulders notice the moderate pressure of ownership and deadline. With steady morning energy, I let the quiet room, paused notifications, and coffee mark the start of focused planning.

I am practicing calm, useful clarity in service of leading product work with responsibility, so the team can make decisions without living in urgency. I begin Finalize launch risk brief by naming the top unresolved launch risks, seeing three to five real issues become visible enough to act on. Then I assign owners and decision points, owning the risk without carrying every task alone, and I finish by writing a meeting-ready opening summary that feels organized, decisive, and uncluttered. By the end, the brief is ready before the review, and I can sense prepared steadiness in my body and cleaner priorities in my attention.

I start with the first unresolved risk. Steady is enough; make the next decision visible; lead without urgency.

# priya_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":167,"mind":176,"body":177,"soul":152,"full":172}

## baseline input

```json
{
  "preparationOnlyContext": "Daily preparation with the full calendar schedule and durations, without priority ranking.",
  "visibleItems": [
    "07:35-08:05 Commute to campus - 30 min",
    "08:15-09:00 Review cardiac medication flashcards - 45 min",
    "09:15-10:05 Pharmacology lecture - 50 min",
    "10:20-10:55 Complete clinical reflection note - 35 min",
    "11:45-12:15 Lunch and reset - 30 min",
    "12:30-12:45 Pack materials for afternoon class - 15 min",
    "13:00-14:00 Exam review group - 60 min",
    "15:30-15:45 Clinical check-in message - 15 min"
  ]
}
```


## baseline script (167 words)

This is the visible schedule for the day, listed in order with the times and durations shown.

From 07:35 to 08:05, there is a commute to campus. This is a 30 minute item. After that, from 08:15 to 09:00, there is review of cardiac medication flashcards. That item is 45 minutes long.

From 09:15 to 10:05, there is a pharmacology lecture. This is a lecture item and it lasts 50 minutes. From 10:20 to 10:55, there is time for completing a clinical reflection note. This is a note item, and the listed duration is 35 minutes.

Later, from 11:45 to 12:15, there is lunch and reset. This is a lunch item and it is 30 minutes. From 12:30 to 12:45, there is packing materials for afternoon class, listed as 15 minutes.

From 13:00 to 14:00, there is an exam review group. This is a group item and it lasts 60 minutes. The last visible item is from 15:30 to 15:45, a clinical check-in message for 15 minutes.

## mind input

```json
{
  "arm": "mind",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "user_goal": {
      "userid": "priya-shah",
      "priority": {
        "title": "Build calm clinical judgment",
        "description": "Become a capable nurse who can stay present under pressure, keep learning from practice, and offer steady care to patients."
      },
      "goal_1": {
        "answers": {
          "what": "Prepare for Friday's pharmacology exam while staying current on clinical notes",
          "exactQuantity": {
            "value": 1,
            "unit": "medication unit plus clinical note",
            "description": "one flashcard unit reviewed and one reflection note completed"
          },
          "exactDate": {
            "label": "by Friday, May 29, 2026",
            "isoDate": "2026-05-29"
          },
          "keySteps": [
            {
              "id": "flashcards",
              "label": "Review cardiac medication flashcards",
              "target": "one focused medication set"
            },
            {
              "id": "reflection",
              "label": "Complete clinical reflection note",
              "target": "one submitted note"
            },
            {
              "id": "materials",
              "label": "Pack materials for class",
              "target": "class materials ready before leaving"
            }
          ],
          "metric": "flashcards reviewed and reflection note complete",
          "deadline": "2026-05-29"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "07:35-08:05",
        "title": "Commute to campus",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "08:15-09:00",
        "title": "Review cardiac medication flashcards",
        "kind": "event",
        "duration_minutes": 45
      },
      {
        "time": "09:15-10:05",
        "title": "Pharmacology lecture",
        "kind": "event",
        "duration_minutes": 50
      },
      {
        "time": "10:20-10:55",
        "title": "Complete clinical reflection note",
        "kind": "event",
        "duration_minutes": 35
      },
      {
        "time": "11:45-12:15",
        "title": "Lunch and reset",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "12:30-12:45",
        "title": "Pack materials for afternoon class",
        "kind": "event",
        "duration_minutes": 15
      },
      {
        "time": "13:00-14:00",
        "title": "Exam review group",
        "kind": "event",
        "duration_minutes": 60
      },
      {
        "time": "15:30-15:45",
        "title": "Clinical check-in message",
        "kind": "event",
        "duration_minutes": 15
      }
    ],
    "priority_schedule": [
      {
        "title": "Review cardiac medication flashcards",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "medium",
        "duration_minutes": 45
      },
      {
        "title": "Complete clinical reflection note",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 35
      },
      {
        "title": "Pack materials for afternoon class",
        "kind": "task",
        "rank": 3,
        "priority": "low",
        "energy_cost": "low",
        "duration_minutes": 15
      }
    ],
    "open_carry_overs": [
      "Review cardiac medication flashcards"
    ]
  }
}
```

## mind sections

### Introduction
The larger direction is building clinical judgment for nursing practice, with Friday’s pharmacology exam close. Today’s work context is a campus morning with study, lecture, one note, and class preparation.

### Task visualization
First comes Review cardiac medication flashcards for 45 minutes, then Complete clinical reflection note for 35 minutes, then Pack materials for afternoon class for 15 minutes. You picture the flashcard block as the main task: one cardiac medication set gets a clear pass, missed items are marked without detour, and the final few minutes leave the set reviewed enough to support tomorrow’s exam. The reflection note follows as a contained completion, then packing is a short readiness step. What tells you the flashcard review is done enough to count as a successful pass? If attention stalls on a difficult medication, what returns you to the next card or marked item?

### Ending
You move the day forward by beginning the first medication card and staying with one concrete pass. The work does not need to become perfect; it needs to become complete enough for the next scheduled step.

## mind script (176 words)

The larger direction is building clinical judgment for nursing practice, with Friday’s pharmacology exam close. Today’s work context is a campus morning with study, lecture, one note, and class preparation.

First comes Review cardiac medication flashcards for 45 minutes, then Complete clinical reflection note for 35 minutes, then Pack materials for afternoon class for 15 minutes. You picture the flashcard block as the main task: one cardiac medication set gets a clear pass, missed items are marked without detour, and the final few minutes leave the set reviewed enough to support tomorrow’s exam. The reflection note follows as a contained completion, then packing is a short readiness step. What tells you the flashcard review is done enough to count as a successful pass? If attention stalls on a difficult medication, what returns you to the next card or marked item?

You move the day forward by beginning the first medication card and staying with one concrete pass. The work does not need to become perfect; it needs to become complete enough for the next scheduled step.

## body input

```json
{
  "arm": "body",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "body"
  ],
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "6.0 hours slept after a long shift; sleep quality 72/100 with moderate restlessness and enough rest for short, structured study intervals.",
      "activity_summary": "6800 steps yesterday; 12 active minutes this morning",
      "stress_summary": "Stress is moderate after shift load and an upcoming exam, but structure can help attention settle."
    },
    "sleep_hours": 6,
    "current_energy_level": 4,
    "focus_cues": {
      "visual": [
        "flashcards stacked by topic",
        "scrubs folded on chair",
        "timer set for study intervals"
      ],
      "auditory": [
        "quiet kitchen",
        "timer chime ready"
      ],
      "tactile_body": [
        "feet heavy from shift",
        "water bottle nearby"
      ],
      "smell": [
        "tea"
      ],
      "taste": [
        "tea"
      ],
      "other": [
        "phone on silent"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
Begin with one slow breath in, and a longer breath out. Feel the body arrive where it is. Notice the weight through the hips, the feet meeting the floor, the heaviness left in the legs after work. Let the shoulders drop a little. The jaw can soften. The hands can rest without gripping.

### Task visualization
There has been some sleep, not perfect, not empty, enough for a gentle pace. Energy is low to moderate, so the body does not need to rush. Notice the quiet around you, the taste or smell of tea, the water nearby, the phone silent. Let the eyes land softly on one steady point. The stacked cards, the folded scrubs, and the waiting timer are only anchors in the room. Hear the quiet kitchen. Imagine the timer chime as a simple sound, not a demand. Stress may be present as tightness, buzzing, or shallow breath. Let it have room while the feet stay heavy.

### Ending
Take another breath and feel the floor hold you. Settle into a calmer, steadier pace. Repeat softly: feet heavy, breath steady.

## body script (177 words)

Begin with one slow breath in, and a longer breath out. Feel the body arrive where it is. Notice the weight through the hips, the feet meeting the floor, the heaviness left in the legs after work. Let the shoulders drop a little. The jaw can soften. The hands can rest without gripping.

There has been some sleep, not perfect, not empty, enough for a gentle pace. Energy is low to moderate, so the body does not need to rush. Notice the quiet around you, the taste or smell of tea, the water nearby, the phone silent. Let the eyes land softly on one steady point. The stacked cards, the folded scrubs, and the waiting timer are only anchors in the room. Hear the quiet kitchen. Imagine the timer chime as a simple sound, not a demand. Stress may be present as tightness, buzzing, or shallow breath. Let it have room while the feet stay heavy.

Take another breath and feel the floor hold you. Settle into a calmer, steadier pace. Repeat softly: feet heavy, breath steady.

## soul input

```json
{
  "arm": "soul",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "value"
  ],
  "value": {
    "top_values": [
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hands",
        "feels_like_labels": [
          "grounded",
          "kind",
          "present"
        ],
        "daily_sign_labels": [
          "slowing down enough to notice",
          "checking understanding"
        ],
        "personal_definition": "staying attentive to the person in front of me"
      },
      {
        "value_id": "Competence",
        "name": "Competence",
        "emoji": "check",
        "feels_like_labels": [
          "ready",
          "capable",
          "steady"
        ],
        "daily_sign_labels": [
          "one concept mastered",
          "sequence practiced"
        ],
        "personal_definition": "building skills I can trust under pressure"
      },
      {
        "value_id": "Learning",
        "name": "Learning",
        "emoji": "book",
        "feels_like_labels": [
          "open",
          "brave",
          "curious"
        ],
        "daily_sign_labels": [
          "asking one good question",
          "reviewing what changed"
        ],
        "personal_definition": "using practice and mistakes as information"
      }
    ],
    "ideal_life": {
      "statement": "A life where I can offer skilled care while continuing to learn",
      "life_shape_labels": [
        "clinical confidence",
        "steady presence"
      ]
    }
  }
}
```

## soul sections

### Introduction
Let what matters come into view: care as staying attentive to the person in front of you, competence as building skills you can trust, and learning as letting practice and mistakes give information.

### Task visualization
As you move through the day, you can feel grounded, kind, and present, slowing down enough to notice and checking understanding with steadiness. You can imagine carrying readiness without rushing, capability without proving, and curiosity without judgment. When something changes, you can meet it as information, asking a good question inwardly or outwardly, and allowing one small piece of understanding to become clearer. This is not about forcing a perfect day; it is about inhabiting a life where skilled care and continued learning belong together, with clinical confidence and steady presence growing in the way you show up.

### Ending
Carry this line with you: I stay attentive, I keep learning, and my steadiness becomes part of the care I offer.

## soul script (152 words)

Let what matters come into view: care as staying attentive to the person in front of you, competence as building skills you can trust, and learning as letting practice and mistakes give information.

As you move through the day, you can feel grounded, kind, and present, slowing down enough to notice and checking understanding with steadiness. You can imagine carrying readiness without rushing, capability without proving, and curiosity without judgment. When something changes, you can meet it as information, asking a good question inwardly or outwardly, and allowing one small piece of understanding to become clearer. This is not about forcing a perfect day; it is about inhabiting a life where skilled care and continued learning belong together, with clinical confidence and steady presence growing in the way you show up.

Carry this line with you: I stay attentive, I keep learning, and my steadiness becomes part of the care I offer.

## full input

```json
{
  "arm": "full",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "user_goal": {
      "userid": "priya-shah",
      "priority": {
        "title": "Build calm clinical judgment",
        "description": "Become a capable nurse who can stay present under pressure, keep learning from practice, and offer steady care to patients."
      },
      "goal_1": {
        "answers": {
          "what": "Prepare for Friday's pharmacology exam while staying current on clinical notes",
          "exactQuantity": {
            "value": 1,
            "unit": "medication unit plus clinical note",
            "description": "one flashcard unit reviewed and one reflection note completed"
          },
          "exactDate": {
            "label": "by Friday, May 29, 2026",
            "isoDate": "2026-05-29"
          },
          "keySteps": [
            {
              "id": "flashcards",
              "label": "Review cardiac medication flashcards",
              "target": "one focused medication set"
            },
            {
              "id": "reflection",
              "label": "Complete clinical reflection note",
              "target": "one submitted note"
            },
            {
              "id": "materials",
              "label": "Pack materials for class",
              "target": "class materials ready before leaving"
            }
          ],
          "metric": "flashcards reviewed and reflection note complete",
          "deadline": "2026-05-29"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "07:35-08:05",
        "title": "Commute to campus",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "08:15-09:00",
        "title": "Review cardiac medication flashcards",
        "kind": "event",
        "duration_minutes": 45
      },
      {
        "time": "09:15-10:05",
        "title": "Pharmacology lecture",
        "kind": "event",
        "duration_minutes": 50
      },
      {
        "time": "10:20-10:55",
        "title": "Complete clinical reflection note",
        "kind": "event",
        "duration_minutes": 35
      },
      {
        "time": "11:45-12:15",
        "title": "Lunch and reset",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "12:30-12:45",
        "title": "Pack materials for afternoon class",
        "kind": "event",
        "duration_minutes": 15
      },
      {
        "time": "13:00-14:00",
        "title": "Exam review group",
        "kind": "event",
        "duration_minutes": 60
      },
      {
        "time": "15:30-15:45",
        "title": "Clinical check-in message",
        "kind": "event",
        "duration_minutes": 15
      }
    ],
    "priority_schedule": [
      {
        "title": "Review cardiac medication flashcards",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "medium",
        "duration_minutes": 45
      },
      {
        "title": "Complete clinical reflection note",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 35
      },
      {
        "title": "Pack materials for afternoon class",
        "kind": "task",
        "rank": 3,
        "priority": "low",
        "energy_cost": "low",
        "duration_minutes": 15
      }
    ],
    "open_carry_overs": [
      "Review cardiac medication flashcards"
    ]
  },
  "value": {
    "top_values": [
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hands",
        "feels_like_labels": [
          "grounded",
          "kind",
          "present"
        ],
        "daily_sign_labels": [
          "slowing down enough to notice",
          "checking understanding"
        ],
        "personal_definition": "staying attentive to the person in front of me"
      },
      {
        "value_id": "Competence",
        "name": "Competence",
        "emoji": "check",
        "feels_like_labels": [
          "ready",
          "capable",
          "steady"
        ],
        "daily_sign_labels": [
          "one concept mastered",
          "sequence practiced"
        ],
        "personal_definition": "building skills I can trust under pressure"
      },
      {
        "value_id": "Learning",
        "name": "Learning",
        "emoji": "book",
        "feels_like_labels": [
          "open",
          "brave",
          "curious"
        ],
        "daily_sign_labels": [
          "asking one good question",
          "reviewing what changed"
        ],
        "personal_definition": "using practice and mistakes as information"
      }
    ],
    "ideal_life": {
      "statement": "A life where I can offer skilled care while continuing to learn",
      "life_shape_labels": [
        "clinical confidence",
        "steady presence"
      ]
    }
  },
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "6.0 hours slept after a long shift; sleep quality 72/100 with moderate restlessness and enough rest for short, structured study intervals.",
      "activity_summary": "6800 steps yesterday; 12 active minutes this morning",
      "stress_summary": "Stress is moderate after shift load and an upcoming exam, but structure can help attention settle."
    },
    "sleep_hours": 6,
    "current_energy_level": 4,
    "focus_cues": {
      "visual": [
        "flashcards stacked by topic",
        "scrubs folded on chair",
        "timer set for study intervals"
      ],
      "auditory": [
        "quiet kitchen",
        "timer chime ready"
      ],
      "tactile_body": [
        "feet heavy from shift",
        "water bottle nearby"
      ],
      "smell": [
        "tea"
      ],
      "taste": [
        "tea"
      ],
      "other": [
        "phone on silent"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
Breath is already here, easy on the inhale and slower on the exhale, as your chair holds your posture and your feet meet the floor. Your jaw softens, your shoulders notice the shift-wear they carry, and with low but usable energy, the quiet kitchen and tea become enough ground.

### Task visualization
The feeling to rehearse is grounded, kind, present, and capable, serving your path to build calm clinical judgment through Review cardiac medication flashcards for 45 minutes, Complete clinical reflection note for 35, and Pack materials for afternoon class for 15. Imagine the flashcards moving one focused cardiac medication set forward, not perfectly, but clearly enough that one concept feels mastered and steadier under pressure. What does done enough feel like in your body and attention? If focus thins, what helps you return to the next card and check understanding?

### Ending
You can carry these three priorities today: flashcards as the main win, note and packing as lighter completions. Steady care begins with one clear card, one honest note, and enough gentleness to keep learning.

## full script (172 words)

Breath is already here, easy on the inhale and slower on the exhale, as your chair holds your posture and your feet meet the floor. Your jaw softens, your shoulders notice the shift-wear they carry, and with low but usable energy, the quiet kitchen and tea become enough ground.

The feeling to rehearse is grounded, kind, present, and capable, serving your path to build calm clinical judgment through Review cardiac medication flashcards for 45 minutes, Complete clinical reflection note for 35, and Pack materials for afternoon class for 15. Imagine the flashcards moving one focused cardiac medication set forward, not perfectly, but clearly enough that one concept feels mastered and steadier under pressure. What does done enough feel like in your body and attention? If focus thins, what helps you return to the next card and check understanding?

You can carry these three priorities today: flashcards as the main win, note and packing as lighter completions. Steady care begins with one clear card, one honest note, and enough gentleness to keep learning.

# priya_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":165,"mind":153,"body":172,"soul":151,"full":169}

## baseline input

```json
{
  "preparationOnlyContext": "Specific task preparation for simulation assessment practice.",
  "visibleItems": [
    "Review safety checks - 10 min",
    "Walk through sequence aloud - 20 min",
    "Mark one instructor question - 10 min"
  ]
}
```


## baseline script (165 words)

This is only the visible task preparation context for simulation assessment practice. There are three listed items in the visible list. The items are written as short task labels with durations attached to them.

The first visible item is “Review safety checks - 10 min.” This item is related to reviewing safety checks. The listed duration is 10 minutes. It is one of the task items connected to the simulation assessment practice.

The second visible item is “Walk through sequence aloud - 20 min.” This item is related to walking through the sequence aloud. The listed duration is 20 minutes. It is another task item in the same visible list, and it has the longest duration among the three visible entries.

The third visible item is “Mark one instructor question - 10 min.” This item is related to one instructor question. The listed duration is 10 minutes. It is the final visible item in the provided task context.

That is the visible task preparation context.

## mind input

```json
{
  "arm": "mind",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "priya-shah",
      "priority": {
        "title": "Build calm clinical judgment",
        "description": "Become a capable nurse who can stay present under pressure, keep learning from practice, and offer steady care to patients."
      },
      "goal_1": {
        "answers": {
          "what": "Enter simulation lab prepared enough to learn from mistakes",
          "exactQuantity": {
            "value": 1,
            "unit": "assessment sequence practice",
            "description": "one complete walk-through before lab"
          },
          "exactDate": {
            "label": "before simulation lab today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "safety",
              "label": "Review opening patient safety checks",
              "target": "one checklist pass"
            },
            {
              "id": "sequence",
              "label": "Walk through assessment sequence aloud",
              "target": "one full spoken rehearsal"
            },
            {
              "id": "question",
              "label": "Mark one question to ask instructor",
              "target": "one learning question"
            }
          ],
          "metric": "assessment sequence practiced",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "priya-assessment-sequence",
      "title": "Practice assessment sequence",
      "project_title": "Simulation lab preparation",
      "parent_goal_title": "Enter simulation lab prepared enough to learn from mistakes",
      "priority": "high",
      "energy_cost": "medium",
      "duration_minutes": 40
    },
    "focus_subtasks": [
      {
        "subtask_id": "priya-assess-1",
        "title": "Review opening patient safety checks",
        "order": 1,
        "duration_minutes": 10
      },
      {
        "subtask_id": "priya-assess-2",
        "title": "Walk through assessment sequence aloud",
        "order": 2,
        "duration_minutes": 20
      },
      {
        "subtask_id": "priya-assess-3",
        "title": "Mark one question to ask instructor",
        "order": 3,
        "duration_minutes": 10
      }
    ]
  }
}
```

## mind sections

### Introduction
I picture the larger aim: entering simulation lab prepared enough to learn from mistakes. The work context is Simulation lab preparation, with Practice assessment sequence as the clear 40-minute target before lab today.

### Task visualization
I see myself begin with Review opening patient safety checks, giving one careful checklist pass and noting the basic opening moves. I picture moving into Walk through assessment sequence aloud, completing one full spoken rehearsal from start to finish, letting the order become easier to follow as I continue. I then mark one question to ask instructor, choosing a specific point that would help the next attempt. I can recognize the task as done when the full sequence has been practiced once and one learning question is written down.

### Ending
I close the rehearsal with the next doable work action in view: start the first checklist pass. This is enough to move Practice assessment sequence forward in a concrete, completed way.

## mind script (153 words)

I picture the larger aim: entering simulation lab prepared enough to learn from mistakes. The work context is Simulation lab preparation, with Practice assessment sequence as the clear 40-minute target before lab today.

I see myself begin with Review opening patient safety checks, giving one careful checklist pass and noting the basic opening moves. I picture moving into Walk through assessment sequence aloud, completing one full spoken rehearsal from start to finish, letting the order become easier to follow as I continue. I then mark one question to ask instructor, choosing a specific point that would help the next attempt. I can recognize the task as done when the full sequence has been practiced once and one learning question is written down.

I close the rehearsal with the next doable work action in view: start the first checklist pass. This is enough to move Practice assessment sequence forward in a concrete, completed way.

## body input

```json
{
  "arm": "body",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "body"
  ],
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "6.7 hours slept; sleep quality 76/100 with a little pre-simulation restlessness.",
      "activity_summary": "short walk to campus; light morning movement",
      "stress_summary": "Stress is moderate before simulation practice and may show up as tension."
    },
    "sleep_hours": 6.7,
    "current_energy_level": 5,
    "focus_cues": {
      "visual": [
        "skills checklist printed",
        "stethoscope in bag",
        "simulation notes highlighted"
      ],
      "auditory": [
        "campus hallway noise",
        "phone timer ready"
      ],
      "tactile_body": [
        "hands around water bottle",
        "shoulders slightly tense"
      ],
      "taste": [
        "water"
      ],
      "other": [
        "study partner message pinned"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
I take one slow breath in and let it leave without forcing it, feeling my ribs move and settle. I notice the chair or floor holding me, my feet making contact, and the mild tightness across my shoulders that comes with moderate stress.

### Task visualization
I feel a steady middle level of energy today, not empty and not overflowing, with the slight heaviness of 6.7 hours of sleep and a little leftover restlessness in my system. I let my hands wrap around the water bottle, feel the cool surface, and notice the taste of water as a simple point of return. I hear hallway noise and the quiet readiness of a timer nearby, letting those sounds stay outside my body while my breathing stays close. I notice visual cues around me as shapes and colors only, and I let my attention come back to my hands, shoulders, jaw, and feet.

### Ending
I can soften one small place in my body and keep the rest honest, alert, and unhurried. I return to breath, feet, and hands.

## body script (172 words)

I take one slow breath in and let it leave without forcing it, feeling my ribs move and settle. I notice the chair or floor holding me, my feet making contact, and the mild tightness across my shoulders that comes with moderate stress.

I feel a steady middle level of energy today, not empty and not overflowing, with the slight heaviness of 6.7 hours of sleep and a little leftover restlessness in my system. I let my hands wrap around the water bottle, feel the cool surface, and notice the taste of water as a simple point of return. I hear hallway noise and the quiet readiness of a timer nearby, letting those sounds stay outside my body while my breathing stays close. I notice visual cues around me as shapes and colors only, and I let my attention come back to my hands, shoulders, jaw, and feet.

I can soften one small place in my body and keep the rest honest, alert, and unhurried. I return to breath, feet, and hands.

## soul input

```json
{
  "arm": "soul",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "value"
  ],
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hands",
        "feels_like_labels": [
          "grounded",
          "kind",
          "present"
        ],
        "daily_sign_labels": [
          "slowing down enough to notice",
          "checking understanding"
        ],
        "personal_definition": "staying attentive to the person in front of me"
      },
      {
        "value_id": "Competence",
        "name": "Competence",
        "emoji": "check",
        "feels_like_labels": [
          "ready",
          "capable",
          "steady"
        ],
        "daily_sign_labels": [
          "one concept mastered",
          "sequence practiced"
        ],
        "personal_definition": "building skills I can trust under pressure"
      },
      {
        "value_id": "Learning",
        "name": "Learning",
        "emoji": "book",
        "feels_like_labels": [
          "open",
          "brave",
          "curious"
        ],
        "daily_sign_labels": [
          "asking one good question",
          "reviewing what changed"
        ],
        "personal_definition": "using practice and mistakes as information"
      }
    ],
    "ideal_life": {
      "statement": "A life where I can offer skilled care while continuing to learn",
      "life_shape_labels": [
        "clinical confidence",
        "steady presence"
      ]
    }
  }
}
```

## soul sections

### Introduction
I let care come into view as staying attentive to the person in front of me, grounded, kind, and present enough to notice what is really there. I let competence feel steady rather than harsh: skills I can trust under pressure, a quiet readiness that grows through practice. I let learning stay open and brave, treating mistakes and changes as information rather than proof against me.

### Task visualization
I move through this day carrying the shape of a life where I offer skilled care while continuing to learn. I can slow down enough to notice, check understanding, ask one good question, and remain curious about what changes inside me as I go. I do not need to become perfect to be trustworthy; I can be present, capable, and still learning at the same time.

### Ending
I carry this with me: skilled care grows through steady presence, honest practice, and the courage to keep learning.

## soul script (151 words)

I let care come into view as staying attentive to the person in front of me, grounded, kind, and present enough to notice what is really there. I let competence feel steady rather than harsh: skills I can trust under pressure, a quiet readiness that grows through practice. I let learning stay open and brave, treating mistakes and changes as information rather than proof against me.

I move through this day carrying the shape of a life where I offer skilled care while continuing to learn. I can slow down enough to notice, check understanding, ask one good question, and remain curious about what changes inside me as I go. I do not need to become perfect to be trustworthy; I can be present, capable, and still learning at the same time.

I carry this with me: skilled care grows through steady presence, honest practice, and the courage to keep learning.

## full input

```json
{
  "arm": "full",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Priya",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "priya-shah",
      "priority": {
        "title": "Build calm clinical judgment",
        "description": "Become a capable nurse who can stay present under pressure, keep learning from practice, and offer steady care to patients."
      },
      "goal_1": {
        "answers": {
          "what": "Enter simulation lab prepared enough to learn from mistakes",
          "exactQuantity": {
            "value": 1,
            "unit": "assessment sequence practice",
            "description": "one complete walk-through before lab"
          },
          "exactDate": {
            "label": "before simulation lab today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "safety",
              "label": "Review opening patient safety checks",
              "target": "one checklist pass"
            },
            {
              "id": "sequence",
              "label": "Walk through assessment sequence aloud",
              "target": "one full spoken rehearsal"
            },
            {
              "id": "question",
              "label": "Mark one question to ask instructor",
              "target": "one learning question"
            }
          ],
          "metric": "assessment sequence practiced",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "priya-assessment-sequence",
      "title": "Practice assessment sequence",
      "project_title": "Simulation lab preparation",
      "parent_goal_title": "Enter simulation lab prepared enough to learn from mistakes",
      "priority": "high",
      "energy_cost": "medium",
      "duration_minutes": 40
    },
    "focus_subtasks": [
      {
        "subtask_id": "priya-assess-1",
        "title": "Review opening patient safety checks",
        "order": 1,
        "duration_minutes": 10
      },
      {
        "subtask_id": "priya-assess-2",
        "title": "Walk through assessment sequence aloud",
        "order": 2,
        "duration_minutes": 20
      },
      {
        "subtask_id": "priya-assess-3",
        "title": "Mark one question to ask instructor",
        "order": 3,
        "duration_minutes": 10
      }
    ]
  },
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hands",
        "feels_like_labels": [
          "grounded",
          "kind",
          "present"
        ],
        "daily_sign_labels": [
          "slowing down enough to notice",
          "checking understanding"
        ],
        "personal_definition": "staying attentive to the person in front of me"
      },
      {
        "value_id": "Competence",
        "name": "Competence",
        "emoji": "check",
        "feels_like_labels": [
          "ready",
          "capable",
          "steady"
        ],
        "daily_sign_labels": [
          "one concept mastered",
          "sequence practiced"
        ],
        "personal_definition": "building skills I can trust under pressure"
      },
      {
        "value_id": "Learning",
        "name": "Learning",
        "emoji": "book",
        "feels_like_labels": [
          "open",
          "brave",
          "curious"
        ],
        "daily_sign_labels": [
          "asking one good question",
          "reviewing what changed"
        ],
        "personal_definition": "using practice and mistakes as information"
      }
    ],
    "ideal_life": {
      "statement": "A life where I can offer skilled care while continuing to learn",
      "life_shape_labels": [
        "clinical confidence",
        "steady presence"
      ]
    }
  },
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "6.7 hours slept; sleep quality 76/100 with a little pre-simulation restlessness.",
      "activity_summary": "short walk to campus; light morning movement",
      "stress_summary": "Stress is moderate before simulation practice and may show up as tension."
    },
    "sleep_hours": 6.7,
    "current_energy_level": 5,
    "focus_cues": {
      "visual": [
        "skills checklist printed",
        "stethoscope in bag",
        "simulation notes highlighted"
      ],
      "auditory": [
        "campus hallway noise",
        "phone timer ready"
      ],
      "tactile_body": [
        "hands around water bottle",
        "shoulders slightly tense"
      ],
      "taste": [
        "water"
      ],
      "other": [
        "study partner message pinned"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
My breath is already here, moving in and out without force. I feel the chair holding my posture, my feet meeting the floor, my jaw softening, and my shoulders noticing the moderate pre-simulation tension without fighting it. With 6.7 hours of sleep and light morning movement, I let this be steady, not rushed; the highlighted notes and water nearby simply mark the scene.

### Task visualization
This work serves my goal to build calm clinical judgment: capable enough to stay present, keep learning, and offer steady care. I begin Practice assessment sequence by reviewing the opening patient safety checks, feeling grounded and kind as I slow down enough to notice what matters. Then I walk through the assessment sequence aloud, one complete spoken pass, letting competence feel steady rather than perfect. I finish by marking one good question for the instructor, curious and brave, using practice as information and seeing myself prepared enough to learn in lab.

### Ending
I start with the safety checks. Steady is enough; care stays present; practice builds trust.

## full script (169 words)

My breath is already here, moving in and out without force. I feel the chair holding my posture, my feet meeting the floor, my jaw softening, and my shoulders noticing the moderate pre-simulation tension without fighting it. With 6.7 hours of sleep and light morning movement, I let this be steady, not rushed; the highlighted notes and water nearby simply mark the scene.

This work serves my goal to build calm clinical judgment: capable enough to stay present, keep learning, and offer steady care. I begin Practice assessment sequence by reviewing the opening patient safety checks, feeling grounded and kind as I slow down enough to notice what matters. Then I walk through the assessment sequence aloud, one complete spoken pass, letting competence feel steady rather than perfect. I finish by marking one good question for the instructor, curious and brave, using practice as information and seeing myself prepared enough to learn in lab.

I start with the safety checks. Steady is enough; care stays present; practice builds trust.

# alex_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":150,"mind":157,"body":156,"soul":156,"full":168}

## baseline input

```json
{
  "preparationOnlyContext": "Daily preparation with the full calendar schedule and durations, without priority ranking.",
  "visibleItems": [
    "08:30-08:50 Client inbox and file check - 20 min",
    "09:00-10:20 Build pitch deck narrative - 80 min",
    "10:30-10:50 Review client assets - 20 min",
    "11:00-11:35 Export client-ready mockups - 35 min",
    "12:20-12:50 Lunch break - 30 min",
    "13:30-14:00 Prepare client call notes - 30 min",
    "14:40-14:50 Send invoice reminder - 10 min",
    "16:00-16:45 Client call - 45 min"
  ]
}
```


## baseline script (150 words)

This is only the visible schedule for the day, shown with times and durations.

The first visible item is 08:30-08:50, Client inbox and file check, for 20 minutes. Then there is 09:00-10:20, Build pitch deck narrative, for 80 minutes. That is a longer calendar item compared with some of the others.

After that, 10:30-10:50 is Review client assets, for 20 minutes. Then 11:00-11:35 is Export client-ready mockups, for 35 minutes. This is another client-related work item on the visible list.

At 12:20-12:50, there is Lunch break, for 30 minutes. This is the lunch item on the schedule.

Later, 13:30-14:00 is Prepare client call notes, for 30 minutes. This is a note item. Then 14:40-14:50 is Send invoice reminder, for 10 minutes. This is an email or message-type item.

The last visible item is 16:00-16:45, Client call, for 45 minutes. This is a meeting item. That is the visible calendar schedule.

## mind input

```json
{
  "arm": "mind",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "user_goal": {
      "userid": "alex-morgan",
      "priority": {
        "title": "Build an independent creative practice",
        "description": "Build an independent creative practice that supports originality, reliable client work, and financial steadiness."
      },
      "goal_1": {
        "answers": {
          "what": "Send a strong pitch deck before the client call",
          "exactQuantity": {
            "value": 1,
            "unit": "client-ready pitch deck",
            "description": "one exported deck ready before the call"
          },
          "exactDate": {
            "label": "by 4:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "story",
              "label": "Choose the core story arc",
              "target": "one narrative direction"
            },
            {
              "id": "slides",
              "label": "Sequence strongest concept slides",
              "target": "one deck flow"
            },
            {
              "id": "export",
              "label": "Export client-ready mockups",
              "target": "final PDF and image files"
            }
          ],
          "metric": "client-ready deck exported",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "08:30-08:50",
        "title": "Client inbox and file check",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "09:00-10:20",
        "title": "Build pitch deck narrative",
        "kind": "event",
        "duration_minutes": 80
      },
      {
        "time": "10:30-10:50",
        "title": "Review client assets",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "11:00-11:35",
        "title": "Export client-ready mockups",
        "kind": "event",
        "duration_minutes": 35
      },
      {
        "time": "12:20-12:50",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:30-14:00",
        "title": "Prepare client call notes",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "14:40-14:50",
        "title": "Send invoice reminder",
        "kind": "event",
        "duration_minutes": 10
      },
      {
        "time": "16:00-16:45",
        "title": "Client call",
        "kind": "event",
        "duration_minutes": 45
      }
    ],
    "priority_schedule": [
      {
        "title": "Build pitch deck narrative",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 80
      },
      {
        "title": "Export client-ready mockups",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 35
      },
      {
        "title": "Send invoice reminder",
        "kind": "task",
        "rank": 3,
        "priority": "low",
        "energy_cost": "low",
        "duration_minutes": 10
      }
    ],
    "open_carry_overs": [
      "Build pitch deck narrative"
    ]
  }
}
```

## mind sections

### Introduction
Today points toward building an independent creative practice through a client-ready pitch deck before the 4:00 PM call. The work context is clear: shape the deck, finish the exports, and handle the small reminder.

### Task visualization
First comes Build pitch deck narrative for 80 minutes, then Export client-ready mockups for 35 minutes, then Send invoice reminder for 10 minutes. You see the narrative work as the main task: choosing one core story arc, placing the strongest concept slides in a clean order, and letting the deck become useful rather than perfect. The good-enough finish is a deck flow that can be exported and understood by the client. What tells you the narrative is clear enough to move on? If attention stalls, what returns you to the next concrete pass?

### Ending
From there, you can move the day forward by opening the pitch deck and making the next visible decision: the story arc, the first slide order, or the export-ready pass.

## mind script (157 words)

Today points toward building an independent creative practice through a client-ready pitch deck before the 4:00 PM call. The work context is clear: shape the deck, finish the exports, and handle the small reminder.

First comes Build pitch deck narrative for 80 minutes, then Export client-ready mockups for 35 minutes, then Send invoice reminder for 10 minutes. You see the narrative work as the main task: choosing one core story arc, placing the strongest concept slides in a clean order, and letting the deck become useful rather than perfect. The good-enough finish is a deck flow that can be exported and understood by the client. What tells you the narrative is clear enough to move on? If attention stalls, what returns you to the next concrete pass?

From there, you can move the day forward by opening the pitch deck and making the next visible decision: the story arc, the first slide order, or the export-ready pass.

## body input

```json
{
  "arm": "body",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "body"
  ],
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.6 hours slept with strong continuity; sleep quality 84/100 and a rested start for a creative morning block.",
      "activity_summary": "1800 steps; light morning stretch",
      "stress_summary": "Stress is low to moderate, mostly around delivery and admin expectations later in the day."
    },
    "sleep_hours": 7.6,
    "current_energy_level": 7,
    "focus_cues": {
      "visual": [
        "moodboard wall visible",
        "deck outline open",
        "tablet charged"
      ],
      "auditory": [
        "playlist ready"
      ],
      "tactile_body": [
        "stylus in hand",
        "feet tucked under chair"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "client call reminder visible"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
Begin with one slow breath in, and let the exhale soften your shoulders. Feel your body held by the chair, feet tucked under you, hands resting with the stylus nearby, and notice any small tension in your jaw, neck, or back without needing to change it quickly.

### Task visualization
You have a rested body today, with enough energy to be alert without forcing it. The earlier stretch and light movement can show up as a little more space in your hips, spine, or breath, while the low hum of later expectations can simply be felt as pressure, warmth, or tightness. Let the coffee taste and smell, the playlist waiting, and the visible wall and screen become simple anchors for being here now. If attention jumps toward reminders or later conversations, gently return to contact, breath, and the weight of your body.

### Ending
Take one more steady breath, letting your pace be honest and unhurried. Repeat quietly: breath, body, here.

## body script (156 words)

Begin with one slow breath in, and let the exhale soften your shoulders. Feel your body held by the chair, feet tucked under you, hands resting with the stylus nearby, and notice any small tension in your jaw, neck, or back without needing to change it quickly.

You have a rested body today, with enough energy to be alert without forcing it. The earlier stretch and light movement can show up as a little more space in your hips, spine, or breath, while the low hum of later expectations can simply be felt as pressure, warmth, or tightness. Let the coffee taste and smell, the playlist waiting, and the visible wall and screen become simple anchors for being here now. If attention jumps toward reminders or later conversations, gently return to contact, breath, and the weight of your body.

Take one more steady breath, letting your pace be honest and unhurried. Repeat quietly: breath, body, here.

## soul input

```json
{
  "arm": "soul",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "value"
  ],
  "value": {
    "top_values": [
      {
        "value_id": "Originality",
        "name": "Originality",
        "emoji": "spark",
        "feels_like_labels": [
          "inventive",
          "alive",
          "free"
        ],
        "daily_sign_labels": [
          "one strong concept choice",
          "fresh visual language"
        ],
        "personal_definition": "making work that feels unmistakably mine"
      },
      {
        "value_id": "Reliability",
        "name": "Reliability",
        "emoji": "bridge",
        "feels_like_labels": [
          "solid",
          "settled",
          "professional"
        ],
        "daily_sign_labels": [
          "files exported cleanly",
          "client knows what to expect"
        ],
        "personal_definition": "making trust feel visible in how I deliver"
      },
      {
        "value_id": "Freedom",
        "name": "Freedom",
        "emoji": "window",
        "feels_like_labels": [
          "unblocked",
          "self-directed",
          "light"
        ],
        "daily_sign_labels": [
          "admin cleared",
          "money tasks not avoided"
        ],
        "personal_definition": "keeping my practice independent and sustainable"
      }
    ],
    "ideal_life": {
      "statement": "A life where creative work stays original and the studio stays sustainable",
      "life_shape_labels": [
        "independent studio",
        "creative mornings"
      ]
    }
  }
}
```

## soul sections

### Introduction
Let what matters come into view: originality as work that feels unmistakably yours, reliability as trust made visible, and freedom as a practice that stays independent, sustainable, and light. You do not have to force these qualities; you notice how inventive, alive, solid, settled, unblocked, and self-directed they already feel when they are allowed to breathe.

### Task visualization
As you move through the day, imagine your presence carrying a fresh visual language without needing to prove itself. You sense the quiet strength of being someone others can trust, not through performance, but through steadiness that feels clean and professional. You let independence feel practical and spacious, like a window opening inside the studio, where creative work stays original and the whole shape of life remains sustainable.

### Ending
When you want a simple anchor, return to this: you make what is unmistakably yours, you make trust visible, and you keep the window open for a free and sustainable creative life.

## soul script (156 words)

Let what matters come into view: originality as work that feels unmistakably yours, reliability as trust made visible, and freedom as a practice that stays independent, sustainable, and light. You do not have to force these qualities; you notice how inventive, alive, solid, settled, unblocked, and self-directed they already feel when they are allowed to breathe.

As you move through the day, imagine your presence carrying a fresh visual language without needing to prove itself. You sense the quiet strength of being someone others can trust, not through performance, but through steadiness that feels clean and professional. You let independence feel practical and spacious, like a window opening inside the studio, where creative work stays original and the whole shape of life remains sustainable.

When you want a simple anchor, return to this: you make what is unmistakably yours, you make trust visible, and you keep the window open for a free and sustainable creative life.

## full input

```json
{
  "arm": "full",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "user_goal": {
      "userid": "alex-morgan",
      "priority": {
        "title": "Build an independent creative practice",
        "description": "Build an independent creative practice that supports originality, reliable client work, and financial steadiness."
      },
      "goal_1": {
        "answers": {
          "what": "Send a strong pitch deck before the client call",
          "exactQuantity": {
            "value": 1,
            "unit": "client-ready pitch deck",
            "description": "one exported deck ready before the call"
          },
          "exactDate": {
            "label": "by 4:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "story",
              "label": "Choose the core story arc",
              "target": "one narrative direction"
            },
            {
              "id": "slides",
              "label": "Sequence strongest concept slides",
              "target": "one deck flow"
            },
            {
              "id": "export",
              "label": "Export client-ready mockups",
              "target": "final PDF and image files"
            }
          ],
          "metric": "client-ready deck exported",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "08:30-08:50",
        "title": "Client inbox and file check",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "09:00-10:20",
        "title": "Build pitch deck narrative",
        "kind": "event",
        "duration_minutes": 80
      },
      {
        "time": "10:30-10:50",
        "title": "Review client assets",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "11:00-11:35",
        "title": "Export client-ready mockups",
        "kind": "event",
        "duration_minutes": 35
      },
      {
        "time": "12:20-12:50",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:30-14:00",
        "title": "Prepare client call notes",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "14:40-14:50",
        "title": "Send invoice reminder",
        "kind": "event",
        "duration_minutes": 10
      },
      {
        "time": "16:00-16:45",
        "title": "Client call",
        "kind": "event",
        "duration_minutes": 45
      }
    ],
    "priority_schedule": [
      {
        "title": "Build pitch deck narrative",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 80
      },
      {
        "title": "Export client-ready mockups",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 35
      },
      {
        "title": "Send invoice reminder",
        "kind": "task",
        "rank": 3,
        "priority": "low",
        "energy_cost": "low",
        "duration_minutes": 10
      }
    ],
    "open_carry_overs": [
      "Build pitch deck narrative"
    ]
  },
  "value": {
    "top_values": [
      {
        "value_id": "Originality",
        "name": "Originality",
        "emoji": "spark",
        "feels_like_labels": [
          "inventive",
          "alive",
          "free"
        ],
        "daily_sign_labels": [
          "one strong concept choice",
          "fresh visual language"
        ],
        "personal_definition": "making work that feels unmistakably mine"
      },
      {
        "value_id": "Reliability",
        "name": "Reliability",
        "emoji": "bridge",
        "feels_like_labels": [
          "solid",
          "settled",
          "professional"
        ],
        "daily_sign_labels": [
          "files exported cleanly",
          "client knows what to expect"
        ],
        "personal_definition": "making trust feel visible in how I deliver"
      },
      {
        "value_id": "Freedom",
        "name": "Freedom",
        "emoji": "window",
        "feels_like_labels": [
          "unblocked",
          "self-directed",
          "light"
        ],
        "daily_sign_labels": [
          "admin cleared",
          "money tasks not avoided"
        ],
        "personal_definition": "keeping my practice independent and sustainable"
      }
    ],
    "ideal_life": {
      "statement": "A life where creative work stays original and the studio stays sustainable",
      "life_shape_labels": [
        "independent studio",
        "creative mornings"
      ]
    }
  },
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.6 hours slept with strong continuity; sleep quality 84/100 and a rested start for a creative morning block.",
      "activity_summary": "1800 steps; light morning stretch",
      "stress_summary": "Stress is low to moderate, mostly around delivery and admin expectations later in the day."
    },
    "sleep_hours": 7.6,
    "current_energy_level": 7,
    "focus_cues": {
      "visual": [
        "moodboard wall visible",
        "deck outline open",
        "tablet charged"
      ],
      "auditory": [
        "playlist ready"
      ],
      "tactile_body": [
        "stylus in hand",
        "feet tucked under chair"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "client call reminder visible"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
Breath is already here, moving in and out without force; the chair holds your posture, feet meet the floor, jaw softens, and shoulders notice what they carry. With a rested, steady energy and light delivery tension, the moodboard wall comes into view as today begins.

### Task visualization
Let the day aim for work that feels inventive, solid, and self-directed, serving an independent creative practice: first Build pitch deck narrative for 80 minutes, then Export client-ready mockups for 35, then Send invoice reminder for 10. Imagine the narrative block becoming the main win, one strong story arc and deck flow clear enough to support the 4:00 client call. What does done enough feel like in your body and attention? If tension or admin noise pulls you off, what helps you return to the next concept choice?

### Ending
You can carry these three priorities through today, with the narrative as the win and the exports and reminder as lighter completions. Steady energy, original choices, visible trust: this is how the studio stays yours.

## full script (168 words)

Breath is already here, moving in and out without force; the chair holds your posture, feet meet the floor, jaw softens, and shoulders notice what they carry. With a rested, steady energy and light delivery tension, the moodboard wall comes into view as today begins.

Let the day aim for work that feels inventive, solid, and self-directed, serving an independent creative practice: first Build pitch deck narrative for 80 minutes, then Export client-ready mockups for 35, then Send invoice reminder for 10. Imagine the narrative block becoming the main win, one strong story arc and deck flow clear enough to support the 4:00 client call. What does done enough feel like in your body and attention? If tension or admin noise pulls you off, what helps you return to the next concept choice?

You can carry these three priorities through today, with the narrative as the win and the exports and reminder as lighter completions. Steady energy, original choices, visible trust: this is how the studio stays yours.

# alex_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":164,"mind":169,"body":172,"soul":150,"full":171}

## baseline input

```json
{
  "preparationOnlyContext": "Specific task preparation for building the pitch deck narrative.",
  "visibleItems": [
    "Choose core story arc - 20 min",
    "Sequence concept slides - 35 min",
    "Write transition notes - 25 min"
  ]
}
```


## baseline script (164 words)

This is the visible task context for building the pitch deck narrative. The list has three visible items. The items are shown with durations, and the durations are part of the listed task information.

The first visible item is “Choose core story arc - 20 min.” This item is related to the pitch deck narrative. It has a listed duration of 20 minutes. It is the first item in the visible list.

The second visible item is “Sequence concept slides - 35 min.” This item is also related to the pitch deck narrative. It has a listed duration of 35 minutes. It appears after the core story arc item in the visible list.

The third visible item is “Write transition notes - 25 min.” This item is another part of the same visible task context. It has a listed duration of 25 minutes. It appears after the concept slide sequencing item.

That is the visible task preparation context for building the pitch deck narrative.

## mind input

```json
{
  "arm": "mind",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "alex-morgan",
      "priority": {
        "title": "Build an independent creative practice",
        "description": "Build an independent creative practice that supports originality, reliable client work, and financial steadiness."
      },
      "goal_1": {
        "answers": {
          "what": "Send a strong pitch deck before the client call",
          "exactQuantity": {
            "value": 1,
            "unit": "client-ready pitch deck",
            "description": "one exported deck ready before the call"
          },
          "exactDate": {
            "label": "by 4:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "story",
              "label": "Choose the core story arc",
              "target": "one narrative direction"
            },
            {
              "id": "slides",
              "label": "Sequence strongest concept slides",
              "target": "one deck flow"
            },
            {
              "id": "export",
              "label": "Export client-ready mockups",
              "target": "final PDF and image files"
            }
          ],
          "metric": "client-ready deck exported",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "alex-pitch-narrative",
      "title": "Build pitch deck narrative",
      "project_title": "Client brand pitch",
      "parent_goal_title": "Send a strong pitch deck before the client call",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 80
    },
    "focus_subtasks": [
      {
        "subtask_id": "alex-pitch-1",
        "title": "Choose the core story arc",
        "order": 1,
        "duration_minutes": 20
      },
      {
        "subtask_id": "alex-pitch-2",
        "title": "Sequence the strongest concept slides",
        "order": 2,
        "duration_minutes": 35
      },
      {
        "subtask_id": "alex-pitch-3",
        "title": "Write transition notes for the client call",
        "order": 3,
        "duration_minutes": 25
      }
    ]
  }
}
```

## mind sections

### Introduction
I picture this work inside the larger aim of building an independent creative practice with reliable client work. The context is the Client brand pitch, and the target is a client-ready narrative deck before the call.

### Task visualization
I see myself starting Build pitch deck narrative with one clear outcome: the pitch has a clean story, a clear slide flow, and notes that make the call easier to run. First, I choose the core story arc, narrowing the material to one narrative direction that can carry the deck. Next, I sequence the strongest concept slides, placing the best evidence and ideas in an order that makes sense. Then I write transition notes for the client call, giving each section a simple handoff. I can tell the work is complete when the deck narrative reads from beginning to end without gaps.

### Ending
I picture the finished deck narrative ready to support the exported materials and the client conversation. The next doable action is simple: open the deck and choose the core story arc.

## mind script (169 words)

I picture this work inside the larger aim of building an independent creative practice with reliable client work. The context is the Client brand pitch, and the target is a client-ready narrative deck before the call.

I see myself starting Build pitch deck narrative with one clear outcome: the pitch has a clean story, a clear slide flow, and notes that make the call easier to run. First, I choose the core story arc, narrowing the material to one narrative direction that can carry the deck. Next, I sequence the strongest concept slides, placing the best evidence and ideas in an order that makes sense. Then I write transition notes for the client call, giving each section a simple handoff. I can tell the work is complete when the deck narrative reads from beginning to end without gaps.

I picture the finished deck narrative ready to support the exported materials and the client conversation. The next doable action is simple: open the deck and choose the core story arc.

## body input

```json
{
  "arm": "body",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "body"
  ],
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.6 hours slept with strong continuity; sleep quality 84/100 and a rested start for a creative morning block.",
      "activity_summary": "light morning stretch before desk work",
      "stress_summary": "Stress is low to moderate around clarifying the pitch direction."
    },
    "sleep_hours": 7.6,
    "current_energy_level": 7,
    "focus_cues": {
      "visual": [
        "deck outline open",
        "three concept thumbnails visible",
        "moodboard wall nearby"
      ],
      "auditory": [
        "playlist ready"
      ],
      "tactile_body": [
        "stylus in hand",
        "tablet warm from charging"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "client notes minimized but available"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
I begin with one slow breath in, and a longer breath out, letting my shoulders notice their own weight. I feel the chair under me, my feet meeting the floor, and any small tight places in my jaw, hands, or chest softening just a little.

### Task visualization
I notice a rested steadiness in my body after a full night of sleep, with enough energy to be awake without needing to rush. I let the light stretch from this morning stay in my muscles, and I sense the low, manageable pressure in my system as warmth, pulse, or alertness rather than danger. I hear the playlist ready in the background, see the open outline and nearby images as simple shapes and color, feel the stylus in my hand and the tablet’s warmth, and taste or smell the coffee as I come back to this moment.

### Ending
I let my attention settle into a smaller, calmer pace, with my breath, hands, and seat all here at once. I can return to one anchor: breath low, hands steady.

## body script (172 words)

I begin with one slow breath in, and a longer breath out, letting my shoulders notice their own weight. I feel the chair under me, my feet meeting the floor, and any small tight places in my jaw, hands, or chest softening just a little.

I notice a rested steadiness in my body after a full night of sleep, with enough energy to be awake without needing to rush. I let the light stretch from this morning stay in my muscles, and I sense the low, manageable pressure in my system as warmth, pulse, or alertness rather than danger. I hear the playlist ready in the background, see the open outline and nearby images as simple shapes and color, feel the stylus in my hand and the tablet’s warmth, and taste or smell the coffee as I come back to this moment.

I let my attention settle into a smaller, calmer pace, with my breath, hands, and seat all here at once. I can return to one anchor: breath low, hands steady.

## soul input

```json
{
  "arm": "soul",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "value"
  ],
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Originality",
        "name": "Originality",
        "emoji": "spark",
        "feels_like_labels": [
          "inventive",
          "alive",
          "free"
        ],
        "daily_sign_labels": [
          "one strong concept choice",
          "fresh visual language"
        ],
        "personal_definition": "making work that feels unmistakably mine"
      },
      {
        "value_id": "Reliability",
        "name": "Reliability",
        "emoji": "bridge",
        "feels_like_labels": [
          "solid",
          "settled",
          "professional"
        ],
        "daily_sign_labels": [
          "files exported cleanly",
          "client knows what to expect"
        ],
        "personal_definition": "making trust feel visible in how I deliver"
      },
      {
        "value_id": "Freedom",
        "name": "Freedom",
        "emoji": "window",
        "feels_like_labels": [
          "unblocked",
          "self-directed",
          "light"
        ],
        "daily_sign_labels": [
          "admin cleared",
          "money tasks not avoided"
        ],
        "personal_definition": "keeping my practice independent and sustainable"
      }
    ],
    "ideal_life": {
      "statement": "A life where creative work stays original and the studio stays sustainable",
      "life_shape_labels": [
        "independent studio",
        "creative mornings"
      ]
    }
  }
}
```

## soul sections

### Introduction
I let what matters come into view: work that feels unmistakably mine, delivery that makes trust visible, and a practice that stays independent and sustainable. I remember the feeling I am returning to: inventive, alive, free, solid, settled, professional, unblocked, self-directed, and light.

### Task visualization
I imagine moving through an ordinary day with those qualities quietly present, not as pressure, but as a way of being. I can notice the small signs of alignment: one strong concept choice, a fresh visual language, clean handoffs, clear expectations, and the spaciousness that comes when I do not avoid what keeps the studio steady. I let originality give the work its pulse, reliability give the exchange its ground, and freedom give the whole practice room to breathe.

### Ending
I carry this as my anchor: my work feels like mine, my delivery makes trust visible, and my studio stays free because I keep it alive and sustainable.

## soul script (150 words)

I let what matters come into view: work that feels unmistakably mine, delivery that makes trust visible, and a practice that stays independent and sustainable. I remember the feeling I am returning to: inventive, alive, free, solid, settled, professional, unblocked, self-directed, and light.

I imagine moving through an ordinary day with those qualities quietly present, not as pressure, but as a way of being. I can notice the small signs of alignment: one strong concept choice, a fresh visual language, clean handoffs, clear expectations, and the spaciousness that comes when I do not avoid what keeps the studio steady. I let originality give the work its pulse, reliability give the exchange its ground, and freedom give the whole practice room to breathe.

I carry this as my anchor: my work feels like mine, my delivery makes trust visible, and my studio stays free because I keep it alive and sustainable.

## full input

```json
{
  "arm": "full",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Alex",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "alex-morgan",
      "priority": {
        "title": "Build an independent creative practice",
        "description": "Build an independent creative practice that supports originality, reliable client work, and financial steadiness."
      },
      "goal_1": {
        "answers": {
          "what": "Send a strong pitch deck before the client call",
          "exactQuantity": {
            "value": 1,
            "unit": "client-ready pitch deck",
            "description": "one exported deck ready before the call"
          },
          "exactDate": {
            "label": "by 4:00 PM today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "story",
              "label": "Choose the core story arc",
              "target": "one narrative direction"
            },
            {
              "id": "slides",
              "label": "Sequence strongest concept slides",
              "target": "one deck flow"
            },
            {
              "id": "export",
              "label": "Export client-ready mockups",
              "target": "final PDF and image files"
            }
          ],
          "metric": "client-ready deck exported",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "alex-pitch-narrative",
      "title": "Build pitch deck narrative",
      "project_title": "Client brand pitch",
      "parent_goal_title": "Send a strong pitch deck before the client call",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 80
    },
    "focus_subtasks": [
      {
        "subtask_id": "alex-pitch-1",
        "title": "Choose the core story arc",
        "order": 1,
        "duration_minutes": 20
      },
      {
        "subtask_id": "alex-pitch-2",
        "title": "Sequence the strongest concept slides",
        "order": 2,
        "duration_minutes": 35
      },
      {
        "subtask_id": "alex-pitch-3",
        "title": "Write transition notes for the client call",
        "order": 3,
        "duration_minutes": 25
      }
    ]
  },
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Originality",
        "name": "Originality",
        "emoji": "spark",
        "feels_like_labels": [
          "inventive",
          "alive",
          "free"
        ],
        "daily_sign_labels": [
          "one strong concept choice",
          "fresh visual language"
        ],
        "personal_definition": "making work that feels unmistakably mine"
      },
      {
        "value_id": "Reliability",
        "name": "Reliability",
        "emoji": "bridge",
        "feels_like_labels": [
          "solid",
          "settled",
          "professional"
        ],
        "daily_sign_labels": [
          "files exported cleanly",
          "client knows what to expect"
        ],
        "personal_definition": "making trust feel visible in how I deliver"
      },
      {
        "value_id": "Freedom",
        "name": "Freedom",
        "emoji": "window",
        "feels_like_labels": [
          "unblocked",
          "self-directed",
          "light"
        ],
        "daily_sign_labels": [
          "admin cleared",
          "money tasks not avoided"
        ],
        "personal_definition": "keeping my practice independent and sustainable"
      }
    ],
    "ideal_life": {
      "statement": "A life where creative work stays original and the studio stays sustainable",
      "life_shape_labels": [
        "independent studio",
        "creative mornings"
      ]
    }
  },
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "7.6 hours slept with strong continuity; sleep quality 84/100 and a rested start for a creative morning block.",
      "activity_summary": "light morning stretch before desk work",
      "stress_summary": "Stress is low to moderate around clarifying the pitch direction."
    },
    "sleep_hours": 7.6,
    "current_energy_level": 7,
    "focus_cues": {
      "visual": [
        "deck outline open",
        "three concept thumbnails visible",
        "moodboard wall nearby"
      ],
      "auditory": [
        "playlist ready"
      ],
      "tactile_body": [
        "stylus in hand",
        "tablet warm from charging"
      ],
      "smell": [
        "coffee"
      ],
      "taste": [
        "coffee"
      ],
      "other": [
        "client notes minimized but available"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
My breath is already here, steady enough to notice, and my feet meet the floor while the chair holds my posture. My jaw softens, my shoulders register the low-to-moderate pitch tension, and the rested energy from strong sleep feels available without needing to rush. I sense the deck outline open, the thumbnails nearby, and coffee in the background.

### Task visualization
I am building an independent creative practice where original work stays sustainable, and this pitch is one way I make trust visible. For Build pitch deck narrative, I first choose one core story arc, letting the strongest concept feel inventive, alive, and unmistakably mine. Then I sequence the strongest slides into a clear flow, solid enough for the client to follow and fresh enough to carry the idea. Next I write transition notes for the call, hearing the deck become settled, professional, and ready to send before 4:00 PM.

### Ending
I begin with the core story arc. Rested energy, one clear choice; original work, reliable delivery; this is how I keep the studio free.

## full script (171 words)

My breath is already here, steady enough to notice, and my feet meet the floor while the chair holds my posture. My jaw softens, my shoulders register the low-to-moderate pitch tension, and the rested energy from strong sleep feels available without needing to rush. I sense the deck outline open, the thumbnails nearby, and coffee in the background.

I am building an independent creative practice where original work stays sustainable, and this pitch is one way I make trust visible. For Build pitch deck narrative, I first choose one core story arc, letting the strongest concept feel inventive, alive, and unmistakably mine. Then I sequence the strongest slides into a clear flow, solid enough for the client to follow and fresh enough to carry the idea. Next I write transition notes for the call, hearing the deck become settled, professional, and ready to send before 4:00 PM.

I begin with the core story arc. Rested energy, one clear choice; original work, reliable delivery; this is how I keep the studio free.

# serena_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":163,"mind":151,"body":178,"soul":153,"full":194}

## baseline input

```json
{
  "preparationOnlyContext": "Daily preparation with the full calendar schedule and durations, without priority ranking.",
  "visibleItems": [
    "07:15-07:50 School drop-off - 35 min",
    "08:30-09:55 Draft argument section - 85 min",
    "10:15-10:30 Confirm pickup logistics - 15 min",
    "11:05-11:30 Send case update to co-counsel - 25 min",
    "12:00-12:30 Client check-in - 30 min",
    "13:00-13:25 Lunch break - 25 min",
    "14:30-14:50 Filing window check - 20 min",
    "16:00-16:30 Afternoon pickup - 30 min"
  ]
}
```


## baseline script (163 words)

This is only the visible schedule for the day, shown in the listed order with the times and durations.

07:15 to 07:50 is School drop-off. That is a 35 minute calendar item in the morning. After that, there is a gap until 08:30.

08:30 to 09:55 is Draft argument section. This is an 85 minute work item. The start time is 08:30 and the end time is 09:55.

10:15 to 10:30 is Confirm pickup logistics. This is a 15 minute item. It is listed after the drafting block.

11:05 to 11:30 is Send case update to co-counsel. This is an email or update item, and it lasts 25 minutes.

12:00 to 12:30 is Client check-in. This is a meeting item for 30 minutes.

13:00 to 13:25 is Lunch break. This is a lunch item, and it is 25 minutes long.

14:30 to 14:50 is Filing window check. This is a 20 minute calendar item.

16:00 to 16:30 is Afternoon pickup, lasting 30 minutes.

## mind input

```json
{
  "arm": "mind",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "user_goal": {
      "userid": "serena-park",
      "priority": {
        "title": "Practice humane advocacy",
        "description": "Do rigorous public-interest advocacy while staying humane to herself and making complex systems more navigable for clients."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a clear first draft of the argument section",
          "exactQuantity": {
            "value": 1,
            "unit": "argument-section draft",
            "description": "one complete first draft of the legal argument section"
          },
          "exactDate": {
            "label": "by noon today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "outline",
              "label": "Review argument outline",
              "target": "one outline pass"
            },
            {
              "id": "claim",
              "label": "Draft strongest claim paragraph",
              "target": "one complete claim paragraph"
            },
            {
              "id": "precedent",
              "label": "Tie precedent back to client facts",
              "target": "one integrated precedent section"
            }
          ],
          "metric": "argument draft complete",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "07:15-07:50",
        "title": "School drop-off",
        "kind": "event",
        "duration_minutes": 35
      },
      {
        "time": "08:30-09:55",
        "title": "Draft argument section",
        "kind": "event",
        "duration_minutes": 85
      },
      {
        "time": "10:15-10:30",
        "title": "Confirm pickup logistics",
        "kind": "event",
        "duration_minutes": 15
      },
      {
        "time": "11:05-11:30",
        "title": "Send case update to co-counsel",
        "kind": "event",
        "duration_minutes": 25
      },
      {
        "time": "12:00-12:30",
        "title": "Client check-in",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:00-13:25",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 25
      },
      {
        "time": "14:30-14:50",
        "title": "Filing window check",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "16:00-16:30",
        "title": "Afternoon pickup",
        "kind": "event",
        "duration_minutes": 30
      }
    ],
    "priority_schedule": [
      {
        "title": "Draft argument section",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 85
      },
      {
        "title": "Confirm pickup logistics",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "low",
        "duration_minutes": 15
      },
      {
        "title": "Send case update to co-counsel",
        "kind": "task",
        "rank": 3,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 25
      }
    ],
    "open_carry_overs": [
      "Draft argument section"
    ]
  }
}
```

## mind sections

### Introduction
Today’s larger aim is a clear first draft of the argument section by noon, with the morning organized around legal drafting and a few contained coordination tasks.

### Task visualization
First comes Draft argument section, 08:30-09:55 for 85 minutes; then Confirm pickup logistics, 10:15-10:30 for 15 minutes; then Send case update to co-counsel, 11:05-11:30 for 25 minutes. You see the argument draft as the main work: one outline pass, one complete strongest-claim paragraph, and one precedent section tied back to client facts. Good enough means the argument is complete enough to review, not polished into final form. What tells you the draft is done enough for noon? If attention stalls on precedent or wording, what returns you to the next concrete pass?

### Ending
You can move the day forward by entering the first drafting window and making the next visible part of the argument section real on the page, one usable paragraph at a time.

## mind script (151 words)

Today’s larger aim is a clear first draft of the argument section by noon, with the morning organized around legal drafting and a few contained coordination tasks.

First comes Draft argument section, 08:30-09:55 for 85 minutes; then Confirm pickup logistics, 10:15-10:30 for 15 minutes; then Send case update to co-counsel, 11:05-11:30 for 25 minutes. You see the argument draft as the main work: one outline pass, one complete strongest-claim paragraph, and one precedent section tied back to client facts. Good enough means the argument is complete enough to review, not polished into final form. What tells you the draft is done enough for noon? If attention stalls on precedent or wording, what returns you to the next concrete pass?

You can move the day forward by entering the first drafting window and making the next visible part of the argument section real on the page, one usable paragraph at a time.

## body input

```json
{
  "arm": "body",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "body"
  ],
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.9 hours slept with an interruption overnight; sleep quality 70/100, moderate restlessness, and a usable but compressed morning window.",
      "activity_summary": "school drop-off walk planned; light morning movement",
      "stress_summary": "Stress is moderate from interrupted sleep, family logistics, and a deadline window."
    },
    "sleep_hours": 5.9,
    "current_energy_level": 4,
    "focus_cues": {
      "visual": [
        "case notes printed",
        "phone on do-not-disturb",
        "argument outline open"
      ],
      "auditory": [
        "quiet apartment",
        "email alerts muted"
      ],
      "tactile_body": [
        "mug warming hands",
        "chair pulled close to desk"
      ],
      "smell": [
        "tea"
      ],
      "taste": [
        "tea"
      ],
      "other": [
        "pickup reminder visible"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
Begin with a slow breath in, and a longer breath out. Feel your posture as it is, without forcing it straighter. Notice where your body meets the chair, where your feet meet the floor, and where the morning feels a little compressed. Your energy is modest, so let your shoulders drop by one small amount.

### Task visualization
You slept, but not deeply all the way through, and your body may still carry some overnight restlessness. Let the quiet apartment register around you. Feel the mug warming your hands, the chair pulled close, the taste and smell of tea. Notice the muted alerts, the phone set aside, the printed pages and open outline only as shapes in the room. The pickup reminder can simply be visible. Family logistics and time pressure may be present as tightness, shallow breath, or a busy mind. Let each cue become contact, sound, warmth, and breath.

### Ending
Take one more steady breath. Let your jaw soften, your hands unclench, and your eyes settle. Move at the pace this body actually has. Anchor line: feet down, breath steady.

## body script (178 words)

Begin with a slow breath in, and a longer breath out. Feel your posture as it is, without forcing it straighter. Notice where your body meets the chair, where your feet meet the floor, and where the morning feels a little compressed. Your energy is modest, so let your shoulders drop by one small amount.

You slept, but not deeply all the way through, and your body may still carry some overnight restlessness. Let the quiet apartment register around you. Feel the mug warming your hands, the chair pulled close, the taste and smell of tea. Notice the muted alerts, the phone set aside, the printed pages and open outline only as shapes in the room. The pickup reminder can simply be visible. Family logistics and time pressure may be present as tightness, shallow breath, or a busy mind. Let each cue become contact, sound, warmth, and breath.

Take one more steady breath. Let your jaw soften, your hands unclench, and your eyes settle. Move at the pace this body actually has. Anchor line: feet down, breath steady.

## soul input

```json
{
  "arm": "soul",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "value"
  ],
  "value": {
    "top_values": [
      {
        "value_id": "Justice",
        "name": "Justice",
        "emoji": "scale",
        "feels_like_labels": [
          "committed",
          "clear",
          "purposeful"
        ],
        "daily_sign_labels": [
          "argument made sharper",
          "client position protected"
        ],
        "personal_definition": "using legal skill to make unfair systems more answerable"
      },
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hand",
        "feels_like_labels": [
          "kind",
          "human",
          "steady"
        ],
        "daily_sign_labels": [
          "plain-language next step",
          "one check-in done"
        ],
        "personal_definition": "remembering the human stakes inside the legal work"
      },
      {
        "value_id": "Diligence",
        "name": "Diligence",
        "emoji": "file",
        "feels_like_labels": [
          "thorough",
          "prepared",
          "grounded"
        ],
        "daily_sign_labels": [
          "notes updated",
          "deadline risk reduced"
        ],
        "personal_definition": "doing the careful work even when the day is compressed"
      }
    ],
    "ideal_life": {
      "statement": "A life where I do rigorous advocacy without losing my humanity",
      "life_shape_labels": [
        "humane advocacy",
        "clear client care"
      ]
    }
  }
}
```

## soul sections

### Introduction
Let what matters come into view: justice as using legal skill to make unfair systems more answerable, care as remembering the human stakes inside the work, and diligence as carefulness that keeps you grounded. In this day, these can feel committed, clear, purposeful, kind, human, steady, thorough, prepared, and quietly strong.

### Task visualization
You move through the day as someone who sharpens what needs sharpening without becoming hard, protects what needs protecting without losing warmth, and keeps the human being inside the matter visible. Small signs are enough: a clearer argument, a position held with care, plain language that makes the next step less lonely, careful notes that leave things more answerable than before. You do not need to become mechanical to be rigorous; your advocacy can stay humane, and your care can stay clear.

### Ending
Carry this: I practice rigorous advocacy without losing my humanity; I make unfair systems more answerable while keeping people visible.

## soul script (153 words)

Let what matters come into view: justice as using legal skill to make unfair systems more answerable, care as remembering the human stakes inside the work, and diligence as carefulness that keeps you grounded. In this day, these can feel committed, clear, purposeful, kind, human, steady, thorough, prepared, and quietly strong.

You move through the day as someone who sharpens what needs sharpening without becoming hard, protects what needs protecting without losing warmth, and keeps the human being inside the matter visible. Small signs are enough: a clearer argument, a position held with care, plain language that makes the next step less lonely, careful notes that leave things more answerable than before. You do not need to become mechanical to be rigorous; your advocacy can stay humane, and your care can stay clear.

Carry this: I practice rigorous advocacy without losing my humanity; I make unfair systems more answerable while keeping people visible.

## full input

```json
{
  "arm": "full",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "user_goal": {
      "userid": "serena-park",
      "priority": {
        "title": "Practice humane advocacy",
        "description": "Do rigorous public-interest advocacy while staying humane to herself and making complex systems more navigable for clients."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a clear first draft of the argument section",
          "exactQuantity": {
            "value": 1,
            "unit": "argument-section draft",
            "description": "one complete first draft of the legal argument section"
          },
          "exactDate": {
            "label": "by noon today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "outline",
              "label": "Review argument outline",
              "target": "one outline pass"
            },
            {
              "id": "claim",
              "label": "Draft strongest claim paragraph",
              "target": "one complete claim paragraph"
            },
            {
              "id": "precedent",
              "label": "Tie precedent back to client facts",
              "target": "one integrated precedent section"
            }
          ],
          "metric": "argument draft complete",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "calendar_events": [
      {
        "time": "07:15-07:50",
        "title": "School drop-off",
        "kind": "event",
        "duration_minutes": 35
      },
      {
        "time": "08:30-09:55",
        "title": "Draft argument section",
        "kind": "event",
        "duration_minutes": 85
      },
      {
        "time": "10:15-10:30",
        "title": "Confirm pickup logistics",
        "kind": "event",
        "duration_minutes": 15
      },
      {
        "time": "11:05-11:30",
        "title": "Send case update to co-counsel",
        "kind": "event",
        "duration_minutes": 25
      },
      {
        "time": "12:00-12:30",
        "title": "Client check-in",
        "kind": "event",
        "duration_minutes": 30
      },
      {
        "time": "13:00-13:25",
        "title": "Lunch break",
        "kind": "event",
        "duration_minutes": 25
      },
      {
        "time": "14:30-14:50",
        "title": "Filing window check",
        "kind": "event",
        "duration_minutes": 20
      },
      {
        "time": "16:00-16:30",
        "title": "Afternoon pickup",
        "kind": "event",
        "duration_minutes": 30
      }
    ],
    "priority_schedule": [
      {
        "title": "Draft argument section",
        "kind": "task",
        "rank": 1,
        "priority": "high",
        "energy_cost": "high",
        "duration_minutes": 85
      },
      {
        "title": "Confirm pickup logistics",
        "kind": "task",
        "rank": 2,
        "priority": "medium",
        "energy_cost": "low",
        "duration_minutes": 15
      },
      {
        "title": "Send case update to co-counsel",
        "kind": "task",
        "rank": 3,
        "priority": "medium",
        "energy_cost": "medium",
        "duration_minutes": 25
      }
    ],
    "open_carry_overs": [
      "Draft argument section"
    ]
  },
  "value": {
    "top_values": [
      {
        "value_id": "Justice",
        "name": "Justice",
        "emoji": "scale",
        "feels_like_labels": [
          "committed",
          "clear",
          "purposeful"
        ],
        "daily_sign_labels": [
          "argument made sharper",
          "client position protected"
        ],
        "personal_definition": "using legal skill to make unfair systems more answerable"
      },
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hand",
        "feels_like_labels": [
          "kind",
          "human",
          "steady"
        ],
        "daily_sign_labels": [
          "plain-language next step",
          "one check-in done"
        ],
        "personal_definition": "remembering the human stakes inside the legal work"
      },
      {
        "value_id": "Diligence",
        "name": "Diligence",
        "emoji": "file",
        "feels_like_labels": [
          "thorough",
          "prepared",
          "grounded"
        ],
        "daily_sign_labels": [
          "notes updated",
          "deadline risk reduced"
        ],
        "personal_definition": "doing the careful work even when the day is compressed"
      }
    ],
    "ideal_life": {
      "statement": "A life where I do rigorous advocacy without losing my humanity",
      "life_shape_labels": [
        "humane advocacy",
        "clear client care"
      ]
    }
  },
  "body": {
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.9 hours slept with an interruption overnight; sleep quality 70/100, moderate restlessness, and a usable but compressed morning window.",
      "activity_summary": "school drop-off walk planned; light morning movement",
      "stress_summary": "Stress is moderate from interrupted sleep, family logistics, and a deadline window."
    },
    "sleep_hours": 5.9,
    "current_energy_level": 4,
    "focus_cues": {
      "visual": [
        "case notes printed",
        "phone on do-not-disturb",
        "argument outline open"
      ],
      "auditory": [
        "quiet apartment",
        "email alerts muted"
      ],
      "tactile_body": [
        "mug warming hands",
        "chair pulled close to desk"
      ],
      "smell": [
        "tea"
      ],
      "taste": [
        "tea"
      ],
      "other": [
        "pickup reminder visible"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
Breath is already here, moving in and out without needing to be fixed; your chair holds your posture, your feet meet the floor, and your jaw and shoulders notice what they carry. With 5.9 interrupted hours and moderate stress, your energy is honest and limited, while tea, quiet, and muted alerts help the morning become workable.

### Task visualization
Let the day aim for clear, humane advocacy: in service of making unfair systems more answerable, the anchors are Draft argument section for 85 minutes as the main win, then Confirm pickup logistics for 15, then Send case update to co-counsel for 25. Imagine the argument draft becoming done enough by noon: outline reviewed, strongest claim taking shape, precedent tied back to client facts, and the client position a little more protected. What does that committed, steady progress feel like in your body and attention? If tiredness or logistics pull you off course, what helps you return to the next honest paragraph?

### Ending
You can carry these three priorities through today: the draft as the win, logistics and co-counsel as lighter completions. You do not need force; steady care can make the argument sharper and the system more answerable.

## full script (194 words)

Breath is already here, moving in and out without needing to be fixed; your chair holds your posture, your feet meet the floor, and your jaw and shoulders notice what they carry. With 5.9 interrupted hours and moderate stress, your energy is honest and limited, while tea, quiet, and muted alerts help the morning become workable.

Let the day aim for clear, humane advocacy: in service of making unfair systems more answerable, the anchors are Draft argument section for 85 minutes as the main win, then Confirm pickup logistics for 15, then Send case update to co-counsel for 25. Imagine the argument draft becoming done enough by noon: outline reviewed, strongest claim taking shape, precedent tied back to client facts, and the client position a little more protected. What does that committed, steady progress feel like in your body and attention? If tiredness or logistics pull you off course, what helps you return to the next honest paragraph?

You can carry these three priorities through today: the draft as the win, logistics and co-counsel as lighter completions. You do not need force; steady care can make the argument sharper and the system more answerable.

# serena_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.simple_baseline_prompt","mind":"backend.generate_ablation_rehearsal:mind_success_visualization_backend","body":"backend.generate_ablation_rehearsal:body_grounding_backend","soul":"backend.generate_ablation_rehearsal:soul_value_anchoring_backend","full":"backend.generate_ablation_rehearsal:full_three_phase_backend"}
Word counts: {"baseline":172,"mind":159,"body":165,"soul":165,"full":167}

## baseline input

```json
{
  "preparationOnlyContext": "Specific task preparation for drafting the argument section.",
  "visibleItems": [
    "Review argument outline - 15 min",
    "Draft strongest claim paragraph - 35 min",
    "Tie precedent to client facts - 35 min"
  ]
}
```


## baseline script (172 words)

This is the visible list for the specific task context of drafting the argument section. There are three listed items. The list only includes the visible items, and it does not include anything outside those items.

The first item is “Review argument outline,” and it is listed as 15 minutes. This item is related to the argument section because it refers to the argument outline. The duration shown for this item is 15 minutes.

The second item is “Draft strongest claim paragraph,” and it is listed as 35 minutes. This item is also related to the argument section because it refers to drafting a paragraph. The duration shown for this item is 35 minutes.

The third item is “Tie precedent to client facts,” and it is listed as 35 minutes. This item is related to connecting precedent and client facts. The duration shown for this item is 35 minutes.

The visible sequence is review outline, draft strongest claim paragraph, and tie precedent to client facts. That is the visible task preparation context.

## mind input

```json
{
  "arm": "mind",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "mind"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "serena-park",
      "priority": {
        "title": "Practice humane advocacy",
        "description": "Do rigorous public-interest advocacy while staying humane to herself and making complex systems more navigable for clients."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a clear first draft of the argument section",
          "exactQuantity": {
            "value": 1,
            "unit": "argument-section draft",
            "description": "one complete first draft of the legal argument section"
          },
          "exactDate": {
            "label": "by noon today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "outline",
              "label": "Review argument outline",
              "target": "one outline pass"
            },
            {
              "id": "claim",
              "label": "Draft strongest claim paragraph",
              "target": "one complete claim paragraph"
            },
            {
              "id": "precedent",
              "label": "Tie precedent back to client facts",
              "target": "one integrated precedent section"
            }
          ],
          "metric": "argument draft complete",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "serena-argument-section",
      "title": "Draft argument section",
      "project_title": "Public-interest case brief",
      "parent_goal_title": "Submit a clear first draft of the argument section",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 85
    },
    "focus_subtasks": [
      {
        "subtask_id": "serena-arg-1",
        "title": "Review argument outline",
        "order": 1,
        "duration_minutes": 15
      },
      {
        "subtask_id": "serena-arg-2",
        "title": "Draft the strongest claim paragraph",
        "order": 2,
        "duration_minutes": 35
      },
      {
        "subtask_id": "serena-arg-3",
        "title": "Tie precedent back to client facts",
        "order": 3,
        "duration_minutes": 35
      }
    ]
  }
}
```

## mind sections

### Introduction
I picture the larger priority as submitting one clear first draft of the argument section by noon today. The work context is the public-interest case brief, with the argument section as the central target.

### Task visualization
I see myself starting with Draft argument section and moving through the 85-minute work period in a clean sequence. First, I review the argument outline for one focused pass, noticing the order of points and the place where the main claim belongs. Next, I draft the strongest claim paragraph, making the position direct, complete, and usable as a first draft. Then I tie precedent back to client facts, connecting the authority to the record in plain terms. I picture the section becoming complete enough to submit as a clear first draft.

### Ending
I can move this work forward through the next doable action: opening the outline and beginning the review pass. The draft does not need to be final; it needs to become complete and workable.

## mind script (159 words)

I picture the larger priority as submitting one clear first draft of the argument section by noon today. The work context is the public-interest case brief, with the argument section as the central target.

I see myself starting with Draft argument section and moving through the 85-minute work period in a clean sequence. First, I review the argument outline for one focused pass, noticing the order of points and the place where the main claim belongs. Next, I draft the strongest claim paragraph, making the position direct, complete, and usable as a first draft. Then I tie precedent back to client facts, connecting the authority to the record in plain terms. I picture the section becoming complete enough to submit as a clear first draft.

I can move this work forward through the next doable action: opening the outline and beginning the review pass. The draft does not need to be final; it needs to become complete and workable.

## body input

```json
{
  "arm": "body",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "body"
  ],
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.9 hours slept with an interruption overnight; sleep quality 70/100, moderate restlessness, and a usable but compressed morning window.",
      "activity_summary": "light movement around morning logistics",
      "stress_summary": "Stress is moderate because the available work window is compressed."
    },
    "sleep_hours": 5.9,
    "current_energy_level": 4,
    "focus_cues": {
      "visual": [
        "argument outline open",
        "case notes printed",
        "highlighted precedent beside laptop"
      ],
      "auditory": [
        "quiet apartment",
        "email alerts muted"
      ],
      "tactile_body": [
        "mug warming hands",
        "feet planted under desk"
      ],
      "smell": [
        "tea"
      ],
      "taste": [
        "tea"
      ],
      "other": [
        "phone on do-not-disturb"
      ]
    },
    "confidence": "medium"
  }
}
```

## body sections

### Introduction
I begin with one slow breath in, and a longer breath out. I notice my posture as it is, without forcing it. My feet are planted under the desk. My hands feel the warmth of the mug. I let my shoulders soften a little. I feel the tiredness of a shorter, interrupted night as heaviness, not as a problem to solve.

### Task visualization
I notice light morning movement still settling in my body. My energy is present but modest, so I keep my pace honest. The apartment is quiet. Alerts are muted. My phone is on do-not-disturb. I let these cues become part of the room’s steadiness. I smell tea, taste tea, and feel the mug again. My eyes can rest on what is already open nearby, then return to breath, feet, and hands.

### Ending
I take one more breath and let my body arrive at a calmer speed. I do not need to rush my nervous system. I can begin from this steadier place. Breath, feet, hands.

## body script (165 words)

I begin with one slow breath in, and a longer breath out. I notice my posture as it is, without forcing it. My feet are planted under the desk. My hands feel the warmth of the mug. I let my shoulders soften a little. I feel the tiredness of a shorter, interrupted night as heaviness, not as a problem to solve.

I notice light morning movement still settling in my body. My energy is present but modest, so I keep my pace honest. The apartment is quiet. Alerts are muted. My phone is on do-not-disturb. I let these cues become part of the room’s steadiness. I smell tea, taste tea, and feel the mug again. My eyes can rest on what is already open nearby, then return to breath, feet, and hands.

I take one more breath and let my body arrive at a calmer speed. I do not need to rush my nervous system. I can begin from this steadier place. Breath, feet, hands.

## soul input

```json
{
  "arm": "soul",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "value"
  ],
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Justice",
        "name": "Justice",
        "emoji": "scale",
        "feels_like_labels": [
          "committed",
          "clear",
          "purposeful"
        ],
        "daily_sign_labels": [
          "argument made sharper",
          "client position protected"
        ],
        "personal_definition": "using legal skill to make unfair systems more answerable"
      },
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hand",
        "feels_like_labels": [
          "kind",
          "human",
          "steady"
        ],
        "daily_sign_labels": [
          "plain-language next step",
          "one check-in done"
        ],
        "personal_definition": "remembering the human stakes inside the legal work"
      },
      {
        "value_id": "Diligence",
        "name": "Diligence",
        "emoji": "file",
        "feels_like_labels": [
          "thorough",
          "prepared",
          "grounded"
        ],
        "daily_sign_labels": [
          "notes updated",
          "deadline risk reduced"
        ],
        "personal_definition": "doing the careful work even when the day is compressed"
      }
    ],
    "ideal_life": {
      "statement": "A life where I do rigorous advocacy without losing my humanity",
      "life_shape_labels": [
        "humane advocacy",
        "clear client care"
      ]
    }
  }
}
```

## soul sections

### Introduction
I let justice come into view as legal skill used to make unfair systems more answerable. I let care stay close as remembering the human stakes inside the work, and I let diligence feel like carefulness that remains possible even when the day is compressed.

### Task visualization
I imagine moving through an unspecified day with a clear, committed, purposeful tone, letting each moment ask: does this sharpen what needs to be said, protect what should not be overlooked, and keep the person inside the matter visible? I carry a kind, human steadiness with me, where plain language, a thoughtful check-in, and grounded preparation can all feel like part of the same humane advocacy. I can be thorough without becoming hard, prepared without becoming distant, and clear without losing warmth.

### Ending
I practice the shape of a life where rigorous advocacy and humanity belong together. My anchor is: I make the system answer, I keep the person in view, and I stay careful enough to be worthy of both.

## soul script (165 words)

I let justice come into view as legal skill used to make unfair systems more answerable. I let care stay close as remembering the human stakes inside the work, and I let diligence feel like carefulness that remains possible even when the day is compressed.

I imagine moving through an unspecified day with a clear, committed, purposeful tone, letting each moment ask: does this sharpen what needs to be said, protect what should not be overlooked, and keep the person inside the matter visible? I carry a kind, human steadiness with me, where plain language, a thoughtful check-in, and grounded preparation can all feel like part of the same humane advocacy. I can be thorough without becoming hard, prepared without becoming distant, and clear without losing warmth.

I practice the shape of a life where rigorous advocacy and humanity belong together. My anchor is: I make the system answer, I keep the person in view, and I stay careful enough to be worthy of both.

## full input

```json
{
  "arm": "full",
  "scope": "task",
  "date": "2026-05-28",
  "user_display_name": "Serena",
  "included_domains": [
    "mind",
    "value",
    "body"
  ],
  "mind": {
    "scope": "task",
    "user_goal": {
      "userid": "serena-park",
      "priority": {
        "title": "Practice humane advocacy",
        "description": "Do rigorous public-interest advocacy while staying humane to herself and making complex systems more navigable for clients."
      },
      "goal_1": {
        "answers": {
          "what": "Submit a clear first draft of the argument section",
          "exactQuantity": {
            "value": 1,
            "unit": "argument-section draft",
            "description": "one complete first draft of the legal argument section"
          },
          "exactDate": {
            "label": "by noon today",
            "isoDate": "2026-05-28"
          },
          "keySteps": [
            {
              "id": "outline",
              "label": "Review argument outline",
              "target": "one outline pass"
            },
            {
              "id": "claim",
              "label": "Draft strongest claim paragraph",
              "target": "one complete claim paragraph"
            },
            {
              "id": "precedent",
              "label": "Tie precedent back to client facts",
              "target": "one integrated precedent section"
            }
          ],
          "metric": "argument draft complete",
          "deadline": "2026-05-28"
        },
        "completed": true,
        "source": "onboarding"
      }
    },
    "focus_task": {
      "task_id": "serena-argument-section",
      "title": "Draft argument section",
      "project_title": "Public-interest case brief",
      "parent_goal_title": "Submit a clear first draft of the argument section",
      "priority": "high",
      "energy_cost": "high",
      "duration_minutes": 85
    },
    "focus_subtasks": [
      {
        "subtask_id": "serena-arg-1",
        "title": "Review argument outline",
        "order": 1,
        "duration_minutes": 15
      },
      {
        "subtask_id": "serena-arg-2",
        "title": "Draft the strongest claim paragraph",
        "order": 2,
        "duration_minutes": 35
      },
      {
        "subtask_id": "serena-arg-3",
        "title": "Tie precedent back to client facts",
        "order": 3,
        "duration_minutes": 35
      }
    ]
  },
  "value": {
    "scope": "task",
    "top_values": [
      {
        "value_id": "Justice",
        "name": "Justice",
        "emoji": "scale",
        "feels_like_labels": [
          "committed",
          "clear",
          "purposeful"
        ],
        "daily_sign_labels": [
          "argument made sharper",
          "client position protected"
        ],
        "personal_definition": "using legal skill to make unfair systems more answerable"
      },
      {
        "value_id": "Care",
        "name": "Care",
        "emoji": "hand",
        "feels_like_labels": [
          "kind",
          "human",
          "steady"
        ],
        "daily_sign_labels": [
          "plain-language next step",
          "one check-in done"
        ],
        "personal_definition": "remembering the human stakes inside the legal work"
      },
      {
        "value_id": "Diligence",
        "name": "Diligence",
        "emoji": "file",
        "feels_like_labels": [
          "thorough",
          "prepared",
          "grounded"
        ],
        "daily_sign_labels": [
          "notes updated",
          "deadline risk reduced"
        ],
        "personal_definition": "doing the careful work even when the day is compressed"
      }
    ],
    "ideal_life": {
      "statement": "A life where I do rigorous advocacy without losing my humanity",
      "life_shape_labels": [
        "humane advocacy",
        "clear client care"
      ]
    }
  },
  "body": {
    "scope": "task",
    "digest": {
      "snapshot_date": "2026-05-28",
      "source": "fitbit",
      "sleep_summary": "5.9 hours slept with an interruption overnight; sleep quality 70/100, moderate restlessness, and a usable but compressed morning window.",
      "activity_summary": "light movement around morning logistics",
      "stress_summary": "Stress is moderate because the available work window is compressed."
    },
    "sleep_hours": 5.9,
    "current_energy_level": 4,
    "focus_cues": {
      "visual": [
        "argument outline open",
        "case notes printed",
        "highlighted precedent beside laptop"
      ],
      "auditory": [
        "quiet apartment",
        "email alerts muted"
      ],
      "tactile_body": [
        "mug warming hands",
        "feet planted under desk"
      ],
      "smell": [
        "tea"
      ],
      "taste": [
        "tea"
      ],
      "other": [
        "phone on do-not-disturb"
      ]
    },
    "confidence": "medium"
  }
}
```

## full sections

### Introduction
My breath is already here, moving without force, and my feet are planted under the desk. I feel the chair hold my posture, my jaw soften, and my shoulders name the compressed morning and 5.9 hours of interrupted sleep without turning that into pressure. The quiet apartment and warm tea help the scene become simple enough to enter.

### Task visualization
The feeling I rehearse is clear, purposeful, and human: rigorous advocacy without losing my humanity. This work serves humane advocacy by making an unfair system more answerable and the client’s position more protected. I begin Draft argument section with one outline pass, then I see the strongest claim paragraph take shape, steady and sharp enough to lead the argument. Next, I tie precedent back to client facts, feeling the care in plain language and the diligence in a complete first draft by noon. I can make one grounded pass that counts.

### Ending
I start with the outline pass. Clear enough to begin; humane enough to continue; careful work protects people.

## full script (167 words)

My breath is already here, moving without force, and my feet are planted under the desk. I feel the chair hold my posture, my jaw soften, and my shoulders name the compressed morning and 5.9 hours of interrupted sleep without turning that into pressure. The quiet apartment and warm tea help the scene become simple enough to enter.

The feeling I rehearse is clear, purposeful, and human: rigorous advocacy without losing my humanity. This work serves humane advocacy by making an unfair system more answerable and the client’s position more protected. I begin Draft argument section with one outline pass, then I see the strongest claim paragraph take shape, steady and sharp enough to lead the argument. Next, I tie precedent back to client facts, feeling the care in plain language and the diligence in a complete first draft by noon. I can make one grounded pass that counts.

I start with the outline pass. Clear enough to begin; humane enough to continue; careful work protects people.
