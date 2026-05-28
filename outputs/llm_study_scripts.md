# Real LLM Study Scripts

Generated at: 2026-05-28T20:31:05.584Z
Requested model: gpt-5.5
Used mock: false

# maya_daily

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23","full":"gpt-5.5-2026-04-23"}
Word counts: {"baseline":261,"mind":302,"body":296,"soul":303,"full":323}

## baseline input

```json
{
  "preparationOnlyContext": "Daily preparation with three ranked tasks and durations.",
  "visibleItems": [
    "Draft related work section - 90 min",
    "Answer TA emails - 20 min",
    "Prepare two reading group questions - 30 min"
  ]
}
```

## baseline script (261 words)

Today’s preparation can stay simple and concrete. There are three listed items: Draft related work section - 90 min, Answer TA emails - 20 min, and Prepare two reading group questions - 30 min. The total planned work time is 140 minutes. Before beginning, it may help to review the list once, check any materials needed for each item, and make sure the time blocks are clear. The 90-minute writing block is the longest item, so it can be treated as a defined session with a clear stopping point at the end of the scheduled time.

For Draft related work section - 90 min, preparation can include opening the relevant document, locating any notes or sources already gathered, and deciding what part of the section will be handled during the block. The aim of the block can be stated in practical terms, such as adding text, organizing references, or improving the structure of the section. If the section is large, the 90 minutes can be divided into smaller parts, such as reviewing notes, drafting, and making a quick pass for clarity before stopping.

For Answer TA emails - 20 min, preparation can involve opening the inbox, identifying messages that need replies, and using the scheduled time to work through them in order. For Prepare two reading group questions - 30 min, preparation can involve opening the reading or notes and setting aside the block to produce two usable questions. At the end, it may help to briefly check what was completed, save any work, and note any unfinished follow-up for later.

## mind input

```json
{
  "userGoal": {
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
  "prioritySchedule": [
    {
      "rank": 1,
      "title": "Draft related work section",
      "kind": "task",
      "priority": "high",
      "linkedValue": "Success",
      "energyCost": "high",
      "durationMinutes": 90,
      "scheduledStart": "09:00",
      "scheduledEnd": "10:30"
    },
    {
      "rank": 2,
      "title": "Answer TA emails",
      "kind": "task",
      "priority": "medium",
      "linkedValue": "Open-Mindedness",
      "energyCost": "low",
      "durationMinutes": 20,
      "scheduledStart": "13:00",
      "scheduledEnd": "13:20"
    },
    {
      "rank": 3,
      "title": "Prepare two reading group questions",
      "kind": "task",
      "priority": "medium",
      "linkedValue": "Open-Mindedness",
      "energyCost": "medium",
      "durationMinutes": 30,
      "scheduledStart": "15:00",
      "scheduledEnd": "15:30"
    }
  ]
}
```

## mind script (302 words)

Today can be held as one small part of becoming an independent researcher: building a research life with independent judgment, questions worth developing, and work worth defending. The larger goal is one strong workshop paper submission by the end of June 2026, and the first mental rehearsal can begin with the rank 1, high-priority task: Draft related work section, linked with Success, for 90 minutes. What might it feel like to treat this longer block as the main weight of the day? What might the mind be thinking when it returns to the purpose of one coherent section draft? The rehearsal can let the task unfold as a sustained stretch of selecting, connecting, and shaping sources toward the paper’s argument.

Next comes the rank 2 task: Answer TA emails, a medium-priority item linked with Open-Mindedness, lasting 20 minutes. This is a shorter segment, lighter in time, but still part of the day’s academic responsibilities. What might it feel like to shift from the 90-minute research-writing block into a compact response window? What might the mind be thinking as each email is considered clearly enough to answer and then release? In this rehearsal, the 20 minutes can have a defined beginning and end, with the task held as manageable rather than expansive.

Finally, the rank 3 task is Prepare two reading group questions, medium priority, linked with Open-Mindedness, for 30 minutes. What might it feel like to give this task more room than the email block but less than the related work section? What might the mind be thinking while forming two questions that invite discussion rather than simply summarizing? This closing rehearsal connects back to the broader path: each task is different in size and priority, yet each can support the practice of thinking independently and producing work that can be defended.

## body input

