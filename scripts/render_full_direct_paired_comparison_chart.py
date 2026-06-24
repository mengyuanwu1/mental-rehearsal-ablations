from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "scripts"))

import explore_filter_significance as analysis  # noqa: E402


INPUT_XLSX = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results_live.xlsx"

FILTERS = {
    "no_fastest_10pct": {
        "slug": "no_fastest_10pct",
        "subtitle": "Attention-pass rows; fastest 10% participants removed by total elapsed time.",
        "footer": "Kept {after_n}/{before_n} attention-pass participants; fastest-10% threshold = {threshold_s:.1f}s total elapsed.",
    },
    "attention_only": {
        "slug": "attention_only",
        "subtitle": "Attention-pass rows; no fastest-participant removal.",
        "footer": "Kept {after_n}/{before_n} attention-pass participants; no elapsed-time trimming.",
    },
}

COMPARATORS = ["baseline", "body", "mind", "soul"]
METRICS = [
    ("three_dim", "3-dim score", "Body/task/value average"),
    ("rating", "Mean rating", "Direct 1-10 rating"),
    ("overall", "Overall", "(mean rating + 3-dim) / 2"),
]
CONDITION_COLORS = {
    "baseline": "#be1919",
    "body": "#164f8b",
    "mind": "#a66500",
    "soul": "#4220a8",
}

FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size=size)


def side_metric(row: pd.Series, side: str, metric: str) -> float:
    if metric == "rating":
        return float(row[f"{side}Rating"])
    three_dim = float(
        np.mean(
            [
                row[f"{side}BodyStateRating"],
                row[f"{side}TaskGoalRating"],
                row[f"{side}ValueConnectionRating"],
            ]
        )
    )
    if metric == "three_dim":
        return three_dim
    return (float(row[f"{side}Rating"]) + three_dim) / 2.0


def exact_signflip_p(diffs: np.ndarray) -> float:
    diffs = np.asarray(diffs, dtype=float)
    observed = float(diffs.mean())
    n = len(diffs)
    total = 1 << n
    chunk = 200_000
    count = 0
    bit_index = np.arange(n, dtype=np.uint64)
    for start in range(0, total, chunk):
        stop = min(start + chunk, total)
        nums = np.arange(start, stop, dtype=np.uint64)[:, None]
        signs = np.where(((nums >> bit_index) & 1) == 1, 1.0, -1.0)
        means = (signs * diffs).mean(axis=1)
        count += int(np.sum(means >= observed - 1e-12))
    return count / total


def bootstrap_ci(diffs: np.ndarray, seed: int, reps: int = 20_000) -> tuple[float, float]:
    rng = np.random.default_rng(seed)
    samples = rng.choice(diffs, size=(reps, len(diffs)), replace=True).mean(axis=1)
    low, high = np.percentile(samples, [2.5, 97.5])
    return float(low), float(high)


def output_paths(filter_mode: str) -> tuple[Path, Path]:
    slug = FILTERS[filter_mode]["slug"]
    return (
        ROOT / "analysis_outputs" / "charts" / f"full_direct_paired_comparison_tests_{slug}.png",
        ROOT / "analysis_outputs" / "tables" / f"full_direct_paired_tests_{slug}.csv",
    )


def load_filtered(filter_mode: str) -> tuple[pd.DataFrame, float | None, int, int]:
    df = analysis.read_followup_rows(INPUT_XLSX)
    attention = df[df["attentionCheckPassed"].ne(0)].copy()
    if filter_mode == "attention_only":
        return attention, None, int(attention["participantId"].nunique()), int(attention["participantId"].nunique())
    totals = attention.groupby("participantId")["elapsedMs"].sum()
    threshold = float(totals.quantile(0.10))
    kept = set(totals[totals >= threshold].index)
    filtered = attention[attention["participantId"].isin(kept)].copy()
    return filtered, threshold, int(attention["participantId"].nunique()), int(filtered["participantId"].nunique())


