# Filter and Significance Sweep

Exploratory follow-up analysis for response sheets with body/task/value dimension ratings. One-sided tests ask whether each target condition is higher than baseline. Treat as sensitivity analysis, not preregistered confirmatory evidence.

## Filters Tried

| filter                                  | rows | participants | note                                                                                                 |
| --------------------------------------- | ---- | ------------ | ---------------------------------------------------------------------------------------------------- |
| all_followup                            | 56   | 23           | All rows from response sheets with dimension ratings.                                                |
| attention_row_pass                      | 55   | 23           | Drop rows with explicit failed attention checks; keep rows without a shown check.                    |
| attention_participant_pass              | 54   | 22           | Drop any participant who ever failed an explicit attention check.                                    |
| v1_v2_attention_pass                    | 54   | 22           | Use v1/v2 follow-up protocol only; drop explicit attention failures.                                 |
| v2_attention_pass                       | 24   | 12           | Use v2 follow-up protocol only; drop explicit attention failures.                                    |
| audio_ended_attention_pass              | 55   | 23           | Require both audio options to have ended; drop explicit attention failures.                          |
| no_fast_180s_attention_pass             | 54   | 23           | Require at least 180 seconds elapsed; drop explicit attention failures.                              |
| no_fast_240s_attention_pass             | 48   | 23           | Require at least 240 seconds elapsed; drop explicit attention failures.                              |
| no_fast_300s_attention_pass             | 38   | 20           | Require at least 300 seconds elapsed; drop explicit attention failures.                              |
| audio_ended_no_fast_240s_attention_pass | 48   | 23           | Require both audio options ended and at least 240 seconds elapsed; drop explicit attention failures. |

## Best Anchor-Hypothesis Result per Dimension

| hypothesis                          | filter                      | means        | mean_diff | row_p  | boot_ci_low | boot_ci_high | cluster_perm_p | sig_methods |
| ----------------------------------- | --------------------------- | ------------ | --------- | ------ | ----------- | ------------ | -------------- | ----------- |
| Body arm on body-state rating       | no_fast_180s_attention_pass | 8.52 vs 3.29 | 5.24      | <0.001 | 3.97        | 6.62         | <0.001         | 3           |
| Full arm on 3-dim anchor            | no_fast_240s_attention_pass | 6.94 vs 5.24 | 1.70      | 0.002  | 0.50        | 2.90         | 0.008          | 3           |
| Full arm on rating + 3-dim anchor   | no_fast_240s_attention_pass | 6.81 vs 5.40 | 1.41      | 0.008  | 0.25        | 2.59         | 0.015          | 3           |
| Mind arm on task-goal rating        | v2_attention_pass           | 8.91 vs 7.12 | 1.78      | 0.043  | 0.03        | 3.78         | 0.275          | 2           |
| Soul arm on value-connection rating | no_fast_240s_attention_pass | 7.13 vs 4.83 | 2.30      | <0.001 | 0.49        | 4.03         | 0.005          | 3           |

## All Anchor-Hypothesis Hits

