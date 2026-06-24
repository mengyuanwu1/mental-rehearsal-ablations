# Full 3-Dim Filter Sweep

Exploratory sensitivity check for the clarified target: **Full 3-dim score greater than baseline, body, mind, and soul**. Tests are one-sided. `row_welch_p` is the most permissive screen; bootstrap and permutation are participant-cluster checks.

## Filters

| filter                                   | rows | participants | note                                                                                                       |
| ---------------------------------------- | ---- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| attention_row_pass                       | 142  | 67           | Drop explicit attention-check failures; keep rows without a shown attention check.                         |
| no_fast_5pct_attention_pass              | 134  | 67           | Drop explicit attention failures and the fastest 5% of remaining rows by elapsed time (threshold 231s).    |
| no_fast_10pct_attention_pass             | 127  | 67           | Drop explicit attention failures and the fastest 10% of remaining rows by elapsed time (threshold 258s).   |
| no_fast_15pct_attention_pass             | 120  | 65           | Drop explicit attention failures and the fastest 15% of remaining rows by elapsed time (threshold 287s).   |
| no_fast_20pct_attention_pass             | 113  | 63           | Drop explicit attention failures and the fastest 20% of remaining rows by elapsed time (threshold 309s).   |
| no_fast_25pct_attention_pass             | 106  | 61           | Drop explicit attention failures and the fastest 25% of remaining rows by elapsed time (threshold 319s).   |
| no_fast_30pct_attention_pass             | 99   | 57           | Drop explicit attention failures and the fastest 30% of remaining rows by elapsed time (threshold 326s).   |
| no_fast_180s_attention_pass              | 140  | 67           | Drop explicit attention failures and rows below 180s elapsed time.                                         |
| no_fast_240s_attention_pass              | 133  | 67           | Drop explicit attention failures and rows below 240s elapsed time.                                         |
| no_fast_300s_attention_pass              | 117  | 64           | Drop explicit attention failures and rows below 300s elapsed time.                                         |
| audio_ended_no_fast_10pct_attention_pass | 127  | 67           | Require both audio options ended, drop explicit attention failures, and drop fastest 10% (threshold 258s). |
| audio_ended_no_fast_20pct_attention_pass | 113  | 63           | Require both audio options ended, drop explicit attention failures, and drop fastest 20% (threshold 309s). |
| audio_ended_no_fast_25pct_attention_pass | 106  | 61           | Require both audio options ended, drop explicit attention failures, and drop fastest 25% (threshold 319s). |

## Can Full Beat Every Other Arm?

10 filter(s) produced significance against **all four** comparators across row-level Welch, clustered bootstrap CI, and participant-cluster permutation checks. The strongest screen by max row p / max permutation p is `attention_row_pass`.

| filter                                   | rows | participants | min_diff | max_row_p | min_boot_low        | max_perm_p | all_row_sig | all_boot_sig | all_perm_sig |
| ---------------------------------------- | ---- | ------------ | -------- | --------- | ------------------- | ---------- | ----------- | ------------ | ------------ |
| attention_row_pass                       | 142  | 67           | 0.99     | <0.001    | 0.4120959595959596  | 0.007      | True        | True         | True         |
| no_fast_180s_attention_pass              | 140  | 67           | 0.99     | <0.001    | 0.42205119361177285 | 0.008      | True        | True         | True         |
| no_fast_240s_attention_pass              | 133  | 67           | 1.00     | <0.001    | 0.4098567536931412  | 0.006      | True        | True         | True         |
| no_fast_5pct_attention_pass              | 134  | 67           | 0.98     | <0.001    | 0.3763877623351317  | 0.007      | True        | True         | True         |
| no_fast_10pct_attention_pass             | 127  | 67           | 0.99     | <0.001    | 0.3792429217570456  | 0.011      | True        | True         | True         |
| audio_ended_no_fast_10pct_attention_pass | 127  | 67           | 0.99     | <0.001    | 0.39840608465608585 | 0.014      | True        | True         | True         |
| no_fast_15pct_attention_pass             | 120  | 65           | 1.01     | <0.001    | 0.3675960939931533  | 0.018      | True        | True         | True         |
| no_fast_300s_attention_pass              | 117  | 64           | 1.01     | 0.001     | 0.34873151725140006 | 0.024      | True        | True         | True         |
| audio_ended_no_fast_20pct_attention_pass | 113  | 63           | 0.95     | 0.002     | 0.34609410952600234 | 0.021      | True        | True         | True         |
| no_fast_20pct_attention_pass             | 113  | 63           | 0.95     | 0.002     | 0.3649528480533246  | 0.021      | True        | True         | True         |
| audio_ended_no_fast_25pct_attention_pass | 106  | 61           | 0.95     | 0.003     | 0.3128188259109327  | 0.120      | True        | True         | False        |
| no_fast_25pct_attention_pass             | 106  | 61           | 0.95     | 0.003     | 0.307234814756618   | 0.129      | True        | True         | False        |
| no_fast_30pct_attention_pass             | 99   | 57           | 0.87     | 0.004     | 0.18602060207908483 | 0.169      | True        | True         | False        |

