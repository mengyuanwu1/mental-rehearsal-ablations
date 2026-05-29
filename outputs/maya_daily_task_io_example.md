---
title: Maya Chen Daily + Task Mental Rehearsal Ablation Example
geometry: margin=0.65in
fontsize: 9pt
colorlinks: true
header-includes:
  - \lstset{breaklines=true,breakatwhitespace=false,basicstyle=\ttfamily\scriptsize,columns=fullflexible}
---

# Overview

Generated at: 2026-05-28T21:35:05.926Z

Requested model: gpt-5.5

Generation source: baseline=openai.vanilla_baseline_prompt; rehearsal=backend.generate_ablation_rehearsal

Mock used: false

This PDF shows one matched persona across both scopes: Maya Chen daily rehearsal and Maya Chen task rehearsal. Each condition includes the input visible to that condition and the generated output shown in the experiment UI.

\newpage

# Daily Scope: Maya Chen - Short-sleep research writing day

## Scenario Metadata

```json
{
  "id": "maya_daily",
  "scope": "daily",
  "contextTitle": "Short-sleep research writing day",
  "persona": {
    "name": "Maya Chen",
    "demographic": {
      "age": "24",
      "birthDate": null,
      "sex": "Woman",
      "citizenship": null,
      "occupation": "HCI PhD / academic research",
      "race": null,
      "englishSkill": null
    },
    "onboarding": {
      "priorityCategory": [
        "education"
      ],
      "timeframe": "this month",
      "customSubGoals": [
        "Submit a strong workshop paper this month"
      ],
      "goalDetail": "Submit a strong workshop paper this month",
      "goalSummaryFields": [
        {
          "id": "target",
          "label": "Target",
          "value": "Submit one strong workshop paper",
          "inputType": "text"
        },
        {
          "id": "deadline",
          "label": "Deadline",
          "value": "2026-06-30",
          "inputType": "deadline"
        }
      ],
      "wakeTime": "07:30",
      "sleepTime": "23:30",
      "lifePriority": {
        "title": "Become an independent researcher",
        "description": "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend."
      }
    }
  }
}
```

## Condition: baseline

Source: openai.vanilla_baseline_prompt

Model: gpt-5.5-2026-04-23

Word count: 204

Confidence: n/a

### Input

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

### Output Script

Today’s schedule includes several defined work periods, meetings, and breaks. Begin by noting the first item, reviewing the paper plan from 08:15 to 08:35. Use that time to look over the plan and make any straightforward adjustments or reminders needed before moving on. At 09:00, shift to drafting the related work section for the 90-minute block, keeping attention on that writing task until 10:30.

After that, there is a lab standup from 10:45 to 11:15. Allow a few minutes before it to be ready to join or attend, then use the meeting time for the scheduled discussion. Lunch is listed from 12:10 to 12:40, so treat that as the planned break in the middle of the day.

In the afternoon, answer TA emails from 13:00 to 13:20, focusing on clearing or responding to the relevant messages during that short window. From 14:00 to 14:45, move to teaching support tasks and work through the items associated with that block. At 15:00, prepare two reading group questions during the 30-minute session. Later, from 16:15 to 16:35, send the advisor progress note.

Follow the calendar times as they appear, completing each item in its assigned period and transitioning to the next scheduled activity when its time arrives.

## Condition: mind

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 187

Confidence: low

Omissions:

- no body data; introduction used generic grounding only
- no value data; value-anchored language used only the stated research goal

### Input

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

### Output Sections

#### Introduction

Feel your breath arrive first, then the contact of your body with the chair or floor. Let your shoulders drop a little, your jaw soften, and your attention gather around this day. You are arriving into work that serves becoming an independent researcher: thinking and writing on your own questions, building judgment, and producing work you are proud to defend.

#### Task Visualization

Picture the morning opening with a brief review of the paper plan, then the main stretch: ninety minutes with the related work section. You settle into the page, find the thread, and feel the section begin to become coherent enough to carry forward. Later, you move through twenty minutes of TA emails with clean attention, then thirty minutes preparing two reading group questions; what does it feel like when each piece has moved just far enough?

#### Ending

