from __future__ import annotations

import html
import shutil
import subprocess
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "analysis_outputs"
CHART_DIR = OUT_DIR / "charts"
TABLE_DIR = OUT_DIR / "tables"
CODED_CSV = TABLE_DIR / "ideal_morning_guidance_coded.csv"

MERGED_THEMES = {
    "concrete_day_task_rehearsal": {
        "label": "Concrete day/task rehearsal",
        "description": "A practical walkthrough of the day or main task: priorities, order, timing, successful completion, and next action.",
        "old_themes": {"structured_day_planning", "task_visualization"},
    },
    "calm_grounding_energy": {
        "label": "Calm grounding and energy check-in",
        "description": "A quiet start that uses breath, body awareness, meditation, current energy, or sensory grounding before action.",
        "old_themes": {"calm_grounding"},
    },
    "encouraging_support": {
        "label": "Encouraging support",
        "description": "Warmth, reassurance, validation, confidence, motivation, and a supportive tone.",
        "old_themes": {"encouragement_reassurance"},
    },
    "obstacle_adaptive_coping": {
        "label": "Obstacle and adaptive coping",
        "description": "Preparing for disruptions, hard moments, low energy, and recovery moves.",
        "old_themes": {"obstacle_coping"},
    },
    "audio_ambient_delivery": {
        "label": "Audio and ambient delivery",
        "description": "Guided voice, spoken audio, music, nature sound, ambient background, or a calming physical setting.",
        "old_themes": {"audio_ambience"},
    },
    "short_low_load": {
        "label": "Short, low-load format",
        "description": "Short, simple, punchy, adjustable guidance that avoids feeling overwhelming.",
        "old_themes": {"brevity_adaptive_load"},
    },
    "ritual_values_anchor": {
        "label": "Ritual, values, and mantra anchor",
        "description": "Fitting rehearsal into prayer, meditation, exercise, coffee, reading, or closing with values, purpose, strengths, or a mantra.",
        "old_themes": {"morning_ritual", "values_purpose"},
    },
    "low_information": {
        "label": "Low-information / unclear",
        "description": "No actionable design preference or broken/ambiguous content.",
        "old_themes": {"low_information"},
    },
}

THEME_ORDER = [
    "concrete_day_task_rehearsal",
    "calm_grounding_energy",
    "encouraging_support",
    "obstacle_adaptive_coping",
    "audio_ambient_delivery",
    "short_low_load",
    "ritual_values_anchor",
    "low_information",
]


def text(x: float, y: float, value: object, size: int = 13, weight: int = 400, anchor: str = "start") -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-family="Inter, Arial, sans-serif" '
        f'font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="#1f2933">'
        f"{html.escape(str(value))}</text>"
    )


def integrate(coded: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    rows = []
    for _, row in coded.iterrows():
        old_theme = row["theme"]
        for merged_theme, meta in MERGED_THEMES.items():
            if old_theme in meta["old_themes"]:
                rows.append(
                    {
                        "response_number": row["response_number"],
                        "merged_theme": merged_theme,
                        "merged_theme_label": meta["label"],
                        "old_theme": old_theme,
                        "quote": row["quote"],
                    }
                )

    merged = pd.DataFrame(rows).drop_duplicates(["response_number", "merged_theme"])
    n = int(coded["response_number"].nunique())
    summary = (
        merged.groupby(["merged_theme", "merged_theme_label"], as_index=False)
        .agg(mentions=("response_number", "nunique"))
    )
    summary["respondent_n"] = n
    summary["pct_of_responses"] = summary["mentions"] / n
    summary["description"] = summary["merged_theme"].map(
        {theme: meta["description"] for theme, meta in MERGED_THEMES.items()}
    )
    summary["_order"] = summary["merged_theme"].map({theme: i for i, theme in enumerate(THEME_ORDER)})
    summary = summary.sort_values(["_order"]).drop(columns=["_order"])
    return merged, summary


def pick_quotes(merged: pd.DataFrame, theme: str, limit: int = 3) -> list[str]:
    quotes = merged[merged["merged_theme"].eq(theme)]["quote"].drop_duplicates().tolist()
    quotes = sorted(quotes, key=lambda quote: abs(len(quote) - 145))
    return quotes[:limit]


def write_chart(summary: pd.DataFrame) -> Path:
    chart_rows = summary[summary["merged_theme"].ne("low_information")].sort_values("mentions", ascending=True)
    width = 1240
    row_h = 48
    height = 132 + row_h * len(chart_rows)
    left = 360
    right = 150
    top = 90
    plot_w = width - left - right
    max_count = int(chart_rows["mentions"].max())
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 42, "Integrated Ideal Morning Guidance Themes", size=24, weight=700),
        text(34, 68, "Merged overlapping codes; each respondent counts once per integrated theme.", size=13),
    ]
    for i, (_, row) in enumerate(chart_rows.iterrows()):
        y = top + i * row_h
        bar_w = (int(row["mentions"]) / max_count) * plot_w
        parts.append(text(left - 16, y + 29, row["merged_theme_label"], size=13, weight=700, anchor="end"))
        parts.append(f'<rect x="{left}" y="{y + 8}" width="{bar_w:.1f}" height="25" rx="5" fill="#2f6f9f"/>')
        parts.append(text(left + bar_w + 12, y + 28, f'{int(row["mentions"])} ({row["pct_of_responses"]:.0%})', size=12))
    parts.append("</svg>")
    svg_path = CHART_DIR / "ideal_morning_guidance_integrated_themes.svg"
    svg_path.write_text("\n".join(parts), encoding="utf-8")
    converter = shutil.which("rsvg-convert")
    if converter:
        subprocess.run(
            [converter, "-w", "2160", "-f", "png", "-o", str(svg_path.with_suffix(".png")), str(svg_path)],
            check=True,
        )
    return svg_path.with_suffix(".png")


