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

FIELDS = [
    "perspectivePreference",
    "guidanceLevel",
    "scriptLength",
    "deliveryFormat",
]

FIELD_TITLES = {
    "perspectivePreference": "Perspective Preference",
    "guidanceLevel": "Guidance Level",
    "scriptLength": "Preferred Script Length",
    "deliveryFormat": "Delivery Format",
}

FIELD_SUBTITLES = {
    "perspectivePreference": "Multi-select; count is respondents selecting each voice perspective.",
    "guidanceLevel": "Multi-select; count is respondents selecting each guidance style.",
    "scriptLength": "Range selection; count is respondents choosing each length band.",
    "deliveryFormat": "Multi-select; count is respondents selecting each format.",
}

VALUE_LABELS = {
    "first_person": "First person",
    "second_person": "Guide voice",
    "third_person": "Third person",
    "no_preference": "No preference",
    "light": "Light cues",
    "moderate": "Moderate",
    "step_by_step": "Step by step",
    "adaptive": "Adaptive",
    "readable_text": "Readable text",
    "spoken_audio": "Spoken audio",
    "text_and_audio": "Text + audio",
    "interactive_steps": "Interactive steps",
    "0-3": "0-3 min",
    "0-2": "0-2 min",
    "0-5": "0-5 min",
    "0-6": "0-6 min",
    "0-7": "0-7 min",
    "0-8": "0-8 min",
    "0-10": "0-10 min",
    "0-11": "0-11 min",
    "0-13": "0-13 min",
    "0-12": "0-12 min",
    "1-5": "1-5 min",
    "1-3": "1-3 min",
    "1-15_plus": "1-15+ min",
    "2-5": "2-5 min",
    "2-8": "2-8 min",
    "3-5": "3-5 min",
    "3-6": "3-6 min",
    "3-8": "3-8 min",
    "5-5": "5 min",
    "5-7": "5-7 min",
    "5-10": "5-10 min",
    "5-15_plus": "5-15+ min",
    "6-15_plus": "6-15+ min",
    "10-14": "10-14 min",
}

FIELD_ORDER = {
    "perspectivePreference": ["first_person", "second_person", "third_person", "no_preference"],
    "guidanceLevel": ["light", "moderate", "step_by_step", "adaptive"],
    "deliveryFormat": ["readable_text", "spoken_audio", "text_and_audio", "interactive_steps"],
}


def esc(value: object) -> str:
    return html.escape(str(value))


def label(value: str) -> str:
    return VALUE_LABELS.get(value, value.replace("_", " ").replace("-", "-").title())


def slug(value: str) -> str:
    return "".join(ch if ch.isalnum() else "_" for ch in value.lower()).strip("_")


def text(x: float, y: float, value: object, size: int = 13, weight: int = 400, anchor: str = "start") -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-family="Inter, Arial, sans-serif" '
        f'font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="#1f2933">{esc(value)}</text>'
    )


def counts_for_field(questionnaire: pd.DataFrame, field: str) -> pd.DataFrame:
    values = questionnaire[field].dropna()
    counts: dict[str, int] = {}
    for value in values:
        normalized = normalize_value(field, value)
        if not normalized:
            continue
        for item in [part.strip() for part in normalized.split(",") if part.strip()]:
            counts[item] = counts.get(item, 0) + 1
    rows = [
        {
            "field": field,
            "option": option,
            "label": label(option),
            "count": count,
            "respondent_n": len(values),
            "pct_of_respondents": count / len(values) if len(values) else 0,
        }
        for option, count in counts.items()
    ]
    df = pd.DataFrame(rows)
    if df.empty:
        return df

    order = FIELD_ORDER.get(field)
    if order:
        df["_sort"] = df["option"].map({option: i for i, option in enumerate(order)}).fillna(999)
        return df.sort_values(["_sort", "count"], ascending=[True, False]).drop(columns=["_sort"])
    if field == "scriptLength":
        df["_lower"] = df["option"].str.extract(r"^(\d+)").fillna("999").astype(int)
        df["_upper"] = (
            df["option"]
            .str.extract(r"-(\d+)")
            .fillna("999")
            .astype(int)
        )
        return df.sort_values(["_lower", "_upper", "count"]).drop(columns=["_lower", "_upper"])
    return df.sort_values("count", ascending=False)