At the close of the work, sense the day as evidence: one strong workshop paper submission becomes reachable through sections, paragraphs, and the next honest draft. You return to action a little clearer, with the related work section less vague than before. Let that be enough momentum for today’s next step.

### Output Script

Feel your breath arrive first, then the contact of your body with the chair or floor. Let your shoulders drop a little, your jaw soften, and your attention gather around this day. You are arriving into work that serves becoming an independent researcher: thinking and writing on your own questions, building judgment, and producing work you are proud to defend.

Picture the morning opening with a brief review of the paper plan, then the main stretch: ninety minutes with the related work section. You settle into the page, find the thread, and feel the section begin to become coherent enough to carry forward. Later, you move through twenty minutes of TA emails with clean attention, then thirty minutes preparing two reading group questions; what does it feel like when each piece has moved just far enough?

At the close of the work, sense the day as evidence: one strong workshop paper submission becomes reachable through sections, paragraphs, and the next honest draft. You return to action a little clearer, with the related work section less vague than before. Let that be enough momentum for today’s next step.

## Condition: body

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 192

Confidence: low

Omissions:

- no mind data; task visualization could not use top-three priority schedule or larger goal
- no value data; introduction and ending could not be value-anchored

### Input

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

### Output Sections

#### Introduction

Feel your feet on the floor and the chair holding you as the quiet apartment hums around you. Your body is starting from limited sleep and low energy, with enough steadiness to arrive gently: morning light at the window, coffee or water nearby, phone face down. Let your shoulders soften, your jaw unclench, and notice the laptop open to the paper draft waiting without pressure.

#### Task Visualization

Imagine a smaller, clean success case for the day: you turn toward the open draft, the three anchor papers beside the keyboard, and let one useful piece of work begin to move. What does the first clear paragraph, note, or revision feel like when you do not force it? As the morning energy rises a little and then settles, you keep returning to the simple cues in front of you: screen, papers, coffee, feet, quiet.

#### Ending

Let the scene close with the draft a little more shaped than before and your body a little steadier for having begun. You do not need a perfect-energy day to take the next doable step. Feel the floor again, breathe once more, and come back ready to move at an honest pace.

### Output Script

Feel your feet on the floor and the chair holding you as the quiet apartment hums around you. Your body is starting from limited sleep and low energy, with enough steadiness to arrive gently: morning light at the window, coffee or water nearby, phone face down. Let your shoulders soften, your jaw unclench, and notice the laptop open to the paper draft waiting without pressure.

Imagine a smaller, clean success case for the day: you turn toward the open draft, the three anchor papers beside the keyboard, and let one useful piece of work begin to move. What does the first clear paragraph, note, or revision feel like when you do not force it? As the morning energy rises a little and then settles, you keep returning to the simple cues in front of you: screen, papers, coffee, feet, quiet.

Let the scene close with the draft a little more shaped than before and your body a little steadier for having begun. You do not need a perfect-energy day to take the next doable step. Feel the floor again, breathe once more, and come back ready to move at an honest pace.

## Condition: soul

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 164

Confidence: low

Omissions:

- no body data; introduction used generic grounding only
- no mind data; task visualization could not use daily priority schedule or calendar context
- no mind data; ending could not connect to user goal priority

### Input

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

### Output Sections

#### Introduction

Feel your breath enter, and let your shoulders settle as your hands rest where they are. You arrive without needing to force the day into shape, giving yourself room to think and to trust your own questions before borrowing anyone else’s. What would it feel like to begin from mental clarity and self-trust?

#### Task Visualization

Picture the important work of today coming into view, even if the exact sequence is yours to choose. You move toward what matters with a focused, competent pace, noticing the moment one piece begins to become visible progress. You leave space for curiosity too, learning something from an answer you did not expect, while still finishing what matters.

#### Ending

Let the scene close with the feeling of being a little more clear, a little more accomplished, and still unboxed. Today’s next doable action can belong to the life you are shaping: a life where you think and write on your own questions. You return to the day with enough trust to begin.

### Output Script

Feel your breath enter, and let your shoulders settle as your hands rest where they are. You arrive without needing to force the day into shape, giving yourself room to think and to trust your own questions before borrowing anyone else’s. What would it feel like to begin from mental clarity and self-trust?

