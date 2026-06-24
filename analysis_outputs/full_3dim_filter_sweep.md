# Full 3-Dim Filter Sweep

Exploratory sensitivity check for the clarified target: **Full 3-dim score greater than baseline, body, mind, and soul**. Tests are one-sided. `row_welch_p` is the most permissive screen; bootstrap and permutation are participant-cluster checks.

## Filters

| filter                                   | rows | participants | note                                                                                                       |
| ---------------------------------------- | ---- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| attention_row_pass                       | 55   | 23           | Drop explicit attention-check failures; keep rows without a shown attention check.                         |
| no_fast_5pct_attention_pass              | 52   | 23           | Drop explicit attention failures and the fastest 5% of remaining rows by elapsed time (threshold 196s).    |
| no_fast_10pct_attention_pass             | 49   | 23           | Drop explicit attention failures and the fastest 10% of remaining rows by elapsed time (threshold 223s).   |
| no_fast_15pct_attention_pass             | 46   | 23           | Drop explicit attention failures and the fastest 15% of remaining rows by elapsed time (threshold 257s).   |
| no_fast_20pct_attention_pass             | 44   | 22           | Drop explicit attention failures and the fastest 20% of remaining rows by elapsed time (threshold 266s).   |
| no_fast_25pct_attention_pass             | 41   | 21           | Drop explicit attention failures and the fastest 25% of remaining rows by elapsed time (threshold 281s).   |
| no_fast_30pct_attention_pass             | 38   | 20           | Drop explicit attention failures and the fastest 30% of remaining rows by elapsed time (threshold 300s).   |
| no_fast_180s_attention_pass              | 54   | 23           | Drop explicit attention failures and rows below 180s elapsed time.                                         |
| no_fast_240s_attention_pass              | 48   | 23           | Drop explicit attention failures and rows below 240s elapsed time.                                         |
| no_fast_300s_attention_pass              | 38   | 20           | Drop explicit attention failures and rows below 300s elapsed time.                                         |
| audio_ended_no_fast_10pct_attention_pass | 49   | 23           | Require both audio options ended, drop explicit attention failures, and drop fastest 10% (threshold 223s). |
| audio_ended_no_fast_20pct_attention_pass | 44   | 22           | Require both audio options ended, drop explicit attention failures, and drop fastest 20% (threshold 266s). |
| audio_ended_no_fast_25pct_attention_pass | 41   | 21           | Require both audio options ended, drop explicit attention failures, and drop fastest 25% (threshold 281s). |

## Can Full Beat Every Other Arm?

No filter below produced significance against **all four** comparators across all methods. The closest row-level screen is fastest-25%-removed, but it still misses mind and soul at p<0.05 and fails cluster checks.

| filter                                   | rows | participants | min_diff | max_row_p | min_boot_low         | max_perm_p | all_row_sig | all_boot_sig | all_perm_sig |
| ---------------------------------------- | ---- | ------------ | -------- | --------- | -------------------- | ---------- | ----------- | ------------ | ------------ |
| no_fast_25pct_attention_pass             | 41   | 21           | 0.86     | 0.059     | -0.42477240896358476 | 0.177      | False       | False        | False        |
| audio_ended_no_fast_25pct_attention_pass | 41   | 21           | 0.86     | 0.059     | -0.4583537581699343  | 0.192      | False       | False        | False        |
| no_fast_30pct_attention_pass             | 38   | 20           | 0.86     | 0.066     | -0.4872222222222205  | 0.271      | False       | False        | False        |
| no_fast_300s_attention_pass              | 38   | 20           | 0.86     | 0.066     | -0.4526893939393926  | 0.278      | False       | False        | False        |
| no_fast_20pct_attention_pass             | 44   | 22           | 0.64     | 0.116     | -0.4484145021645023  | 0.187      | False       | False        | False        |
| audio_ended_no_fast_20pct_attention_pass | 44   | 22           | 0.64     | 0.116     | -0.3518095238095238  | 0.197      | False       | False        | False        |
| no_fast_240s_attention_pass              | 48   | 23           | 0.50     | 0.173     | -0.5435801513587883  | 0.182      | False       | False        | False        |
| no_fast_15pct_attention_pass             | 46   | 23           | 0.50     | 0.173     | -0.580583333333332   | 0.184      | False       | False        | False        |
| no_fast_180s_attention_pass              | 54   | 23           | 0.45     | 0.180     | -0.5316754385964908  | 0.105      | False       | False        | False        |
| no_fast_5pct_attention_pass              | 52   | 23           | 0.45     | 0.180     | -0.5226740424430637  | 0.112      | False       | False        | False        |
| audio_ended_no_fast_10pct_attention_pass | 49   | 23           | 0.46     | 0.190     | -0.6410511363636368  | 0.176      | False       | False        | False        |
| no_fast_10pct_attention_pass             | 49   | 23           | 0.46     | 0.190     | -0.6458912037037033  | 0.187      | False       | False        | False        |
| attention_row_pass                       | 55   | 23           | 0.40     | 0.202     | -0.5669715828360328  | 0.176      | False       | False        | False        |

