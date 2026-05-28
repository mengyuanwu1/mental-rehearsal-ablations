# Backend Mental Rehearsal Study Scripts

Generated at: 2026-05-28T21:35:05.926Z
Requested model: gpt-5.5
Generation source: baseline=openai.vanilla_baseline_prompt; rehearsal=backend.generate_ablation_rehearsal
Any backend mock used: false

# maya_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":204,"mind":187,"body":192,"soul":164,"full":210}

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


## baseline script (204 words)

Today’s schedule includes several defined work periods, meetings, and breaks. Begin by noting the first item, reviewing the paper plan from 08:15 to 08:35. Use that time to look over the plan and make any straightforward adjustments or reminders needed before moving on. At 09:00, shift to drafting the related work section for the 90-minute block, keeping attention on that writing task until 10:30.

After that, there is a lab standup from 10:45 to 11:15. Allow a few minutes before it to be ready to join or attend, then use the meeting time for the scheduled discussion. Lunch is listed from 12:10 to 12:40, so treat that as the planned break in the middle of the day.

In the afternoon, answer TA emails from 13:00 to 13:20, focusing on clearing or responding to the relevant messages during that short window. From 14:00 to 14:45, move to teaching support tasks and work through the items associated with that block. At 15:00, prepare two reading group questions during the 30-minute session. Later, from 16:15 to 16:35, send the advisor progress note.

Follow the calendar times as they appear, completing each item in its assigned period and transitioning to the next scheduled activity when its time arrives.

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
Feel your breath arrive first, then the contact of your body with the chair or floor. Let your shoulders drop a little, your jaw soften, and your attention gather around this day. You are arriving into work that serves becoming an independent researcher: thinking and writing on your own questions, building judgment, and producing work you are proud to defend.

### Task visualization
Picture the morning opening with a brief review of the paper plan, then the main stretch: ninety minutes with the related work section. You settle into the page, find the thread, and feel the section begin to become coherent enough to carry forward. Later, you move through twenty minutes of TA emails with clean attention, then thirty minutes preparing two reading group questions; what does it feel like when each piece has moved just far enough?

### Ending
At the close of the work, sense the day as evidence: one strong workshop paper submission becomes reachable through sections, paragraphs, and the next honest draft. You return to action a little clearer, with the related work section less vague than before. Let that be enough momentum for today’s next step.

## mind script (187 words)

Feel your breath arrive first, then the contact of your body with the chair or floor. Let your shoulders drop a little, your jaw soften, and your attention gather around this day. You are arriving into work that serves becoming an independent researcher: thinking and writing on your own questions, building judgment, and producing work you are proud to defend.

Picture the morning opening with a brief review of the paper plan, then the main stretch: ninety minutes with the related work section. You settle into the page, find the thread, and feel the section begin to become coherent enough to carry forward. Later, you move through twenty minutes of TA emails with clean attention, then thirty minutes preparing two reading group questions; what does it feel like when each piece has moved just far enough?

At the close of the work, sense the day as evidence: one strong workshop paper submission becomes reachable through sections, paragraphs, and the next honest draft. You return to action a little clearer, with the related work section less vague than before. Let that be enough momentum for today’s next step.

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
      "sleep_summary": "5.5 hours slept; sleep quality 68/100",
      "activity_summary": "4200 steps; 22 active minutes; 1900 calories out",
      "recovery_summary": "resting heart rate 73 bpm; HRV 29 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.5,
        "sleep_quality": 68,
        "steps": 4200,
        "active_minutes": 22,
        "resting_heart_rate": 73,
        "hrv_ms": 29,
        "calories_out": 1900
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your feet on the floor and the chair holding you as the quiet apartment hums around you. Your body is starting from limited sleep and low energy, with enough steadiness to arrive gently: morning light at the window, coffee or water nearby, phone face down. Let your shoulders soften, your jaw unclench, and notice the laptop open to the paper draft waiting without pressure.

### Task visualization
Imagine a smaller, clean success case for the day: you turn toward the open draft, the three anchor papers beside the keyboard, and let one useful piece of work begin to move. What does the first clear paragraph, note, or revision feel like when you do not force it? As the morning energy rises a little and then settles, you keep returning to the simple cues in front of you: screen, papers, coffee, feet, quiet.

### Ending
Let the scene close with the draft a little more shaped than before and your body a little steadier for having begun. You do not need a perfect-energy day to take the next doable step. Feel the floor again, breathe once more, and come back ready to move at an honest pace.

## body script (192 words)

Feel your feet on the floor and the chair holding you as the quiet apartment hums around you. Your body is starting from limited sleep and low energy, with enough steadiness to arrive gently: morning light at the window, coffee or water nearby, phone face down. Let your shoulders soften, your jaw unclench, and notice the laptop open to the paper draft waiting without pressure.

Imagine a smaller, clean success case for the day: you turn toward the open draft, the three anchor papers beside the keyboard, and let one useful piece of work begin to move. What does the first clear paragraph, note, or revision feel like when you do not force it? As the morning energy rises a little and then settles, you keep returning to the simple cues in front of you: screen, papers, coffee, feet, quiet.

Let the scene close with the draft a little more shaped than before and your body a little steadier for having begun. You do not need a perfect-energy day to take the next doable step. Feel the floor again, breathe once more, and come back ready to move at an honest pace.

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
Feel your breath enter, and let your shoulders settle as your hands rest where they are. You arrive without needing to force the day into shape, giving yourself room to think and to trust your own questions before borrowing anyone else’s. What would it feel like to begin from mental clarity and self-trust?

### Task visualization
Picture the important work of today coming into view, even if the exact sequence is yours to choose. You move toward what matters with a focused, competent pace, noticing the moment one piece begins to become visible progress. You leave space for curiosity too, learning something from an answer you did not expect, while still finishing what matters.

### Ending
Let the scene close with the feeling of being a little more clear, a little more accomplished, and still unboxed. Today’s next doable action can belong to the life you are shaping: a life where you think and write on your own questions. You return to the day with enough trust to begin.

## soul script (164 words)

Feel your breath enter, and let your shoulders settle as your hands rest where they are. You arrive without needing to force the day into shape, giving yourself room to think and to trust your own questions before borrowing anyone else’s. What would it feel like to begin from mental clarity and self-trust?

Picture the important work of today coming into view, even if the exact sequence is yours to choose. You move toward what matters with a focused, competent pace, noticing the moment one piece begins to become visible progress. You leave space for curiosity too, learning something from an answer you did not expect, while still finishing what matters.

Let the scene close with the feeling of being a little more clear, a little more accomplished, and still unboxed. Today’s next doable action can belong to the life you are shaping: a life where you think and write on your own questions. You return to the day with enough trust to begin.

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
      "sleep_summary": "5.5 hours slept; sleep quality 68/100",
      "activity_summary": "4200 steps; 22 active minutes; 1900 calories out",
      "recovery_summary": "resting heart rate 73 bpm; HRV 29 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.5,
        "sleep_quality": 68,
        "steps": 4200,
        "active_minutes": 22,
        "resting_heart_rate": 73,
        "hrv_ms": 29,
        "calories_out": 1900
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your feet on the floor, your hands near the laptop, and the quiet apartment hum around you. Morning light is coming through the window, the paper draft is open, three anchor papers are beside the keyboard, and coffee or water is within reach. Your body may feel a little under-slept and low at the start, so you arrive gently, letting this be a day of steady focus, independent thinking, and visible progress.

### Task visualization
See the first real block of the day: ninety minutes with the related work section, using the stronger morning energy to let one coherent draft begin to take shape. What does it feel like when you trust your own questions before borrowing other people’s, and the section starts to move? Later, you answer the TA emails in a contained twenty-minute pass, then at 15:00 you prepare two reading group questions with curious, competent attention.

### Ending
By the time you send the day forward, you have practiced the life you are building: thinking and writing on your own questions. Your body can feel a little steadier now, not forced, just clearer and more ready for the next doable action. Today’s work makes becoming an independent researcher feel reachable through one focused section, one contained responsibility, and one curious contribution.

## full script (210 words)

Feel your feet on the floor, your hands near the laptop, and the quiet apartment hum around you. Morning light is coming through the window, the paper draft is open, three anchor papers are beside the keyboard, and coffee or water is within reach. Your body may feel a little under-slept and low at the start, so you arrive gently, letting this be a day of steady focus, independent thinking, and visible progress.

See the first real block of the day: ninety minutes with the related work section, using the stronger morning energy to let one coherent draft begin to take shape. What does it feel like when you trust your own questions before borrowing other people’s, and the section starts to move? Later, you answer the TA emails in a contained twenty-minute pass, then at 15:00 you prepare two reading group questions with curious, competent attention.

By the time you send the day forward, you have practiced the life you are building: thinking and writing on your own questions. Your body can feel a little steadier now, not forced, just clearer and more ready for the next doable action. Today’s work makes becoming an independent researcher feel reachable through one focused section, one contained responsibility, and one curious contribution.

# maya_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":219,"mind":193,"body":173,"soul":189,"full":225}

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


## baseline script (219 words)

Prepare for the related work writing block by setting up the materials and notes needed for the session. Begin with the intention to work through the listed tasks in a steady, practical way, using the available time for each item as a guide. The main block is to draft the related work section for 90 minutes, so have the relevant sources, outline, or document open and ready before starting.

After that, allow 15 minutes to re-read the anchor findings. Use this time to refresh the key points that need to be represented accurately. The aim is simply to review what is already available and notice which findings are most useful for the writing.

Next, spend 20 minutes drafting the gap statement. Keep the focus on producing a clear working version rather than making it final immediately. It can be revised later, but the goal for this block is to put the main idea into words.

Then use 25 minutes to connect the related work to the gap. Look for places where the reviewed literature leads naturally into the gap statement. Make simple adjustments so the section moves clearly from prior work toward the reason for the current focus.

Move through the tasks in order, keep the materials organized, and use the time blocks to maintain a steady writing pace.

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
Feel your breath arrive in your body, and let your posture become a little more settled. Notice the contact beneath you, your hands, your shoulders, your jaw, and the space around the work before you. You are arriving into one meaningful step toward becoming an independent researcher: building work you can think through, write clearly, and feel proud to defend.

### Task visualization
Now imagine beginning the 90-minute focus block for drafting the related work section of the CHI workshop paper. You re-read the three anchor papers’ findings sections, letting the important patterns become visible; what starts to stand out as the shape of the conversation? You move into the gap statement, one paragraph becoming clear enough for your advisor to react to, then you connect the related work back to that gap until the section begins to hold together.

### Ending
Let the scene end with the draft farther along than when you began: not perfect, but more coherent, more defensible, more real. You feel the next step toward submitting a strong workshop paper this month becoming reachable through this one focused action. Take one steady breath, and return with the sense that you can begin here.

## mind script (193 words)

Feel your breath arrive in your body, and let your posture become a little more settled. Notice the contact beneath you, your hands, your shoulders, your jaw, and the space around the work before you. You are arriving into one meaningful step toward becoming an independent researcher: building work you can think through, write clearly, and feel proud to defend.