Picture the important work of today coming into view, even if the exact sequence is yours to choose. You move toward what matters with a focused, competent pace, noticing the moment one piece begins to become visible progress. You leave space for curiosity too, learning something from an answer you did not expect, while still finishing what matters.

Let the scene close with the feeling of being a little more clear, a little more accomplished, and still unboxed. Today’s next doable action can belong to the life you are shaping: a life where you think and write on your own questions. You return to the day with enough trust to begin.

## Condition: full

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 210

Confidence: high

### Input

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

### Output Sections

#### Introduction

Feel your feet on the floor, your hands near the laptop, and the quiet apartment hum around you. Morning light is coming through the window, the paper draft is open, three anchor papers are beside the keyboard, and coffee or water is within reach. Your body may feel a little under-slept and low at the start, so you arrive gently, letting this be a day of steady focus, independent thinking, and visible progress.

#### Task Visualization

See the first real block of the day: ninety minutes with the related work section, using the stronger morning energy to let one coherent draft begin to take shape. What does it feel like when you trust your own questions before borrowing other people’s, and the section starts to move? Later, you answer the TA emails in a contained twenty-minute pass, then at 15:00 you prepare two reading group questions with curious, competent attention.

#### Ending

By the time you send the day forward, you have practiced the life you are building: thinking and writing on your own questions. Your body can feel a little steadier now, not forced, just clearer and more ready for the next doable action. Today’s work makes becoming an independent researcher feel reachable through one focused section, one contained responsibility, and one curious contribution.

### Output Script

Feel your feet on the floor, your hands near the laptop, and the quiet apartment hum around you. Morning light is coming through the window, the paper draft is open, three anchor papers are beside the keyboard, and coffee or water is within reach. Your body may feel a little under-slept and low at the start, so you arrive gently, letting this be a day of steady focus, independent thinking, and visible progress.

See the first real block of the day: ninety minutes with the related work section, using the stronger morning energy to let one coherent draft begin to take shape. What does it feel like when you trust your own questions before borrowing other people’s, and the section starts to move? Later, you answer the TA emails in a contained twenty-minute pass, then at 15:00 you prepare two reading group questions with curious, competent attention.

By the time you send the day forward, you have practiced the life you are building: thinking and writing on your own questions. Your body can feel a little steadier now, not forced, just clearer and more ready for the next doable action. Today’s work makes becoming an independent researcher feel reachable through one focused section, one contained responsibility, and one curious contribution.

\newpage

# Task Scope: Maya Chen - Paper writing block

## Scenario Metadata

```json
{
  "id": "maya_task",
  "scope": "task",
  "contextTitle": "Paper writing block",
  "persona": {
    "name": "Maya Chen",
    "demographic": {
      "age": "24",
      "birthDate": null,
      "sex": "Woman",
      "citizenship": null,
      "occupation": "HCI PhD / academic research",
      "race": null,
      "englishSkill": null
    },
    "onboarding": {
      "priorityCategory": [
        "education"
      ],
      "timeframe": "this month",
      "customSubGoals": [
        "Submit a strong workshop paper this month"
      ],
      "goalDetail": "Submit a strong workshop paper this month",
      "goalSummaryFields": [
        {
          "id": "target",
          "label": "Target",
          "value": "Submit one strong workshop paper",
          "inputType": "text"
        },
        {
          "id": "deadline",
          "label": "Deadline",
          "value": "2026-06-30",
          "inputType": "deadline"
        }
      ],
      "wakeTime": "07:30",
      "sleepTime": "23:30",
      "lifePriority": {
        "title": "Become an independent researcher",
        "description": "Build a research life where she can think and write on her own questions, develop independent judgment, and produce work she is proud to defend."
      }
    }
  }
}
```

## Condition: baseline

Source: openai.vanilla_baseline_prompt

Model: gpt-5.5-2026-04-23

Word count: 219

Confidence: n/a

### Input

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

### Output Script

Prepare for the related work writing block by setting up the materials and notes needed for the session. Begin with the intention to work through the listed tasks in a steady, practical way, using the available time for each item as a guide. The main block is to draft the related work section for 90 minutes, so have the relevant sources, outline, or document open and ready before starting.