```json
{
  "currentEnergyLevel": 3,
  "bodyState": "Low but usable energy, with a steadier window later in the morning.",
  "sleepSummary": {
    "summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration, some restlessness, low HRV, and slightly elevated resting heart rate.",
    "durationHours": 5.5,
    "targetHours": 7.5,
    "bedtime": "01:05",
    "wakeTime": "06:40",
    "sleepQualityScore": 68,
    "sleepEfficiencyPercent": 83,
    "awakeMinutes": 28,
    "restlessMinutes": 46,
    "hrvMs": 29,
    "restingHeartRate": 73
  },
  "activitySummary": "4200 steps; 22 active minutes; 1900 calories out",
  "recoverySummary": "resting heart rate 73 bpm; HRV 29 ms",
  "energyCurveInputs": {
    "sleep_hours": 5.5,
    "sleep_quality": 68,
    "steps": 4200,
    "active_minutes": 22,
    "resting_heart_rate": 73,
    "hrv_ms": 29,
    "calories_out": 1900
  },
  "hourlyEnergy": [
    {
      "hour": 6,
      "energyLevel": 3
    },
    {
      "hour": 7,
      "energyLevel": 3
    },
    {
      "hour": 8,
      "energyLevel": 4
    },
    {
      "hour": 9,
      "energyLevel": 5
    },
    {
      "hour": 10,
      "energyLevel": 5
    },
    {
      "hour": 11,
      "energyLevel": 4
    },
    {
      "hour": 12,
      "energyLevel": 4
    },
    {
      "hour": 13,
      "energyLevel": 3
    },
    {
      "hour": 14,
      "energyLevel": 3
    },
    {
      "hour": 15,
      "energyLevel": 4
    },
    {
      "hour": 16,
      "energyLevel": 5
    }
  ],
  "focusCues": {
    "visual": [
      "laptop open to the paper draft",
      "three anchor papers beside the keyboard",
      "morning light coming through the window"
    ],
    "auditory": [
      "quiet apartment hum"
    ],
    "tactileBody": [
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
  }
}
```

## body script (296 words)

Begin with one easy breath in, and one slower breath out. Let the posture be simple: feet on the floor, shoulders allowed to drop, jaw unclenched, hands resting near the laptop open to the paper draft. With current energy around 3 out of 10, this may not feel like a high-power start; it may feel more like a low but usable body coming online. What might the body notice first—the contact of the feet with the floor, the weight of the chair, the warmth of the second coffee in reach, or the quiet apartment hum around the room?

The body is working from a short night: 5.5 hours of sleep after a late bedtime, with some restlessness and less recovery than usual. A slightly elevated resting heart rate and low HRV can show up as heaviness, impatience, shallow breathing, or a sense that effort costs a little more. Yesterday or recently, 4200 steps and 22 active minutes suggest the body has moved, but not so much that it has a big reserve to spend. What might it feel like to respect that signal—steady rather than forceful, awake but not rushed, using breath and posture as the first support?

Imagine the next few moments organized around concrete cues: morning light through the window, three anchor papers beside the keyboard, phone face down, coffee or water available. Energy may stay low early, then become steadier later in the morning, with a stronger window around 9 and 10. What might the mind be thinking if the body starts by settling into one clear physical rhythm: breathe out, feel the feet, notice the page, sip coffee or water, return attention to the open draft? Let the body prepare by finding contact, steadiness, and enough energy for the next small movement.

## soul input

```json
{
  "topValues": [
    {
      "valueId": "independent-thinking",
      "name": "Independent Thinking",
      "emoji": "compass",
      "personalDefinition": "trusting my own questions before borrowing other people's",
      "feelsLikeLabels": [
        "mentally clear",
        "self-trusting",
        "unboxed"
      ],
      "dailySignLabels": [
        "having room to think",
        "making decisions faster"
      ]
    },
    {
      "valueId": "success",
      "name": "Success",
      "emoji": "trophy",
      "personalDefinition": "finishing what matters",
      "feelsLikeLabels": [
        "accomplished",
        "focused",
        "competent"
      ],
      "dailySignLabels": [
        "finishing what matters",
        "visible progress"
      ]
    },
    {
      "valueId": "open-mindedness",
      "name": "Open-Mindedness",
      "emoji": "telescope",
      "personalDefinition": "staying curious about answers I did not expect",
      "feelsLikeLabels": [
        "curious",
        "supported"
      ],
      "dailySignLabels": [
        "learning something"
      ]
    }
  ],
  "idealLife": {
    "statement": "A life where I think and write on my own questions",
    "lifeShapeLabels": [
      "independent research",
      "deep work mornings"
    ]
  }
}
```