| hypothesis                          | filter                                  | means        | mean_diff | row_p  | boot_ci_low | boot_ci_high | cluster_perm_p | sig_methods |
| ----------------------------------- | --------------------------------------- | ------------ | --------- | ------ | ----------- | ------------ | -------------- | ----------- |
| Body arm on body-state rating       | v2_attention_pass                       | 8.83 vs 2.75 | 6.08      | <0.001 | 3.95        | 7.88         | 0.024          | 3           |
| Body arm on body-state rating       | no_fast_180s_attention_pass             | 8.52 vs 3.29 | 5.24      | <0.001 | 3.97        | 6.62         | <0.001         | 3           |
| Body arm on body-state rating       | no_fast_240s_attention_pass             | 8.55 vs 3.33 | 5.22      | <0.001 | 3.92        | 6.60         | <0.001         | 3           |
| Body arm on body-state rating       | audio_ended_no_fast_240s_attention_pass | 8.55 vs 3.33 | 5.22      | <0.001 | 3.92        | 6.60         | <0.001         | 3           |
| Body arm on body-state rating       | attention_participant_pass              | 8.60 vs 3.45 | 5.15      | <0.001 | 3.79        | 6.52         | <0.001         | 3           |
| Body arm on body-state rating       | v1_v2_attention_pass                    | 8.60 vs 3.45 | 5.15      | <0.001 | 3.79        | 6.52         | <0.001         | 3           |
| Body arm on body-state rating       | attention_row_pass                      | 8.52 vs 3.45 | 5.07      | <0.001 | 3.73        | 6.43         | <0.001         | 3           |
| Body arm on body-state rating       | audio_ended_attention_pass              | 8.52 vs 3.45 | 5.07      | <0.001 | 3.73        | 6.43         | <0.001         | 3           |
| Body arm on body-state rating       | all_followup                            | 8.50 vs 3.45 | 5.05      | <0.001 | 3.75        | 6.41         | <0.001         | 3           |
| Body arm on body-state rating       | no_fast_300s_attention_pass             | 8.13 vs 3.53 | 4.60      | <0.001 | 3.27        | 6.07         | <0.001         | 3           |
| Full arm on 3-dim anchor            | no_fast_300s_attention_pass             | 7.26 vs 5.24 | 2.01      | <0.001 | 0.68        | 3.16         | 0.011          | 3           |
| Full arm on 3-dim anchor            | no_fast_240s_attention_pass             | 6.94 vs 5.24 | 1.70      | 0.002  | 0.50        | 2.90         | 0.008          | 3           |
| Full arm on 3-dim anchor            | audio_ended_no_fast_240s_attention_pass | 6.94 vs 5.24 | 1.70      | 0.002  | 0.50        | 2.90         | 0.008          | 3           |
| Full arm on 3-dim anchor            | no_fast_180s_attention_pass             | 6.93 vs 5.38 | 1.54      | 0.002  | 0.37        | 2.64         | 0.021          | 3           |
| Full arm on 3-dim anchor            | all_followup                            | 6.88 vs 5.44 | 1.44      | 0.002  | 0.28        | 2.63         | 0.026          | 3           |
| Full arm on 3-dim anchor            | attention_row_pass                      | 6.88 vs 5.44 | 1.44      | 0.002  | 0.35        | 2.61         | 0.024          | 3           |
| Full arm on 3-dim anchor            | attention_participant_pass              | 6.88 vs 5.44 | 1.44      | 0.002  | 0.28        | 2.57         | 0.025          | 3           |
| Full arm on 3-dim anchor            | v1_v2_attention_pass                    | 6.88 vs 5.44 | 1.44      | 0.002  | 0.28        | 2.57         | 0.025          | 3           |
| Full arm on 3-dim anchor            | audio_ended_attention_pass              | 6.88 vs 5.44 | 1.44      | 0.002  | 0.35        | 2.61         | 0.024          | 3           |
| Full arm on 3-dim anchor            | v2_attention_pass                       | 6.93 vs 4.88 | 2.05      | 0.014  | -0.11       | 3.79         | 0.169          | 1           |
| Full arm on rating + 3-dim anchor   | no_fast_300s_attention_pass             | 7.17 vs 5.42 | 1.74      | 0.003  | 0.45        | 2.88         | 0.021          | 3           |
| Full arm on rating + 3-dim anchor   | no_fast_240s_attention_pass             | 6.81 vs 5.40 | 1.41      | 0.008  | 0.25        | 2.59         | 0.015          | 3           |
| Full arm on rating + 3-dim anchor   | audio_ended_no_fast_240s_attention_pass | 6.81 vs 5.40 | 1.41      | 0.008  | 0.25        | 2.59         | 0.015          | 3           |
| Full arm on rating + 3-dim anchor   | v2_attention_pass                       | 6.69 vs 5.00 | 1.69      | 0.030  | -0.32       | 3.29         | 0.168          | 1           |
| Full arm on rating + 3-dim anchor   | no_fast_180s_attention_pass             | 6.74 vs 5.62 | 1.12      | 0.021  | -0.04       | 2.27         | 0.075          | 1           |
| Full arm on rating + 3-dim anchor   | all_followup                            | 6.68 vs 5.70 | 0.98      | 0.033  | -0.18       | 2.11         | 0.093          | 1           |
| Full arm on rating + 3-dim anchor   | attention_row_pass                      | 6.68 vs 5.70 | 0.98      | 0.033  | -0.17       | 2.16         | 0.082          | 1           |
| Full arm on rating + 3-dim anchor   | attention_participant_pass              | 6.68 vs 5.70 | 0.98      | 0.033  | -0.13       | 2.18         | 0.088          | 1           |
| Full arm on rating + 3-dim anchor   | v1_v2_attention_pass                    | 6.68 vs 5.70 | 0.98      | 0.033  | -0.13       | 2.18         | 0.088          | 1           |
| Full arm on rating + 3-dim anchor   | audio_ended_attention_pass              | 6.68 vs 5.70 | 0.98      | 0.033  | -0.17       | 2.16         | 0.082          | 1           |
| Mind arm on task-goal rating        | v2_attention_pass                       | 8.91 vs 7.12 | 1.78      | 0.043  | 0.03        | 3.78         | 0.275          | 2           |
| Mind arm on task-goal rating        | no_fast_300s_attention_pass             | 8.38 vs 7.40 | 0.98      | 0.068  | -0.08       | 2.28         | 0.432          | 0           |
| Mind arm on task-goal rating        | no_fast_240s_attention_pass             | 7.79 vs 7.56 | 0.23      | 0.372  | -1.10       | 1.69         | 0.633          | 0           |
| Mind arm on task-goal rating        | audio_ended_no_fast_240s_attention_pass | 7.79 vs 7.56 | 0.23      | 0.372  | -1.10       | 1.69         | 0.633          | 0           |
| Mind arm on task-goal rating        | no_fast_180s_attention_pass             | 7.73 vs 7.81 | -0.08     | 0.551  | -1.43       | 1.28         | 0.905          | 0           |
| Mind arm on task-goal rating        | attention_row_pass                      | 7.73 vs 7.82 | -0.09     | 0.557  | -1.38       | 1.24         | 0.935          | 0           |
| Mind arm on task-goal rating        | attention_participant_pass              | 7.73 vs 7.82 | -0.09     | 0.557  | -1.35       | 1.24         | 0.929          | 0           |
| Mind arm on task-goal rating        | v1_v2_attention_pass                    | 7.73 vs 7.82 | -0.09     | 0.557  | -1.35       | 1.24         | 0.929          | 0           |
| Mind arm on task-goal rating        | audio_ended_attention_pass              | 7.73 vs 7.82 | -0.09     | 0.557  | -1.38       | 1.24         | 0.935          | 0           |
| Mind arm on task-goal rating        | all_followup                            | 7.70 vs 7.82 | -0.12     | 0.579  | -1.44       | 1.22         | 0.943          | 0           |
| Soul arm on value-connection rating | no_fast_300s_attention_pass             | 7.25 vs 4.80 | 2.45      | <0.001 | 0.38        | 4.45         | 0.022          | 3           |
| Soul arm on value-connection rating | no_fast_240s_attention_pass             | 7.13 vs 4.83 | 2.30      | <0.001 | 0.49        | 4.03         | 0.005          | 3           |
| Soul arm on value-connection rating | audio_ended_no_fast_240s_attention_pass | 7.13 vs 4.83 | 2.30      | <0.001 | 0.49        | 4.03         | 0.005          | 3           |
| Soul arm on value-connection rating | attention_participant_pass              | 7.00 vs 5.05 | 1.95      | 0.002  | 0.13        | 3.70         | 0.007          | 3           |
| Soul arm on value-connection rating | v1_v2_attention_pass                    | 7.00 vs 5.05 | 1.95      | 0.002  | 0.13        | 3.70         | 0.007          | 3           |
| Soul arm on value-connection rating | all_followup                            | 6.96 vs 5.05 | 1.92      | 0.003  | 0.11        | 3.55         | 0.007          | 3           |
| Soul arm on value-connection rating | attention_row_pass                      | 6.96 vs 5.05 | 1.92      | 0.003  | 0.22        | 3.53         | 0.006          | 3           |
| Soul arm on value-connection rating | audio_ended_attention_pass              | 6.96 vs 5.05 | 1.92      | 0.003  | 0.22        | 3.53         | 0.006          | 3           |
| Soul arm on value-connection rating | no_fast_180s_attention_pass             | 6.96 vs 5.05 | 1.91      | 0.003  | 0.22        | 3.61         | 0.011          | 3           |
| Soul arm on value-connection rating | v2_attention_pass                       | 7.00 vs 4.75 | 2.25      | 0.059  | -1.20       | 5.56         | 0.155          | 0           |

