from __future__ import annotations

import html
import shutil
import subprocess
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
INPUT_XLSX = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results.xlsx"
OUT_DIR = ROOT / "analysis_outputs"
CHART_DIR = OUT_DIR / "charts"
TABLE_DIR = OUT_DIR / "tables"

THEMES = {
    "structured_day_planning": {
        "label": "Structured day planning",
        "description": "Users want a concrete plan for the day: tasks, priorities, order, timing, and next steps.",
    },
    "calm_grounding": {
        "label": "Calm grounding",
        "description": "Users want breathing, body awareness, meditation, quiet, or relaxation before moving into action.",
    },
    "encouragement_reassurance": {
        "label": "Encouragement and reassurance",
        "description": "Users want warmth, validation, motivation, confidence, and positive emotional support.",
    },
    "task_visualization": {
        "label": "Task/success visualization",
        "description": "Users want to picture successful completion, actual tasks, or themselves moving through the day.",
    },
    "obstacle_coping": {
        "label": "Obstacle coping",
        "description": "Users want to anticipate disruptions, low energy, hard moments, and recovery moves.",
    },
    "audio_ambience": {
        "label": "Audio, voice, and ambience",
        "description": "Users mention guided audio, voice, music, nature sounds, ambient noise, or a calming place.",
    },
    "brevity_adaptive_load": {
        "label": "Brevity and adaptive load",
        "description": "Users prefer short, simple, punchy, or adjustable guidance that does not feel overwhelming.",
    },
    "values_purpose": {
        "label": "Values, purpose, and mantra",
        "description": "Users want connection to what matters, goals, strengths, accomplishments, or a closing mantra.",
    },
    "morning_ritual": {
        "label": "Morning ritual integration",
        "description": "Users frame rehearsal alongside prayer, meditation, exercise, showering, coffee, reading, or routine.",
    },
    "low_information": {
        "label": "Low-information / unclear",
        "description": "Responses with no actionable design preference or broken/ambiguous content.",
    },
}

MANUAL_CODES = {
    1: ["structured_day_planning", "encouragement_reassurance"],
    2: ["structured_day_planning", "values_purpose"],
    3: ["structured_day_planning", "encouragement_reassurance", "brevity_adaptive_load"],
    4: ["encouragement_reassurance", "audio_ambience"],
    5: ["morning_ritual", "structured_day_planning"],
    6: ["structured_day_planning", "task_visualization", "encouragement_reassurance"],
    7: ["calm_grounding", "structured_day_planning", "task_visualization", "obstacle_coping"],
    8: ["brevity_adaptive_load"],
    9: ["task_visualization", "calm_grounding", "structured_day_planning"],
    10: [
        "calm_grounding",
        "structured_day_planning",
        "values_purpose",
        "task_visualization",
        "obstacle_coping",
        "brevity_adaptive_load",
    ],
    11: ["task_visualization", "structured_day_planning"],
    12: [
        "brevity_adaptive_load",
        "calm_grounding",
        "structured_day_planning",
        "task_visualization",
        "obstacle_coping",
        "encouragement_reassurance",
    ],
    13: ["calm_grounding", "structured_day_planning"],
    14: ["encouragement_reassurance"],
    15: ["morning_ritual"],
    16: ["audio_ambience", "structured_day_planning"],
    17: ["low_information"],
    18: ["morning_ritual", "calm_grounding", "audio_ambience"],
    19: ["structured_day_planning", "values_purpose"],
    20: ["audio_ambience"],
    21: ["morning_ritual", "calm_grounding", "structured_day_planning"],
    22: ["morning_ritual"],
    23: ["brevity_adaptive_load", "calm_grounding", "structured_day_planning"],
    24: ["structured_day_planning"],
    25: ["low_information"],
    26: ["audio_ambience", "calm_grounding"],
    27: ["encouragement_reassurance"],
    28: ["calm_grounding"],
    29: ["structured_day_planning", "calm_grounding"],
    30: ["calm_grounding", "task_visualization", "brevity_adaptive_load"],
    31: ["encouragement_reassurance", "audio_ambience"],
    32: ["calm_grounding"],
    33: ["audio_ambience"],
    34: ["calm_grounding", "brevity_adaptive_load"],
    35: ["structured_day_planning"],
    36: ["audio_ambience", "structured_day_planning"],
    37: ["calm_grounding"],
    38: ["values_purpose"],
    39: ["calm_grounding", "values_purpose"],
    40: ["calm_grounding", "audio_ambience", "morning_ritual"],
    41: ["brevity_adaptive_load", "task_visualization", "structured_day_planning"],
    42: ["encouragement_reassurance", "obstacle_coping"],
    43: ["morning_ritual"],
    44: ["morning_ritual", "calm_grounding"],
    45: ["structured_day_planning", "obstacle_coping"],
    46: ["encouragement_reassurance"],
    47: ["structured_day_planning", "obstacle_coping", "encouragement_reassurance"],
    48: ["encouragement_reassurance", "structured_day_planning"],
    49: ["calm_grounding", "structured_day_planning", "obstacle_coping", "task_visualization", "values_purpose"],
    50: ["structured_day_planning", "obstacle_coping"],
    51: ["values_purpose", "structured_day_planning", "obstacle_coping", "calm_grounding"],
    52: ["calm_grounding"],
    53: ["audio_ambience"],
    54: ["structured_day_planning", "encouragement_reassurance"],
    55: ["calm_grounding", "structured_day_planning", "obstacle_coping"],
    56: ["audio_ambience", "task_visualization"],
    57: ["brevity_adaptive_load", "calm_grounding"],
    58: ["encouragement_reassurance", "obstacle_coping"],
    59: ["structured_day_planning", "encouragement_reassurance", "obstacle_coping", "values_purpose"],
    60: ["brevity_adaptive_load", "audio_ambience", "encouragement_reassurance"],
    61: ["calm_grounding", "morning_ritual"],
    62: ["structured_day_planning", "morning_ritual"],
    63: ["calm_grounding", "structured_day_planning", "values_purpose"],
    64: ["structured_day_planning", "encouragement_reassurance", "calm_grounding"],
}