After that, allow 15 minutes to re-read the anchor findings. Use this time to refresh the key points that need to be represented accurately. The aim is simply to review what is already available and notice which findings are most useful for the writing.

Next, spend 20 minutes drafting the gap statement. Keep the focus on producing a clear working version rather than making it final immediately. It can be revised later, but the goal for this block is to put the main idea into words.

Then use 25 minutes to connect the related work to the gap. Look for places where the reviewed literature leads naturally into the gap statement. Make simple adjustments so the section moves clearly from prior work toward the reason for the current focus.

Move through the tasks in order, keep the materials organized, and use the time blocks to maintain a steady writing pace.

## Condition: mind

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 193

Confidence: low

Omissions:

- no body data; introduction used generic grounding only
- no value data; value-anchored feeling and close used goal-based grounding only

### Input

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

### Output Sections

#### Introduction

Feel your breath arrive in your body, and let your posture become a little more settled. Notice the contact beneath you, your hands, your shoulders, your jaw, and the space around the work before you. You are arriving into one meaningful step toward becoming an independent researcher: building work you can think through, write clearly, and feel proud to defend.

#### Task Visualization

Now imagine beginning the 90-minute focus block for drafting the related work section of the CHI workshop paper. You re-read the three anchor papers’ findings sections, letting the important patterns become visible; what starts to stand out as the shape of the conversation? You move into the gap statement, one paragraph becoming clear enough for your advisor to react to, then you connect the related work back to that gap until the section begins to hold together.

#### Ending

Let the scene end with the draft farther along than when you began: not perfect, but more coherent, more defensible, more real. You feel the next step toward submitting a strong workshop paper this month becoming reachable through this one focused action. Take one steady breath, and return with the sense that you can begin here.

### Output Script

Feel your breath arrive in your body, and let your posture become a little more settled. Notice the contact beneath you, your hands, your shoulders, your jaw, and the space around the work before you. You are arriving into one meaningful step toward becoming an independent researcher: building work you can think through, write clearly, and feel proud to defend.

Now imagine beginning the 90-minute focus block for drafting the related work section of the CHI workshop paper. You re-read the three anchor papers’ findings sections, letting the important patterns become visible; what starts to stand out as the shape of the conversation? You move into the gap statement, one paragraph becoming clear enough for your advisor to react to, then you connect the related work back to that gap until the section begins to hold together.

Let the scene end with the draft farther along than when you began: not perfect, but more coherent, more defensible, more real. You feel the next step toward submitting a strong workshop paper this month becoming reachable through this one focused action. Take one steady breath, and return with the sense that you can begin here.

## Condition: body

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 173

Confidence: low

Omissions:

- no mind data; task visualization used body focus cues rather than a named focus task or subtasks
- no value data; introduction and ending could not be value-anchored

### Input

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

### Output Sections

#### Introduction

Feel your feet on the floor, your hands near the warm mug, and the quiet apartment hum around you. Your body is starting from limited rest today, with low current energy, so you arrive softly rather than forcing anything. Notice the coffee or water, the light, the paper draft open, and the phone face down.

#### Task Visualization

Imagine the cursor waiting at the related work section, with the anchor papers beside the keyboard. With this smaller, steady energy, you enter the task one clear pass at a time: reading what is already there, finding the next sentence, letting the section begin to move. What does it feel like when the draft becomes just a little more coherent under your hands?

#### Ending

Let the image settle: feet grounded, shoulders easier, attention clearer than when you began. You do not need a perfect push; you rehearse a believable return to the page, using the cues already in front of you. When you are ready, you come back to action with a softer body and one doable next move.

### Output Script

Feel your feet on the floor, your hands near the warm mug, and the quiet apartment hum around you. Your body is starting from limited rest today, with low current energy, so you arrive softly rather than forcing anything. Notice the coffee or water, the light, the paper draft open, and the phone face down.

Imagine the cursor waiting at the related work section, with the anchor papers beside the keyboard. With this smaller, steady energy, you enter the task one clear pass at a time: reading what is already there, finding the next sentence, letting the section begin to move. What does it feel like when the draft becomes just a little more coherent under your hands?

Let the image settle: feet grounded, shoulders easier, attention clearer than when you began. You do not need a perfect push; you rehearse a believable return to the page, using the cues already in front of you. When you are ready, you come back to action with a softer body and one doable next move.