Now imagine beginning the 90-minute focus block for drafting the related work section of the CHI workshop paper. You re-read the three anchor papers’ findings sections, letting the important patterns become visible; what starts to stand out as the shape of the conversation? You move into the gap statement, one paragraph becoming clear enough for your advisor to react to, then you connect the related work back to that gap until the section begins to hold together.

Let the scene end with the draft farther along than when you began: not perfect, but more coherent, more defensible, more real. You feel the next step toward submitting a strong workshop paper this month becoming reachable through this one focused action. Take one steady breath, and return with the sense that you can begin here.

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
      "sleep_summary": "5.5 hours slept; sleep quality 68/100",
      "recovery_summary": "resting heart rate 73 bpm; HRV 29 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.5,
        "sleep_quality": 68,
        "resting_heart_rate": 73,
        "hrv_ms": 29
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your feet on the floor, your hands near the warm mug, and the quiet apartment hum around you. Your body is starting from limited rest today, with low current energy, so you arrive softly rather than forcing anything. Notice the coffee or water, the light, the paper draft open, and the phone face down.

### Task visualization
Imagine the cursor waiting at the related work section, with the anchor papers beside the keyboard. With this smaller, steady energy, you enter the task one clear pass at a time: reading what is already there, finding the next sentence, letting the section begin to move. What does it feel like when the draft becomes just a little more coherent under your hands?

### Ending
Let the image settle: feet grounded, shoulders easier, attention clearer than when you began. You do not need a perfect push; you rehearse a believable return to the page, using the cues already in front of you. When you are ready, you come back to action with a softer body and one doable next move.

## body script (173 words)

Feel your feet on the floor, your hands near the warm mug, and the quiet apartment hum around you. Your body is starting from limited rest today, with low current energy, so you arrive softly rather than forcing anything. Notice the coffee or water, the light, the paper draft open, and the phone face down.

Imagine the cursor waiting at the related work section, with the anchor papers beside the keyboard. With this smaller, steady energy, you enter the task one clear pass at a time: reading what is already there, finding the next sentence, letting the section begin to move. What does it feel like when the draft becomes just a little more coherent under your hands?

Let the image settle: feet grounded, shoulders easier, attention clearer than when you began. You do not need a perfect push; you rehearse a believable return to the page, using the cues already in front of you. When you are ready, you come back to action with a softer body and one doable next move.

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
Feel your breath arrive in your chest, and let your shoulders drop a little as your hands settle. Notice the contact under you, the air around you, and the simple fact that you are here. You are arriving into a life where you think and write on your own questions, trusting your own questions before borrowing other people’s.

### Task visualization
Now picture the task in front of you as a clear space for independent thinking. Since the exact task is not named here, imagine the first useful movement: your attention gathering, your mind becoming mentally clear, self-trusting, and unboxed. What does it feel like when the work begins to move because you are making your own decisions faster? Let the scene continue until there is visible progress, something that feels focused, competent, and like finishing what matters.

### Ending
Let that image settle into your body: you can be curious, supported, and still trust your own direction. Today’s next action does not have to prove everything; it can simply move you toward deep work, independent research, and a life shaped by your own questions. Take one steadier breath, and return ready to begin.

## soul script (189 words)

Feel your breath arrive in your chest, and let your shoulders drop a little as your hands settle. Notice the contact under you, the air around you, and the simple fact that you are here. You are arriving into a life where you think and write on your own questions, trusting your own questions before borrowing other people’s.

Now picture the task in front of you as a clear space for independent thinking. Since the exact task is not named here, imagine the first useful movement: your attention gathering, your mind becoming mentally clear, self-trusting, and unboxed. What does it feel like when the work begins to move because you are making your own decisions faster? Let the scene continue until there is visible progress, something that feels focused, competent, and like finishing what matters.

Let that image settle into your body: you can be curious, supported, and still trust your own direction. Today’s next action does not have to prove everything; it can simply move you toward deep work, independent research, and a life shaped by your own questions. Take one steadier breath, and return ready to begin.

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
      "sleep_summary": "5.5 hours slept; sleep quality 68/100",
      "recovery_summary": "resting heart rate 73 bpm; HRV 29 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.5,
        "sleep_quality": 68,
        "resting_heart_rate": 73,
        "hrv_ms": 29
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your feet on the floor, your hands close to the warm mug, and your shoulders settling as the quiet apartment hum holds the room. You are a little under-rested, so your energy arrives gently rather than forcefully, with the paper draft open, anchor papers beside the keyboard, and the phone face down. Let this be room to think: trusting your own questions before borrowing other people's.

### Task visualization
See yourself beginning the 90-minute related work draft in a softer, focused way, with the cursor waiting at the related work section. First, you re-read the three anchor papers' findings sections, noticing what matters and letting one clear thread come forward. Then the gap statement begins to take shape, not perfect, but specific enough for your advisor to react to; what does it feel like when the paragraph starts sounding like your own judgment? You connect the related work back to that gap, leaving visible progress and a section that carries the CHI workshop paper forward.

### Ending
Let your body register that movement: steadier breath, clearer attention, a little more competence than when you began. This task is one real step toward submitting a strong workshop paper by the end of June, and toward a life where you think and write on your own questions. You return to the draft with enough trust to take the next doable action.

## full script (225 words)

Feel your feet on the floor, your hands close to the warm mug, and your shoulders settling as the quiet apartment hum holds the room. You are a little under-rested, so your energy arrives gently rather than forcefully, with the paper draft open, anchor papers beside the keyboard, and the phone face down. Let this be room to think: trusting your own questions before borrowing other people's.

See yourself beginning the 90-minute related work draft in a softer, focused way, with the cursor waiting at the related work section. First, you re-read the three anchor papers' findings sections, noticing what matters and letting one clear thread come forward. Then the gap statement begins to take shape, not perfect, but specific enough for your advisor to react to; what does it feel like when the paragraph starts sounding like your own judgment? You connect the related work back to that gap, leaving visible progress and a section that carries the CHI workshop paper forward.

Let your body register that movement: steadier breath, clearer attention, a little more competence than when you began. This task is one real step toward submitting a strong workshop paper by the end of June, and toward a life where you think and write on your own questions. You return to the draft with enough trust to take the next doable action.

# jonah_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":196,"mind":200,"body":202,"soul":197,"full":216}

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


## baseline script (196 words)

Take a few moments to review the day’s visible schedule as a simple sequence of planned activities. The first scheduled item is inbox triage from 08:45 to 09:05, with 20 minutes set aside to sort and respond as needed. After a short gap, the next block is from 09:30 to 10:30 for finalizing the launch risk brief. This is followed by a 15-minute engineering check-in from 10:40 to 10:55.

The late morning continues with review of support escalation notes from 11:00 to 11:30. After that, there is a lunch break from 12:15 to 12:45. The afternoon begins with a stakeholder sync from 13:00 to 13:30. Later, from 14:10 to 14:30, there is time to draft the meeting opening. The final listed item is the launch review meeting from 15:00 to 16:00.

As you prepare, simply note the start and end times, the duration of each item, and the transitions between them. Keep the calendar available so you can refer to it during the day. When one block ends, allow yourself to close it out and move to the next scheduled item. The aim is to follow the visible plan steadily, one calendar entry at a time.

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
Feel your breath arrive first, then the contact of your feet and the support beneath you. Let your shoulders drop a little, your jaw soften, and your attention gather around the intention to lead with clarity. Today, you are arriving into product work that moves the team forward without becoming reactive.

### Task visualization
Picture the first clear block: sixty minutes with the launch risk brief in front of you, and the day beginning to organize around it. You name the unresolved risks, see owners and decision points taking shape, and sense the brief becoming meeting-ready before the review. Later, you move through the twenty-minute draft of the meeting opening, then the thirty minutes with support escalation notes, letting each piece sharpen the conversation at 3:00. What does it feel like when the review has a clear opening, visible risks, and enough structure for the team to decide?

### Ending
Let the image settle: the brief is ready, the opening is clear, and the launch review has something solid to stand on. You do not have to control the whole day; you return to the next doable action that helps clarity become real. Take one steady breath, and feel yourself ready to begin from there.

## mind script (200 words)

Feel your breath arrive first, then the contact of your feet and the support beneath you. Let your shoulders drop a little, your jaw soften, and your attention gather around the intention to lead with clarity. Today, you are arriving into product work that moves the team forward without becoming reactive.

Picture the first clear block: sixty minutes with the launch risk brief in front of you, and the day beginning to organize around it. You name the unresolved risks, see owners and decision points taking shape, and sense the brief becoming meeting-ready before the review. Later, you move through the twenty-minute draft of the meeting opening, then the thirty minutes with support escalation notes, letting each piece sharpen the conversation at 3:00. What does it feel like when the review has a clear opening, visible risks, and enough structure for the team to decide?

Let the image settle: the brief is ready, the opening is clear, and the launch review has something solid to stand on. You do not have to control the whole day; you return to the next doable action that helps clarity become real. Take one steady breath, and feel yourself ready to begin from there.

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
      "sleep_summary": "7.1 hours slept; sleep quality 82/100",
      "activity_summary": "2300 steps; 18 active minutes",
      "recovery_summary": "resting heart rate 62 bpm; HRV 48 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.1,
        "sleep_quality": 82,
        "steps": 2300,
        "active_minutes": 18,
        "resting_heart_rate": 62,
        "hrv_ms": 48
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your hands resting near the keyboard, your feet supported, and the air around your shoulders and jaw. You have slept enough to meet the day with moderate steadiness: not forced, not rushed, just available. Notice the coffee, the water bottle beside the laptop, and the quiet of muted alerts as your attention gathers.

### Task visualization
Now picture the work area already prepared: launch dashboard pinned, stakeholder notes open, risk doc in split view, Slack set to focus mode. Without needing the whole day at once, you move through the next important anchors one at a time, letting each begin with a clear first glance and a steady breath. What does it feel like when the first piece starts to move under your hands? As energy softens later, you keep the success case simple and credible: focused minutes, clean transitions, and enough forward motion to carry the day.

### Ending
Let your body register that this is a workable shape for today: hands ready, attention protected, pace honest. You are not proving anything; you are returning to the next doable action with a little more steadiness. Take one breath, feel the chair or floor holding you, and let the imagined completion become the way you begin.

## body script (202 words)

Feel your hands resting near the keyboard, your feet supported, and the air around your shoulders and jaw. You have slept enough to meet the day with moderate steadiness: not forced, not rushed, just available. Notice the coffee, the water bottle beside the laptop, and the quiet of muted alerts as your attention gathers.

Now picture the work area already prepared: launch dashboard pinned, stakeholder notes open, risk doc in split view, Slack set to focus mode. Without needing the whole day at once, you move through the next important anchors one at a time, letting each begin with a clear first glance and a steady breath. What does it feel like when the first piece starts to move under your hands? As energy softens later, you keep the success case simple and credible: focused minutes, clean transitions, and enough forward motion to carry the day.

Let your body register that this is a workable shape for today: hands ready, attention protected, pace honest. You are not proving anything; you are returning to the next doable action with a little more steadiness. Take one breath, feel the chair or floor holding you, and let the imagined completion become the way you begin.

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
Feel your breath arrive, and let your posture settle into the chair or the floor beneath you. Notice your hands, your shoulders, your jaw, and the space around your face. Today, you orient toward Clarity, Responsibility, and Calm Leadership: making the next decision visible, owning the risk without carrying every task alone, and creating steadiness when the room gets noisy.

