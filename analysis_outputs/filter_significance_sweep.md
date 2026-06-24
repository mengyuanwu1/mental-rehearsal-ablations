# Filter and Significance Sweep

Exploratory follow-up analysis for response sheets with body/task/value dimension ratings. One-sided tests ask whether each target condition is higher than baseline. Treat as sensitivity analysis, not preregistered confirmatory evidence.

## Filters Tried

| filter                                  | rows | participants | note                                                                                                 |
| --------------------------------------- | ---- | ------------ | ---------------------------------------------------------------------------------------------------- |
| all_followup                            | 143  | 67           | All rows from response sheets with dimension ratings.                                                |
| attention_row_pass                      | 142  | 67           | Drop rows with explicit failed attention checks; keep rows without a shown check.                    |
| attention_participant_pass              | 141  | 66           | Drop any participant who ever failed an explicit attention check.                                    |
| v1_v2_v3_attention_pass                 | 101  | 46           | Use v1/v2/v3 follow-up protocol only; drop explicit attention failures.                              |
| v2_attention_pass                       | 25   | 13           | Use v2 follow-up protocol only; drop explicit attention failures.                                    |
| audio_ended_attention_pass              | 142  | 67           | Require both audio options to have ended; drop explicit attention failures.                          |
| no_fast_180s_attention_pass             | 140  | 67           | Require at least 180 seconds elapsed; drop explicit attention failures.                              |
| no_fast_240s_attention_pass             | 133  | 67           | Require at least 240 seconds elapsed; drop explicit attention failures.                              |
| no_fast_300s_attention_pass             | 117  | 64           | Require at least 300 seconds elapsed; drop explicit attention failures.                              |
| audio_ended_no_fast_240s_attention_pass | 133  | 67           | Require both audio options ended and at least 240 seconds elapsed; drop explicit attention failures. |

## Best Anchor-Hypothesis Result per Dimension

| hypothesis                          | filter                      | means        | mean_diff | row_p  | boot_ci_low | boot_ci_high | cluster_perm_p | sig_methods |
| ----------------------------------- | --------------------------- | ------------ | --------- | ------ | ----------- | ------------ | -------------- | ----------- |
| Body arm on body-state rating       | no_fast_180s_attention_pass | 8.15 vs 3.75 | 4.40      | <0.001 | 3.46        | 5.28         | <0.001         | 3           |
| Full arm on 3-dim anchor            | no_fast_180s_attention_pass | 7.46 vs 5.42 | 2.04      | <0.001 | 1.40        | 2.71         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | no_fast_300s_attention_pass | 7.45 vs 5.62 | 1.83      | <0.001 | 1.17        | 2.51         | <0.001         | 3           |
| Mind arm on task-goal rating        | no_fast_300s_attention_pass | 7.93 vs 7.31 | 0.62      | 0.052  | -0.07       | 1.33         | 0.048          | 1           |
| Soul arm on value-connection rating | no_fast_300s_attention_pass | 7.58 vs 4.96 | 2.61      | <0.001 | 1.37        | 3.77         | <0.001         | 3           |

## All Anchor-Hypothesis Hits