## soul script (303 words)

Picture the day as a wide page with enough space for your own questions. Independent Thinking can sit at the center like a compass: trusting your own questions before borrowing other people’s. What might it feel like to move through the day mentally clear, self-trusting, and unboxed? What might the mind be thinking when there is room to think, and decisions begin to come faster because they are coming from inside rather than from noise around you? What might feel steady when a choice reflects your own reasoning? Maybe the page starts to resemble a life where you think and write on your own questions.

Now imagine Success not as pressure, but as the quiet satisfaction of finishing what matters. It may feel accomplished, focused, and competent, with visible progress leaving small evidence that your effort has a shape. What might it feel like to recognize completion without needing to make it louder than it is? What might the mind be thinking when it knows, simply, “this is what matters, and I am staying with it”? What might feel settled when competence is allowed to be calm? In this version of the day, success supports the life you described: independent research, deep work mornings, and work that belongs to your own questions.

Let Open-Mindedness widen the frame. Staying curious about answers you did not expect can bring a different kind of strength: curious, supported, willing to learn something without losing your own center. What might it feel like to meet the unexpected with interest instead of resistance? What might the mind be thinking when an unfamiliar answer becomes useful information? What might feel more spacious when curiosity and self-trust can exist together? The day can become a practice of thinking for yourself, finishing what matters, and remaining open enough to discover something new.

## full input

```json
{
  "mind": {
    "userGoal": {
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
    "prioritySchedule": [
      {
        "rank": 1,
        "title": "Draft related work section",
        "kind": "task",
        "priority": "high",
        "linkedValue": "Success",
        "energyCost": "high",
        "durationMinutes": 90,
        "scheduledStart": "09:00",
        "scheduledEnd": "10:30"
      },
      {
        "rank": 2,
        "title": "Answer TA emails",
        "kind": "task",
        "priority": "medium",
        "linkedValue": "Open-Mindedness",
        "energyCost": "low",
        "durationMinutes": 20,
        "scheduledStart": "13:00",
        "scheduledEnd": "13:20"
      },
      {
        "rank": 3,
        "title": "Prepare two reading group questions",
        "kind": "task",
        "priority": "medium",
        "linkedValue": "Open-Mindedness",
        "energyCost": "medium",
        "durationMinutes": 30,
        "scheduledStart": "15:00",
        "scheduledEnd": "15:30"
      }
    ]
  },
  "body": {
    "currentEnergyLevel": 3,
    "bodyState": "Low but usable energy, with a steadier window later in the morning.",
    "sleepSummary": {
      "summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration, some restlessness, low HRV, and slightly elevated resting heart rate.",
      "durationHours": 5.5,
      "targetHours": 7.5,
      "bedtime": "01:05",
      "wakeTime": "06:40",
      "sleepQualityScore": 68,
      "sleepEfficiencyPercent": 83,
      "awakeMinutes": 28,
      "restlessMinutes": 46,
      "hrvMs": 29,
      "restingHeartRate": 73
    },
    "activitySummary": "4200 steps; 22 active minutes; 1900 calories out",
    "recoverySummary": "resting heart rate 73 bpm; HRV 29 ms",
    "energyCurveInputs": {
      "sleep_hours": 5.5,
      "sleep_quality": 68,
      "steps": 4200,
      "active_minutes": 22,
      "resting_heart_rate": 73,
      "hrv_ms": 29,
      "calories_out": 1900
    },
    "hourlyEnergy": [
      {
        "hour": 6,
        "energyLevel": 3
      },
      {
        "hour": 7,
        "energyLevel": 3
      },
      {
        "hour": 8,
        "energyLevel": 4
      },
      {
        "hour": 9,
        "energyLevel": 5
      },
      {
        "hour": 10,
        "energyLevel": 5
      },
      {
        "hour": 11,
        "energyLevel": 4
      },
      {
        "hour": 12,
        "energyLevel": 4
      },
      {
        "hour": 13,
        "energyLevel": 3
      },
      {
        "hour": 14,
        "energyLevel": 3
      },
      {
        "hour": 15,
        "energyLevel": 4
      },
      {
        "hour": 16,
        "energyLevel": 5
      }
    ],
    "focusCues": {
      "visual": [
        "laptop open to the paper draft",
        "three anchor papers beside the keyboard",
        "morning light coming through the window"
      ],
      "auditory": [
        "quiet apartment hum"
      ],
      "tactileBody": [
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
    }
  },
  "value": {
    "topValues": [
      {
        "valueId": "independent-thinking",
        "name": "Independent Thinking",
        "emoji": "compass",
        "personalDefinition": "trusting my own questions before borrowing other people's",
        "feelsLikeLabels": [
          "mentally clear",
          "self-trusting",
          "unboxed"
        ],
        "dailySignLabels": [
          "having room to think",
          "making decisions faster"
        ]
      },
      {
        "valueId": "success",
        "name": "Success",
        "emoji": "trophy",
        "personalDefinition": "finishing what matters",
        "feelsLikeLabels": [
          "accomplished",
          "focused",
          "competent"
        ],
        "dailySignLabels": [
          "finishing what matters",
          "visible progress"
        ]
      },
      {
        "valueId": "open-mindedness",
        "name": "Open-Mindedness",
        "emoji": "telescope",
        "personalDefinition": "staying curious about answers I did not expect",
        "feelsLikeLabels": [
          "curious",
          "supported"
        ],
        "dailySignLabels": [
          "learning something"
        ]
      }
    ],
    "idealLife": {
      "statement": "A life where I think and write on my own questions",
      "lifeShapeLabels": [
        "independent research",
        "deep work mornings"
      ]
    }
  }
}
```