### Task visualization
Imagine the main anchors of your day coming into view, even without naming every detail yet. You begin by making priorities cleaner and fewer asks ambiguous; you sense the moment when the next decision becomes visible enough for the team to act. Where does your attention naturally land first when you are being organized, decisive, and uncluttered? Then you move through the day with a calm, firm, useful presence, naming risks clearly, identifying owners, and checking in from steadiness rather than urgency.

### Ending
Let the scene close with you a little clearer and more settled than when you began. You do not need to carry everything alone; you return to the next doable action with prepared, accountable calm. This is the shape of the work life you are practicing: helping teams make clear decisions without living in urgency.

## soul script (197 words)

Feel your breath arrive, and let your posture settle into the chair or the floor beneath you. Notice your hands, your shoulders, your jaw, and the space around your face. Today, you orient toward Clarity, Responsibility, and Calm Leadership: making the next decision visible, owning the risk without carrying every task alone, and creating steadiness when the room gets noisy.

Imagine the main anchors of your day coming into view, even without naming every detail yet. You begin by making priorities cleaner and fewer asks ambiguous; you sense the moment when the next decision becomes visible enough for the team to act. Where does your attention naturally land first when you are being organized, decisive, and uncluttered? Then you move through the day with a calm, firm, useful presence, naming risks clearly, identifying owners, and checking in from steadiness rather than urgency.

Let the scene close with you a little clearer and more settled than when you began. You do not need to carry everything alone; you return to the next doable action with prepared, accountable calm. This is the shape of the work life you are practicing: helping teams make clear decisions without living in urgency.

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
      "sleep_summary": "7.1 hours slept; sleep quality 82/100",
      "activity_summary": "2300 steps; 18 active minutes",
      "recovery_summary": "resting heart rate 62 bpm; HRV 48 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.1,
        "sleep_quality": 82,
        "steps": 2300,
        "active_minutes": 18,
        "resting_heart_rate": 62,
        "hrv_ms": 48
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your hands on the keyboard, your feet supported, and the quiet shape of the room around you. Your body has a solid base today: enough sleep, steady recovery, moderate energy, coffee nearby, water beside the laptop, low office noise, and calendar alerts muted. Let your shoulders soften as you arrive into Clarity and Responsibility: making the next decision visible enough for the team to act, without carrying every task alone.

### Task visualization
See the launch dashboard pinned, stakeholder notes open, and the risk doc in split view as you begin the 60-minute high-priority risk brief. You move at a steady pace, naming three to five unresolved risks, assigning owners and decision points, and feeling the brief become meeting-ready. Later, with softer afternoon energy, you review support escalation notes for 30 useful minutes, then draft the 20-minute meeting opening with a calm, firm voice; what does it feel like when the day starts to organize around cleaner priorities?

### Ending
Let the scene close with the launch review ahead and your opening already clear enough to steady the room. You are leading with clarity by taking the next doable action, not by forcing urgency. Feel your body a little more settled, prepared, and accountable, moving toward a work life where you help teams make clear decisions without living in urgency.

## full script (216 words)

Feel your hands on the keyboard, your feet supported, and the quiet shape of the room around you. Your body has a solid base today: enough sleep, steady recovery, moderate energy, coffee nearby, water beside the laptop, low office noise, and calendar alerts muted. Let your shoulders soften as you arrive into Clarity and Responsibility: making the next decision visible enough for the team to act, without carrying every task alone.

See the launch dashboard pinned, stakeholder notes open, and the risk doc in split view as you begin the 60-minute high-priority risk brief. You move at a steady pace, naming three to five unresolved risks, assigning owners and decision points, and feeling the brief become meeting-ready. Later, with softer afternoon energy, you review support escalation notes for 30 useful minutes, then draft the 20-minute meeting opening with a calm, firm voice; what does it feel like when the day starts to organize around cleaner priorities?

Let the scene close with the launch review ahead and your opening already clear enough to steady the room. You are leading with clarity by taking the next doable action, not by forcing urgency. Feel your body a little more settled, prepared, and accountable, moving toward a work life where you help teams make clear decisions without living in urgency.

# jonah_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":220,"mind":204,"body":207,"soul":153,"full":206}

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


## baseline script (220 words)

Take a moment to prepare for the launch risk brief by reviewing the three visible tasks and the time set aside for each one. The preparation is straightforward: move through the work in order, giving each part a clear 20-minute block.

Begin with “Name top risks.” In this section, focus on identifying the main risks that should be included in the brief. Keep the scope practical and connected to the launch. Aim to capture the risks clearly enough that they can be discussed without needing extra explanation later.

Next, move to “Assign owners.” For each risk that has been named, identify who should be responsible for tracking or addressing it. Keep the assignments simple and meeting-ready, so the group can quickly understand who is connected to which item.

Finally, use the last 20 minutes to “Write meeting-ready summary.” Turn the risks and owners into a concise summary that can be shared or discussed in the meeting. The goal is to make the brief clear, organized, and easy to follow.

Work steadily through each block, noticing when it is time to move from one task to the next. If a detail is not complete, mark it simply and continue. The purpose is to leave the preparation session with a usable launch risk brief that covers the top risks, owners, and summary.

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
Feel your breath arrive first, and let your posture settle into the support under you. Notice your hands, your shoulders, your jaw, and the space around your eyes as you arrive in this next hour. You are preparing to lead with clarity, choosing the kind of attention that helps the team move forward without becoming reactive.

### Task visualization
Now picture the task in front of you: Finalize launch risk brief, one focused hour for the Feature launch review. In the first stretch, you name the top unresolved launch risks, three to five that become clear enough to see and discuss. In the next stretch, you assign owners and decision points, feeling the brief become more useful because each risk has a next place to go. Then you write the meeting-ready summary; what does it feel like when the opening is simple, responsible, and ready to be shared?

### Ending
Let the scene close with the risk brief ready before the review, not perfect beyond measure, but clear enough to guide the meeting. Feel your attention return to your body, a little steadier and more directed. The larger goal is reachable through this next doable action: one brief, one review, one clear step that helps the team move forward.

## mind script (204 words)

Feel your breath arrive first, and let your posture settle into the support under you. Notice your hands, your shoulders, your jaw, and the space around your eyes as you arrive in this next hour. You are preparing to lead with clarity, choosing the kind of attention that helps the team move forward without becoming reactive.

Now picture the task in front of you: Finalize launch risk brief, one focused hour for the Feature launch review. In the first stretch, you name the top unresolved launch risks, three to five that become clear enough to see and discuss. In the next stretch, you assign owners and decision points, feeling the brief become more useful because each risk has a next place to go. Then you write the meeting-ready summary; what does it feel like when the opening is simple, responsible, and ready to be shared?

Let the scene close with the risk brief ready before the review, not perfect beyond measure, but clear enough to guide the meeting. Feel your attention return to your body, a little steadier and more directed. The larger goal is reachable through this next doable action: one brief, one review, one clear step that helps the team move forward.

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
      "sleep_summary": "7.1 hours slept; sleep quality 82/100",
      "recovery_summary": "resting heart rate 62 bpm; HRV 48 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.1,
        "sleep_quality": 82,
        "resting_heart_rate": 62,
        "hrv_ms": 48
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your hands near the laptop on the conference table, your feet steady, and the water bottle nearby. You arrive with solid, usable energy: rested enough from 7.1 hours of sleep, with your system feeling mostly recovered and ready for focused work. Let the quiet meeting room, paused notifications, and the taste of coffee mark this as a clear starting place.

### Task visualization
See the risk brief outline open, the dashboard tab pinned, and the owner list beside the doc. Without needing to force anything, you begin with the next visible piece of the task and let your attention settle into the materials already in front of you. What is the first part that starts to become clearer as you look from the outline to the dashboard to the owners? Your energy stays steady enough for a credible pass: calm, direct, and focused on moving the task forward.

### Ending
Let the meeting invite stay minimized as you feel the work taking shape in front of you. Your body is a little steadier now, your attention a little clearer, and the next action feels close enough to take. You do not need the whole task to be perfect in your mind; you have already rehearsed beginning well and carrying it forward.

## body script (207 words)

Feel your hands near the laptop on the conference table, your feet steady, and the water bottle nearby. You arrive with solid, usable energy: rested enough from 7.1 hours of sleep, with your system feeling mostly recovered and ready for focused work. Let the quiet meeting room, paused notifications, and the taste of coffee mark this as a clear starting place.

See the risk brief outline open, the dashboard tab pinned, and the owner list beside the doc. Without needing to force anything, you begin with the next visible piece of the task and let your attention settle into the materials already in front of you. What is the first part that starts to become clearer as you look from the outline to the dashboard to the owners? Your energy stays steady enough for a credible pass: calm, direct, and focused on moving the task forward.

Let the meeting invite stay minimized as you feel the work taking shape in front of you. Your body is a little steadier now, your attention a little clearer, and the next action feels close enough to take. You do not need the whole task to be perfect in your mind; you have already rehearsed beginning well and carrying it forward.

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
Feel your breath arrive, and let your shoulders, hands, and jaw soften just enough to begin. Notice the contact beneath you, the light around you, and the small space between this moment and the work ahead. You are arriving with Clarity, Responsibility, and Calm Leadership: organized, steady, and useful.

### Task visualization
Imagine the specific task in front of you beginning to take shape, even without forcing every detail at once. You make the next decision visible enough for the team to act, and the scene becomes a little more uncluttered. What does it feel like when priorities are cleaner, risks are named clearly, and ownership is shared instead of carried alone?

### Ending
Let the rehearsal close with the sense of being calm, firm, and prepared. You are practicing a work life where you help teams make clear decisions without living in urgency. From here, the next doable action is enough to move you toward steadier leadership.

## soul script (153 words)

Feel your breath arrive, and let your shoulders, hands, and jaw soften just enough to begin. Notice the contact beneath you, the light around you, and the small space between this moment and the work ahead. You are arriving with Clarity, Responsibility, and Calm Leadership: organized, steady, and useful.

Imagine the specific task in front of you beginning to take shape, even without forcing every detail at once. You make the next decision visible enough for the team to act, and the scene becomes a little more uncluttered. What does it feel like when priorities are cleaner, risks are named clearly, and ownership is shared instead of carried alone?

Let the rehearsal close with the sense of being calm, firm, and prepared. You are practicing a work life where you help teams make clear decisions without living in urgency. From here, the next doable action is enough to move you toward steadier leadership.

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
      "sleep_summary": "7.1 hours slept; sleep quality 82/100",
      "recovery_summary": "resting heart rate 62 bpm; HRV 48 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.1,
        "sleep_quality": 82,
        "resting_heart_rate": 62,
        "hrv_ms": 48
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your hands near the laptop, your feet supported, and the quiet around you as notifications stay paused. Your body has enough rest behind it, not limitless energy, but steady enough for one clear hour. Let the risk brief outline, the pinned dashboard, the owner list, the coffee, and the water bottle become cues for Clarity: making the next decision visible enough for the team to act.

