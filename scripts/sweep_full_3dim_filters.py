from __future__ import annotations

import math
import sys
from pathlib import Path

import numpy as np
import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "scripts"))

import explore_filter_significance as base_analysis  # noqa: E402


INPUT_XLSX = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results_live.xlsx"
OUT_DIR = ROOT / "analysis_outputs"
TABLE_DIR = OUT_DIR / "tables"

COMPARATORS = ["baseline", "body", "mind", "soul"]


def normal_greater_p(diff: float, se: float) -> float:
    if not np.isfinite(diff) or not np.isfinite(se) or se <= 0:
        return float("nan")
    z = diff / se
    return 0.5 * math.erfc(z / math.sqrt(2.0))


def build_filters(df: pd.DataFrame) -> list[tuple[str, str, pd.DataFrame]]:
    attention = df[df["attentionCheckPassed"].ne(0)].copy()
    filters: list[tuple[str, str, pd.DataFrame]] = [
        (
            "attention_row_pass",
            "Drop explicit attention-check failures; keep rows without a shown attention check.",
            attention,
        )
    ]
    for pct in [0.05, 0.10, 0.15, 0.20, 0.25, 0.30]:
        threshold = float(attention["elapsedMs"].quantile(pct))
        filters.append(
            (
                f"no_fast_{int(pct * 100)}pct_attention_pass",
                f"Drop explicit attention failures and the fastest {pct:.0%} of remaining rows by elapsed time (threshold {threshold / 1000:.0f}s).",
                attention[attention["elapsedMs"].ge(threshold)].copy(),
            )
        )
    for seconds in [180, 240, 300]:
        filters.append(
            (
                f"no_fast_{seconds}s_attention_pass",
                f"Drop explicit attention failures and rows below {seconds}s elapsed time.",
                attention[attention["elapsedMs"].ge(seconds * 1000)].copy(),
            )
        )
    ended = attention[attention["leftAudioEnded"].eq(True) & attention["rightAudioEnded"].eq(True)].copy()
    for pct in [0.10, 0.20, 0.25]:
        threshold = float(ended["elapsedMs"].quantile(pct))
        filters.append(
            (
                f"audio_ended_no_fast_{int(pct * 100)}pct_attention_pass",
                f"Require both audio options ended, drop explicit attention failures, and drop fastest {pct:.0%} (threshold {threshold / 1000:.0f}s).",
                ended[ended["elapsedMs"].ge(threshold)].copy(),
            )
        )
    return filters


def aggregate_for_cluster(tmp: pd.DataFrame, comparator: str) -> tuple[np.ndarray, np.ndarray]:
    participants = tmp["participantId"].dropna().unique()
    pid_index = {pid: i for i, pid in enumerate(participants)}
    sums = np.zeros((2, len(participants)), dtype=float)
    counts = np.zeros((2, len(participants)), dtype=float)
    condition_index = {"full": 0, comparator: 1}
    grouped = tmp.groupby(["participantId", "condition"])["three_dim"].agg(["sum", "count"]).reset_index()
    for _, row in grouped.iterrows():
        ci = condition_index[row["condition"]]
        pi = pid_index[row["participantId"]]
        sums[ci, pi] = float(row["sum"])
        counts[ci, pi] = float(row["count"])
    return sums, counts


def cluster_bootstrap(
    tmp: pd.DataFrame,
    comparator: str,
    rng: np.random.Generator,
    n_boot: int = 3000,
) -> tuple[float, float, float]:
    participants = tmp["participantId"].dropna().unique()
    if len(participants) < 2:
        return np.nan, np.nan, np.nan
    sums, counts = aggregate_for_cluster(tmp, comparator)
    diffs = []
    for _ in range(n_boot):
        sampled = rng.integers(0, len(participants), size=len(participants))
        weights = np.bincount(sampled, minlength=len(participants)).astype(float)
        full_count = float(np.dot(weights, counts[0]))
        comp_count = float(np.dot(weights, counts[1]))
        if full_count > 0 and comp_count > 0:
            full_mean = float(np.dot(weights, sums[0]) / full_count)
            comp_mean = float(np.dot(weights, sums[1]) / comp_count)
            diffs.append(full_mean - comp_mean)
    arr = np.array(diffs)
    if arr.size == 0:
        return np.nan, np.nan, np.nan
    ci_low, ci_high = np.percentile(arr, [2.5, 97.5])
    tail_p = (np.sum(arr <= 0) + 1) / (len(arr) + 1)
    return float(ci_low), float(ci_high), float(tail_p)