## full script (323 words)

Begin with the body as it is today: low but usable energy, shaped by 5.5 hours of sleep, a late bedtime, some restlessness, low HRV, and a slightly elevated resting heart rate. Imagine settling into a posture that does not demand perfection: feet on the floor, breath steady enough, second coffee or water within reach. Morning light comes through the window, the laptop is open to the paper draft, three anchor papers sit beside the keyboard, the apartment hum is quiet, and the phone is face down. What might it feel like to work with limited recovery without treating that as failure? What might the mind be thinking as it gathers one clear next sentence? What might the body notice as the steadier morning window begins to arrive? Now picture 9:00 to 10:30 receiving the largest share of attention. The related work section is the main scene: ninety minutes, high energy cost, and directly tied to Success as finishing what matters. Maybe the draft starts unevenly, then a few claims begin to connect. What might it feel like to compare the three anchor papers and choose the thread that belongs in this section? What might the mind be thinking when it trusts its own question before borrowing someone else’s framing? What might the body notice when the coffee taste, keyboard, and feet on the floor become cues for focus? Later, 13:00 to 13:20 holds TA emails: shorter, lighter, and a chance for Open-Mindedness through clear replies. At 15:00 to 15:30, two reading group questions take shape, with curiosity toward answers not expected. This day is not about proving endless stamina. It is about moving one workshop paper submission closer by the end of June 2026: related work, gap statement, full draft. Each focused segment can become visible progress toward becoming an independent researcher, building a life where thinking and writing on your own questions is normal. Credibly, today can move in that direction.

# maya_task

Models by arm: {"baseline":"gpt-5.5-2026-04-23","mind":"gpt-5.5-2026-04-23","body":"gpt-5.5-2026-04-23","soul":"gpt-5.5-2026-04-23"}
Word counts: {"baseline":262,"mind":333,"body":307,"soul":293}

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

## baseline script (262 words)

This preparation is for the related work writing block. The visible plan includes four pieces: Draft related work section for 90 minutes, Re-read anchor findings for 15 minutes, Draft gap statement for 20 minutes, and Connect related work to gap for 25 minutes. Before beginning, it may help to review these items as the full working sequence and note the total amount of planned time. The preparation can be kept simple: know which item comes first, how long each item is expected to take, and what the next item will be when one part is complete.

For the 90-minute related work section, the main preparation is to treat it as the largest writing block in the list. The 15-minute re-reading item can be prepared as a short review period, limited to anchor findings. The 20-minute gap statement item can be prepared as a focused drafting period for that specific statement. The 25-minute connection item can be prepared as a separate step that links the related work material to the gap statement. Keeping these items distinct can reduce the need to decide what to do next during the block.