## Full Arm Across 3-Dim Components

| filter                                  | measure          | means        | mean_diff | row_p  | boot_ci_low | boot_ci_high | cluster_perm_p | sig_methods |
| --------------------------------------- | ---------------- | ------------ | --------- | ------ | ----------- | ------------ | -------------- | ----------- |
| all_followup                            | body_state       | 7.42 vs 3.45 | 3.97      | <0.001 | 2.07        | 5.81         | 0.004          | 3           |
| all_followup                            | overall_anchor   | 6.68 vs 5.70 | 0.98      | 0.033  | -0.18       | 2.11         | 0.093          | 1           |
| all_followup                            | task_goal        | 6.47 vs 7.82 | -1.34     | 0.994  | -2.32       | -0.32        | 0.999          | 0           |
| all_followup                            | three_dim        | 6.88 vs 5.44 | 1.44      | 0.002  | 0.28        | 2.63         | 0.026          | 3           |
| all_followup                            | value_connection | 6.74 vs 5.05 | 1.69      | 0.011  | 0.19        | 3.28         | 0.026          | 3           |
| attention_participant_pass              | body_state       | 7.42 vs 3.45 | 3.97      | <0.001 | 2.13        | 5.78         | <0.001         | 3           |
| attention_participant_pass              | overall_anchor   | 6.68 vs 5.70 | 0.98      | 0.033  | -0.13       | 2.18         | 0.088          | 1           |
| attention_participant_pass              | task_goal        | 6.47 vs 7.82 | -1.34     | 0.994  | -2.35       | -0.35        | 0.999          | 0           |
| attention_participant_pass              | three_dim        | 6.88 vs 5.44 | 1.44      | 0.002  | 0.28        | 2.57         | 0.025          | 3           |
| attention_participant_pass              | value_connection | 6.74 vs 5.05 | 1.69      | 0.011  | 0.12        | 3.34         | 0.032          | 3           |
| attention_row_pass                      | body_state       | 7.42 vs 3.45 | 3.97      | <0.001 | 2.15        | 5.81         | <0.001         | 3           |
| attention_row_pass                      | overall_anchor   | 6.68 vs 5.70 | 0.98      | 0.033  | -0.17       | 2.16         | 0.082          | 1           |
| attention_row_pass                      | task_goal        | 6.47 vs 7.82 | -1.34     | 0.994  | -2.34       | -0.36        | 0.998          | 0           |
| attention_row_pass                      | three_dim        | 6.88 vs 5.44 | 1.44      | 0.002  | 0.35        | 2.61         | 0.024          | 3           |
| attention_row_pass                      | value_connection | 6.74 vs 5.05 | 1.69      | 0.011  | 0.10        | 3.30         | 0.025          | 3           |
| audio_ended_attention_pass              | body_state       | 7.42 vs 3.45 | 3.97      | <0.001 | 2.15        | 5.81         | <0.001         | 3           |
| audio_ended_attention_pass              | overall_anchor   | 6.68 vs 5.70 | 0.98      | 0.033  | -0.17       | 2.16         | 0.082          | 1           |
| audio_ended_attention_pass              | task_goal        | 6.47 vs 7.82 | -1.34     | 0.994  | -2.34       | -0.36        | 0.998          | 0           |
| audio_ended_attention_pass              | three_dim        | 6.88 vs 5.44 | 1.44      | 0.002  | 0.35        | 2.61         | 0.024          | 3           |
| audio_ended_attention_pass              | value_connection | 6.74 vs 5.05 | 1.69      | 0.011  | 0.10        | 3.30         | 0.025          | 3           |
| audio_ended_no_fast_240s_attention_pass | body_state       | 7.31 vs 3.33 | 3.98      | <0.001 | 2.13        | 5.68         | 0.005          | 3           |
| audio_ended_no_fast_240s_attention_pass | overall_anchor   | 6.81 vs 5.40 | 1.41      | 0.008  | 0.25        | 2.59         | 0.015          | 3           |
| audio_ended_no_fast_240s_attention_pass | task_goal        | 6.62 vs 7.56 | -0.93     | 0.940  | -1.94       | 0.13         | 0.977          | 0           |
| audio_ended_no_fast_240s_attention_pass | three_dim        | 6.94 vs 5.24 | 1.70      | 0.002  | 0.50        | 2.90         | 0.008          | 3           |
| audio_ended_no_fast_240s_attention_pass | value_connection | 6.88 vs 4.83 | 2.04      | 0.006  | 0.41        | 3.64         | 0.007          | 3           |
| no_fast_180s_attention_pass             | body_state       | 7.44 vs 3.29 | 4.16      | <0.001 | 2.27        | 5.94         | 0.002          | 3           |
| no_fast_180s_attention_pass             | overall_anchor   | 6.74 vs 5.62 | 1.12      | 0.021  | -0.04       | 2.27         | 0.075          | 1           |
| no_fast_180s_attention_pass             | task_goal        | 6.61 vs 7.81 | -1.20     | 0.987  | -2.18       | -0.23        | 0.993          | 0           |
| no_fast_180s_attention_pass             | three_dim        | 6.93 vs 5.38 | 1.54      | 0.002  | 0.37        | 2.64         | 0.021          | 3           |
| no_fast_180s_attention_pass             | value_connection | 6.72 vs 5.05 | 1.67      | 0.016  | -0.07       | 3.40         | 0.041          | 2           |
| no_fast_240s_attention_pass             | body_state       | 7.31 vs 3.33 | 3.98      | <0.001 | 2.13        | 5.68         | 0.005          | 3           |
| no_fast_240s_attention_pass             | overall_anchor   | 6.81 vs 5.40 | 1.41      | 0.008  | 0.25        | 2.59         | 0.015          | 3           |
| no_fast_240s_attention_pass             | task_goal        | 6.62 vs 7.56 | -0.93     | 0.940  | -1.94       | 0.13         | 0.977          | 0           |
| no_fast_240s_attention_pass             | three_dim        | 6.94 vs 5.24 | 1.70      | 0.002  | 0.50        | 2.90         | 0.008          | 3           |
| no_fast_240s_attention_pass             | value_connection | 6.88 vs 4.83 | 2.04      | 0.006  | 0.41        | 3.64         | 0.007          | 3           |
| no_fast_300s_attention_pass             | body_state       | 7.69 vs 3.53 | 4.16      | <0.001 | 1.92        | 6.06         | 0.009          | 3           |
| no_fast_300s_attention_pass             | overall_anchor   | 7.17 vs 5.42 | 1.74      | 0.003  | 0.45        | 2.88         | 0.021          | 3           |
| no_fast_300s_attention_pass             | task_goal        | 7.00 vs 7.40 | -0.40     | 0.735  | -1.36       | 0.57         | 0.969          | 0           |
| no_fast_300s_attention_pass             | three_dim        | 7.26 vs 5.24 | 2.01      | <0.001 | 0.68        | 3.16         | 0.011          | 3           |
| no_fast_300s_attention_pass             | value_connection | 7.08 vs 4.80 | 2.28      | 0.007  | 0.22        | 3.99         | 0.005          | 3           |
| v1_v2_attention_pass                    | body_state       | 7.42 vs 3.45 | 3.97      | <0.001 | 2.13        | 5.78         | <0.001         | 3           |
| v1_v2_attention_pass                    | overall_anchor   | 6.68 vs 5.70 | 0.98      | 0.033  | -0.13       | 2.18         | 0.088          | 1           |
| v1_v2_attention_pass                    | task_goal        | 6.47 vs 7.82 | -1.34     | 0.994  | -2.35       | -0.35        | 0.999          | 0           |
| v1_v2_attention_pass                    | three_dim        | 6.88 vs 5.44 | 1.44      | 0.002  | 0.28        | 2.57         | 0.025          | 3           |
| v1_v2_attention_pass                    | value_connection | 6.74 vs 5.05 | 1.69      | 0.011  | 0.12        | 3.34         | 0.032          | 3           |
| v2_attention_pass                       | body_state       | 7.44 vs 2.75 | 4.69      | <0.001 | 1.45        | 7.31         | 0.083          | 2           |
| v2_attention_pass                       | overall_anchor   | 6.69 vs 5.00 | 1.69      | 0.030  | -0.32       | 3.29         | 0.168          | 1           |
| v2_attention_pass                       | task_goal        | 6.78 vs 7.12 | -0.35     | 0.629  | -1.79       | 1.21         | 0.955          | 0           |
| v2_attention_pass                       | three_dim        | 6.93 vs 4.88 | 2.05      | 0.014  | -0.11       | 3.79         | 0.169          | 1           |
| v2_attention_pass                       | value_connection | 6.56 vs 4.75 | 1.81      | 0.088  | -0.85       | 4.52         | 0.163          | 0           |