def participant_label_permutation(
    tmp: pd.DataFrame,
    comparator: str,
    observed_diff: float,
    rng: np.random.Generator,
    n_perm: int = 3000,
) -> float:
    groups = [
        (group["three_dim"].to_numpy(dtype=float), group["condition"].to_numpy(dtype=object))
        for _, group in tmp.groupby("participantId")
    ]
    count = 0
    valid = 0
    for _ in range(n_perm):
        full_values = []
        comp_values = []
        for values, labels in groups:
            shuffled = rng.permutation(labels)
            full_values.extend(values[shuffled == "full"])
            comp_values.extend(values[shuffled == comparator])
        if not full_values or not comp_values:
            continue
        valid += 1
        if float(np.mean(full_values) - np.mean(comp_values)) >= observed_diff - 1e-12:
            count += 1
    return float((count + 1) / (valid + 1)) if valid else float("nan")


def compare_full_to_condition(
    long_df: pd.DataFrame,
    comparator: str,
    seed: int,
) -> dict[str, object]:
    tmp = long_df[long_df["condition"].isin(["full", comparator])].dropna(subset=["three_dim"]).copy()
    full = tmp.loc[tmp["condition"].eq("full"), "three_dim"].astype(float)
    comp = tmp.loc[tmp["condition"].eq(comparator), "three_dim"].astype(float)
    diff = float(full.mean() - comp.mean())
    se = math.sqrt(float(full.var(ddof=1)) / len(full) + float(comp.var(ddof=1)) / len(comp))
    row_p = normal_greater_p(diff, se)
    rng = np.random.default_rng(seed)
    boot_low, boot_high, boot_p = cluster_bootstrap(tmp, comparator, rng)
    perm_p = participant_label_permutation(tmp, comparator, diff, np.random.default_rng(seed + 997))
    return {
        "comparator": comparator,
        "n_full": int(len(full)),
        "n_comparator": int(len(comp)),
        "full_mean": float(full.mean()),
        "comparator_mean": float(comp.mean()),
        "diff": diff,
        "row_welch_p": row_p,
        "boot_ci_low": boot_low,
        "boot_ci_high": boot_high,
        "boot_tail_p": boot_p,
        "cluster_perm_p": perm_p,
        "row_sig": bool(row_p < 0.05),
        "boot_sig": bool(boot_low > 0),
        "perm_sig": bool(perm_p < 0.05),
    }


def compare_full_to_pooled_other(long_df: pd.DataFrame, seed: int) -> dict[str, object]:
    pooled = long_df.copy()
    pooled["condition"] = np.where(pooled["condition"].eq("full"), "full", "non_full")
    return compare_full_to_condition(pooled, "non_full", seed)


def markdown_table(df: pd.DataFrame, columns: list[str], max_rows: int = 50) -> str:
    if df.empty:
        return "_No rows._"
    view = df[columns].head(max_rows).fillna("").copy()
    str_rows = [[str(value) for value in row] for row in view.to_numpy().tolist()]
    widths = [
        max(len(column), *(len(row[i]) for row in str_rows)) if str_rows else len(column)
        for i, column in enumerate(columns)
    ]
    header = "| " + " | ".join(column.ljust(widths[i]) for i, column in enumerate(columns)) + " |"
    sep = "| " + " | ".join("-" * widths[i] for i in range(len(columns))) + " |"
    body = ["| " + " | ".join(row[i].ljust(widths[i]) for i in range(len(columns))) + " |" for row in str_rows]
    return "\n".join([header, sep, *body])


def fmt_p(value: float) -> str:
    if pd.isna(value):
        return ""
    if value < 0.001:
        return "<0.001"
    return f"{value:.3f}"


def fmt_num(value: float) -> str:
    if pd.isna(value):
        return ""
    return f"{value:.2f}"