| hypothesis                          | filter                                  | means        | mean_diff | row_p  | boot_ci_low | boot_ci_high | cluster_perm_p | sig_methods |
| ----------------------------------- | --------------------------------------- | ------------ | --------- | ------ | ----------- | ------------ | -------------- | ----------- |
| Body arm on body-state rating       | v2_attention_pass                       | 8.69 vs 2.75 | 5.94      | <0.001 | 3.76        | 7.69         | 0.033          | 3           |
| Body arm on body-state rating       | v1_v2_v3_attention_pass                 | 8.31 vs 3.79 | 4.51      | <0.001 | 3.41        | 5.54         | <0.001         | 3           |
| Body arm on body-state rating       | no_fast_240s_attention_pass             | 8.20 vs 3.79 | 4.40      | <0.001 | 3.51        | 5.34         | <0.001         | 3           |
| Body arm on body-state rating       | audio_ended_no_fast_240s_attention_pass | 8.20 vs 3.79 | 4.40      | <0.001 | 3.51        | 5.34         | <0.001         | 3           |
| Body arm on body-state rating       | no_fast_180s_attention_pass             | 8.15 vs 3.75 | 4.40      | <0.001 | 3.46        | 5.28         | <0.001         | 3           |
| Body arm on body-state rating       | attention_participant_pass              | 8.15 vs 3.81 | 4.34      | <0.001 | 3.42        | 5.24         | <0.001         | 3           |
| Body arm on body-state rating       | attention_row_pass                      | 8.13 vs 3.81 | 4.32      | <0.001 | 3.41        | 5.20         | <0.001         | 3           |
| Body arm on body-state rating       | audio_ended_attention_pass              | 8.13 vs 3.81 | 4.32      | <0.001 | 3.41        | 5.20         | <0.001         | 3           |
| Body arm on body-state rating       | all_followup                            | 8.13 vs 3.81 | 4.32      | <0.001 | 3.42        | 5.22         | <0.001         | 3           |
| Body arm on body-state rating       | no_fast_300s_attention_pass             | 8.12 vs 3.83 | 4.29      | <0.001 | 3.45        | 5.21         | <0.001         | 3           |
| Full arm on 3-dim anchor            | no_fast_300s_attention_pass             | 7.55 vs 5.37 | 2.18      | <0.001 | 1.52        | 2.84         | <0.001         | 3           |
| Full arm on 3-dim anchor            | no_fast_240s_attention_pass             | 7.47 vs 5.38 | 2.09      | <0.001 | 1.46        | 2.77         | <0.001         | 3           |
| Full arm on 3-dim anchor            | audio_ended_no_fast_240s_attention_pass | 7.47 vs 5.38 | 2.09      | <0.001 | 1.46        | 2.77         | <0.001         | 3           |
| Full arm on 3-dim anchor            | no_fast_180s_attention_pass             | 7.46 vs 5.42 | 2.04      | <0.001 | 1.40        | 2.71         | <0.001         | 3           |
| Full arm on 3-dim anchor            | all_followup                            | 7.44 vs 5.44 | 2.00      | <0.001 | 1.38        | 2.66         | <0.001         | 3           |
| Full arm on 3-dim anchor            | attention_row_pass                      | 7.44 vs 5.44 | 2.00      | <0.001 | 1.37        | 2.65         | <0.001         | 3           |
| Full arm on 3-dim anchor            | attention_participant_pass              | 7.44 vs 5.44 | 2.00      | <0.001 | 1.35        | 2.65         | <0.001         | 3           |
| Full arm on 3-dim anchor            | audio_ended_attention_pass              | 7.44 vs 5.44 | 2.00      | <0.001 | 1.37        | 2.65         | <0.001         | 3           |
| Full arm on 3-dim anchor            | v1_v2_v3_attention_pass                 | 7.09 vs 5.38 | 1.71      | <0.001 | 0.96        | 2.51         | <0.001         | 3           |
| Full arm on 3-dim anchor            | v2_attention_pass                       | 6.93 vs 4.88 | 2.05      | 0.014  | -0.07       | 3.74         | 0.175          | 1           |
| Full arm on rating + 3-dim anchor   | no_fast_300s_attention_pass             | 7.45 vs 5.62 | 1.83      | <0.001 | 1.17        | 2.51         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | no_fast_240s_attention_pass             | 7.35 vs 5.61 | 1.74      | <0.001 | 1.11        | 2.41         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | audio_ended_no_fast_240s_attention_pass | 7.35 vs 5.61 | 1.74      | <0.001 | 1.11        | 2.41         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | no_fast_180s_attention_pass             | 7.33 vs 5.68 | 1.65      | <0.001 | 1.01        | 2.30         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | all_followup                            | 7.30 vs 5.70 | 1.59      | <0.001 | 0.97        | 2.27         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | attention_row_pass                      | 7.30 vs 5.70 | 1.59      | <0.001 | 0.97        | 2.27         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | attention_participant_pass              | 7.30 vs 5.70 | 1.59      | <0.001 | 0.94        | 2.24         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | audio_ended_attention_pass              | 7.30 vs 5.70 | 1.59      | <0.001 | 0.97        | 2.27         | <0.001         | 3           |
| Full arm on rating + 3-dim anchor   | v1_v2_v3_attention_pass                 | 6.97 vs 5.61 | 1.36      | <0.001 | 0.55        | 2.14         | 0.001          | 3           |
| Full arm on rating + 3-dim anchor   | v2_attention_pass                       | 6.69 vs 5.00 | 1.69      | 0.030  | -0.30       | 3.34         | 0.157          | 1           |
| Mind arm on task-goal rating        | v2_attention_pass                       | 8.91 vs 7.12 | 1.78      | 0.043  | -0.04       | 3.73         | 0.314          | 1           |
| Mind arm on task-goal rating        | no_fast_300s_attention_pass             | 7.93 vs 7.31 | 0.62      | 0.052  | -0.07       | 1.33         | 0.048          | 1           |
| Mind arm on task-goal rating        | no_fast_240s_attention_pass             | 7.91 vs 7.36 | 0.55      | 0.076  | -0.18       | 1.29         | 0.131          | 0           |
| Mind arm on task-goal rating        | audio_ended_no_fast_240s_attention_pass | 7.91 vs 7.36 | 0.55      | 0.076  | -0.18       | 1.29         | 0.131          | 0           |
| Mind arm on task-goal rating        | v1_v2_v3_attention_pass                 | 7.93 vs 7.42 | 0.51      | 0.126  | -0.42       | 1.41         | 0.392          | 0           |
| Mind arm on task-goal rating        | attention_row_pass                      | 7.90 vs 7.47 | 0.43      | 0.120  | -0.30       | 1.22         | 0.248          | 0           |
| Mind arm on task-goal rating        | attention_participant_pass              | 7.90 vs 7.47 | 0.43      | 0.120  | -0.32       | 1.18         | 0.258          | 0           |
| Mind arm on task-goal rating        | audio_ended_attention_pass              | 7.90 vs 7.47 | 0.43      | 0.120  | -0.30       | 1.22         | 0.248          | 0           |
| Mind arm on task-goal rating        | no_fast_180s_attention_pass             | 7.88 vs 7.46 | 0.42      | 0.129  | -0.36       | 1.20         | 0.285          | 0           |
| Mind arm on task-goal rating        | all_followup                            | 7.88 vs 7.47 | 0.41      | 0.126  | -0.33       | 1.14         | 0.252          | 0           |
| Soul arm on value-connection rating | no_fast_300s_attention_pass             | 7.58 vs 4.96 | 2.61      | <0.001 | 1.37        | 3.77         | <0.001         | 3           |
| Soul arm on value-connection rating | no_fast_240s_attention_pass             | 7.49 vs 4.98 | 2.51      | <0.001 | 1.31        | 3.63         | <0.001         | 3           |
| Soul arm on value-connection rating | audio_ended_no_fast_240s_attention_pass | 7.49 vs 4.98 | 2.51      | <0.001 | 1.31        | 3.63         | <0.001         | 3           |
| Soul arm on value-connection rating | attention_participant_pass              | 7.40 vs 5.05 | 2.35      | <0.001 | 1.19        | 3.45         | <0.001         | 3           |
| Soul arm on value-connection rating | all_followup                            | 7.37 vs 5.05 | 2.32      | <0.001 | 1.19        | 3.46         | <0.001         | 3           |
| Soul arm on value-connection rating | attention_row_pass                      | 7.37 vs 5.05 | 2.32      | <0.001 | 1.18        | 3.43         | <0.001         | 3           |
| Soul arm on value-connection rating | audio_ended_attention_pass              | 7.37 vs 5.05 | 2.32      | <0.001 | 1.18        | 3.43         | <0.001         | 3           |
| Soul arm on value-connection rating | no_fast_180s_attention_pass             | 7.37 vs 5.05 | 2.32      | <0.001 | 1.15        | 3.42         | <0.001         | 3           |
| Soul arm on value-connection rating | v1_v2_v3_attention_pass                 | 6.97 vs 4.93 | 2.04      | <0.001 | 0.77        | 3.24         | <0.001         | 3           |
| Soul arm on value-connection rating | v2_attention_pass                       | 6.89 vs 4.75 | 2.14      | 0.056  | -1.23       | 5.27         | 0.173          | 0           |