A simple way to prepare is to write the four items in order with their durations beside them: 90 minutes, 15 minutes, 20 minutes, and 25 minutes. Leave space to mark completion after each item. If timing changes, the list can still provide a clear structure for continuing. The main purpose of this preparation is to make the writing block easier to start and easier to follow, using only the scheduled pieces already listed.

## mind input

```json
{
  "userGoal": {
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
  "focusTask": {
    "taskId": "maya-related-work",
    "title": "Draft related work section",
    "projectTitle": "CHI workshop paper",
    "scheduledStart": "09:00",
    "scheduledEnd": "10:30",
    "priority": "high",
    "linkedValue": "Success",
    "energyCost": "high",
    "durationMinutes": 90
  },
  "focusSubtasks": [
    {
      "subtaskId": "maya-rw-1",
      "title": "Re-read the three anchor papers' findings sections",
      "order": 1,
      "durationMinutes": 15
    },
    {
      "subtaskId": "maya-rw-2",
      "title": "Draft the gap statement",
      "order": 2,
      "durationMinutes": 20
    },
    {
      "subtaskId": "maya-rw-3",
      "title": "Connect related work back to the gap",
      "order": 3,
      "durationMinutes": 25
    }
  ]
}
```

## mind script (333 words)

For the 09:00 to 10:30 block, the focus is the high-priority task, “Draft related work section,” for the CHI workshop paper. This 90-minute task connects to the larger aim of submitting one strong workshop paper by the end of June 2026, and to the broader priority of becoming an independent researcher: building a research life with independent judgment and work worth defending. Before beginning, imagine this task as one contained step in that path. What might it feel like to treat this section not as a final verdict, but as a place to clarify the paper’s argument? What might the mind be thinking when the purpose is simply to make the related work more coherent than it was before? The linked value is Success, so the rehearsal can center on making visible progress inside this one focused block.

The sequence begins with order 1: 15 minutes to re-read the three anchor papers’ findings sections. Picture attention moving through those findings with the question, “What matters here for my paper?” What might it feel like to notice one useful distinction, then another, without needing to solve the whole section at once? Next comes order 2: 20 minutes to draft the gap statement. What might the mind be thinking as it turns notes into one paragraph the advisor can react to? The aim is not perfection; the aim is a clear enough version of the gap that can be revised.

Then comes order 3: 25 minutes to connect related work back to the gap. Imagine the section beginning to point toward the paper’s contribution rather than sitting as a list of sources. What might it feel like when one sentence starts to create that connection? What might the mind be thinking when it checks whether each cited idea helps the reader understand why the gap matters? By the end of the block, the task can be viewed as a meaningful draft step: related work shaped toward one coherent section, supporting the workshop paper submission ahead.

## body input

```json
{
  "currentEnergyLevel": 3,
  "bodyState": "Tired and a little avoidant, but able to begin with a small writing target.",
  "sleepSummary": {
    "summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration, some restlessness, low HRV, and slightly elevated resting heart rate.",
    "durationHours": 5.5,
    "targetHours": 7.5,
    "bedtime": "01:05",
    "wakeTime": "06:40",
    "sleepQualityScore": 68,
    "sleepEfficiencyPercent": 83,
    "awakeMinutes": 28,
    "restlessMinutes": 46,
    "hrvMs": 29,
    "restingHeartRate": 73
  },
  "activitySummary": "light movement so far; morning work block beginning",
  "recoverySummary": "resting heart rate elevated relative to usual; HRV low",
  "energyCurveInputs": {
    "sleep_hours": 5.5,
    "sleep_quality": 68,
    "resting_heart_rate": 73,
    "hrv_ms": 29
  },
  "hourlyEnergy": [
    {
      "hour": 6,
      "energyLevel": 3
    },
    {
      "hour": 7,
      "energyLevel": 3
    },
    {
      "hour": 8,
      "energyLevel": 4
    },
    {
      "hour": 9,
      "energyLevel": 5
    },
    {
      "hour": 10,
      "energyLevel": 5
    },
    {
      "hour": 11,
      "energyLevel": 4
    },
    {
      "hour": 12,
      "energyLevel": 4
    },
    {
      "hour": 13,
      "energyLevel": 3
    },
    {
      "hour": 14,
      "energyLevel": 3
    },
    {
      "hour": 15,
      "energyLevel": 4
    },
    {
      "hour": 16,
      "energyLevel": 5
    }
  ],
  "focusCues": {
    "visual": [
      "paper draft open",
      "anchor papers beside the keyboard",
      "cursor at the related work section"
    ],
    "auditory": [
      "quiet apartment hum"
    ],
    "tactileBody": [
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
  }
}
```

