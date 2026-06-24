from __future__ import annotations

import argparse
import math
from dataclasses import dataclass
from pathlib import Path

import numpy as np
import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results_live.xlsx"
OUT_DIR = ROOT / "analysis_outputs"
TABLE_DIR = OUT_DIR / "tables"

CONDITIONS = ["baseline", "body", "mind", "soul", "full"]
FOLLOWUP_SHEETS = ["responses", "responses_v3", "responses_v2", "responses_v1"]

MEASURE_SPECS = {
    "rating": ("Rating", "Direct rating"),
    "body_state": ("BodyStateRating", "Body state"),
    "task_goal": ("TaskGoalRating", "Task goal"),
    "value_connection": ("ValueConnectionRating", "Value connection"),
    "ease": ("EaseRating", "Ease"),
}

ANCHOR_TESTS = [
    ("body", "body_state", "Body arm on body-state rating"),
    ("mind", "task_goal", "Mind arm on task-goal rating"),
    ("soul", "value_connection", "Soul arm on value-connection rating"),
    ("full", "three_dim", "Full arm on 3-dim anchor"),
    ("full", "overall_anchor", "Full arm on rating + 3-dim anchor"),
]


@dataclass(frozen=True)
class FilterSpec:
    name: str
    note: str


FILTERS = [
    FilterSpec("all_followup", "All rows from response sheets with dimension ratings."),
    FilterSpec("attention_row_pass", "Drop rows with explicit failed attention checks; keep rows without a shown check."),
    FilterSpec("attention_participant_pass", "Drop any participant who ever failed an explicit attention check."),
    FilterSpec("v1_v2_v3_attention_pass", "Use v1/v2/v3 follow-up protocol only; drop explicit attention failures."),
    FilterSpec("v2_attention_pass", "Use v2 follow-up protocol only; drop explicit attention failures."),
    FilterSpec("audio_ended_attention_pass", "Require both audio options to have ended; drop explicit attention failures."),
    FilterSpec("no_fast_180s_attention_pass", "Require at least 180 seconds elapsed; drop explicit attention failures."),
    FilterSpec("no_fast_240s_attention_pass", "Require at least 240 seconds elapsed; drop explicit attention failures."),
    FilterSpec("no_fast_300s_attention_pass", "Require at least 300 seconds elapsed; drop explicit attention failures."),
    FilterSpec(
        "audio_ended_no_fast_240s_attention_pass",
        "Require both audio options ended and at least 240 seconds elapsed; drop explicit attention failures.",
    ),
]


def scenario_scope(scenario_id: object) -> str:
    value = str(scenario_id)
    if value.endswith("_daily"):
        return "daily"
    if value.endswith("_task"):
        return "task"
    return "unknown"


def read_followup_rows(path: Path) -> pd.DataFrame:
    workbook = pd.ExcelFile(path)
    frames = []
    for sheet in FOLLOWUP_SHEETS:
        if sheet not in workbook.sheet_names:
            continue
        df = pd.read_excel(workbook, sheet_name=sheet)
        required = [
            "leftBodyStateRating",
            "rightBodyStateRating",
            "leftTaskGoalRating",
            "rightTaskGoalRating",
            "leftValueConnectionRating",
            "rightValueConnectionRating",
        ]
        if not all(col in df.columns for col in required):
            continue
        df = df.copy()
        df["sourceSheet"] = sheet
        frames.append(df)
    if not frames:
        raise RuntimeError(f"No follow-up response sheets with dimension ratings found in {path}")
    df = pd.concat(frames, ignore_index=True)
    for col in [
        "leftRating",
        "rightRating",
        "leftBodyStateRating",
        "rightBodyStateRating",
        "leftTaskGoalRating",
        "rightTaskGoalRating",
        "leftValueConnectionRating",
        "rightValueConnectionRating",
        "leftEaseRating",
        "rightEaseRating",
        "elapsedMs",
        "attentionCheckPassed",
    ]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
    df["scenarioType"] = df["scenarioId"].map(scenario_scope)
    return df


