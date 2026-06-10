from __future__ import annotations

import html
import shutil
import subprocess
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
INPUT_XLSX = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results.xlsx"
CHART_DIR = ROOT / "analysis_outputs" / "charts"
TABLE_DIR = ROOT / "analysis_outputs" / "tables"

OPTIONS = [
    "mind_grounding",
    "day_success_visualization",
    "task_success_visualization",
    "body_grounding",
    "value_grounding",
    "potential_obstacle_visualization",
]

LABELS = {
    "mind_grounding": "Mind grounding",
    "day_success_visualization": "Day success visualization",
    "task_success_visualization": "Task success visualization",
    "body_grounding": "Body grounding",
    "value_grounding": "Value grounding",
    "potential_obstacle_visualization": "Obstacle visualization",
}


def esc(value: object) -> str:
    return html.escape(str(value))


def text(x: float, y: float, value: object, size: int = 13, weight: int = 400, anchor: str = "start") -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-family="Inter, Arial, sans-serif" '
        f'font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="#1f2933">{esc(value)}</text>'
    )


def parse_rankings(questionnaire: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    rows = []
    source = questionnaire["personalizationFocus"].dropna().astype(str)
    for response_index, value in source.items():
        ranked = [item.strip() for item in value.split(",") if item.strip()]
        seen = set()
        for rank, option in enumerate(ranked, start=1):
            if option not in OPTIONS or option in seen:
                continue
            seen.add(option)
            rows.append(
                {
                    "response_index": response_index,
                    "option": option,
                    "label": LABELS[option],
                    "rank": rank,
                }
            )

    rank_long = pd.DataFrame(rows)
    distribution = (
        rank_long.groupby(["option", "label", "rank"])
        .size()
        .rename("count")
        .reset_index()
    )
    respondent_n = int(source.shape[0])
    distribution["respondent_n"] = respondent_n
    distribution["pct_of_respondents"] = distribution["count"] / respondent_n
    return rank_long, distribution


def complete_distribution(distribution: pd.DataFrame) -> pd.DataFrame:
    respondent_n = int(distribution["respondent_n"].max()) if not distribution.empty else 0
    rows = []
    for option in OPTIONS:
        for rank in range(1, len(OPTIONS) + 1):
            match = distribution[(distribution["option"] == option) & (distribution["rank"] == rank)]
            count = int(match["count"].iloc[0]) if not match.empty else 0
            rows.append(
                {
                    "option": option,
                    "label": LABELS[option],
                    "rank": rank,
                    "count": count,
                    "respondent_n": respondent_n,
                    "pct_of_respondents": count / respondent_n if respondent_n else 0,
                }
            )
    return pd.DataFrame(rows)


def average_rank(rank_long: pd.DataFrame, respondent_n: int) -> pd.DataFrame:
    avg = (
        rank_long.groupby(["option", "label"])
        .agg(avg_rank=("rank", "mean"), first_place_count=("rank", lambda s: int((s == 1).sum())))
        .reset_index()
    )
    avg["respondent_n"] = respondent_n
    avg["first_place_pct"] = avg["first_place_count"] / respondent_n
    return avg.sort_values(["avg_rank", "first_place_count"], ascending=[True, False])


def blue_color(value: float) -> str:
    value = max(0.0, min(1.0, value))
    start = (235, 244, 250)
    end = (33, 105, 151)
    rgb = tuple(round(start[i] + (end[i] - start[i]) * value) for i in range(3))
    return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"


def write_heatmap(distribution: pd.DataFrame, avg: pd.DataFrame, path: Path) -> None:
    sorted_options = avg["option"].tolist()
    dist = distribution.set_index(["option", "rank"])
    respondent_n = int(distribution["respondent_n"].max()) if not distribution.empty else 0
    max_count = max(1, int(distribution["count"].max())) if not distribution.empty else 1

    width = 1100
    height = 560
    left = 285
    top = 105
    cell_w = 112
    cell_h = 56
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 42, "Personalization Focus Rank Distribution", size=24, weight=700),
        text(34, 68, f"Rows sorted by average rank; N={respondent_n}. Darker cells mean more respondents.", size=13),
    ]

    for rank in range(1, len(OPTIONS) + 1):
        x = left + (rank - 1) * cell_w + cell_w / 2
        parts.append(text(x, top - 18, f"Rank {rank}", size=12, weight=700, anchor="middle"))

    for row_i, option in enumerate(sorted_options):
        y = top + row_i * cell_h
        parts.append(text(left - 18, y + 34, LABELS[option], size=13, weight=700, anchor="end"))
        for rank in range(1, len(OPTIONS) + 1):
            x = left + (rank - 1) * cell_w
            count = int(dist.loc[(option, rank), "count"]) if (option, rank) in dist.index else 0
            pct = count / respondent_n if respondent_n else 0
            fill = blue_color(count / max_count)
            text_color = "#ffffff" if count / max_count > 0.55 else "#1f2933"
            parts.append(
                f'<rect x="{x:.1f}" y="{y:.1f}" width="{cell_w - 8:.1f}" height="{cell_h - 8:.1f}" '
                f'rx="5" fill="{fill}" stroke="#ffffff" stroke-width="1"/>'
            )
            parts.append(
                f'<text x="{x + (cell_w - 8) / 2:.1f}" y="{y + 24:.1f}" font-family="Inter, Arial, sans-serif" '
                f'font-size="15" font-weight="700" text-anchor="middle" fill="{text_color}">{count}</text>'
            )
            parts.append(
                f'<text x="{x + (cell_w - 8) / 2:.1f}" y="{y + 42:.1f}" font-family="Inter, Arial, sans-serif" '
                f'font-size="11" text-anchor="middle" fill="{text_color}">{pct:.0%}</text>'
            )

    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def write_average_rank(avg: pd.DataFrame, path: Path) -> None:
    width = 1100
    row_h = 50
    height = 145 + row_h * len(avg)
    left = 300
    right = 180
    top = 92
    plot_w = width - left - right
    best_color = "#2f6f9f"
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 42, "Personalization Focus Average Rank", size=24, weight=700),
        text(34, 68, "Lower rank is better; bar length is inverted so longer means stronger preference.", size=13),
    ]

    for tick in range(1, len(OPTIONS) + 1):
        x = left + ((tick - 1) / (len(OPTIONS) - 1)) * plot_w
        parts.append(f'<line x1="{x:.1f}" y1="{top - 8}" x2="{x:.1f}" y2="{height - 58}" stroke="#e6e9ee"/>')
        parts.append(text(x, height - 34, str(tick), size=11, anchor="middle"))
    parts.append(text(left + plot_w / 2, height - 12, "Average rank", size=12, anchor="middle"))

    for i, (_, row) in enumerate(avg.iterrows()):
        y = top + i * row_h
        score = (len(OPTIONS) - float(row["avg_rank"])) / (len(OPTIONS) - 1)
        bar_w = max(2, score * plot_w)
        parts.append(text(left - 18, y + 28, row["label"], size=13, weight=700, anchor="end"))
        parts.append(f'<rect x="{left}" y="{y + 8}" width="{bar_w:.1f}" height="24" rx="5" fill="{best_color}"/>')
        parts.append(
            text(
                left + bar_w + 12,
                y + 27,
                f'avg {row["avg_rank"]:.2f} | #1: {int(row["first_place_count"])} ({row["first_place_pct"]:.0%})',
                size=12,
            )
        )

    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def convert_to_png(svg_path: Path) -> None:
    converter = shutil.which("rsvg-convert")
    if not converter:
        raise RuntimeError("rsvg-convert not found")
    subprocess.run(
        [converter, "-w", "2160", "-f", "png", "-o", str(svg_path.with_suffix(".png")), str(svg_path)],
        check=True,
    )