## Full Arm Across 3-Dim Components

| filter                                  | measure          | means        | mean_diff | row_p  | boot_ci_low | boot_ci_high | cluster_perm_p | sig_methods |
| --------------------------------------- | ---------------- | ------------ | --------- | ------ | ----------- | ------------ | -------------- | ----------- |
| all_followup                            | body_state       | 7.84 vs 3.81 | 4.04      | <0.001 | 3.12        | 4.93         | <0.001         | 3           |
| all_followup                            | overall_anchor   | 7.30 vs 5.70 | 1.59      | <0.001 | 0.97        | 2.27         | <0.001         | 3           |
| all_followup                            | task_goal        | 7.20 vs 7.47 | -0.26     | 0.775  | -0.96       | 0.42         | 0.929          | 0           |
| all_followup                            | three_dim        | 7.44 vs 5.44 | 2.00      | <0.001 | 1.38        | 2.66         | <0.001         | 3           |
| all_followup                            | value_connection | 7.27 vs 5.05 | 2.22      | <0.001 | 1.34        | 3.10         | <0.001         | 3           |
| attention_participant_pass              | body_state       | 7.84 vs 3.81 | 4.04      | <0.001 | 3.08        | 4.92         | <0.001         | 3           |
| attention_participant_pass              | overall_anchor   | 7.30 vs 5.70 | 1.59      | <0.001 | 0.94        | 2.24         | <0.001         | 3           |
| attention_participant_pass              | task_goal        | 7.20 vs 7.47 | -0.26     | 0.775  | -0.92       | 0.37         | 0.915          | 0           |
| attention_participant_pass              | three_dim        | 7.44 vs 5.44 | 2.00      | <0.001 | 1.35        | 2.65         | <0.001         | 3           |
| attention_participant_pass              | value_connection | 7.27 vs 5.05 | 2.22      | <0.001 | 1.39        | 3.10         | <0.001         | 3           |
| attention_row_pass                      | body_state       | 7.84 vs 3.81 | 4.04      | <0.001 | 3.10        | 4.96         | <0.001         | 3           |
| attention_row_pass                      | overall_anchor   | 7.30 vs 5.70 | 1.59      | <0.001 | 0.97        | 2.27         | <0.001         | 3           |
| attention_row_pass                      | task_goal        | 7.20 vs 7.47 | -0.26     | 0.775  | -0.91       | 0.42         | 0.921          | 0           |
| attention_row_pass                      | three_dim        | 7.44 vs 5.44 | 2.00      | <0.001 | 1.37        | 2.65         | <0.001         | 3           |
| attention_row_pass                      | value_connection | 7.27 vs 5.05 | 2.22      | <0.001 | 1.36        | 3.07         | <0.001         | 3           |
| audio_ended_attention_pass              | body_state       | 7.84 vs 3.81 | 4.04      | <0.001 | 3.10        | 4.96         | <0.001         | 3           |
| audio_ended_attention_pass              | overall_anchor   | 7.30 vs 5.70 | 1.59      | <0.001 | 0.97        | 2.27         | <0.001         | 3           |
| audio_ended_attention_pass              | task_goal        | 7.20 vs 7.47 | -0.26     | 0.775  | -0.91       | 0.42         | 0.921          | 0           |
| audio_ended_attention_pass              | three_dim        | 7.44 vs 5.44 | 2.00      | <0.001 | 1.37        | 2.65         | <0.001         | 3           |
| audio_ended_attention_pass              | value_connection | 7.27 vs 5.05 | 2.22      | <0.001 | 1.36        | 3.07         | <0.001         | 3           |
| audio_ended_no_fast_240s_attention_pass | body_state       | 7.83 vs 3.79 | 4.04      | <0.001 | 3.12        | 4.98         | <0.001         | 3           |
| audio_ended_no_fast_240s_attention_pass | overall_anchor   | 7.35 vs 5.61 | 1.74      | <0.001 | 1.11        | 2.41         | <0.001         | 3           |
| audio_ended_no_fast_240s_attention_pass | task_goal        | 7.27 vs 7.36 | -0.10     | 0.603  | -0.77       | 0.57         | 0.768          | 0           |
| audio_ended_no_fast_240s_attention_pass | three_dim        | 7.47 vs 5.38 | 2.09      | <0.001 | 1.46        | 2.77         | <0.001         | 3           |
| audio_ended_no_fast_240s_attention_pass | value_connection | 7.30 vs 4.98 | 2.32      | <0.001 | 1.42        | 3.24         | <0.001         | 3           |
| no_fast_180s_attention_pass             | body_state       | 7.86 vs 3.75 | 4.10      | <0.001 | 3.15        | 5.02         | <0.001         | 3           |
| no_fast_180s_attention_pass             | overall_anchor   | 7.33 vs 5.68 | 1.65      | <0.001 | 1.01        | 2.30         | <0.001         | 3           |
| no_fast_180s_attention_pass             | task_goal        | 7.25 vs 7.46 | -0.21     | 0.720  | -0.84       | 0.43         | 0.863          | 0           |
| no_fast_180s_attention_pass             | three_dim        | 7.46 vs 5.42 | 2.04      | <0.001 | 1.40        | 2.71         | <0.001         | 3           |
| no_fast_180s_attention_pass             | value_connection | 7.27 vs 5.05 | 2.22      | <0.001 | 1.36        | 3.11         | <0.001         | 3           |
| no_fast_240s_attention_pass             | body_state       | 7.83 vs 3.79 | 4.04      | <0.001 | 3.12        | 4.98         | <0.001         | 3           |
| no_fast_240s_attention_pass             | overall_anchor   | 7.35 vs 5.61 | 1.74      | <0.001 | 1.11        | 2.41         | <0.001         | 3           |
| no_fast_240s_attention_pass             | task_goal        | 7.27 vs 7.36 | -0.10     | 0.603  | -0.77       | 0.57         | 0.768          | 0           |
| no_fast_240s_attention_pass             | three_dim        | 7.47 vs 5.38 | 2.09      | <0.001 | 1.46        | 2.77         | <0.001         | 3           |
| no_fast_240s_attention_pass             | value_connection | 7.30 vs 4.98 | 2.32      | <0.001 | 1.42        | 3.24         | <0.001         | 3           |
| no_fast_300s_attention_pass             | body_state       | 7.98 vs 3.83 | 4.15      | <0.001 | 3.25        | 5.15         | <0.001         | 3           |
| no_fast_300s_attention_pass             | overall_anchor   | 7.45 vs 5.62 | 1.83      | <0.001 | 1.17        | 2.51         | <0.001         | 3           |
| no_fast_300s_attention_pass             | task_goal        | 7.33 vs 7.31 | 0.01      | 0.487  | -0.63       | 0.76         | 0.694          | 0           |
| no_fast_300s_attention_pass             | three_dim        | 7.55 vs 5.37 | 2.18      | <0.001 | 1.52        | 2.84         | <0.001         | 3           |
| no_fast_300s_attention_pass             | value_connection | 7.35 vs 4.96 | 2.38      | <0.001 | 1.49        | 3.27         | <0.001         | 3           |
| v1_v2_v3_attention_pass                 | body_state       | 7.64 vs 3.79 | 3.85      | <0.001 | 2.65        | 4.97         | <0.001         | 3           |
| v1_v2_v3_attention_pass                 | overall_anchor   | 6.97 vs 5.61 | 1.36      | <0.001 | 0.55        | 2.14         | 0.001          | 3           |
| v1_v2_v3_attention_pass                 | task_goal        | 6.75 vs 7.42 | -0.67     | 0.940  | -1.45       | 0.16         | 0.975          | 0           |
| v1_v2_v3_attention_pass                 | three_dim        | 7.09 vs 5.38 | 1.71      | <0.001 | 0.96        | 2.51         | <0.001         | 3           |
| v1_v2_v3_attention_pass                 | value_connection | 6.89 vs 4.93 | 1.96      | <0.001 | 0.91        | 3.08         | <0.001         | 3           |
| v2_attention_pass                       | body_state       | 7.44 vs 2.75 | 4.69      | <0.001 | 1.44        | 7.30         | 0.078          | 2           |
| v2_attention_pass                       | overall_anchor   | 6.69 vs 5.00 | 1.69      | 0.030  | -0.30       | 3.34         | 0.157          | 1           |
| v2_attention_pass                       | task_goal        | 6.78 vs 7.12 | -0.35     | 0.629  | -1.84       | 1.16         | 0.945          | 0           |
| v2_attention_pass                       | three_dim        | 6.93 vs 4.88 | 2.05      | 0.014  | -0.07       | 3.74         | 0.175          | 1           |
| v2_attention_pass                       | value_connection | 6.56 vs 4.75 | 1.81      | 0.088  | -1.00       | 4.42         | 0.147          | 0           |