def apply_filter(df: pd.DataFrame, spec: FilterSpec) -> pd.DataFrame:
    out = df.copy()
    if "attention" in spec.name:
        out = out[out["attentionCheckPassed"].ne(0)].copy()
    if spec.name == "attention_participant_pass":
        failed_participants = set(df.loc[df["attentionCheckPassed"].eq(0), "participantId"].dropna())
        out = df[~df["participantId"].isin(failed_participants)].copy()
    if spec.name.startswith("v1_v2_v3"):
        out = out[out["sourceSheet"].isin(["responses_v1", "responses_v2", "responses_v3"])].copy()
    if spec.name.startswith("v2"):
        out = out[out["sourceSheet"].eq("responses_v2")].copy()
    if "audio_ended" in spec.name:
        out = out[out["leftAudioEnded"].eq(True) & out["rightAudioEnded"].eq(True)].copy()
    if "no_fast_180s" in spec.name:
        out = out[out["elapsedMs"].ge(180_000)].copy()
    if "no_fast_240s" in spec.name:
        out = out[out["elapsedMs"].ge(240_000)].copy()
    if "no_fast_300s" in spec.name:
        out = out[out["elapsedMs"].ge(300_000)].copy()
    return out


def make_long(df: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for side, other_side in [("left", "right"), ("right", "left")]:
        tmp = pd.DataFrame(
            {
                "sourceSheet": df["sourceSheet"],
                "responseId": df["responseId"],
                "participantId": df["participantId"],
                "assignmentId": df["assignmentId"],
                "trialIndex": df["trialIndex"],
                "scenarioId": df["scenarioId"],
                "scenarioType": df["scenarioType"],
                "condition": df[f"{side}Condition"],
                "opponent": df[f"{other_side}Condition"],
                "chosen": df["choice"].eq(side).astype(float),
                "rating": df[f"{side}Rating"],
                "body_state": df[f"{side}BodyStateRating"],
                "task_goal": df[f"{side}TaskGoalRating"],
                "value_connection": df[f"{side}ValueConnectionRating"],
                "ease": df[f"{side}EaseRating"],
            }
        )
        rows.append(tmp)
    long_df = pd.concat(rows, ignore_index=True)
    long_df["three_dim"] = long_df[["body_state", "task_goal", "value_connection"]].mean(axis=1)
    long_df["overall_anchor"] = long_df[["rating", "three_dim"]].mean(axis=1)
    return long_df


def normal_greater_p(z: float) -> float:
    if not np.isfinite(z):
        return float("nan")
    return 0.5 * math.erfc(z / math.sqrt(2.0))


def mean_diff(a: pd.Series, b: pd.Series) -> float:
    return float(a.dropna().mean() - b.dropna().mean())


def row_welch_z(long_df: pd.DataFrame, condition: str, measure: str) -> dict[str, float]:
    a = long_df.loc[long_df["condition"].eq(condition), measure].dropna().astype(float)
    b = long_df.loc[long_df["condition"].eq("baseline"), measure].dropna().astype(float)
    if len(a) < 2 or len(b) < 2:
        return {"row_z": np.nan, "row_p": np.nan}
    se = math.sqrt(float(a.var(ddof=1)) / len(a) + float(b.var(ddof=1)) / len(b))
    z = (float(a.mean()) - float(b.mean())) / se if se > 0 else np.nan
    return {"row_z": z, "row_p": normal_greater_p(z)}


def cluster_bootstrap(
    long_df: pd.DataFrame,
    condition: str,
    measure: str,
    rng: np.random.Generator,
    n_boot: int = 2000,
) -> dict[str, float]:
    subset = long_df[long_df["condition"].isin([condition, "baseline"])].copy()
    subset = subset.dropna(subset=[measure, "participantId"])
    participants = subset["participantId"].dropna().unique()
    if len(participants) < 2:
        return {"boot_ci_low": np.nan, "boot_ci_high": np.nan, "boot_tail_p": np.nan}
    pid_index = {pid: i for i, pid in enumerate(participants)}
    sums = np.zeros((2, len(participants)), dtype=float)
    counts = np.zeros((2, len(participants)), dtype=float)
    condition_index = {condition: 0, "baseline": 1}
    grouped = subset.groupby(["participantId", "condition"])[measure].agg(["sum", "count"]).reset_index()
    for _, row in grouped.iterrows():
        ci = condition_index[row["condition"]]
        pi = pid_index[row["participantId"]]
        sums[ci, pi] = float(row["sum"])
        counts[ci, pi] = float(row["count"])
    diffs = []
    for _ in range(n_boot):
        sampled = rng.integers(0, len(participants), size=len(participants))
        weights = np.bincount(sampled, minlength=len(participants)).astype(float)
        a_count = float(np.dot(weights, counts[0]))
        b_count = float(np.dot(weights, counts[1]))
        if a_count > 0 and b_count > 0:
            a_mean = float(np.dot(weights, sums[0]) / a_count)
            b_mean = float(np.dot(weights, sums[1]) / b_count)
            diffs.append(a_mean - b_mean)
    if not diffs:
        return {"boot_ci_low": np.nan, "boot_ci_high": np.nan, "boot_tail_p": np.nan}
    arr = np.array(diffs)
    return {
        "boot_ci_low": float(np.percentile(arr, 2.5)),
        "boot_ci_high": float(np.percentile(arr, 97.5)),
        "boot_tail_p": float((np.sum(arr <= 0) + 1) / (len(arr) + 1)),
    }


def participant_label_permutation(
    long_df: pd.DataFrame,
    condition: str,
    measure: str,
    rng: np.random.Generator,
    n_perm: int = 1500,
) -> dict[str, float]:
    subset = long_df[long_df["condition"].isin([condition, "baseline"])].copy()
    subset = subset.dropna(subset=[measure, "participantId"])
    if subset.empty:
        return {"cluster_perm_p": np.nan}
    obs = mean_diff(
        subset.loc[subset["condition"].eq(condition), measure],
        subset.loc[subset["condition"].eq("baseline"), measure],
    )
    groups = []
    for _, group in subset.groupby("participantId"):
        groups.append((group[measure].to_numpy(dtype=float), group["condition"].to_numpy(dtype=object)))
    count = 0
    valid = 0
    for _ in range(n_perm):
        a_values = []
        b_values = []
        for values, labels in groups:
            permuted = rng.permutation(labels)
            a_values.extend(values[permuted == condition])
            b_values.extend(values[permuted == "baseline"])
        if not a_values or not b_values:
            continue
        diff = float(np.mean(a_values) - np.mean(b_values))
        valid += 1
        if diff >= obs - 1e-12:
            count += 1
    if valid == 0:
        return {"cluster_perm_p": np.nan}
    return {"cluster_perm_p": float((count + 1) / (valid + 1))}


def exact_binom_greater_p(wins: int, n: int) -> float:
    if n <= 0:
        return float("nan")
    return float(sum(math.comb(n, i) for i in range(wins, n + 1)) / (2**n))


def exact_sign_greater_p(diffs: list[float]) -> float:
    clean = [float(x) for x in diffs if np.isfinite(x) and float(x) != 0.0]
    if not clean:
        return float("nan")
    wins = sum(value > 0 for value in clean)
    return exact_binom_greater_p(wins, len(clean))


def exact_signflip_mean_p(diffs: list[float]) -> float:
    clean = [float(x) for x in diffs if np.isfinite(x) and float(x) != 0.0]
    n = len(clean)
    if n == 0:
        return float("nan")
    # Direct exact enumeration is cheap for these small baseline-direct cells.
    if n > 22:
        rng = np.random.default_rng(20260623)
        obs = float(np.mean(clean))
        samples = rng.choice([-1.0, 1.0], size=(100_000, n)) * np.array(clean)
        return float((np.sum(samples.mean(axis=1) >= obs - 1e-12) + 1) / 100_001)
    obs = float(np.mean(clean))
    count = 0
    total = 2**n
    for bits in range(total):
        signed_sum = 0.0
        for i, value in enumerate(clean):
            signed_sum += value if (bits >> i) & 1 else -value
        if signed_sum / n >= obs - 1e-12:
            count += 1
    return float(count / total)


def direct_baseline_tests(df: pd.DataFrame, filter_name: str) -> list[dict[str, object]]:
    rows = []
    measures = ["rating", "three_dim", "body_state", "task_goal", "value_connection", "ease"]
    for condition in ["body", "mind", "soul", "full"]:
        direct = df[
            ((df["leftCondition"].eq(condition)) & (df["rightCondition"].eq("baseline")))
            | ((df["rightCondition"].eq(condition)) & (df["leftCondition"].eq("baseline")))
        ].copy()
        if direct.empty:
            continue
        wins = 0
        diffs_by_measure = {measure: [] for measure in measures}
        for _, row in direct.iterrows():
            side = "left" if row["leftCondition"] == condition else "right"
            other = "right" if side == "left" else "left"
            wins += int(row["choice"] == side)
            values = {
                "rating": row[f"{side}Rating"] - row[f"{other}Rating"],
                "body_state": row[f"{side}BodyStateRating"] - row[f"{other}BodyStateRating"],
                "task_goal": row[f"{side}TaskGoalRating"] - row[f"{other}TaskGoalRating"],
                "value_connection": row[f"{side}ValueConnectionRating"] - row[f"{other}ValueConnectionRating"],
                "ease": row[f"{side}EaseRating"] - row[f"{other}EaseRating"],
            }
            values["three_dim"] = np.nanmean(
                [values["body_state"], values["task_goal"], values["value_connection"]]
            )
            for measure, value in values.items():
                diffs_by_measure[measure].append(float(value))
        rows.append(
            {
                "filter": filter_name,
                "condition": condition,
                "measure": "choice",
                "n": len(direct),
                "mean_diff": np.nan,
                "wins": wins,
                "nonzero": len(direct),
                "exact_sign_p": exact_binom_greater_p(wins, len(direct)),
                "exact_mean_perm_p": np.nan,
            }
        )
        for measure, diffs in diffs_by_measure.items():
            clean = [value for value in diffs if np.isfinite(value)]
            rows.append(
                {
                    "filter": filter_name,
                    "condition": condition,
                    "measure": measure,
                    "n": len(clean),
                    "mean_diff": float(np.mean(clean)) if clean else np.nan,
                    "wins": int(sum(value > 0 for value in clean)),
                    "nonzero": int(sum(value != 0 for value in clean)),
                    "exact_sign_p": exact_sign_greater_p(clean),
                    "exact_mean_perm_p": exact_signflip_mean_p(clean),
                }
            )
    return rows


def condition_mean_tests(long_df: pd.DataFrame, filter_name: str) -> list[dict[str, object]]:
    rng = np.random.default_rng(20260623)
    rows = []
    measures = ["rating", "three_dim", "overall_anchor", "body_state", "task_goal", "value_connection", "ease"]
    for condition in ["body", "mind", "soul", "full"]:
        for measure in measures:
            target = long_df.loc[long_df["condition"].eq(condition), measure].dropna()
            baseline = long_df.loc[long_df["condition"].eq("baseline"), measure].dropna()
            if target.empty or baseline.empty:
                continue
            base = {
                "filter": filter_name,
                "condition": condition,
                "measure": measure,
                "n_condition": int(len(target)),
                "n_baseline": int(len(baseline)),
                "participants_condition": int(long_df.loc[long_df["condition"].eq(condition), "participantId"].nunique()),
                "participants_baseline": int(long_df.loc[long_df["condition"].eq("baseline"), "participantId"].nunique()),
                "mean_condition": float(target.mean()),
                "mean_baseline": float(baseline.mean()),
                "mean_diff": float(target.mean() - baseline.mean()),
            }
            base.update(row_welch_z(long_df, condition, measure))
            base.update(cluster_bootstrap(long_df, condition, measure, rng))
            base.update(participant_label_permutation(long_df, condition, measure, rng))
            rows.append(base)
    return rows


def summarize_conditions(long_df: pd.DataFrame, filter_name: str) -> list[dict[str, object]]:
    rows = []
    for condition in CONDITIONS:
        subset = long_df[long_df["condition"].eq(condition)]
        if subset.empty:
            continue
        rows.append(
            {
                "filter": filter_name,
                "condition": condition,
                "n_appearances": int(len(subset)),
                "participants": int(subset["participantId"].nunique()),
                "win_rate": float(subset["chosen"].mean()),
                "rating": float(subset["rating"].mean()),
                "three_dim": float(subset["three_dim"].mean()),
                "overall_anchor": float(subset["overall_anchor"].mean()),
                "body_state": float(subset["body_state"].mean()),
                "task_goal": float(subset["task_goal"].mean()),
                "value_connection": float(subset["value_connection"].mean()),
                "ease": float(subset["ease"].mean()),
            }
        )
    return rows


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


def markdown_table(df: pd.DataFrame, columns: list[str], max_rows: int = 40) -> str:
    if df.empty:
        return "_No rows._"
    view = df[columns].head(max_rows).copy()
    view = view.fillna("")
    str_rows = [[str(value) for value in row] for row in view.to_numpy().tolist()]
    widths = [
        max(len(column), *(len(row[i]) for row in str_rows)) if str_rows else len(column)
        for i, column in enumerate(columns)
    ]
    header = "| " + " | ".join(column.ljust(widths[i]) for i, column in enumerate(columns)) + " |"
    sep = "| " + " | ".join("-" * widths[i] for i in range(len(columns))) + " |"
    body = ["| " + " | ".join(row[i].ljust(widths[i]) for i in range(len(columns))) + " |" for row in str_rows]
    return "\n".join([header, sep, *body])


def write_report(
    path: Path,
    filter_rows: list[dict[str, object]],
    summary_df: pd.DataFrame,
    condition_tests: pd.DataFrame,
    direct_tests: pd.DataFrame,
) -> None:
    filter_df = pd.DataFrame(filter_rows)
    anchor = condition_tests.merge(
        pd.DataFrame(ANCHOR_TESTS, columns=["condition", "measure", "hypothesis"]),
        on=["condition", "measure"],
        how="inner",
    )
    anchor["row_sig"] = anchor["row_p"].lt(0.05)
    anchor["boot_sig"] = anchor["boot_ci_low"].gt(0)
    anchor["perm_sig"] = anchor["cluster_perm_p"].lt(0.05)
    anchor["sig_methods"] = anchor[["row_sig", "boot_sig", "perm_sig"]].sum(axis=1)
    anchor_view = anchor.sort_values(["hypothesis", "sig_methods", "mean_diff"], ascending=[True, False, False]).copy()
    anchor_view["means"] = anchor_view.apply(
        lambda row: f'{row["mean_condition"]:.2f} vs {row["mean_baseline"]:.2f}', axis=1
    )
    for col in ["row_p", "boot_tail_p", "cluster_perm_p"]:
        anchor_view[col] = anchor_view[col].map(fmt_p)
    for col in ["mean_diff", "boot_ci_low", "boot_ci_high"]:
        anchor_view[col] = anchor_view[col].map(fmt_num)

    best_anchor = (
        anchor.sort_values(["hypothesis", "sig_methods", "cluster_perm_p", "row_p"], ascending=[True, False, True, True])
        .groupby("hypothesis", as_index=False)
        .head(1)
        .copy()
    )
    best_anchor["means"] = best_anchor.apply(
        lambda row: f'{row["mean_condition"]:.2f} vs {row["mean_baseline"]:.2f}', axis=1
    )
    for col in ["row_p", "boot_tail_p", "cluster_perm_p"]:
        best_anchor[col] = best_anchor[col].map(fmt_p)
    for col in ["mean_diff", "boot_ci_low", "boot_ci_high"]:
        best_anchor[col] = best_anchor[col].map(fmt_num)

    full_components = condition_tests[
        condition_tests["condition"].eq("full")
        & condition_tests["measure"].isin(["body_state", "task_goal", "value_connection", "three_dim", "overall_anchor"])
    ].copy()
    full_components["row_sig"] = full_components["row_p"].lt(0.05)
    full_components["boot_sig"] = full_components["boot_ci_low"].gt(0)
    full_components["perm_sig"] = full_components["cluster_perm_p"].lt(0.05)
    full_components["sig_methods"] = full_components[["row_sig", "boot_sig", "perm_sig"]].sum(axis=1)
    full_components = full_components.sort_values(["filter", "measure"]).copy()
    full_components["means"] = full_components.apply(
        lambda row: f'{row["mean_condition"]:.2f} vs {row["mean_baseline"]:.2f}', axis=1
    )
    for col in ["row_p", "boot_tail_p", "cluster_perm_p"]:
        full_components[col] = full_components[col].map(fmt_p)
    for col in ["mean_diff", "boot_ci_low", "boot_ci_high"]:
        full_components[col] = full_components[col].map(fmt_num)

    direct_anchor = direct_tests.merge(
        pd.DataFrame(ANCHOR_TESTS, columns=["condition", "measure", "hypothesis"]),
        on=["condition", "measure"],
        how="inner",
    ).copy()
    direct_anchor = direct_anchor.sort_values(["hypothesis", "exact_mean_perm_p"]).copy()
    for col in ["exact_sign_p", "exact_mean_perm_p"]:
        direct_anchor[col] = direct_anchor[col].map(fmt_p)
    direct_anchor["mean_diff"] = direct_anchor["mean_diff"].map(fmt_num)

    filters_md = filter_df.copy()
    filters_md["rows"] = filters_md["rows"].astype(str)
    filters_md["participants"] = filters_md["participants"].astype(str)

    report = f"""# Filter and Significance Sweep

Exploratory follow-up analysis for response sheets with body/task/value dimension ratings. One-sided tests ask whether each target condition is higher than baseline. Treat as sensitivity analysis, not preregistered confirmatory evidence.

## Filters Tried

{markdown_table(filters_md, ["filter", "rows", "participants", "note"], max_rows=20)}

## Best Anchor-Hypothesis Result per Dimension

{markdown_table(best_anchor, ["hypothesis", "filter", "means", "mean_diff", "row_p", "boot_ci_low", "boot_ci_high", "cluster_perm_p", "sig_methods"], max_rows=20)}

## All Anchor-Hypothesis Hits

{markdown_table(anchor_view, ["hypothesis", "filter", "means", "mean_diff", "row_p", "boot_ci_low", "boot_ci_high", "cluster_perm_p", "sig_methods"], max_rows=80)}

## Full Arm Across 3-Dim Components

{markdown_table(full_components, ["filter", "measure", "means", "mean_diff", "row_p", "boot_ci_low", "boot_ci_high", "cluster_perm_p", "sig_methods"], max_rows=80)}

## Direct Baseline Paired Exact Tests

Direct baseline-paired cells are small. These are useful sanity checks, but most cells cannot reach p<0.05 without near-perfect wins.

{markdown_table(direct_anchor, ["hypothesis", "filter", "n", "mean_diff", "wins", "nonzero", "exact_sign_p", "exact_mean_perm_p"], max_rows=80)}

## Files

- `analysis_outputs/tables/filter_condition_summary.csv`
- `analysis_outputs/tables/filter_condition_mean_tests.csv`
- `analysis_outputs/tables/filter_direct_baseline_exact_tests.csv`
"""
    path.write_text(report, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    TABLE_DIR.mkdir(parents=True, exist_ok=True)

    df = read_followup_rows(args.input)
    filter_rows = []
    summary_rows = []
    condition_test_rows = []
    direct_test_rows = []

    for spec in FILTERS:
        filtered = apply_filter(df, spec)
        filter_rows.append(
            {
                "filter": spec.name,
                "rows": int(len(filtered)),
                "participants": int(filtered["participantId"].nunique()),
                "note": spec.note,
            }
        )
        if filtered.empty:
            continue
        long_df = make_long(filtered)
        summary_rows.extend(summarize_conditions(long_df, spec.name))
        condition_test_rows.extend(condition_mean_tests(long_df, spec.name))
        direct_test_rows.extend(direct_baseline_tests(filtered, spec.name))

    summary_df = pd.DataFrame(summary_rows)
    condition_tests = pd.DataFrame(condition_test_rows)
    direct_tests = pd.DataFrame(direct_test_rows)

    summary_df.to_csv(TABLE_DIR / "filter_condition_summary.csv", index=False)
    condition_tests.to_csv(TABLE_DIR / "filter_condition_mean_tests.csv", index=False)
    direct_tests.to_csv(TABLE_DIR / "filter_direct_baseline_exact_tests.csv", index=False)
    write_report(
        OUT_DIR / "filter_significance_sweep.md",
        filter_rows,
        summary_df,
        condition_tests,
        direct_tests,
    )

    print(f"Wrote {TABLE_DIR / 'filter_condition_summary.csv'}")
    print(f"Wrote {TABLE_DIR / 'filter_condition_mean_tests.csv'}")
    print(f"Wrote {TABLE_DIR / 'filter_direct_baseline_exact_tests.csv'}")
    print(f"Wrote {OUT_DIR / 'filter_significance_sweep.md'}")


if __name__ == "__main__":
    main()