## body script (307 words)

Begin with one slower breath in, and one longer breath out. Let the posture become simple: feet on the floor, seat supported, shoulders allowed to drop a little, jaw unclenched if it wants to. Current energy is low, around 3 out of 10, so this does not need to feel forceful. The body may be tired and a little avoidant, yet still able to begin with something small. What might it feel like to settle around the warm mug nearby, the quiet apartment hum, and the steady contact of the floor? What might the body notice first: heaviness, warmth, restlessness, or a small place that can soften?

The body is coming from a short night: about 5.5 hours of sleep after a late bedtime, with some restlessness and time awake. Recovery signals are also showing strain, with lower HRV and a resting heart rate that is a bit elevated. In plain terms, the system may be running with less reserve than usual. Light movement so far means there may not be much physical momentum yet. Energy may rise gradually through the morning, from 3 now toward 4 and 5 later, so the first step can be grounded rather than intense. What might the mind be thinking when it senses low reserve: reluctance, caution, or relief that only a small start is needed?

Now let the nearby cues mark the beginning: paper draft open, anchor papers beside the keyboard, cursor at the related work section, phone face down. Coffee smell, coffee or water taste, warm mug, feet on floor, quiet hum. What might the body notice as attention gathers around these concrete details: fingers ready, breath steadier, eyes landing on the cursor? A small writing target can begin from this physical setup, with the body supported, tiredness acknowledged, and focus held by the visible cues already in place.

## soul input

```json
{
  "topValues": [
    {
      "valueId": "independent-thinking",
      "name": "Independent Thinking",
      "emoji": "compass",
      "personalDefinition": "trusting my own questions before borrowing other people's",
      "feelsLikeLabels": [
        "mentally clear",
        "self-trusting",
        "unboxed"
      ],
      "dailySignLabels": [
        "having room to think",
        "making decisions faster"
      ]
    },
    {
      "valueId": "success",
      "name": "Success",
      "emoji": "trophy",
      "personalDefinition": "finishing what matters",
      "feelsLikeLabels": [
        "accomplished",
        "focused",
        "competent"
      ],
      "dailySignLabels": [
        "finishing what matters",
        "visible progress"
      ]
    },
    {
      "valueId": "open-mindedness",
      "name": "Open-Mindedness",
      "emoji": "telescope",
      "personalDefinition": "staying curious about answers I did not expect",
      "feelsLikeLabels": [
        "curious",
        "supported"
      ],
      "dailySignLabels": [
        "learning something"
      ]
    }
  ],
  "idealLife": {
    "statement": "A life where I think and write on my own questions",
    "lifeShapeLabels": [
      "independent research",
      "deep work mornings"
    ]
  }
}
```

## soul script (293 words)

Begin with the idea of a life where thinking and writing grow from your own questions. Independent Thinking may be present as trusting your own questions before borrowing other people’s, with a compass-like sense of direction that comes from within. What might it feel like to move with that kind of self-trusting clarity, mentally clear and unboxed? What might the mind be thinking when there is room to think, when decisions come faster because they come from an honest inner yes or no? Let that image stay simple: a person allowing their own questions to be real enough to guide the next choice.

Success can take shape as finishing what matters, not as pressure, but as a trophy-like marker of visible progress. What might it feel like to be accomplished, focused, and competent in a way that matches your own definition? What might the mind be thinking when progress is visible enough to notice, and enough to respect? Perhaps there is a quiet recognition: this is what finishing what matters can feel like. The image does not need to be dramatic. It can be the steady sense of something meaningful becoming more complete, one clear piece at a time.

Open-Mindedness may arrive like a telescope, staying curious about answers you did not expect. What might it feel like to be curious and supported at the same time? What might the mind be thinking when learning something becomes a sign that the day is alive, not fixed? Imagine independent research and deep work mornings as part of a larger life shape: not a perfect picture, just a direction. Across the day, these values can travel together: Independent Thinking asking its own questions, Success finishing what matters, and Open-Mindedness staying curious when the answer changes.