### Task visualization
See yourself entering the first twenty minutes and naming the top unresolved launch risks, letting the page become more organized and uncluttered. Then you move into owners and decision points, one risk at a time, owning the risk without carrying every task alone; what does it look like when the next decision is obvious? In the final twenty minutes, you write the meeting-ready summary with a calm, firm opening, and the brief begins to feel ready before the review.

### Ending
Let your shoulders soften as you picture the document complete enough to help the team move forward. This is calm leadership in action: prepared, steady, useful, and less reactive. You return to the next doable action with grounded belief that a clear risk brief today supports a work life where you help teams make clear decisions without living in urgency.

## full script (206 words)

Feel your hands near the laptop, your feet supported, and the quiet around you as notifications stay paused. Your body has enough rest behind it, not limitless energy, but steady enough for one clear hour. Let the risk brief outline, the pinned dashboard, the owner list, the coffee, and the water bottle become cues for Clarity: making the next decision visible enough for the team to act.

See yourself entering the first twenty minutes and naming the top unresolved launch risks, letting the page become more organized and uncluttered. Then you move into owners and decision points, one risk at a time, owning the risk without carrying every task alone; what does it look like when the next decision is obvious? In the final twenty minutes, you write the meeting-ready summary with a calm, firm opening, and the brief begins to feel ready before the review.

Let your shoulders soften as you picture the document complete enough to help the team move forward. This is calm leadership in action: prepared, steady, useful, and less reactive. You return to the next doable action with grounded belief that a clear risk brief today supports a work life where you help teams make clear decisions without living in urgency.

# priya_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":203,"mind":210,"body":197,"soul":184,"full":196}

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


## baseline script (203 words)

Today’s schedule can be approached one item at a time, using the listed times and durations as a simple guide. Begin by noting the 07:35–08:05 commute to campus and allow that first transition to set up the rest of the morning. After arriving, the 08:15–09:00 block is for reviewing cardiac medication flashcards. Keep attention on that task during its allotted 45 minutes, then shift to the next scheduled item.

From 09:15–10:05, attend the pharmacology lecture and follow along with the material for the full session. Afterward, use the 10:20–10:55 block to complete the clinical reflection note. Treat this as a separate task with a clear start and finish.

The 11:45–12:15 lunch and reset period is a scheduled break in the day. Use it to pause from the morning tasks before moving into the afternoon. At 12:30–12:45, pack materials for afternoon class, checking that the needed items are ready.

The 13:00–14:00 exam review group is the main scheduled activity after that. Attend to the group session and keep track of any relevant review points. Later, from 15:30–15:45, complete the clinical check-in message. Move through the day by following each visible calendar item in order, adjusting only as needed while staying oriented to the schedule.

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
Feel your breath arrive first, and let your posture settle into the chair or the floor beneath you. Your hands soften, your shoulders lower, and your attention gathers around the kind of nurse you are becoming: present under pressure, learning from practice, offering steady care. Today, you arrive into one clear path toward calm clinical judgment.

### Task visualization
Picture the morning opening with your commute to campus, then the 45-minute space for reviewing cardiac medication flashcards. You move through one focused medication set with steady attention, letting the cards become familiar enough to carry into lecture and Friday’s exam. After pharmacology lecture, you enter the 35-minute clinical reflection note and feel the moment when the note starts to take shape; what does it look like when your thinking becomes clearer on the page? Later, the 15-minute packing task is simple and complete, your afternoon class materials ready before you move on to review group and the rest of the day.

### Ending
Let the day close around these three completed anchors: flashcards reviewed, reflection note completed, materials ready. You are not proving everything at once; you are practicing the next doable form of calm clinical judgment. Take one more breath, feel yourself a little more ready, and return to action from that steadier place.

## mind script (210 words)

Feel your breath arrive first, and let your posture settle into the chair or the floor beneath you. Your hands soften, your shoulders lower, and your attention gathers around the kind of nurse you are becoming: present under pressure, learning from practice, offering steady care. Today, you arrive into one clear path toward calm clinical judgment.

Picture the morning opening with your commute to campus, then the 45-minute space for reviewing cardiac medication flashcards. You move through one focused medication set with steady attention, letting the cards become familiar enough to carry into lecture and Friday’s exam. After pharmacology lecture, you enter the 35-minute clinical reflection note and feel the moment when the note starts to take shape; what does it look like when your thinking becomes clearer on the page? Later, the 15-minute packing task is simple and complete, your afternoon class materials ready before you move on to review group and the rest of the day.