def normalize_value(field: str, value: object) -> str:
    if field != "scriptLength":
        return str(value).strip()
    if isinstance(value, pd.Timestamp):
        return f"{value.month}-{value.day}"
    text_value = str(value).strip()
    parsed = pd.to_datetime(text_value, errors="coerce")
    if not pd.isna(parsed) and str(text_value).startswith("2026-"):
        return f"{parsed.month}-{parsed.day}"
    return text_value


def write_bar_chart(df: pd.DataFrame, field: str, path: Path) -> None:
    chart = df.sort_values("count", ascending=True).copy()
    width = 1080
    row_h = 42
    height = max(300, 118 + row_h * len(chart))
    left = 260
    right = 150
    top = 86
    plot_w = width - left - right
    max_count = max(1, int(chart["count"].max()))
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 40, FIELD_TITLES[field], size=24, weight=700),
        text(34, 66, FIELD_SUBTITLES[field], size=13),
    ]
    for i, (_, row) in enumerate(chart.iterrows()):
        y = top + i * row_h
        bar_w = (int(row["count"]) / max_count) * plot_w
        parts.append(text(left - 16, y + 27, row["label"], size=13, weight=700, anchor="end"))
        parts.append(f'<rect x="{left}" y="{y + 8}" width="{bar_w:.1f}" height="24" rx="5" fill="#2f6f9f"/>')
        parts.append(text(left + bar_w + 12, y + 27, f'{int(row["count"])} ({row["pct_of_respondents"]:.0%})', size=12))
    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def write_dashboard(all_counts: dict[str, pd.DataFrame], path: Path) -> None:
    width = 1600
    height = 1180
    panel_w = 760
    panel_h = 500
    margin_x = 54
    margin_y = 92
    gap_x = 36
    gap_y = 58
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(54, 44, "Final Questionnaire Preference Visualizations", size=28, weight=700),
        text(54, 72, "Perspective, guidance level, script length, and delivery format.", size=14),
    ]
    for idx, field in enumerate(FIELDS):
        x0 = margin_x + (idx % 2) * (panel_w + gap_x)
        y0 = margin_y + (idx // 2) * (panel_h + gap_y)
        df = all_counts[field].sort_values("count", ascending=True).copy()
        max_count = max(1, int(df["count"].max()))
        parts.append(f'<rect x="{x0}" y="{y0}" width="{panel_w}" height="{panel_h}" rx="8" fill="#f7fafc" stroke="#dfe5e8"/>')
        parts.append(text(x0 + 24, y0 + 42, FIELD_TITLES[field], size=20, weight=700))
        bar_left = x0 + 220
        bar_top = y0 + 78
        bar_w_max = panel_w - 330
        row_h = min(34, (panel_h - 110) / max(1, len(df)))
        for i, (_, row) in enumerate(df.iterrows()):
            y = bar_top + i * row_h
            bar_w = (int(row["count"]) / max_count) * bar_w_max
            parts.append(text(bar_left - 12, y + 20, row["label"], size=11, weight=700, anchor="end"))
            parts.append(f'<rect x="{bar_left}" y="{y + 5}" width="{bar_w:.1f}" height="18" rx="4" fill="#2f6f9f"/>')
            parts.append(text(bar_left + bar_w + 8, y + 20, f'{int(row["count"])} ({row["pct_of_respondents"]:.0%})', size=10))
    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def convert(svg_path: Path) -> None:
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
    all_counts = {field: counts_for_field(questionnaire, field) for field in FIELDS}
    combined = pd.concat(all_counts.values(), ignore_index=True)
    combined.to_csv(TABLE_DIR / "core_questionnaire_preference_counts.csv", index=False)

    for field, df in all_counts.items():
        df.to_csv(TABLE_DIR / f"{slug(field)}_counts.csv", index=False)
        svg_path = CHART_DIR / f"questionnaire_{slug(field)}.svg"
        write_bar_chart(df, field, svg_path)
        convert(svg_path)

    dashboard_svg = CHART_DIR / "questionnaire_core_preferences_dashboard.svg"
    write_dashboard(all_counts, dashboard_svg)
    convert(dashboard_svg)

    for field in FIELDS:
        print(CHART_DIR / f"questionnaire_{slug(field)}.png")
    print(dashboard_svg.with_suffix(".png"))
    print(TABLE_DIR / "core_questionnaire_preference_counts.csv")


if __name__ == "__main__":
    main()