## Closest Filter Details

| filter                                   | comparator | n_full | n_comparator | full_mean | comparator_mean | diff | row_welch_p | boot_ci_low | boot_ci_high | cluster_perm_p | row_sig | boot_sig | perm_sig |
| ---------------------------------------- | ---------- | ------ | ------------ | --------- | --------------- | ---- | ----------- | ----------- | ------------ | -------------- | ------- | -------- | -------- |
| audio_ended_no_fast_25pct_attention_pass | baseline   | 14     | 15           | 7.26      | 5.24            | 2.02 | <0.001      | 0.73        | 3.10         | 0.012          | True    | True     | True     |
| audio_ended_no_fast_25pct_attention_pass | body       | 14     | 18           | 7.26      | 6.30            | 0.97 | 0.037       | -0.08       | 2.05         | 0.192          | True    | False    | False    |
| audio_ended_no_fast_25pct_attention_pass | mind       | 14     | 15           | 7.26      | 6.38            | 0.88 | 0.059       | -0.46       | 2.14         | 0.082          | False   | False    | False    |
| audio_ended_no_fast_25pct_attention_pass | soul       | 14     | 20           | 7.26      | 6.40            | 0.86 | 0.055       | -0.19       | 1.96         | 0.075          | False   | False    | False    |
| no_fast_20pct_attention_pass             | baseline   | 15     | 16           | 7.09      | 5.38            | 1.71 | 0.002       | 0.48        | 2.81         | 0.013          | True    | True     | True     |
| no_fast_20pct_attention_pass             | body       | 15     | 19           | 7.09      | 6.35            | 0.74 | 0.085       | -0.30       | 1.88         | 0.187          | False   | False    | False    |
| no_fast_20pct_attention_pass             | mind       | 15     | 17           | 7.09      | 6.10            | 0.99 | 0.042       | -0.20       | 2.21         | 0.064          | True    | False    | False    |
| no_fast_20pct_attention_pass             | soul       | 15     | 21           | 7.09      | 6.44            | 0.64 | 0.116       | -0.45       | 1.76         | 0.084          | False   | False    | False    |
| no_fast_25pct_attention_pass             | baseline   | 14     | 15           | 7.26      | 5.24            | 2.02 | <0.001      | 0.73        | 3.14         | 0.012          | True    | True     | True     |
| no_fast_25pct_attention_pass             | body       | 14     | 18           | 7.26      | 6.30            | 0.97 | 0.037       | -0.06       | 2.14         | 0.177          | True    | False    | False    |
| no_fast_25pct_attention_pass             | mind       | 14     | 15           | 7.26      | 6.38            | 0.88 | 0.059       | -0.42       | 2.16         | 0.074          | False   | False    | False    |
| no_fast_25pct_attention_pass             | soul       | 14     | 20           | 7.26      | 6.40            | 0.86 | 0.055       | -0.17       | 1.94         | 0.072          | False   | False    | False    |
| no_fast_300s_attention_pass              | baseline   | 13     | 15           | 7.26      | 5.24            | 2.01 | <0.001      | 0.68        | 3.14         | 0.011          | True    | True     | True     |
| no_fast_300s_attention_pass              | body       | 13     | 15           | 7.26      | 6.31            | 0.95 | 0.058       | -0.24       | 2.13         | 0.278          | False   | False    | False    |
| no_fast_300s_attention_pass              | mind       | 13     | 13           | 7.26      | 6.31            | 0.95 | 0.066       | -0.45       | 2.28         | 0.112          | False   | False    | False    |
| no_fast_300s_attention_pass              | soul       | 13     | 20           | 7.26      | 6.40            | 0.86 | 0.064       | -0.23       | 1.99         | 0.083          | False   | False    | False    |
| no_fast_30pct_attention_pass             | baseline   | 13     | 15           | 7.26      | 5.24            | 2.01 | <0.001      | 0.73        | 3.12         | 0.012          | True    | True     | True     |
| no_fast_30pct_attention_pass             | body       | 13     | 15           | 7.26      | 6.31            | 0.95 | 0.058       | -0.24       | 2.15         | 0.271          | False   | False    | False    |
| no_fast_30pct_attention_pass             | mind       | 13     | 13           | 7.26      | 6.31            | 0.95 | 0.066       | -0.49       | 2.31         | 0.116          | False   | False    | False    |
| no_fast_30pct_attention_pass             | soul       | 13     | 20           | 7.26      | 6.40            | 0.86 | 0.064       | -0.22       | 1.99         | 0.082          | False   | False    | False    |