## full input

```json
{
  "mind": {
    "userGoal": {
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
    "focusTask": {
      "taskId": "maya-related-work",
      "title": "Draft related work section",
      "projectTitle": "CHI workshop paper",
      "scheduledStart": "09:00",
      "scheduledEnd": "10:30",
      "priority": "high",
      "linkedValue": "Success",
      "energyCost": "high",
      "durationMinutes": 90
    },
    "focusSubtasks": [
      {
        "subtaskId": "maya-rw-1",
        "title": "Re-read the three anchor papers' findings sections",
        "order": 1,
        "durationMinutes": 15
      },
      {
        "subtaskId": "maya-rw-2",
        "title": "Draft the gap statement",
        "order": 2,
        "durationMinutes": 20
      },
      {
        "subtaskId": "maya-rw-3",
        "title": "Connect related work back to the gap",
        "order": 3,
        "durationMinutes": 25
      }
    ]
  },
  "body": {
    "currentEnergyLevel": 3,
    "bodyState": "Tired and a little avoidant, but able to begin with a small writing target.",
    "sleepSummary": {
      "summary": "5.5 hours slept after a late bedtime; sleep quality 68/100 with short duration, some restlessness, low HRV, and slightly elevated resting heart rate.",
      "durationHours": 5.5,
      "targetHours": 7.5,
      "bedtime": "01:05",
      "wakeTime": "06:40",
      "sleepQualityScore": 68,
      "sleepEfficiencyPercent": 83,
      "awakeMinutes": 28,
      "restlessMinutes": 46,
      "hrvMs": 29,
      "restingHeartRate": 73
    },
    "activitySummary": "light movement so far; morning work block beginning",
    "recoverySummary": "resting heart rate elevated relative to usual; HRV low",
    "energyCurveInputs": {
      "sleep_hours": 5.5,
      "sleep_quality": 68,
      "resting_heart_rate": 73,
      "hrv_ms": 29
    },
    "hourlyEnergy": [
      {
        "hour": 6,
        "energyLevel": 3
      },
      {
        "hour": 7,
        "energyLevel": 3
      },
      {
        "hour": 8,
        "energyLevel": 4
      },
      {
        "hour": 9,
        "energyLevel": 5
      },
      {
        "hour": 10,
        "energyLevel": 5
      },
      {
        "hour": 11,
        "energyLevel": 4
      },
      {
        "hour": 12,
        "energyLevel": 4
      },
      {
        "hour": 13,
        "energyLevel": 3
      },
      {
        "hour": 14,
        "energyLevel": 3
      },
      {
        "hour": 15,
        "energyLevel": 4
      },
      {
        "hour": 16,
        "energyLevel": 5
      }
    ],
    "focusCues": {
      "visual": [
        "paper draft open",
        "anchor papers beside the keyboard",
        "cursor at the related work section"
      ],
      "auditory": [
        "quiet apartment hum"
      ],
      "tactileBody": [
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
    }
  },
  "value": {
    "topValues": [
      {
        "valueId": "independent-thinking",
        "name": "Independent Thinking",
        "emoji": "compass",
        "personalDefinition": "trusting my own questions before borrowing other people's",
        "feelsLikeLabels": [
          "mentally clear",
          "self-trusting",
          "unboxed"
        ],
        "dailySignLabels": [
          "having room to think",
          "making decisions faster"
        ]
      },
      {
        "valueId": "success",
        "name": "Success",
        "emoji": "trophy",
        "personalDefinition": "finishing what matters",
        "feelsLikeLabels": [
          "accomplished",
          "focused",
          "competent"
        ],
        "dailySignLabels": [
          "finishing what matters",
          "visible progress"
        ]
      },
      {
        "valueId": "open-mindedness",
        "name": "Open-Mindedness",
        "emoji": "telescope",
        "personalDefinition": "staying curious about answers I did not expect",
        "feelsLikeLabels": [
          "curious",
          "supported"
        ],
        "dailySignLabels": [
          "learning something"
        ]
      }
    ],
    "idealLife": {
      "statement": "A life where I think and write on my own questions",
      "lifeShapeLabels": [
        "independent research",
        "deep work mornings"
      ]
    }
  }
}
```

## full script (undefined words)