Let the day close around these three completed anchors: flashcards reviewed, reflection note completed, materials ready. You are not proving everything at once; you are practicing the next doable form of calm clinical judgment. Take one more breath, feel yourself a little more ready, and return to action from that steadier place.

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
      "sleep_summary": "6.0 hours slept; sleep quality 72/100",
      "activity_summary": "6800 steps; 12 active minutes",
      "recovery_summary": "resting heart rate 70 bpm; HRV 35 ms",
      "energy_curve_inputs": {
        "sleep_hours": 6,
        "sleep_quality": 72,
        "steps": 6800,
        "active_minutes": 12,
        "resting_heart_rate": 70,
        "hrv_ms": 35
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your feet heavy on the floor, and let the chair hold some of today for you. You notice the quiet kitchen, the tea nearby, the water bottle within reach, and your phone already on silent. With six hours of sleep and a current energy of four, you arrive honestly: not forcing brightness, just gathering enough steadiness for the next useful stretch.

### Task visualization
In front of you, imagine the flashcards stacked by topic, the scrubs folded on the chair, and the timer set for study intervals. Since the day’s specific priorities are not here, let this be a soft success case: you begin with the first clear anchor, let the timer chime guide your attention, and feel one small section start to move. What does it feel like when your pace matches your real energy, and you still carry the day forward?

### Ending
Let the scene close with you a little clearer than when you began: shoulders softer, jaw easier, breath more even. You do not need to prove the whole day at once; you only return to the next visible cue, the next interval, the next grounded action. From this honestly paced place, you are ready to begin.

## body script (197 words)

Feel your feet heavy on the floor, and let the chair hold some of today for you. You notice the quiet kitchen, the tea nearby, the water bottle within reach, and your phone already on silent. With six hours of sleep and a current energy of four, you arrive honestly: not forcing brightness, just gathering enough steadiness for the next useful stretch.

In front of you, imagine the flashcards stacked by topic, the scrubs folded on the chair, and the timer set for study intervals. Since the day’s specific priorities are not here, let this be a soft success case: you begin with the first clear anchor, let the timer chime guide your attention, and feel one small section start to move. What does it feel like when your pace matches your real energy, and you still carry the day forward?

Let the scene close with you a little clearer than when you began: shoulders softer, jaw easier, breath more even. You do not need to prove the whole day at once; you only return to the next visible cue, the next interval, the next grounded action. From this honestly paced place, you are ready to begin.

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
Feel your breath arrive, and let your posture settle into the support beneath you. Let your hands soften, your shoulders drop a little, and your jaw loosen as you come into the day. You are arriving with Care, Competence, and Learning: grounded, kind, present, ready, capable, steady, open, brave, and curious.

### Task visualization
Since the exact shape of today is not in front of you here, imagine the next important anchors of your day as simple scenes of practice and presence. In each one, you slow down enough to notice, check understanding, and let one concept or sequence become more trustworthy. What does it feel like to stay attentive to the person or task in front of you, while still leaving room to ask one good question?

### Ending
Let the day close in your mind with a quiet sense of skilled care becoming more real through small actions. You do not need to force confidence; you picture it building as you practice, notice, and review what changes. Return to action with steady presence, moving toward a life where you can offer skilled care while continuing to learn.

## soul script (184 words)

Feel your breath arrive, and let your posture settle into the support beneath you. Let your hands soften, your shoulders drop a little, and your jaw loosen as you come into the day. You are arriving with Care, Competence, and Learning: grounded, kind, present, ready, capable, steady, open, brave, and curious.

Since the exact shape of today is not in front of you here, imagine the next important anchors of your day as simple scenes of practice and presence. In each one, you slow down enough to notice, check understanding, and let one concept or sequence become more trustworthy. What does it feel like to stay attentive to the person or task in front of you, while still leaving room to ask one good question?

Let the day close in your mind with a quiet sense of skilled care becoming more real through small actions. You do not need to force confidence; you picture it building as you practice, notice, and review what changes. Return to action with steady presence, moving toward a life where you can offer skilled care while continuing to learn.

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
      "sleep_summary": "6.0 hours slept; sleep quality 72/100",
      "activity_summary": "6800 steps; 12 active minutes",
      "recovery_summary": "resting heart rate 70 bpm; HRV 35 ms",
      "energy_curve_inputs": {
        "sleep_hours": 6,
        "sleep_quality": 72,
        "steps": 6800,
        "active_minutes": 12,
        "resting_heart_rate": 70,
        "hrv_ms": 35
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your feet heavy on the floor, your shoulders softening, your jaw unclenching as the quiet kitchen holds you. You notice the tea, the water bottle nearby, the phone on silent, and your energy as honest and workable after six hours of sleep. Let your body arrive into Care, Competence, and Learning: grounded, present, and steadily building skills you can trust under pressure.

### Task visualization
See the flashcards stacked by topic, and imagine the first 45-minute study block beginning with the timer set and your attention settling on one cardiac medication set. What does it feel like when one concept becomes clearer and your clinical judgment gets a little calmer? Later, you move into the 35-minute clinical reflection note, present enough to notice what mattered, then you close the short 15-minute packing task by seeing the afternoon materials ready on the chair.

### Ending
Let the day feel carried forward by these three completed anchors: the flashcards reviewed, the reflection note finished, the materials ready. Your body can stay honestly paced and still become clearer, steadier, more ready. This is the shape of a life where you offer skilled care while continuing to learn, one doable action at a time.

## full script (196 words)

Feel your feet heavy on the floor, your shoulders softening, your jaw unclenching as the quiet kitchen holds you. You notice the tea, the water bottle nearby, the phone on silent, and your energy as honest and workable after six hours of sleep. Let your body arrive into Care, Competence, and Learning: grounded, present, and steadily building skills you can trust under pressure.

See the flashcards stacked by topic, and imagine the first 45-minute study block beginning with the timer set and your attention settling on one cardiac medication set. What does it feel like when one concept becomes clearer and your clinical judgment gets a little calmer? Later, you move into the 35-minute clinical reflection note, present enough to notice what mattered, then you close the short 15-minute packing task by seeing the afternoon materials ready on the chair.

Let the day feel carried forward by these three completed anchors: the flashcards reviewed, the reflection note finished, the materials ready. Your body can stay honestly paced and still become clearer, steadier, more ready. This is the shape of a life where you offer skilled care while continuing to learn, one doable action at a time.

# priya_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":215,"mind":191,"body":203,"soul":176,"full":226}

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


## baseline script (215 words)

Take a moment to prepare for the simulation assessment practice by focusing on the three visible tasks in the plan. The aim is simply to move through the preparation in an organized way, using the time set aside for each item.

Begin with the safety checks for 10 minutes. Review the relevant checks in a steady, practical manner. Keep attention on what needs to be confirmed, named, or noticed. If anything seems unclear, mark it as something to revisit rather than stopping the whole preparation process.

Next, spend 20 minutes walking through the sequence aloud. Move through the steps in order, speaking them clearly and at a comfortable pace. This is a chance to become familiar with the flow of the sequence and to notice any points where the wording or order may need a little more attention. If you lose your place, return to the last clear step and continue.

Finally, use 10 minutes to mark one instructor question. Choose one question from the preparation material and note it clearly. Keep the focus on identifying the question and making it easy to find or raise later.

Proceed through the tasks one at a time. Use the listed times as a simple guide, and let the preparation end when the three items have been completed.

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
Feel your breath come in, and let your posture settle into the support beneath you. Notice your hands, your shoulders, your jaw, and let this be the moment you arrive for one clear practice sequence. You are preparing to enter simulation lab ready enough to learn, and to build calm clinical judgment one grounded step at a time.

### Task visualization
Now picture yourself beginning Practice assessment sequence, a focused forty-minute block for simulation lab preparation. First, you review the opening patient safety checks for about ten minutes, seeing the checklist become familiar and steady. Then you walk through the assessment sequence aloud for the longer middle stretch, hearing your own voice carry the order forward; what does it feel like when the sequence starts to make sense in your body? Finally, you mark one question to ask your instructor, turning the practice into learning you can bring with you.

### Ending
Let the scene close with you having completed one full walk-through before lab today. You are not needing perfection; you are entering prepared enough to learn from mistakes and offer steadier care. Take one more breath, and feel the next doable action within reach.

## mind script (191 words)

Feel your breath come in, and let your posture settle into the support beneath you. Notice your hands, your shoulders, your jaw, and let this be the moment you arrive for one clear practice sequence. You are preparing to enter simulation lab ready enough to learn, and to build calm clinical judgment one grounded step at a time.

Now picture yourself beginning Practice assessment sequence, a focused forty-minute block for simulation lab preparation. First, you review the opening patient safety checks for about ten minutes, seeing the checklist become familiar and steady. Then you walk through the assessment sequence aloud for the longer middle stretch, hearing your own voice carry the order forward; what does it feel like when the sequence starts to make sense in your body? Finally, you mark one question to ask your instructor, turning the practice into learning you can bring with you.

Let the scene close with you having completed one full walk-through before lab today. You are not needing perfection; you are entering prepared enough to learn from mistakes and offer steadier care. Take one more breath, and feel the next doable action within reach.

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
      "sleep_summary": "6.7 hours slept; sleep quality 76/100",
      "recovery_summary": "resting heart rate 68 bpm; HRV 38 ms",
      "energy_curve_inputs": {
        "sleep_hours": 6.7,
        "sleep_quality": 76,
        "resting_heart_rate": 68,
        "hrv_ms": 38
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your hands around the water bottle, your shoulders noticing their slight tension, and your breath making a little more room. You are arriving with medium energy today, supported by a decent night of sleep and a body that can work steadily. Let the sight of the printed skills checklist, highlighted simulation notes, and stethoscope in your bag tell your body: this is the scene you are stepping into.

### Task visualization
Imagine the task in front of you beginning softly, without rushing. Campus hallway noise is around you, your phone timer is ready, and the pinned message from your study partner helps you feel oriented. With energy that rises into the morning and settles later, you move through this practice at an honest pace: one focused pass, one clear cue, one skill becoming more familiar. What does it feel like when your attention catches and the work starts to move?

### Ending
Let the rehearsal close with your shoulders a little lower and your grip a little easier. You have pictured yourself entering the task, using the cues already around you, and carrying it forward with steady effort. Take one breath as if you are returning to action now, clearer and ready enough for the next step.

## body script (203 words)

Feel your hands around the water bottle, your shoulders noticing their slight tension, and your breath making a little more room. You are arriving with medium energy today, supported by a decent night of sleep and a body that can work steadily. Let the sight of the printed skills checklist, highlighted simulation notes, and stethoscope in your bag tell your body: this is the scene you are stepping into.

Imagine the task in front of you beginning softly, without rushing. Campus hallway noise is around you, your phone timer is ready, and the pinned message from your study partner helps you feel oriented. With energy that rises into the morning and settles later, you move through this practice at an honest pace: one focused pass, one clear cue, one skill becoming more familiar. What does it feel like when your attention catches and the work starts to move?

Let the rehearsal close with your shoulders a little lower and your grip a little easier. You have pictured yourself entering the task, using the cues already around you, and carrying it forward with steady effort. Take one breath as if you are returning to action now, clearer and ready enough for the next step.

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
Feel your breath arrive in your body, and let your posture settle into the support beneath you. Notice your hands, your shoulders, your jaw, and the space around you, without needing to change anything quickly. As you arrive, let Care mean staying attentive to the person in front of you, with a grounded, kind, present quality.

### Task visualization
Imagine beginning the task in a steady way, even without needing to see every detail yet. You move with Competence as building skills you can trust under pressure: one sequence practiced, one concept becoming clearer, your attention returning to what matters. What does it feel like to be ready, capable, and still open enough to learn as the work starts to move?

### Ending
Let the scene close with the sense of having practiced presence, skill, and curiosity today. You are moving toward a life where you can offer skilled care while continuing to learn, not all at once, but through this next doable action. Feel yourself a little steadier now, able to return with care, competence, and learning in your body.

## soul script (176 words)

Feel your breath arrive in your body, and let your posture settle into the support beneath you. Notice your hands, your shoulders, your jaw, and the space around you, without needing to change anything quickly. As you arrive, let Care mean staying attentive to the person in front of you, with a grounded, kind, present quality.

Imagine beginning the task in a steady way, even without needing to see every detail yet. You move with Competence as building skills you can trust under pressure: one sequence practiced, one concept becoming clearer, your attention returning to what matters. What does it feel like to be ready, capable, and still open enough to learn as the work starts to move?

Let the scene close with the sense of having practiced presence, skill, and curiosity today. You are moving toward a life where you can offer skilled care while continuing to learn, not all at once, but through this next doable action. Feel yourself a little steadier now, able to return with care, competence, and learning in your body.

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
      "sleep_summary": "6.7 hours slept; sleep quality 76/100",
      "recovery_summary": "resting heart rate 68 bpm; HRV 38 ms",
      "energy_curve_inputs": {
        "sleep_hours": 6.7,
        "sleep_quality": 76,
        "resting_heart_rate": 68,
        "hrv_ms": 38
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your hands around the water bottle, your shoulders a little tense, and let one slow breath make a bit more room in your jaw and chest. You are working with moderate energy today, rested enough to show up and honest enough to move steadily. The printed skills checklist, highlighted notes, stethoscope in your bag, and campus sounds all remind you: this is Care, Competence, and Learning in practice.

### Task visualization
Now imagine the 40 minutes of Practice assessment sequence beginning. First, you spend about 10 minutes with the opening patient safety checks, seeing the checklist and feeling your attention slow down enough to notice. Then your phone timer holds the space as you walk through the assessment sequence aloud for about 20 minutes; what does your voice sound like when you are steady and present? In the final 10 minutes, you mark one clear question to ask your instructor, a brave and curious sign that practice and mistakes can become information.

### Ending
Let the scene close with the study partner message still pinned, the notes gathered, and your body a little clearer than when you began. You are building skills you can trust under pressure, one complete walk-through at a time. As you return to action, carry the simple belief that you can enter simulation lab prepared enough to learn and offer skilled care while continuing to learn.

## full script (226 words)

Feel your hands around the water bottle, your shoulders a little tense, and let one slow breath make a bit more room in your jaw and chest. You are working with moderate energy today, rested enough to show up and honest enough to move steadily. The printed skills checklist, highlighted notes, stethoscope in your bag, and campus sounds all remind you: this is Care, Competence, and Learning in practice.

Now imagine the 40 minutes of Practice assessment sequence beginning. First, you spend about 10 minutes with the opening patient safety checks, seeing the checklist and feeling your attention slow down enough to notice. Then your phone timer holds the space as you walk through the assessment sequence aloud for about 20 minutes; what does your voice sound like when you are steady and present? In the final 10 minutes, you mark one clear question to ask your instructor, a brave and curious sign that practice and mistakes can become information.

Let the scene close with the study partner message still pinned, the notes gathered, and your body a little clearer than when you began. You are building skills you can trust under pressure, one complete walk-through at a time. As you return to action, carry the simple belief that you can enter simulation lab prepared enough to learn and offer skilled care while continuing to learn.

# alex_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":212,"mind":188,"body":201,"soul":185,"full":225}

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


## baseline script (212 words)

Today’s schedule includes several work blocks and a lunch break, each with a specific start time and duration. Begin by looking over the full calendar so the sequence of items is clear. The day starts at 08:30 with 20 minutes for client inbox and file check. At 09:00, there is an 80-minute block to build the pitch deck narrative. At 10:30, 20 minutes are set aside to review client assets, followed by 35 minutes at 11:00 to export client-ready mockups.

After the morning tasks, there is a 30-minute lunch break from 12:20 to 12:50. In the afternoon, prepare client call notes from 13:30 to 14:00. Later, at 14:40, spend 10 minutes sending the invoice reminder. The final scheduled item is the client call from 16:00 to 16:45.

Before starting, make sure any needed files, tools, notes, or calendar reminders are accessible. Move through the schedule one item at a time, using the listed time blocks as a guide. When a task ends, transition to the next scheduled item by checking what is coming up and opening the relevant materials. If there is time between items, use it to reset the workspace, save progress, or prepare for the next block. Follow the visible schedule as written and keep attention on the current task.

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
Feel your breath arrive, and let your posture settle into the chair or the floor beneath you. You are here with a clear creative aim: building an independent practice that can hold originality, reliable client work, and financial steadiness. Let the day come into view gently, with the client-ready deck as the main thread before the 4:00 PM call.

### Task visualization
See yourself beginning with the 80-minute stretch of building the pitch deck narrative, choosing one strong story arc and letting the deck find its shape. What does it feel like when the first clear sequence starts to move? Later, you export the client-ready mockups in a focused 35-minute pass, and the work becomes something you can actually send; then the 10-minute invoice reminder is handled cleanly, a small steadying action before the client call.

### Ending
Let the imagined work leave a trace in your body: a little more settled, a little more ready. Today’s next doable action carries the larger practice forward, one client-ready deck, one clean export, one steady business follow-through at a time. You return to the day knowing you can begin, continue, and complete the next piece.

## mind script (188 words)

Feel your breath arrive, and let your posture settle into the chair or the floor beneath you. You are here with a clear creative aim: building an independent practice that can hold originality, reliable client work, and financial steadiness. Let the day come into view gently, with the client-ready deck as the main thread before the 4:00 PM call.

See yourself beginning with the 80-minute stretch of building the pitch deck narrative, choosing one strong story arc and letting the deck find its shape. What does it feel like when the first clear sequence starts to move? Later, you export the client-ready mockups in a focused 35-minute pass, and the work becomes something you can actually send; then the 10-minute invoice reminder is handled cleanly, a small steadying action before the client call.

Let the imagined work leave a trace in your body: a little more settled, a little more ready. Today’s next doable action carries the larger practice forward, one client-ready deck, one clean export, one steady business follow-through at a time. You return to the day knowing you can begin, continue, and complete the next piece.

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
      "sleep_summary": "7.6 hours slept; sleep quality 84/100",
      "activity_summary": "1800 steps; 10 active minutes",
      "recovery_summary": "resting heart rate 60 bpm; HRV 52 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.6,
        "sleep_quality": 84,
        "steps": 1800,
        "active_minutes": 10,
        "resting_heart_rate": 60,
        "hrv_ms": 52
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your feet tucked under the chair, your shoulders settling, your jaw softening. You arrive with a rested body, coffee nearby, steady energy available now, and the quiet support of a playlist ready when you want it. Let the moodboard wall, the open deck outline, the charged tablet, and the stylus in your hand tell your body: you are here, and you can begin.

### Task visualization
Picture yourself moving through today’s important work by following the cues already in front of you. The deck outline is open, the tablet responds under your hand, and the first pieces start to take shape with a steady, honest pace. As the day’s energy gently rises, then softens later, what does it feel like to keep choosing the next clear anchor without forcing? You notice the client call reminder, carry the work forward, and let each visible cue bring you back into the scene.

### Ending
Now sense the day closing with something real having moved. Your body feels clearer and more settled because you have already rehearsed returning to the work, using the tools, and following the cues. Take one breath as if the next doable action is close enough to reach, and let yourself come back ready.

## body script (201 words)

Feel your feet tucked under the chair, your shoulders settling, your jaw softening. You arrive with a rested body, coffee nearby, steady energy available now, and the quiet support of a playlist ready when you want it. Let the moodboard wall, the open deck outline, the charged tablet, and the stylus in your hand tell your body: you are here, and you can begin.

Picture yourself moving through today’s important work by following the cues already in front of you. The deck outline is open, the tablet responds under your hand, and the first pieces start to take shape with a steady, honest pace. As the day’s energy gently rises, then softens later, what does it feel like to keep choosing the next clear anchor without forcing? You notice the client call reminder, carry the work forward, and let each visible cue bring you back into the scene.

Now sense the day closing with something real having moved. Your body feels clearer and more settled because you have already rehearsed returning to the work, using the tools, and following the cues. Take one breath as if the next doable action is close enough to reach, and let yourself come back ready.

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
Feel your breath arrive in your body, and let your posture become a little easier. Notice the contact beneath you, the weight of your hands, the space around your shoulders and jaw. Today, you are arriving into what matters: work that feels unmistakably yours, delivered in a way that makes trust visible.

### Task visualization
Now imagine the shape of your day without needing every detail in advance. See yourself choosing one strong concept, letting fresh visual language come forward, and recognizing the moment the work starts to feel inventive, alive, and free. Where does the first small sign of originality show up? Then picture the practical close: clean files, clear expectations, one money or admin task no longer avoided, leaving your practice a little more independent and sustainable.

### Ending
Let the scene settle into your body as something believable, not forced. You can move through today by making one original choice, one reliable delivery move, and one freedom-supporting action. Feel yourself a little steadier, lighter, and more ready to return to the next doable step toward a life where creative work stays original and the studio stays sustainable.

## soul script (185 words)

Feel your breath arrive in your body, and let your posture become a little easier. Notice the contact beneath you, the weight of your hands, the space around your shoulders and jaw. Today, you are arriving into what matters: work that feels unmistakably yours, delivered in a way that makes trust visible.

Now imagine the shape of your day without needing every detail in advance. See yourself choosing one strong concept, letting fresh visual language come forward, and recognizing the moment the work starts to feel inventive, alive, and free. Where does the first small sign of originality show up? Then picture the practical close: clean files, clear expectations, one money or admin task no longer avoided, leaving your practice a little more independent and sustainable.

Let the scene settle into your body as something believable, not forced. You can move through today by making one original choice, one reliable delivery move, and one freedom-supporting action. Feel yourself a little steadier, lighter, and more ready to return to the next doable step toward a life where creative work stays original and the studio stays sustainable.

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
      "sleep_summary": "7.6 hours slept; sleep quality 84/100",
      "activity_summary": "1800 steps; 10 active minutes",
      "recovery_summary": "resting heart rate 60 bpm; HRV 52 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.6,
        "sleep_quality": 84,
        "steps": 1800,
        "active_minutes": 10,
        "resting_heart_rate": 60,
        "hrv_ms": 52
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your feet tucked under the chair, the stylus in your hand, and the air around your shoulders and jaw. You arrive with a rested, fairly steady body: good sleep behind you, current energy available, coffee nearby, the playlist ready, the moodboard wall visible, and the deck outline open. Let this be a morning for Originality and Reliability: making work that feels unmistakably yours, and making trust visible in how you deliver.

### Task visualization
Now imagine the first main stretch: Build pitch deck narrative, about eighty minutes of high-priority creative focus. What does it feel like when one strong concept choice starts to organize the whole deck? See yourself moving from the narrative into Export client-ready mockups, a shorter, cleaner thirty-five minute push where the files become solid, settled, and professional. Later, with the client call reminder visible and the day carrying forward, imagine the ten-minute invoice reminder done simply and clearly, one money task not avoided, supporting the freedom of an independent practice.

### Ending
Let the scene close with the client-ready deck moving toward the 4:00 PM call, and with your body a little steadier, clearer, and honestly paced. Today’s next doable actions support the larger practice you are building: original creative work, reliable client delivery, and financial steadiness. Let the final image be a sustainable studio day: creative work stays original, and the studio stays supported.

## full script (225 words)

Feel your feet tucked under the chair, the stylus in your hand, and the air around your shoulders and jaw. You arrive with a rested, fairly steady body: good sleep behind you, current energy available, coffee nearby, the playlist ready, the moodboard wall visible, and the deck outline open. Let this be a morning for Originality and Reliability: making work that feels unmistakably yours, and making trust visible in how you deliver.

Now imagine the first main stretch: Build pitch deck narrative, about eighty minutes of high-priority creative focus. What does it feel like when one strong concept choice starts to organize the whole deck? See yourself moving from the narrative into Export client-ready mockups, a shorter, cleaner thirty-five minute push where the files become solid, settled, and professional. Later, with the client call reminder visible and the day carrying forward, imagine the ten-minute invoice reminder done simply and clearly, one money task not avoided, supporting the freedom of an independent practice.

Let the scene close with the client-ready deck moving toward the 4:00 PM call, and with your body a little steadier, clearer, and honestly paced. Today’s next doable actions support the larger practice you are building: original creative work, reliable client delivery, and financial steadiness. Let the final image be a sustainable studio day: creative work stays original, and the studio stays supported.

# alex_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":218,"mind":176,"body":205,"soul":167,"full":193}

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


## baseline script (218 words)

Take a moment to prepare for the pitch deck narrative work in a simple, practical way. The session has three visible parts: choosing the core story arc, sequencing the concept slides, and writing transition notes. Keep the focus on moving through these tasks one at a time, using the time blocks as a guide.

Begin with the first 20 minutes for choosing the core story arc. Use this time to look at the main message the pitch deck needs to communicate and decide on a clear overall direction. The aim is not to make every detail perfect, but to settle on a workable narrative path that can support the rest of the deck.

Then move into 35 minutes for sequencing the concept slides. Arrange the slide ideas so they follow the chosen story arc in a clear order. Consider what needs to come first for context, what should build the main argument, and what should appear later to support the conclusion. Keep the sequence practical and easy to follow.

Use the final 25 minutes to write transition notes. These notes can briefly explain how one slide leads into the next and help smooth the flow between ideas. By the end, aim to have a coherent narrative structure, an ordered slide sequence, and basic transitions ready for further refinement.

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
Feel your breath arrive first, and let your posture settle into the chair or the floor beneath you. Notice your hands, your shoulders, your jaw, and the simple fact that you are here now. You are arriving into meaningful work: building an independent creative practice through one strong, client-ready pitch deck before the call.

### Task visualization
See yourself beginning the 80-minute focus task, Build pitch deck narrative, for the Client brand pitch. First, you choose the core story arc, letting one narrative direction become clear; what does the deck start to feel like when the main idea clicks into place? Then you sequence the strongest concept slides, sensing the flow become easier to follow, and you write transition notes that help you speak with steadiness in the client call.

### Ending
Let the scene land on completion: the narrative is built, the deck has shape, and your next action is visible. This is one concrete move toward originality, reliable client work, and financial steadiness. Take one more breath, feel yourself ready to return, and begin with the first doable step.

## mind script (176 words)

Feel your breath arrive first, and let your posture settle into the chair or the floor beneath you. Notice your hands, your shoulders, your jaw, and the simple fact that you are here now. You are arriving into meaningful work: building an independent creative practice through one strong, client-ready pitch deck before the call.

See yourself beginning the 80-minute focus task, Build pitch deck narrative, for the Client brand pitch. First, you choose the core story arc, letting one narrative direction become clear; what does the deck start to feel like when the main idea clicks into place? Then you sequence the strongest concept slides, sensing the flow become easier to follow, and you write transition notes that help you speak with steadiness in the client call.

Let the scene land on completion: the narrative is built, the deck has shape, and your next action is visible. This is one concrete move toward originality, reliable client work, and financial steadiness. Take one more breath, feel yourself ready to return, and begin with the first doable step.

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
      "sleep_summary": "7.6 hours slept; sleep quality 84/100",
      "recovery_summary": "resting heart rate 60 bpm; HRV 52 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.6,
        "sleep_quality": 84,
        "resting_heart_rate": 60,
        "hrv_ms": 52
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your hands settle around the stylus, your shoulders soften, and the chair or floor holding you steady. You arrive with a well-rested body: 7.6 hours of sleep, strong sleep quality, and enough energy to begin with clarity. Let the smell and taste of coffee, the ready playlist, and the warm tablet tell your nervous system: this is the place where focus starts.

### Task visualization
See the deck outline open in front of you, the three concept thumbnails visible, and the moodboard wall nearby. Because the exact task list is not here, let the success case be simple: you begin with the next visible creative move, you touch the stylus to the tablet, and the work starts to take shape. What does the first clean mark or decision feel like in your hand? Client notes stay minimized but available, supporting you without pulling you away, while your steady energy carries one focused pass forward.

### Ending
Let the scene end with the tablet still warm, the playlist moving, and one clear piece of progress made. Your body feels a little steadier and more ready because you have already pictured beginning well. From here, you return to the real task with enough energy, enough cues, and one believable next action.

## body script (205 words)

Feel your hands settle around the stylus, your shoulders soften, and the chair or floor holding you steady. You arrive with a well-rested body: 7.6 hours of sleep, strong sleep quality, and enough energy to begin with clarity. Let the smell and taste of coffee, the ready playlist, and the warm tablet tell your nervous system: this is the place where focus starts.

See the deck outline open in front of you, the three concept thumbnails visible, and the moodboard wall nearby. Because the exact task list is not here, let the success case be simple: you begin with the next visible creative move, you touch the stylus to the tablet, and the work starts to take shape. What does the first clean mark or decision feel like in your hand? Client notes stay minimized but available, supporting you without pulling you away, while your steady energy carries one focused pass forward.

Let the scene end with the tablet still warm, the playlist moving, and one clear piece of progress made. Your body feels a little steadier and more ready because you have already pictured beginning well. From here, you return to the real task with enough energy, enough cues, and one believable next action.

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
Feel your breath arrive, and let your posture settle into the chair or the floor beneath you. Notice your hands, your shoulders, your jaw, and the space around your face, without needing to change everything at once. You are arriving into work that can feel unmistakably yours: inventive, alive, and free.

### Task visualization
Now imagine the specific task in front of you beginning to take shape, even without forcing the whole path to appear at once. See yourself making one strong concept choice, then letting a fresh visual language come forward in a way that feels self-directed and clear. What does the work look like when Originality is present, and Reliability is quietly visible in how you shape and deliver it?

### Ending
Let the scene close with the task moved forward in a real, visible way. You feel a little more solid, a little more settled, and still creatively free. This is part of the life you are building: creative work that stays original, and a studio that stays sustainable.

## soul script (167 words)

Feel your breath arrive, and let your posture settle into the chair or the floor beneath you. Notice your hands, your shoulders, your jaw, and the space around your face, without needing to change everything at once. You are arriving into work that can feel unmistakably yours: inventive, alive, and free.

Now imagine the specific task in front of you beginning to take shape, even without forcing the whole path to appear at once. See yourself making one strong concept choice, then letting a fresh visual language come forward in a way that feels self-directed and clear. What does the work look like when Originality is present, and Reliability is quietly visible in how you shape and deliver it?

Let the scene close with the task moved forward in a real, visible way. You feel a little more solid, a little more settled, and still creatively free. This is part of the life you are building: creative work that stays original, and a studio that stays sustainable.

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
      "sleep_summary": "7.6 hours slept; sleep quality 84/100",
      "recovery_summary": "resting heart rate 60 bpm; HRV 52 ms",
      "energy_curve_inputs": {
        "sleep_hours": 7.6,
        "sleep_quality": 84,
        "resting_heart_rate": 60,
        "hrv_ms": 52
      }
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
    "hourly_energy": [
      {
        "hour": 7,
        "energy_level": 5
      },
      {
        "hour": 8,
        "energy_level": 6
      },
      {
        "hour": 9,
        "energy_level": 6
      },
      {
        "hour": 10,
        "energy_level": 6
      },
      {
        "hour": 11,
        "energy_level": 5
      },
      {
        "hour": 12,
        "energy_level": 5
      },
      {
        "hour": 13,
        "energy_level": 4
      },
      {
        "hour": 14,
        "energy_level": 5
      },
      {
        "hour": 15,
        "energy_level": 5
      },
      {
        "hour": 16,
        "energy_level": 4
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your hands settle around the stylus, your shoulders drop, and the chair hold you while the deck outline waits open. You have real energy available today, supported by a solid night of sleep, and you let that feel steady rather than rushed. Coffee is nearby, the playlist is ready, and you arrive into work that can feel inventive, alive, and unmistakably yours.

### Task visualization
Now see yourself beginning the high-priority work of building the pitch deck narrative for the client brand pitch. For the first stretch, you choose the core story arc; what does one strong concept choice look like when it clicks into place? Then the strongest concept slides begin to sequence into a clean flow, thumbnails and moodboard guiding your eye, until the transition notes for the client call sound solid, settled, and professional.

### Ending
Let the scene end with the deck narrative carried forward: not forced, but shaped. Your body feels clearer and more ready, with trust made visible in how you deliver and originality still present in the work. Today’s next doable action supports the larger practice you are building: creative work that stays original, and a studio that stays sustainable.

## full script (193 words)

Feel your hands settle around the stylus, your shoulders drop, and the chair hold you while the deck outline waits open. You have real energy available today, supported by a solid night of sleep, and you let that feel steady rather than rushed. Coffee is nearby, the playlist is ready, and you arrive into work that can feel inventive, alive, and unmistakably yours.

Now see yourself beginning the high-priority work of building the pitch deck narrative for the client brand pitch. For the first stretch, you choose the core story arc; what does one strong concept choice look like when it clicks into place? Then the strongest concept slides begin to sequence into a clean flow, thumbnails and moodboard guiding your eye, until the transition notes for the client call sound solid, settled, and professional.

Let the scene end with the deck narrative carried forward: not forced, but shaped. Your body feels clearer and more ready, with trust made visible in how you deliver and originality still present in the work. Today’s next doable action supports the larger practice you are building: creative work that stays original, and a studio that stays sustainable.

# serena_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":197,"mind":199,"body":214,"soul":162,"full":208}

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


## baseline script (197 words)

Take a few moments to review the day’s calendar as a simple sequence of scheduled items. The first item is school drop-off from 07:15 to 07:50, lasting 35 minutes. After that, there is time before drafting the argument section from 08:30 to 09:55, an 85-minute work block. Notice the start and end times, and treat this as a defined period for that task.

Later in the morning, there is a 15-minute window from 10:15 to 10:30 to confirm pickup logistics. At 11:05, the schedule moves to sending a case update to co-counsel, ending at 11:30. At 12:00, there is a 30-minute client check-in, followed by a lunch break from 13:00 to 13:25.

In the afternoon, there is a filing window check from 14:30 to 14:50. The final listed item is afternoon pickup from 16:00 to 16:30. As you prepare, simply keep the order of the day in mind. Move from one scheduled item to the next, using the listed times and durations as the guide. If there is space between items, let it remain available for transition, setup, or ordinary adjustments. The goal is to follow the visible calendar steadily and complete each scheduled item in turn.

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
Feel your feet on the floor and the chair holding you, with your hands resting where they are. Let your shoulders and jaw soften a little as you arrive in this day, a day shaped around practicing humane advocacy. You are here to make one clear argument-section draft move from intention into form, and to do it as someone who helps complex systems become more navigable.

### Task visualization
Imagine the morning opening after school drop-off, and see yourself entering the 85-minute space for Draft argument section. What does it feel like when the first paragraph begins to take shape, then the outline, claim, precedent, and client facts start to belong together on the page? Later, you move through Confirm pickup logistics in a brief 15-minute pass, then Send case update to co-counsel in a focused 25-minute stretch, carrying the same clear thread forward.

### Ending
Let the day close around the sense that progress is already credible because you have rehearsed the next doable actions. The larger priority is not separate from these moments: rigorous public-interest advocacy, done humanely, one clear draft and one clear communication at a time. Take one steadier breath, and return ready to begin with the first real step.

## mind script (199 words)

Feel your feet on the floor and the chair holding you, with your hands resting where they are. Let your shoulders and jaw soften a little as you arrive in this day, a day shaped around practicing humane advocacy. You are here to make one clear argument-section draft move from intention into form, and to do it as someone who helps complex systems become more navigable.

Imagine the morning opening after school drop-off, and see yourself entering the 85-minute space for Draft argument section. What does it feel like when the first paragraph begins to take shape, then the outline, claim, precedent, and client facts start to belong together on the page? Later, you move through Confirm pickup logistics in a brief 15-minute pass, then Send case update to co-counsel in a focused 25-minute stretch, carrying the same clear thread forward.

Let the day close around the sense that progress is already credible because you have rehearsed the next doable actions. The larger priority is not separate from these moments: rigorous public-interest advocacy, done humanely, one clear draft and one clear communication at a time. Take one steadier breath, and return ready to begin with the first real step.

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
      "sleep_summary": "5.9 hours slept; sleep quality 70/100",
      "recovery_summary": "resting heart rate 69 bpm; HRV 33 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.9,
        "sleep_quality": 70,
        "resting_heart_rate": 69,
        "hrv_ms": 33
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your hands around the warm mug, your chair pulled close to the desk, and the quiet apartment holding you for a moment. You notice the tea, the muted email alerts, the phone on do-not-disturb, and the honest body-state of a shorter night: enough rest to begin, not enough to force. Let your shoulders soften as your energy rises gently from low into a workable middle range.

### Task visualization
Now picture the main work of the day already arranged in front of you: case notes printed, argument outline open, pickup reminder visible for later. Without needing to rush, you move through the first important anchor, then the next, letting each one become simpler once your attention meets it. What does it feel like when the page, the notes, and the quiet room start carrying you forward? As energy dips and returns, you keep the success case modest and real: one clear section, one useful decision, one next piece completed.

### Ending
Let the scene close with the desk a little more orderly, the tea nearly finished, and your body steadier than when you began. You do not need a perfect day to make real progress today. You return to action with a softer jaw, clearer hands, and the sense that the next doable step is enough to begin.

## body script (214 words)

Feel your hands around the warm mug, your chair pulled close to the desk, and the quiet apartment holding you for a moment. You notice the tea, the muted email alerts, the phone on do-not-disturb, and the honest body-state of a shorter night: enough rest to begin, not enough to force. Let your shoulders soften as your energy rises gently from low into a workable middle range.

Now picture the main work of the day already arranged in front of you: case notes printed, argument outline open, pickup reminder visible for later. Without needing to rush, you move through the first important anchor, then the next, letting each one become simpler once your attention meets it. What does it feel like when the page, the notes, and the quiet room start carrying you forward? As energy dips and returns, you keep the success case modest and real: one clear section, one useful decision, one next piece completed.

Let the scene close with the desk a little more orderly, the tea nearly finished, and your body steadier than when you began. You do not need a perfect day to make real progress today. You return to action with a softer jaw, clearer hands, and the sense that the next doable step is enough to begin.

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
Feel your breath arrive, and let your posture settle into the chair or the ground beneath you. Notice your hands, your shoulders, your jaw, and give yourself a little more room to be here. Today, you are arriving in Justice, Care, and Diligence: committed, human, thorough, and grounded.

### Task visualization
Imagine the day opening in front of you, without needing every detail named yet. You move toward the important work with the quality of rigorous advocacy, making the next argument a little sharper, protecting the client position, and reducing one real deadline risk. What does it feel like when your attention becomes clear and the work starts to move?

### Ending
Let the scene end with one plain-language next step completed, one careful note updated, or one human check-in done. You are practicing a life where you do rigorous advocacy without losing your humanity. Feel your body come back steadier and more ready, carrying the belief that the next doable action can still serve what matters.

## soul script (162 words)

Feel your breath arrive, and let your posture settle into the chair or the ground beneath you. Notice your hands, your shoulders, your jaw, and give yourself a little more room to be here. Today, you are arriving in Justice, Care, and Diligence: committed, human, thorough, and grounded.

Imagine the day opening in front of you, without needing every detail named yet. You move toward the important work with the quality of rigorous advocacy, making the next argument a little sharper, protecting the client position, and reducing one real deadline risk. What does it feel like when your attention becomes clear and the work starts to move?

Let the scene end with one plain-language next step completed, one careful note updated, or one human check-in done. You are practicing a life where you do rigorous advocacy without losing your humanity. Feel your body come back steadier and more ready, carrying the belief that the next doable action can still serve what matters.

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
      "sleep_summary": "5.9 hours slept; sleep quality 70/100",
      "recovery_summary": "resting heart rate 69 bpm; HRV 33 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.9,
        "sleep_quality": 70,
        "resting_heart_rate": 69,
        "hrv_ms": 33
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel the mug warming your hands, the chair pulled close to the desk, and your feet meeting the floor. The apartment is quiet, email alerts are muted, and your body arrives with honest, modest energy after a shorter night of sleep. Let the open outline and printed case notes remind you of Justice, Care, and Diligence: rigorous advocacy without losing your humanity.

### Task visualization
See yourself enter the first 85-minute block for Draft argument section, phone on do-not-disturb, argument outline open, attention becoming clearer as the morning energy rises. What does it feel like when the strongest claim paragraph starts to take shape, and the precedent begins tying back to the client facts? Then the day narrows into the 15-minute pickup logistics check, simple and contained, followed by the 25-minute case update to co-counsel, clear enough that the next step is plain-language and protective.

### Ending
Let the scene end with the argument made sharper, the client position protected, and the pickup reminder still visible in a steady, human day. Your body does not have to force intensity; it can move with a clear, honestly paced readiness. Today’s next doable action carries you toward humane advocacy: careful legal work, done with care for the person inside the case and care for yourself.

## full script (208 words)

Feel the mug warming your hands, the chair pulled close to the desk, and your feet meeting the floor. The apartment is quiet, email alerts are muted, and your body arrives with honest, modest energy after a shorter night of sleep. Let the open outline and printed case notes remind you of Justice, Care, and Diligence: rigorous advocacy without losing your humanity.

See yourself enter the first 85-minute block for Draft argument section, phone on do-not-disturb, argument outline open, attention becoming clearer as the morning energy rises. What does it feel like when the strongest claim paragraph starts to take shape, and the precedent begins tying back to the client facts? Then the day narrows into the 15-minute pickup logistics check, simple and contained, followed by the 25-minute case update to co-counsel, clear enough that the next step is plain-language and protective.

Let the scene end with the argument made sharper, the client position protected, and the pickup reminder still visible in a steady, human day. Your body does not have to force intensity; it can move with a clear, honestly paced readiness. Today’s next doable action carries you toward humane advocacy: careful legal work, done with care for the person inside the case and care for yourself.

# serena_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Generation sources by arm: {"baseline":"openai.vanilla_baseline_prompt","mind":"backend.generate_ablation_rehearsal","body":"backend.generate_ablation_rehearsal","soul":"backend.generate_ablation_rehearsal","full":"backend.generate_ablation_rehearsal"}
Word counts: {"baseline":219,"mind":183,"body":195,"soul":161,"full":204}

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


## baseline script (219 words)

Begin by setting up for the argument-section drafting session in a simple, practical way. Have the materials you need available, including the argument outline, any relevant notes, and the document where the draft will be written. The purpose of this preparation is to move through the listed tasks in order and give each one clear attention for its planned amount of time.

Start with the 15-minute review of the argument outline. Use this time to re-read the structure, notice the main points that need to be covered, and check how the argument is expected to flow. The goal is not to perfect the outline, but to refresh your understanding of it so the drafting work has a clear starting point.

Next, move into the 35-minute block for drafting the strongest claim paragraph. Focus on getting a complete paragraph down that states the claim clearly and supports it in a direct, organized way. It can be revised later; for now, aim for a usable draft that captures the central reasoning.

Then use the next 35 minutes to tie precedent to the client facts. Work steadily through the connection between the legal authority and the facts, making the relationship as clear as possible. When the session ends, pause and note what has been completed and what may need further review later.

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
Feel your breath arrive first, then the support beneath you, your hands, your shoulders, your jaw. Let your attention settle here, without needing to force energy that is not present. You are arriving into rigorous public-interest advocacy, one clear draft, and a way of making a complex system more navigable for a client.

### Task visualization
Now picture opening the Public-interest case brief and beginning the 85-minute shape of Draft argument section. For the first stretch, you review the argument outline, letting the structure come back into view; what line of reasoning starts to feel ready to carry the rest? Then you move into the strongest claim paragraph, and your attention gathers around one complete, clear claim. Finally, you tie precedent back to client facts, feeling the draft become usable, integrated, and real.

### Ending
Let the scene close with one complete first draft of the legal argument section in front of you. This is not the whole case and not the whole calling; it is today’s next concrete movement toward humane advocacy. Feel yourself a little clearer and more ready to return to the first doable action.

## mind script (183 words)

Feel your breath arrive first, then the support beneath you, your hands, your shoulders, your jaw. Let your attention settle here, without needing to force energy that is not present. You are arriving into rigorous public-interest advocacy, one clear draft, and a way of making a complex system more navigable for a client.

Now picture opening the Public-interest case brief and beginning the 85-minute shape of Draft argument section. For the first stretch, you review the argument outline, letting the structure come back into view; what line of reasoning starts to feel ready to carry the rest? Then you move into the strongest claim paragraph, and your attention gathers around one complete, clear claim. Finally, you tie precedent back to client facts, feeling the draft become usable, integrated, and real.

Let the scene close with one complete first draft of the legal argument section in front of you. This is not the whole case and not the whole calling; it is today’s next concrete movement toward humane advocacy. Feel yourself a little clearer and more ready to return to the first doable action.

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
      "sleep_summary": "5.9 hours slept; sleep quality 70/100",
      "recovery_summary": "resting heart rate 69 bpm; HRV 33 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.9,
        "sleep_quality": 70,
        "resting_heart_rate": 69,
        "hrv_ms": 33
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## body sections

### Introduction
Feel your feet planted under the desk, your hands around the warm mug, and the chair holding you. The apartment is quiet, email alerts are muted, and the smell and taste of tea give your body one simple place to arrive. With 5.9 hours of sleep and energy at a 4, you let this be a steady, honest start, not a forced one.

### Task visualization
Now see the task space in front of you: the argument outline open, case notes printed, highlighted precedent beside the laptop, phone on do-not-disturb. You move into the work softly, using the quieter stretch of the morning as your attention rises toward a steadier 5. What is the first small part of the work that begins to move when you trust the page in front of you? Let the scene show you staying with it, one grounded pass at a time.

### Ending
As you close this rehearsal, feel your body a little clearer and more ready than when you began. The task does not need a dramatic surge; it can move through planted feet, muted alerts, warm tea, and one next useful action. You return to the desk with enough steadiness to begin.

## body script (195 words)

Feel your feet planted under the desk, your hands around the warm mug, and the chair holding you. The apartment is quiet, email alerts are muted, and the smell and taste of tea give your body one simple place to arrive. With 5.9 hours of sleep and energy at a 4, you let this be a steady, honest start, not a forced one.

Now see the task space in front of you: the argument outline open, case notes printed, highlighted precedent beside the laptop, phone on do-not-disturb. You move into the work softly, using the quieter stretch of the morning as your attention rises toward a steadier 5. What is the first small part of the work that begins to move when you trust the page in front of you? Let the scene show you staying with it, one grounded pass at a time.

As you close this rehearsal, feel your body a little clearer and more ready than when you began. The task does not need a dramatic surge; it can move through planted feet, muted alerts, warm tea, and one next useful action. You return to the desk with enough steadiness to begin.

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
Feel your breath arrive first, then the contact of your body with the chair or floor. Let your hands soften, your shoulders settle, and your jaw release a little. You are arriving into rigorous advocacy without losing your humanity, with Justice, Care, and Diligence available as steady guides.

### Task visualization
Imagine the task in front of you taking shape, even without needing to force it. You bring legal skill to the work so the client position is protected, the argument becomes sharper, and the next step can be named in plain language. What does it feel like to work with a clear, purposeful, grounded kind of attention?

### Ending
Let the scene close with one honest sign of completion: notes clarified, risk reduced, or a human next step made easier to see. Your body can stay steady as you return to action, not rushed, just prepared. This is how you move toward humane advocacy today: one careful piece of work, done with skill and care.

## soul script (161 words)

Feel your breath arrive first, then the contact of your body with the chair or floor. Let your hands soften, your shoulders settle, and your jaw release a little. You are arriving into rigorous advocacy without losing your humanity, with Justice, Care, and Diligence available as steady guides.

Imagine the task in front of you taking shape, even without needing to force it. You bring legal skill to the work so the client position is protected, the argument becomes sharper, and the next step can be named in plain language. What does it feel like to work with a clear, purposeful, grounded kind of attention?

Let the scene close with one honest sign of completion: notes clarified, risk reduced, or a human next step made easier to see. Your body can stay steady as you return to action, not rushed, just prepared. This is how you move toward humane advocacy today: one careful piece of work, done with skill and care.

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
      "sleep_summary": "5.9 hours slept; sleep quality 70/100",
      "recovery_summary": "resting heart rate 69 bpm; HRV 33 ms",
      "energy_curve_inputs": {
        "sleep_hours": 5.9,
        "sleep_quality": 70,
        "resting_heart_rate": 69,
        "hrv_ms": 33
      }
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
    "hourly_energy": [
      {
        "hour": 6,
        "energy_level": 3
      },
      {
        "hour": 7,
        "energy_level": 3
      },
      {
        "hour": 8,
        "energy_level": 4
      },
      {
        "hour": 9,
        "energy_level": 5
      },
      {
        "hour": 10,
        "energy_level": 5
      },
      {
        "hour": 11,
        "energy_level": 4
      },
      {
        "hour": 12,
        "energy_level": 4
      },
      {
        "hour": 13,
        "energy_level": 3
      },
      {
        "hour": 14,
        "energy_level": 3
      },
      {
        "hour": 15,
        "energy_level": 4
      },
      {
        "hour": 16,
        "energy_level": 5
      }
    ],
    "confidence": "high"
  }
}
```

## full sections

### Introduction
Feel your feet planted under the desk, the mug warming your hands, and the quiet apartment around you. Your body is working with a modest charge today after a shorter night, so you let the breath be steady rather than forced. With the argument outline open, case notes printed, and highlighted precedent beside the laptop, you arrive into humane advocacy: rigorous work without losing your humanity.

### Task visualization
Picture the 85 minutes ahead as one clear arc: first, a calm pass through the argument outline, noticing the shape that is already there. Then your attention gathers for the strongest claim paragraph; email alerts stay muted, the tea is near, and the sentence begins to carry Justice as clarity and protection for the client position. What does it feel like when the precedent starts tying cleanly back to the client facts, thorough and grounded enough for a first draft?

### Ending
Let the scene close with one complete argument-section draft in front of you: not perfect, but real, clear, and movable. Your body can feel steadier now, paced honestly, with the next doable action already rehearsed. This is how you practice humane advocacy today, using legal skill to make unfair systems more answerable while staying human inside the work.

## full script (204 words)

Feel your feet planted under the desk, the mug warming your hands, and the quiet apartment around you. Your body is working with a modest charge today after a shorter night, so you let the breath be steady rather than forced. With the argument outline open, case notes printed, and highlighted precedent beside the laptop, you arrive into humane advocacy: rigorous work without losing your humanity.

Picture the 85 minutes ahead as one clear arc: first, a calm pass through the argument outline, noticing the shape that is already there. Then your attention gathers for the strongest claim paragraph; email alerts stay muted, the tea is near, and the sentence begins to carry Justice as clarity and protection for the client position. What does it feel like when the precedent starts tying cleanly back to the client facts, thorough and grounded enough for a first draft?

Let the scene close with one complete argument-section draft in front of you: not perfect, but real, clear, and movable. Your body can feel steadier now, paced honestly, with the next doable action already rehearsed. This is how you practice humane advocacy today, using legal skill to make unfair systems more answerable while staying human inside the work.