def text(x: float, y: float, value: object, size: int = 13, weight: int = 400, anchor: str = "start") -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-family="Inter, Arial, sans-serif" '
        f'font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="#1f2933">'
        f"{html.escape(str(value))}</text>"
    )


def read_responses() -> pd.DataFrame:
    q = pd.read_excel(INPUT_XLSX, sheet_name="questionnaire_responses").dropna(how="all")
    responses = q["idealMorningGuidance"].dropna().astype(str).str.strip()
    responses = responses[responses.ne("")]
    return pd.DataFrame(
        {
            "response_number": range(1, len(responses) + 1),
            "quote": responses.tolist(),
        }
    )


def coded_rows(responses: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for _, row in responses.iterrows():
        response_number = int(row["response_number"])
        quote = row["quote"]
        codes = MANUAL_CODES.get(response_number, ["low_information"])
        for code in codes:
            rows.append(
                {
                    "response_number": response_number,
                    "theme": code,
                    "theme_label": THEMES[code]["label"],
                    "quote": quote,
                }
            )
    return pd.DataFrame(rows)


def summarize(coded: pd.DataFrame, n: int) -> pd.DataFrame:
    summary = (
        coded.groupby(["theme", "theme_label"], as_index=False)
        .agg(mentions=("response_number", "nunique"))
        .sort_values("mentions", ascending=False)
    )
    summary["respondent_n"] = n
    summary["pct_of_responses"] = summary["mentions"] / n
    summary["description"] = summary["theme"].map(lambda theme: THEMES[theme]["description"])
    return summary


def pick_quotes(coded: pd.DataFrame, theme: str, limit: int = 3) -> list[str]:
    quotes = coded[coded["theme"].eq(theme)]["quote"].drop_duplicates().tolist()
    quotes = sorted(quotes, key=lambda q: abs(len(q) - 145))
    return quotes[:limit]


def write_chart(summary: pd.DataFrame) -> Path:
    chart_rows = summary[summary["theme"].ne("low_information")].sort_values("mentions", ascending=True)
    width = 1200
    row_h = 46
    height = 128 + row_h * len(chart_rows)
    left = 310
    right = 150
    top = 86
    plot_w = width - left - right
    max_count = int(chart_rows["mentions"].max())
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 42, "Ideal Morning Guidance Themes", size=24, weight=700),
        text(34, 68, "Manual thematic coding; responses can have multiple themes.", size=13),
    ]
    for i, (_, row) in enumerate(chart_rows.iterrows()):
        y = top + i * row_h
        bar_w = (int(row["mentions"]) / max_count) * plot_w
        parts.append(text(left - 16, y + 28, row["theme_label"], size=13, weight=700, anchor="end"))
        parts.append(f'<rect x="{left}" y="{y + 8}" width="{bar_w:.1f}" height="24" rx="5" fill="#2f6f9f"/>')
        parts.append(text(left + bar_w + 12, y + 27, f'{int(row["mentions"])} ({row["pct_of_responses"]:.0%})', size=12))
    parts.append("</svg>")
    svg_path = CHART_DIR / "ideal_morning_guidance_thematic_analysis.svg"
    svg_path.write_text("\n".join(parts), encoding="utf-8")
    converter = shutil.which("rsvg-convert")
    if converter:
        subprocess.run(
            [converter, "-w", "2160", "-f", "png", "-o", str(svg_path.with_suffix(".png")), str(svg_path)],
            check=True,
        )
    return svg_path.with_suffix(".png")