## Direct Baseline Paired Exact Tests

Direct baseline-paired cells are small. These are useful sanity checks, but most cells cannot reach p<0.05 without near-perfect wins.

| hypothesis                          | filter                                  | n | mean_diff | wins | nonzero | exact_sign_p | exact_mean_perm_p |
| ----------------------------------- | --------------------------------------- | - | --------- | ---- | ------- | ------------ | ----------------- |
| Body arm on body-state rating       | all_followup                            | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | attention_row_pass                      | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | attention_participant_pass              | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | v1_v2_attention_pass                    | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | v2_attention_pass                       | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | audio_ended_attention_pass              | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | no_fast_180s_attention_pass             | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | no_fast_240s_attention_pass             | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | no_fast_300s_attention_pass             | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Body arm on body-state rating       | audio_ended_no_fast_240s_attention_pass | 2 | 5.50      | 2    | 2       | 0.250        | 0.250             |
| Full arm on 3-dim anchor            | all_followup                            | 7 | 0.76      | 4    | 6       | 0.344        | 0.219             |
| Full arm on 3-dim anchor            | attention_row_pass                      | 7 | 0.76      | 4    | 6       | 0.344        | 0.219             |
| Full arm on 3-dim anchor            | attention_participant_pass              | 7 | 0.76      | 4    | 6       | 0.344        | 0.219             |
| Full arm on 3-dim anchor            | v1_v2_attention_pass                    | 7 | 0.76      | 4    | 6       | 0.344        | 0.219             |
| Full arm on 3-dim anchor            | audio_ended_attention_pass              | 7 | 0.76      | 4    | 6       | 0.344        | 0.219             |
| Full arm on 3-dim anchor            | no_fast_180s_attention_pass             | 6 | 1.00      | 4    | 5       | 0.188        | 0.219             |
| Full arm on 3-dim anchor            | no_fast_240s_attention_pass             | 5 | 1.20      | 4    | 5       | 0.188        | 0.219             |
| Full arm on 3-dim anchor            | no_fast_300s_attention_pass             | 5 | 1.20      | 4    | 5       | 0.188        | 0.219             |
| Full arm on 3-dim anchor            | audio_ended_no_fast_240s_attention_pass | 5 | 1.20      | 4    | 5       | 0.188        | 0.219             |
| Full arm on 3-dim anchor            | v2_attention_pass                       | 3 | 0.89      | 2    | 3       | 0.500        | 0.500             |
| Mind arm on task-goal rating        | no_fast_300s_attention_pass             | 3 | 0.67      | 2    | 2       | 0.250        | 0.250             |
| Mind arm on task-goal rating        | v2_attention_pass                       | 1 | 1.00      | 1    | 1       | 0.500        | 0.500             |
| Mind arm on task-goal rating        | no_fast_240s_attention_pass             | 5 | -0.80     | 3    | 4       | 0.312        | 0.562             |
| Mind arm on task-goal rating        | audio_ended_no_fast_240s_attention_pass | 5 | -0.80     | 3    | 4       | 0.312        | 0.562             |
| Mind arm on task-goal rating        | all_followup                            | 6 | -1.33     | 3    | 5       | 0.500        | 0.781             |
| Mind arm on task-goal rating        | attention_row_pass                      | 6 | -1.33     | 3    | 5       | 0.500        | 0.781             |
| Mind arm on task-goal rating        | attention_participant_pass              | 6 | -1.33     | 3    | 5       | 0.500        | 0.781             |
| Mind arm on task-goal rating        | v1_v2_attention_pass                    | 6 | -1.33     | 3    | 5       | 0.500        | 0.781             |
| Mind arm on task-goal rating        | audio_ended_attention_pass              | 6 | -1.33     | 3    | 5       | 0.500        | 0.781             |
| Mind arm on task-goal rating        | no_fast_180s_attention_pass             | 6 | -1.33     | 3    | 5       | 0.500        | 0.781             |
| Soul arm on value-connection rating | no_fast_240s_attention_pass             | 6 | 3.00      | 4    | 6       | 0.344        | 0.125             |
| Soul arm on value-connection rating | audio_ended_no_fast_240s_attention_pass | 6 | 3.00      | 4    | 6       | 0.344        | 0.125             |
| Soul arm on value-connection rating | no_fast_300s_attention_pass             | 5 | 2.80      | 3    | 5       | 0.500        | 0.188             |
| Soul arm on value-connection rating | all_followup                            | 7 | 2.00      | 4    | 7       | 0.500        | 0.195             |
| Soul arm on value-connection rating | attention_row_pass                      | 7 | 2.00      | 4    | 7       | 0.500        | 0.195             |
| Soul arm on value-connection rating | attention_participant_pass              | 7 | 2.00      | 4    | 7       | 0.500        | 0.195             |
| Soul arm on value-connection rating | v1_v2_attention_pass                    | 7 | 2.00      | 4    | 7       | 0.500        | 0.195             |
| Soul arm on value-connection rating | audio_ended_attention_pass              | 7 | 2.00      | 4    | 7       | 0.500        | 0.195             |
| Soul arm on value-connection rating | no_fast_180s_attention_pass             | 7 | 2.00      | 4    | 7       | 0.500        | 0.195             |
| Soul arm on value-connection rating | v2_attention_pass                       | 2 | 2.50      | 1    | 2       | 0.750        | 0.500             |

## Files

- `analysis_outputs/tables/filter_condition_summary.csv`
- `analysis_outputs/tables/filter_condition_mean_tests.csv`
- `analysis_outputs/tables/filter_direct_baseline_exact_tests.csv`