## Direct Baseline Paired Exact Tests

Direct baseline-paired cells are small. These are useful sanity checks, but most cells cannot reach p<0.05 without near-perfect wins.

| hypothesis                          | filter                                  | n  | mean_diff | wins | nonzero | exact_sign_p | exact_mean_perm_p |
| ----------------------------------- | --------------------------------------- | -- | --------- | ---- | ------- | ------------ | ----------------- |
| Body arm on body-state rating       | no_fast_300s_attention_pass             | 13 | 5.00      | 12   | 12      | <0.001       | <0.001            |
| Body arm on body-state rating       | all_followup                            | 14 | 4.43      | 12   | 13      | 0.002        | <0.001            |
| Body arm on body-state rating       | attention_row_pass                      | 14 | 4.43      | 12   | 13      | 0.002        | <0.001            |
| Body arm on body-state rating       | attention_participant_pass              | 14 | 4.43      | 12   | 13      | 0.002        | <0.001            |
| Body arm on body-state rating       | audio_ended_attention_pass              | 14 | 4.43      | 12   | 13      | 0.002        | <0.001            |
| Body arm on body-state rating       | no_fast_180s_attention_pass             | 14 | 4.43      | 12   | 13      | 0.002        | <0.001            |
| Body arm on body-state rating       | no_fast_240s_attention_pass             | 14 | 4.43      | 12   | 13      | 0.002        | <0.001            |
| Body arm on body-state rating       | audio_ended_no_fast_240s_attention_pass | 14 | 4.43      | 12   | 13      | 0.002        | <0.001            |
| Body arm on body-state rating       | v1_v2_v3_attention_pass                 | 9  | 5.44      | 9    | 9       | 0.002        | 0.002             |
| Body arm on body-state rating       | v2_attention_pass                       | 2  | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Full arm on 3-dim anchor            | no_fast_180s_attention_pass             | 21 | 2.17      | 17   | 20      | 0.001        | <0.001            |
| Full arm on 3-dim anchor            | no_fast_240s_attention_pass             | 20 | 2.28      | 17   | 20      | 0.001        | <0.001            |
| Full arm on 3-dim anchor            | no_fast_300s_attention_pass             | 20 | 2.28      | 17   | 20      | 0.001        | <0.001            |
| Full arm on 3-dim anchor            | audio_ended_no_fast_240s_attention_pass | 20 | 2.28      | 17   | 20      | 0.001        | <0.001            |
| Full arm on 3-dim anchor            | all_followup                            | 22 | 2.05      | 17   | 21      | 0.004        | <0.001            |
| Full arm on 3-dim anchor            | attention_row_pass                      | 22 | 2.05      | 17   | 21      | 0.004        | <0.001            |
| Full arm on 3-dim anchor            | attention_participant_pass              | 22 | 2.05      | 17   | 21      | 0.004        | <0.001            |
| Full arm on 3-dim anchor            | audio_ended_attention_pass              | 22 | 2.05      | 17   | 21      | 0.004        | <0.001            |
| Full arm on 3-dim anchor            | v1_v2_v3_attention_pass                 | 15 | 1.84      | 12   | 14      | 0.006        | 0.004             |
| Full arm on 3-dim anchor            | v2_attention_pass                       | 3  | 0.89      | 2    | 3       | 0.500        | 0.500             |
| Mind arm on task-goal rating        | no_fast_300s_attention_pass             | 11 | 1.00      | 7    | 10      | 0.172        | 0.172             |
| Mind arm on task-goal rating        | no_fast_240s_attention_pass             | 13 | 0.38      | 8    | 12      | 0.194        | 0.386             |
| Mind arm on task-goal rating        | audio_ended_no_fast_240s_attention_pass | 13 | 0.38      | 8    | 12      | 0.194        | 0.386             |
| Mind arm on task-goal rating        | all_followup                            | 14 | 0.07      | 8    | 13      | 0.291        | 0.500             |
| Mind arm on task-goal rating        | attention_row_pass                      | 14 | 0.07      | 8    | 13      | 0.291        | 0.500             |
| Mind arm on task-goal rating        | attention_participant_pass              | 14 | 0.07      | 8    | 13      | 0.291        | 0.500             |
| Mind arm on task-goal rating        | v1_v2_v3_attention_pass                 | 10 | 0.10      | 6    | 9       | 0.254        | 0.500             |
| Mind arm on task-goal rating        | v2_attention_pass                       | 1  | 1.00      | 1    | 1       | 0.500        | 0.500             |
| Mind arm on task-goal rating        | audio_ended_attention_pass              | 14 | 0.07      | 8    | 13      | 0.291        | 0.500             |
| Mind arm on task-goal rating        | no_fast_180s_attention_pass             | 14 | 0.07      | 8    | 13      | 0.291        | 0.500             |
| Soul arm on value-connection rating | no_fast_240s_attention_pass             | 11 | 3.82      | 9    | 11      | 0.033        | 0.012             |
| Soul arm on value-connection rating | audio_ended_no_fast_240s_attention_pass | 11 | 3.82      | 9    | 11      | 0.033        | 0.012             |
| Soul arm on value-connection rating | no_fast_300s_attention_pass             | 10 | 3.80      | 8    | 10      | 0.055        | 0.021             |
| Soul arm on value-connection rating | all_followup                            | 12 | 3.17      | 9    | 12      | 0.073        | 0.025             |
| Soul arm on value-connection rating | attention_row_pass                      | 12 | 3.17      | 9    | 12      | 0.073        | 0.025             |
| Soul arm on value-connection rating | attention_participant_pass              | 12 | 3.17      | 9    | 12      | 0.073        | 0.025             |
| Soul arm on value-connection rating | audio_ended_attention_pass              | 12 | 3.17      | 9    | 12      | 0.073        | 0.025             |
| Soul arm on value-connection rating | no_fast_180s_attention_pass             | 12 | 3.17      | 9    | 12      | 0.073        | 0.025             |
| Soul arm on value-connection rating | v1_v2_v3_attention_pass                 | 9  | 2.78      | 6    | 9       | 0.254        | 0.078             |
| Soul arm on value-connection rating | v2_attention_pass                       | 2  | 2.50      | 1    | 2       | 0.750        | 0.500             |

## Files

- `analysis_outputs/tables/filter_condition_summary.csv`
- `analysis_outputs/tables/filter_condition_mean_tests.csv`
- `analysis_outputs/tables/filter_direct_baseline_exact_tests.csv`