def write_markdown(summary: pd.DataFrame, coded: pd.DataFrame, n: int, chart_path: Path) -> Path:
    lines = [
        "# Ideal Morning Guidance Thematic Analysis",
        "",
        f"Source: `idealMorningGuidance` from latest sheet export. Usable responses: `{n}`.",
        "",
        f"![Ideal Morning Guidance Themes]({chart_path.relative_to(OUT_DIR)})",
        "",
        "## Theme Summary",
        "",
    ]
    for _, row in summary[summary["theme"].ne("low_information")].iterrows():
        lines.extend(
            [
                f"### {row['theme_label']} - {int(row['mentions'])}/{n} ({row['pct_of_responses']:.0%})",
                "",
                str(row["description"]),
                "",
                "Representative quotes:",
            ]
        )
        for quote in pick_quotes(coded, str(row["theme"])):
            lines.append(f'- "{quote}"')
        lines.append("")

    low_info = summary[summary["theme"].eq("low_information")]
    if not low_info.empty:
        row = low_info.iloc[0]
        lines.extend(
            [
                f"### {row['theme_label']} - {int(row['mentions'])}/{n} ({row['pct_of_responses']:.0%})",
                "",
                str(row["description"]),
                "",
            ]
        )

    lines.extend(
        [
            "## Synthesis",
            "",
            "Users are not asking for abstract visualization only. The dominant pattern is a guided morning setup that starts calm, turns into a concrete plan, and ends with confidence about the next action.",
            "",
            "Best default flow:",
            "",
            "1. Brief body/breath arrival.",
            "2. Acknowledge current energy or the night before.",
            "3. Review day priorities in order.",
            "4. Visualize one important task going well.",
            "5. Name one likely obstacle and recovery move.",
            "6. Close with encouragement, value/mantra, or next action.",
            "",
            "Design implication: keep default short and structured, with optional audio/ambient layer and adaptive expansion on hard or low-energy days.",
            "",
        ]
    )
    path = OUT_DIR / "ideal_morning_guidance_thematic_analysis.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def main() -> None:
    CHART_DIR.mkdir(parents=True, exist_ok=True)
    TABLE_DIR.mkdir(parents=True, exist_ok=True)
    responses = read_responses()
    coded = coded_rows(responses)
    summary = summarize(coded, len(responses))

    responses.to_csv(TABLE_DIR / "ideal_morning_guidance_responses.csv", index=False)
    coded.to_csv(TABLE_DIR / "ideal_morning_guidance_coded.csv", index=False)
    summary.to_csv(TABLE_DIR / "ideal_morning_guidance_theme_summary.csv", index=False)
    chart_path = write_chart(summary)
    markdown_path = write_markdown(summary, coded, len(responses), chart_path)
    print(chart_path)
    print(markdown_path)
    print(TABLE_DIR / "ideal_morning_guidance_theme_summary.csv")


if __name__ == "__main__":
    main()
