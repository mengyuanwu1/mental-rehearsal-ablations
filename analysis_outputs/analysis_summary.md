# Mental Rehearsal Ablation Analysis

Generated from read-only Google Sheet export.

## Dataset

- Pairwise trials: 360
- Unique pairwise participants: 68
- Final questionnaire rows: 49
- Unique questionnaire participants: 49
- Conditions: Baseline, Body, Mind, Soul, Full
- Scenario types: Daily and Task

## Overall Condition Readout

| condition | appearances | wins | win_rate_fmt | avg_rating_fmt |
| --------- | ----------- | ---- | ------------ | -------------- |
| Baseline  | 139         | 91.0 | 65%          | 7.53           |
| Mind      | 143         | 83.0 | 58%          | 7.35           |
| Full      | 143         | 78.0 | 55%          | 6.83           |
| Soul      | 150         | 55.0 | 37%          | 6.29           |
| Body      | 145         | 53.0 | 37%          | 6.43           |

## Daily vs Task

| scenarioType | condition | appearances | wins | win_rate_fmt | avg_rating_fmt |
| ------------ | --------- | ----------- | ---- | ------------ | -------------- |
| Daily        | Baseline  | 70          | 47.0 | 67%          | 7.60           |
| Daily        | Body      | 70          | 26.0 | 37%          | 6.24           |
| Daily        | Mind      | 70          | 40.0 | 57%          | 7.27           |
| Daily        | Soul      | 85          | 32.0 | 38%          | 6.28           |
| Daily        | Full      | 71          | 38.0 | 54%          | 6.70           |
| Task         | Baseline  | 69          | 44.0 | 64%          | 7.45           |
| Task         | Body      | 75          | 27.0 | 36%          | 6.61           |
| Task         | Mind      | 73          | 43.0 | 59%          | 7.42           |
| Task         | Soul      | 65          | 23.0 | 35%          | 6.29           |
| Task         | Full      | 72          | 40.0 | 56%          | 6.94           |

## Bradley-Terry Model

| condition | bt_log_odds_vs_baseline | odds_vs_baseline | p_value |
| --------- | ----------------------- | ---------------- | ------- |
| Baseline  | 0.00                    | 1.00x            |         |
| Body      | -0.93                   | 0.39x            | 0.000   |
| Mind      | -0.26                   | 0.77x            | 0.239   |
| Soul      | -0.92                   | 0.40x            | 0.000   |
| Full      | -0.39                   | 0.68x            | 0.083   |

## Final Questionnaire Top Options

| question               | top_option                | count | pct  |
| ---------------------- | ------------------------- | ----- | ---- |
| Perspective Preference | First person              | 31    | 63%  |
| Guidance Level         | Step by step              | 21    | 43%  |
| Background Audio       | Nature                    | 27    | 55%  |
| Script Length          | 0-5                       | 9     | 18%  |
| Tone Style             | Calm/supportive           | 36    | 73%  |
| Personalization Focus  | Day success visualization | 49    | 100% |
| Delivery Format        | Text + audio              | 26    | 53%  |

## Qualitative: Script Improvements

Source: final ideal-guidance responses because pairwise reason field is blank.

| theme                     | mentions | pct_of_text_responses | recommendation                                                                                  |
| ------------------------- | -------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| Specific to real task/day | 28       | 57%                   | Tie rehearsal to the user's real schedule, priority task, and concrete first step.              |
| Calm emotional support    | 16       | 33%                   | Keep tone supportive and low-pressure; avoid hype that makes the day feel larger.               |
| Step-by-step structure    | 15       | 31%                   | Use a predictable progression: check in, name priority, rehearse steps, close with next action. |
| Grounding and breath/body | 12       | 24%                   | Start from current body/energy state, then return to a body cue after visualization.            |
| Audio/ambience            | 8        | 16%                   | Support spoken/text guidance with optional calm background audio.                               |
| Visualization             | 8        | 16%                   | Use imagery when it clarifies the user's next behavior, not as generic fantasy.                 |
| Brevity and simplicity    | 7        | 14%                   | Offer a short default with optional expansion; many users want guidance, not a long essay.      |
| Obstacle coping           | 6        | 12%                   | Include one likely obstacle and one realistic recovery move.                                    |

Representative quotes:

- **Specific to real task/day:** "You are enough,  focused and very hard working. You make decisions that produces positive outcomes and that is enough for all the days." / "An overview of what is coming my way, how I'm going to tackle it and how I've already tackled days like today successfully."
- **Calm emotional support:** "My ideal mental rehearsal guidance to start the day would be a gentle voice telling me that everything will go well today" / "A good script with some encouragement and brief steps on what to do for the day. Nothing too hectic and overwhelming"
- **Step-by-step structure:** "A good script with some encouragement and brief steps on what to do for the day. Nothing too hectic and overwhelming" / "I prefer clear prioritises and clear ideas of tasks to have a clear picture of the day. Some calm and quiet me time to think about my plan of action"
- **Grounding and breath/body:** "A visualisation of what I want to achieve. A run down of my energy and how I might feel. A structured step by step guide of how I can achieve what I want." / "Start by noticing my body, senses, surroundings, and breathing.  Then move generally in to the tasks for the day.  Finally, returning to the body and breathing."
- **Audio/ambience:** "My ideal mental rehearsal guidance to start the day would be a gentle voice telling me that everything will go well today" / "Having to start the day with an audio message that reminds me of the activities I'm going to do, and then when I'm free being able to read that audio in writing."

## Qualitative: Ideal Mental Rehearsal

| theme                       | mentions | pct_of_text_responses | recommendation                                                         |
| --------------------------- | -------- | --------------------- | ---------------------------------------------------------------------- |
| Calm start / breathing      | 16       | 33%                   | Begin with calm check-in and breathing before task content.            |
| Step-by-step day planning   | 16       | 33%                   | Make the default flow feel like a concise guided plan for the day.     |
| Task focus / next action    | 13       | 27%                   | Name the most important task and close with the next concrete action.  |
| Emotional reassurance       | 10       | 20%                   | Add reassurance, but keep it realistic and tied to effort or response. |
| Audio/music/nature          | 8        | 16%                   | Offer audio and background sound as configurable layers.               |
| Brevity                     | 7        | 14%                   | Keep the main script short by default.                                 |
| Prayer/meditation analogies | 7        | 14%                   | Position rehearsal as compatible with existing morning rituals.        |
| Obstacle preparation        | 6        | 12%                   | Rehearse one bump and recovery plan.                                   |

Representative quotes:

- **Calm start / breathing:** "My ideal mental rehearsal guidance to start the day would be a gentle voice telling me that everything will go well today" / "I prefer clear prioritises and clear ideas of tasks to have a clear picture of the day. Some calm and quiet me time to think about my plan of action"
- **Step-by-step day planning:** "A good script with some encouragement and brief steps on what to do for the day. Nothing too hectic and overwhelming" / "I prefer clear prioritises and clear ideas of tasks to have a clear picture of the day. Some calm and quiet me time to think about my plan of action"
- **Task focus / next action:** "You are enough,  focused and very hard working. You make decisions that produces positive outcomes and that is enough for all the days." / "I talk about the day ahead and how it is going to go to myself. It helps me focus and understand time and how to spend it."
- **Emotional reassurance:** "My ideal mental rehearsal guidance to start the day would be a gentle voice telling me that everything will go well today" / "A good script with some encouragement and brief steps on what to do for the day. Nothing too hectic and overwhelming"
- **Audio/music/nature:** "My ideal mental rehearsal guidance to start the day would be a gentle voice telling me that everything will go well today" / "Having to start the day with an audio message that reminds me of the activities I'm going to do, and then when I'm free being able to read that audio in writing."

## Product Implications

1. Default script should be calm, specific, and structured: current users repeatedly ask for real task/day grounding plus a gentle step-by-step arc.
2. Keep scripts concise by default. Offer expansion or interactive steps rather than making every script long.
3. Combine body grounding with practical planning. Users like breathing/body check-ins when they lead into concrete action.
4. Include one obstacle rehearsal. It appears often enough in both preferences and ideal guidance to justify a standard slot.
5. Audio should be configurable, not mandatory. Nature/ambient/spoken layers matter, but some users choose none/readable text.

## Charts

- [bradley_terry_scores_vs_baseline.png](charts/bradley_terry_scores_vs_baseline.png)
- [condition_average_rating_by_daily_vs_task.png](charts/condition_average_rating_by_daily_vs_task.png)
- [condition_win_rate_by_daily_vs_task.png](charts/condition_win_rate_by_daily_vs_task.png)
- [direct_win_rate_vs_baseline_by_daily_vs_task.png](charts/direct_win_rate_vs_baseline_by_daily_vs_task.png)
- [final_backgroundaudio.png](charts/final_backgroundaudio.png)
- [final_deliveryformat.png](charts/final_deliveryformat.png)
- [final_guidancelevel.png](charts/final_guidancelevel.png)
- [final_personalizationfocus.png](charts/final_personalizationfocus.png)
- [final_perspectivepreference.png](charts/final_perspectivepreference.png)
- [final_scriptlength.png](charts/final_scriptlength.png)
- [final_tonestyle.png](charts/final_tonestyle.png)
- [qual_ideal_mental_rehearsal_themes.png](charts/qual_ideal_mental_rehearsal_themes.png)
- [qual_script_improvement_themes.png](charts/qual_script_improvement_themes.png)