## Pooled Non-Full Check

This is **not** the same as beating each arm separately, but it answers whether Full beats the pooled non-Full alternatives.

| filter                                   | n_full | n_comparator | full_mean | comparator_mean | diff | row_welch_p | boot_ci_low | boot_ci_high | cluster_perm_p |
| ---------------------------------------- | ------ | ------------ | --------- | --------------- | ---- | ----------- | ----------- | ------------ | -------------- |
| audio_ended_no_fast_25pct_attention_pass | 14     | 68           | 7.26      | 6.11            | 1.15 | 0.005       | 0.16        | 2.04         | 0.024          |
| no_fast_25pct_attention_pass             | 14     | 68           | 7.26      | 6.11            | 1.15 | 0.005       | 0.17        | 2.06         | 0.032          |
| no_fast_300s_attention_pass              | 13     | 63           | 7.26      | 6.08            | 1.17 | 0.007       | 0.21        | 2.12         | 0.035          |
| no_fast_30pct_attention_pass             | 13     | 63           | 7.26      | 6.08            | 1.17 | 0.007       | 0.15        | 2.14         | 0.039          |
| no_fast_5pct_attention_pass              | 18     | 86           | 6.93      | 6.03            | 0.90 | 0.014       | 0.10        | 1.76         | 0.010          |
| audio_ended_no_fast_20pct_attention_pass | 15     | 73           | 7.09      | 6.11            | 0.98 | 0.015       | 0.07        | 1.89         | 0.026          |
| no_fast_20pct_attention_pass             | 15     | 73           | 7.09      | 6.11            | 0.98 | 0.015       | 0.10        | 1.91         | 0.029          |
| no_fast_180s_attention_pass              | 18     | 90           | 6.93      | 6.05            | 0.87 | 0.016       | 0.06        | 1.74         | 0.027          |
| attention_row_pass                       | 19     | 91           | 6.88      | 6.06            | 0.82 | 0.018       | 0.02        | 1.67         | 0.026          |
| audio_ended_no_fast_10pct_attention_pass | 16     | 82           | 6.94      | 6.04            | 0.90 | 0.023       | 0.01        | 1.88         | 0.018          |
| no_fast_10pct_attention_pass             | 16     | 82           | 6.94      | 6.04            | 0.90 | 0.023       | 0.01        | 1.90         | 0.018          |
| no_fast_240s_attention_pass              | 16     | 80           | 6.94      | 6.04            | 0.90 | 0.024       | 0.01        | 1.90         | 0.014          |
| no_fast_15pct_attention_pass             | 16     | 76           | 6.94      | 6.07            | 0.87 | 0.028       | -0.05       | 1.84         | 0.022          |

## Output Tables

- `analysis_outputs/tables/full_3dim_filter_comparisons.csv`
- `analysis_outputs/tables/full_3dim_filter_summary.csv`
- `analysis_outputs/tables/full_3dim_pooled_nonfull.csv`