## Leading Filter Details

| filter                       | comparator | n_full | n_comparator | full_mean | comparator_mean | diff | row_welch_p | boot_ci_low | boot_ci_high | cluster_perm_p | row_sig | boot_sig | perm_sig |
| ---------------------------- | ---------- | ------ | ------------ | --------- | --------------- | ---- | ----------- | ----------- | ------------ | -------------- | ------- | -------- | -------- |
| attention_row_pass           | baseline   | 64     | 62           | 7.44      | 5.44            | 2.00 | <0.001      | 1.33        | 2.63         | <0.001         | True    | True     | True     |
| attention_row_pass           | body       | 64     | 54           | 7.44      | 6.44            | 0.99 | <0.001      | 0.41        | 1.60         | <0.001         | True    | True     | True     |
| attention_row_pass           | mind       | 64     | 58           | 7.44      | 6.41            | 1.03 | <0.001      | 0.50        | 1.55         | <0.001         | True    | True     | True     |
| attention_row_pass           | soul       | 64     | 46           | 7.44      | 6.34            | 1.10 | <0.001      | 0.54        | 1.71         | 0.007          | True    | True     | True     |
| no_fast_10pct_attention_pass | baseline   | 59     | 55           | 7.51      | 5.41            | 2.11 | <0.001      | 1.44        | 2.79         | <0.001         | True    | True     | True     |
| no_fast_10pct_attention_pass | body       | 59     | 48           | 7.51      | 6.53            | 0.99 | <0.001      | 0.38        | 1.62         | 0.002          | True    | True     | True     |
| no_fast_10pct_attention_pass | mind       | 59     | 51           | 7.51      | 6.35            | 1.16 | <0.001      | 0.59        | 1.74         | <0.001         | True    | True     | True     |
| no_fast_10pct_attention_pass | soul       | 59     | 41           | 7.51      | 6.46            | 1.06 | <0.001      | 0.43        | 1.70         | 0.011          | True    | True     | True     |
| no_fast_180s_attention_pass  | baseline   | 63     | 61           | 7.46      | 5.42            | 2.04 | <0.001      | 1.37        | 2.69         | <0.001         | True    | True     | True     |
| no_fast_180s_attention_pass  | body       | 63     | 53           | 7.46      | 6.47            | 0.99 | <0.001      | 0.42        | 1.58         | <0.001         | True    | True     | True     |
| no_fast_180s_attention_pass  | mind       | 63     | 57           | 7.46      | 6.39            | 1.07 | <0.001      | 0.56        | 1.60         | <0.001         | True    | True     | True     |
| no_fast_180s_attention_pass  | soul       | 63     | 46           | 7.46      | 6.34            | 1.12 | <0.001      | 0.53        | 1.71         | 0.008          | True    | True     | True     |
| no_fast_240s_attention_pass  | baseline   | 60     | 58           | 7.47      | 5.38            | 2.09 | <0.001      | 1.44        | 2.75         | <0.001         | True    | True     | True     |
| no_fast_240s_attention_pass  | body       | 60     | 51           | 7.47      | 6.47            | 1.00 | <0.001      | 0.41        | 1.63         | 0.001          | True    | True     | True     |
| no_fast_240s_attention_pass  | mind       | 60     | 54           | 7.47      | 6.40            | 1.07 | <0.001      | 0.52        | 1.64         | 0.001          | True    | True     | True     |
| no_fast_240s_attention_pass  | soul       | 60     | 43           | 7.47      | 6.40            | 1.06 | <0.001      | 0.47        | 1.70         | 0.006          | True    | True     | True     |
| no_fast_5pct_attention_pass  | baseline   | 60     | 58           | 7.47      | 5.38            | 2.09 | <0.001      | 1.44        | 2.74         | <0.001         | True    | True     | True     |
| no_fast_5pct_attention_pass  | body       | 60     | 52           | 7.47      | 6.49            | 0.98 | <0.001      | 0.38        | 1.57         | 0.002          | True    | True     | True     |
| no_fast_5pct_attention_pass  | mind       | 60     | 54           | 7.47      | 6.40            | 1.07 | <0.001      | 0.52        | 1.64         | <0.001         | True    | True     | True     |
| no_fast_5pct_attention_pass  | soul       | 60     | 44           | 7.47      | 6.36            | 1.11 | <0.001      | 0.55        | 1.70         | 0.007          | True    | True     | True     |