def main() -> None:
    CHART_DIR.mkdir(parents=True, exist_ok=True)
    TABLE_DIR.mkdir(parents=True, exist_ok=True)
    questionnaire = pd.read_excel(INPUT_XLSX, sheet_name="questionnaire_responses").dropna(how="all")
    rank_long, distribution = parse_rankings(questionnaire)
    distribution = complete_distribution(distribution)
    avg = average_rank(rank_long, int(questionnaire["personalizationFocus"].notna().sum()))

    rank_long.to_csv(TABLE_DIR / "personalization_focus_rank_long.csv", index=False)
    distribution.to_csv(TABLE_DIR / "personalization_focus_rank_distribution.csv", index=False)
    avg.to_csv(TABLE_DIR / "personalization_focus_average_rank.csv", index=False)

    heatmap_path = CHART_DIR / "personalization_focus_rank_heatmap.svg"
    average_path = CHART_DIR / "personalization_focus_average_rank.svg"
    write_heatmap(distribution, avg, heatmap_path)
    write_average_rank(avg, average_path)
    convert_to_png(heatmap_path)
    convert_to_png(average_path)
    print(average_path.with_suffix(".png"))
    print(heatmap_path.with_suffix(".png"))
    print(TABLE_DIR / "personalization_focus_average_rank.csv")


if __name__ == "__main__":
    main()