def write_markdown(merged: pd.DataFrame, summary: pd.DataFrame, chart_path: Path) -> Path:
    n = int(summary["respondent_n"].max())
    lines = [
        "# Integrated Ideal Morning Guidance Thematic Analysis",
        "",
        f"Source: manual thematic coding of `idealMorningGuidance`. Usable responses: `{n}`.",
        "",
        "Integration note: `Structured day planning` and `Task/success visualization` were merged because both describe concrete rehearsal of the day/task. `Morning ritual` and `Values/purpose` were also merged as anchoring context rather than separate product modules.",
        "",
        f"![Integrated Ideal Morning Guidance Themes]({chart_path.relative_to(OUT_DIR)})",
        "",
        "## Integrated Themes",
        "",
    ]
    for _, row in summary[summary["merged_theme"].ne("low_information")].iterrows():
        theme = row["merged_theme"]
        lines.extend(
            [
                f"### {row['merged_theme_label']} - {int(row['mentions'])}/{n} ({row['pct_of_responses']:.0%})",
                "",
                str(row["description"]),
                "",
                "Representative quotes:",
            ]
        )
        for quote in pick_quotes(merged, str(theme)):
            lines.append(f'- "{quote}"')
        lines.append("")

    lines.extend(
        [
            "## Product Summary",
            "",
            "People mainly want a short guided rehearsal that makes the day feel concrete and manageable. The script should not only visualize success; it should help users walk through priorities, timing, the first task, and likely friction.",
            "",
            "Recommended default script arc:",
            "",
            "1. Calm body/breath arrival.",
            "2. Acknowledge current energy or the previous night.",
            "3. Walk through priorities and schedule.",
            "4. Rehearse one important task to a good-enough finish.",
            "5. Name one obstacle and recovery move.",
            "6. Close with encouragement plus one mantra/value/next action.",
            "",
        ]
    )
    path = OUT_DIR / "ideal_morning_guidance_integrated_thematic_analysis.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def main() -> None:
    CHART_DIR.mkdir(parents=True, exist_ok=True)
    TABLE_DIR.mkdir(parents=True, exist_ok=True)
    coded = pd.read_csv(CODED_CSV)
    merged, summary = integrate(coded)
    merged.to_csv(TABLE_DIR / "ideal_morning_guidance_integrated_coded.csv", index=False)
    summary.to_csv(TABLE_DIR / "ideal_morning_guidance_integrated_theme_summary.csv", index=False)
    chart_path = write_chart(summary)
    markdown_path = write_markdown(merged, summary, chart_path)
    print(chart_path)
    print(markdown_path)
    print(TABLE_DIR / "ideal_morning_guidance_integrated_theme_summary.csv")


if __name__ == "__main__":
    main()