## Pooled Non-Full Check

This is **not** the same as beating each arm separately, but it answers whether Full beats the pooled non-Full alternatives.

| filter                                   | n_full | n_comparator | full_mean | comparator_mean | diff | row_welch_p | boot_ci_low | boot_ci_high | cluster_perm_p |
| ---------------------------------------- | ------ | ------------ | --------- | --------------- | ---- | ----------- | ----------- | ------------ | -------------- |
| no_fast_180s_attention_pass              | 63     | 217          | 7.46      | 6.13            | 1.33 | <0.001      | 0.88        | 1.83         | <0.001         |
| attention_row_pass                       | 64     | 220          | 7.44      | 6.13            | 1.31 | <0.001      | 0.86        | 1.78         | <0.001         |
| no_fast_10pct_attention_pass             | 59     | 195          | 7.51      | 6.15            | 1.36 | <0.001      | 0.89        | 1.86         | <0.001         |
| audio_ended_no_fast_10pct_attention_pass | 59     | 195          | 7.51      | 6.15            | 1.36 | <0.001      | 0.87        | 1.86         | <0.001         |
| no_fast_15pct_attention_pass             | 56     | 184          | 7.54      | 6.16            | 1.38 | <0.001      | 0.87        | 1.89         | <0.001         |
| no_fast_20pct_attention_pass             | 53     | 173          | 7.57      | 6.18            | 1.39 | <0.001      | 0.90        | 1.90         | <0.001         |
| audio_ended_no_fast_20pct_attention_pass | 53     | 173          | 7.57      | 6.18            | 1.39 | <0.001      | 0.89        | 1.91         | <0.001         |
| no_fast_300s_attention_pass              | 55     | 179          | 7.55      | 6.15            | 1.40 | <0.001      | 0.90        | 1.92         | <0.001         |
| no_fast_5pct_attention_pass              | 60     | 208          | 7.47      | 6.13            | 1.34 | <0.001      | 0.85        | 1.82         | <0.001         |
| no_fast_240s_attention_pass              | 60     | 206          | 7.47      | 6.13            | 1.34 | <0.001      | 0.85        | 1.83         | <0.001         |
| no_fast_25pct_attention_pass             | 51     | 161          | 7.60      | 6.23            | 1.37 | <0.001      | 0.85        | 1.92         | <0.001         |
| audio_ended_no_fast_25pct_attention_pass | 51     | 161          | 7.60      | 6.23            | 1.37 | <0.001      | 0.86        | 1.87         | <0.001         |
| no_fast_30pct_attention_pass             | 48     | 150          | 7.56      | 6.24            | 1.32 | <0.001      | 0.78        | 1.89         | <0.001         |

## Output Tables

- `analysis_outputs/tables/full_3dim_filter_comparisons.csv`
- `analysis_outputs/tables/full_3dim_filter_summary.csv`
- `analysis_outputs/tables/full_3dim_pooled_nonfull.csv`