def compute_stats(filter_mode: str) -> tuple[pd.DataFrame, float | None, int, int, Path, Path]:
    filtered, threshold, before_n, after_n = load_filtered(filter_mode)
    records: list[dict[str, object]] = []
    for metric_index, (metric, metric_label, _) in enumerate(METRICS):
        for comp_index, comparator in enumerate(COMPARATORS):
            mask = (
                filtered["leftCondition"].eq("full") & filtered["rightCondition"].eq(comparator)
            ) | (
                filtered["leftCondition"].eq(comparator) & filtered["rightCondition"].eq("full")
            )
            pair_rows = filtered[mask].copy()
            diffs: list[dict[str, object]] = []
            for _, row in pair_rows.iterrows():
                full_side = "left" if row["leftCondition"] == "full" else "right"
                comp_side = "left" if row["leftCondition"] == comparator else "right"
                diffs.append(
                    {
                        "participantId": row["participantId"],
                        "delta": side_metric(row, full_side, metric) - side_metric(row, comp_side, metric),
                    }
                )
            participant_diffs = (
                pd.DataFrame(diffs)
                .groupby("participantId", as_index=False)["delta"]
                .mean()["delta"]
                .to_numpy(dtype=float)
            )
            diff = float(participant_diffs.mean())
            ci_low, ci_high = bootstrap_ci(participant_diffs, seed=5_000 + metric_index * 20 + comp_index)
            p_value = exact_signflip_p(participant_diffs)
            records.append(
                {
                    "metric": metric,
                    "metric_label": metric_label,
                    "comparator": comparator,
                    "n_trials": int(len(pair_rows)),
                    "n_participants": int(len(participant_diffs)),
                    "diff": diff,
                    "ci_low": ci_low,
                    "ci_high": ci_high,
                    "p": p_value,
                    "sig_uncorrected": bool(p_value < 0.05),
                    "sig_bonferroni_4": bool(p_value < 0.0125),
                }
            )
    stats = pd.DataFrame(records)
    out_png, out_csv = output_paths(filter_mode)
    out_csv.parent.mkdir(parents=True, exist_ok=True)
    stats.to_csv(out_csv, index=False)
    return stats, threshold, before_n, after_n, out_png, out_csv


def text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    value: str,
    text_font: ImageFont.FreeTypeFont,
    fill: str = "#0c1220",
    anchor: str = "la",
) -> None:
    draw.text(xy, value, font=text_font, fill=fill, anchor=anchor)


def fmt_p(value: float) -> str:
    if value < 0.001:
        return "<0.001"
    return f"{value:.3f}"