## Condition: soul

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 189

Confidence: low

Omissions:

- no body data; introduction used generic grounding only
- no mind data; task scope could not use focus_task or focus_subtasks
- no mind data; ending could not connect to user_goal

### Input

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

### Output Sections

#### Introduction

Feel your breath arrive in your chest, and let your shoulders drop a little as your hands settle. Notice the contact under you, the air around you, and the simple fact that you are here. You are arriving into a life where you think and write on your own questions, trusting your own questions before borrowing other people’s.

#### Task Visualization

Now picture the task in front of you as a clear space for independent thinking. Since the exact task is not named here, imagine the first useful movement: your attention gathering, your mind becoming mentally clear, self-trusting, and unboxed. What does it feel like when the work begins to move because you are making your own decisions faster? Let the scene continue until there is visible progress, something that feels focused, competent, and like finishing what matters.

#### Ending

Let that image settle into your body: you can be curious, supported, and still trust your own direction. Today’s next action does not have to prove everything; it can simply move you toward deep work, independent research, and a life shaped by your own questions. Take one steadier breath, and return ready to begin.

### Output Script

Feel your breath arrive in your chest, and let your shoulders drop a little as your hands settle. Notice the contact under you, the air around you, and the simple fact that you are here. You are arriving into a life where you think and write on your own questions, trusting your own questions before borrowing other people’s.

Now picture the task in front of you as a clear space for independent thinking. Since the exact task is not named here, imagine the first useful movement: your attention gathering, your mind becoming mentally clear, self-trusting, and unboxed. What does it feel like when the work begins to move because you are making your own decisions faster? Let the scene continue until there is visible progress, something that feels focused, competent, and like finishing what matters.

Let that image settle into your body: you can be curious, supported, and still trust your own direction. Today’s next action does not have to prove everything; it can simply move you toward deep work, independent research, and a life shaped by your own questions. Take one steadier breath, and return ready to begin.

## Condition: full

Source: backend.generate_ablation_rehearsal

Model: gpt-5.5-2026-04-23

Word count: 225

Confidence: high

### Input

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

### Output Sections

#### Introduction

Feel your feet on the floor, your hands close to the warm mug, and your shoulders settling as the quiet apartment hum holds the room. You are a little under-rested, so your energy arrives gently rather than forcefully, with the paper draft open, anchor papers beside the keyboard, and the phone face down. Let this be room to think: trusting your own questions before borrowing other people's.

#### Task Visualization

See yourself beginning the 90-minute related work draft in a softer, focused way, with the cursor waiting at the related work section. First, you re-read the three anchor papers' findings sections, noticing what matters and letting one clear thread come forward. Then the gap statement begins to take shape, not perfect, but specific enough for your advisor to react to; what does it feel like when the paragraph starts sounding like your own judgment? You connect the related work back to that gap, leaving visible progress and a section that carries the CHI workshop paper forward.

#### Ending

Let your body register that movement: steadier breath, clearer attention, a little more competence than when you began. This task is one real step toward submitting a strong workshop paper by the end of June, and toward a life where you think and write on your own questions. You return to the draft with enough trust to take the next doable action.

### Output Script

Feel your feet on the floor, your hands close to the warm mug, and your shoulders settling as the quiet apartment hum holds the room. You are a little under-rested, so your energy arrives gently rather than forcefully, with the paper draft open, anchor papers beside the keyboard, and the phone face down. Let this be room to think: trusting your own questions before borrowing other people's.

See yourself beginning the 90-minute related work draft in a softer, focused way, with the cursor waiting at the related work section. First, you re-read the three anchor papers' findings sections, noticing what matters and letting one clear thread come forward. Then the gap statement begins to take shape, not perfect, but specific enough for your advisor to react to; what does it feel like when the paragraph starts sounding like your own judgment? You connect the related work back to that gap, leaving visible progress and a section that carries the CHI workshop paper forward.

Let your body register that movement: steadier breath, clearer attention, a little more competence than when you began. This task is one real step toward submitting a strong workshop paper by the end of June, and toward a life where you think and write on your own questions. You return to the draft with enough trust to take the next doable action.