def write_report(filter_rows: pd.DataFrame, comparisons: pd.DataFrame, pooled: pd.DataFrame) -> None:
    summary = (
        comparisons.groupby("filter")
        .agg(
            rows=("rows", "first"),
            participants=("participants", "first"),
            min_diff=("diff", "min"),
            max_row_p=("row_welch_p", "max"),
            min_boot_low=("boot_ci_low", "min"),
            max_perm_p=("cluster_perm_p", "max"),
            all_row_sig=("row_sig", "all"),
            all_boot_sig=("boot_sig", "all"),
            all_perm_sig=("perm_sig", "all"),
        )
        .reset_index()
    )
    summary["all_three_methods"] = summary["all_row_sig"] & summary["all_boot_sig"] & summary["all_perm_sig"]
    summary = summary.sort_values(
        ["all_three_methods", "all_row_sig", "max_row_p", "max_perm_p"],
        ascending=[False, False, True, True],
    )
    success_filters = summary.loc[summary["all_three_methods"], "filter"].tolist()
    if success_filters:
        success_text = (
            f"{len(success_filters)} filter(s) produced significance against **all four** comparators "
            "across row-level Welch, clustered bootstrap CI, and participant-cluster permutation checks. "
            f"The strongest screen by max row p / max permutation p is `{success_filters[0]}`."
        )
    else:
        success_text = (
            "No filter below produced significance against **all four** comparators across all methods. "
            "Use the table to see which comparator or cluster check is the limiting case."
        )

    best = comparisons.sort_values(["filter", "cluster_perm_p"]).copy()
    best_filter_names = summary["filter"].head(5).tolist()
    detail = comparisons[comparisons["filter"].isin(best_filter_names)].sort_values(["filter", "comparator"]).copy()

    pooled_view = pooled.sort_values(["row_welch_p", "cluster_perm_p"]).copy()

    display_frames = [summary, detail, pooled_view]
    for frame in display_frames:
        for col in ["min_diff", "diff", "full_mean", "comparator_mean", "boot_ci_low", "boot_ci_high"]:
            if col in frame:
                frame[col] = frame[col].map(fmt_num)
        for col in ["max_row_p", "row_welch_p", "boot_tail_p", "cluster_perm_p", "max_perm_p"]:
            if col in frame:
                frame[col] = frame[col].map(fmt_p)

    report = f"""# Full 3-Dim Filter Sweep

Exploratory sensitivity check for the clarified target: **Full 3-dim score greater than baseline, body, mind, and soul**. Tests are one-sided. `row_welch_p` is the most permissive screen; bootstrap and permutation are participant-cluster checks.

## Filters

{markdown_table(filter_rows, ["filter", "rows", "participants", "note"], max_rows=30)}

## Can Full Beat Every Other Arm?

{success_text}

{markdown_table(summary, ["filter", "rows", "participants", "min_diff", "max_row_p", "min_boot_low", "max_perm_p", "all_row_sig", "all_boot_sig", "all_perm_sig"], max_rows=30)}

## Leading Filter Details

{markdown_table(detail, ["filter", "comparator", "n_full", "n_comparator", "full_mean", "comparator_mean", "diff", "row_welch_p", "boot_ci_low", "boot_ci_high", "cluster_perm_p", "row_sig", "boot_sig", "perm_sig"], max_rows=60)}

## Pooled Non-Full Check

This is **not** the same as beating each arm separately, but it answers whether Full beats the pooled non-Full alternatives.

{markdown_table(pooled_view, ["filter", "n_full", "n_comparator", "full_mean", "comparator_mean", "diff", "row_welch_p", "boot_ci_low", "boot_ci_high", "cluster_perm_p"], max_rows=30)}

## Output Tables

- `analysis_outputs/tables/full_3dim_filter_comparisons.csv`
- `analysis_outputs/tables/full_3dim_filter_summary.csv`
- `analysis_outputs/tables/full_3dim_pooled_nonfull.csv`
"""
    (OUT_DIR / "full_3dim_filter_sweep.md").write_text(report, encoding="utf-8")
    summary.to_csv(TABLE_DIR / "full_3dim_filter_summary.csv", index=False)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    TABLE_DIR.mkdir(parents=True, exist_ok=True)
    df = base_analysis.read_followup_rows(INPUT_XLSX)

    filter_records = []
    comparison_records = []
    pooled_records = []
    for filter_index, (name, note, filtered) in enumerate(build_filters(df)):
        filter_records.append(
            {
                "filter": name,
                "rows": int(len(filtered)),
                "participants": int(filtered["participantId"].nunique()),
                "note": note,
            }
        )
        long_df = base_analysis.make_long(filtered)
        for comp_index, comparator in enumerate(COMPARATORS):
            row = compare_full_to_condition(long_df, comparator, seed=31_000 + filter_index * 10 + comp_index)
            row.update(
                {
                    "filter": name,
                    "rows": int(len(filtered)),
                    "participants": int(filtered["participantId"].nunique()),
                }
            )
            comparison_records.append(row)
        pooled = compare_full_to_pooled_other(long_df, seed=41_000 + filter_index)
        pooled.update(
            {
                "filter": name,
                "rows": int(len(filtered)),
                "participants": int(filtered["participantId"].nunique()),
            }
        )
        pooled_records.append(pooled)

    filters = pd.DataFrame(filter_records)
    comparisons = pd.DataFrame(comparison_records)
    pooled = pd.DataFrame(pooled_records)
    comparisons.to_csv(TABLE_DIR / "full_3dim_filter_comparisons.csv", index=False)
    pooled.to_csv(TABLE_DIR / "full_3dim_pooled_nonfull.csv", index=False)
    filters.to_csv(TABLE_DIR / "full_3dim_filter_rows.csv", index=False)
    write_report(filters, comparisons, pooled)

    print(f"Wrote {OUT_DIR / 'full_3dim_filter_sweep.md'}")
    print(f"Wrote {TABLE_DIR / 'full_3dim_filter_comparisons.csv'}")
    print(f"Wrote {TABLE_DIR / 'full_3dim_filter_summary.csv'}")
    print(f"Wrote {TABLE_DIR / 'full_3dim_pooled_nonfull.csv'}")


if __name__ == "__main__":
    main()