def render(filter_mode: str) -> None:
    stats, threshold, before_n, after_n, out_png, out_csv = compute_stats(filter_mode)
    width, height = 1700, 1320
    margin = 54
    img = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(img)

    title_font = font(38, True)
    subtitle_font = font(22)
    small_font = font(17)
    label_font = font(22, True)
    row_font = font(20)
    row_bold = font(20, True)

    text(draw, (margin, 40), "Full vs Other Conditions: Direct Paired Tests", title_font)
    text(
        draw,
        (margin, 88),
        f"{FILTERS[filter_mode]['subtitle']} Unit = participant mean difference from direct full-vs-comparator trials.",
        subtitle_font,
        fill="#3e4e67",
    )
    text(
        draw,
        (margin, 119),
        "Test: one-sided exact paired sign-flip permutation for Full > comparator; interval = participant bootstrap 95% CI. Stars use unadjusted p<.05.",
        small_font,
        fill="#5a6678",
    )

    panel_x = margin
    panel_w = width - 2 * margin
    panel_h = 326
    y = 170
    x_min, x_max = -1.0, 3.0
    axis_x0 = panel_x + 690
    axis_x1 = panel_x + panel_w - 55

    def sx(value: float) -> int:
        value = max(x_min, min(x_max, value))
        return int(axis_x0 + (value - x_min) / (x_max - x_min) * (axis_x1 - axis_x0))

    for metric_index, (metric, metric_label, metric_note) in enumerate(METRICS):
        panel_y = y + metric_index * (panel_h + 36)
        draw.rounded_rectangle(
            (panel_x, panel_y, panel_x + panel_w, panel_y + panel_h),
            radius=10,
            fill="#fbfcfe",
            outline="#d7dde7",
            width=1,
        )
        draw.rectangle((panel_x, panel_y, panel_x + panel_w, panel_y + 58), fill="#f1f4f8")
        text(draw, (panel_x + 22, panel_y + 17), metric_label, label_font)
        text(draw, (panel_x + 220, panel_y + 20), metric_note, small_font, fill="#5a6678")
        text(draw, (panel_x + 22, panel_y + 76), "Comparator", small_font, fill="#536072")
        text(draw, (panel_x + 185, panel_y + 76), "N", small_font, fill="#536072")
        text(draw, (panel_x + 300, panel_y + 76), "Full - other", small_font, fill="#536072")
        text(draw, (panel_x + 555, panel_y + 76), "p", small_font, fill="#536072")

        axis_y = panel_y + 96
        draw.line((axis_x0, axis_y, axis_x1, axis_y), fill="#b8c1ce", width=1)
        for tick in [-1, 0, 1, 2, 3]:
            tx = sx(float(tick))
            draw.line((tx, axis_y - 5, tx, axis_y + 5), fill="#b8c1ce", width=1)
            text(draw, (tx, axis_y - 26), str(tick), small_font, fill="#667085", anchor="ma")
        zero_x = sx(0.0)
        draw.line((zero_x, panel_y + 90, zero_x, panel_y + panel_h - 28), fill="#c7ced9", width=2)

        metric_rows = stats[stats["metric"].eq(metric)].copy()
        for row_index, (_, row) in enumerate(metric_rows.iterrows()):
            row_y = panel_y + 132 + row_index * 45
            comparator = str(row["comparator"])
            color = CONDITION_COLORS[comparator]
            significant = bool(row["sig_uncorrected"])
            bonf = bool(row["sig_bonferroni_4"])
            ci_low = float(row["ci_low"])
            ci_high = float(row["ci_high"])
            diff = float(row["diff"])
            p_value = float(row["p"])

            text(draw, (panel_x + 22, row_y), comparator, row_bold, fill=color)
            text(draw, (panel_x + 198, row_y), str(int(row["n_participants"])), row_font, anchor="ra")
            diff_text = f"{diff:+.2f} [{ci_low:+.2f}, {ci_high:+.2f}]"
            text(draw, (panel_x + 300, row_y), diff_text, row_font, fill="#0c1220")
            star = "*" if significant else ""
            if bonf:
                star = "**"
            text(draw, (panel_x + 555, row_y), f"{fmt_p(p_value)}{star}", row_font, fill="#0c1220")

            line_color = "#00813a" if significant else "#8b95a5"
            draw.line((sx(ci_low), row_y + 10, sx(ci_high), row_y + 10), fill=line_color, width=5)
            draw.ellipse((sx(diff) - 8, row_y + 2, sx(diff) + 8, row_y + 18), fill=line_color)

    legend_y = height - 84
    text(
        draw,
        (margin, legend_y),
        FILTERS[filter_mode]["footer"].format(
            after_n=after_n,
            before_n=before_n,
            threshold_s=0.0 if threshold is None else threshold / 1000,
        ),
        small_font,
        fill="#475467",
    )
    text(
        draw,
        (margin, legend_y + 28),
        "* p<.05 unadjusted. ** also survives Bonferroni for 4 comparator tests within that metric (alpha=.0125). Positive values favor Full.",
        small_font,
        fill="#475467",
    )

    out_png.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_png)
    print(f"Wrote {out_png}")
    print(f"Wrote {out_csv}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--filter", choices=sorted(FILTERS), default="no_fastest_10pct")
    args = parser.parse_args()
    render(args.filter)
