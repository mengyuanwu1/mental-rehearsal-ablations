from __future__ import annotations

import html
import math
import re
import shutil
import subprocess
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
INPUT_XLSX = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results_live.xlsx"
OUT_DIR = ROOT / "analysis_outputs"
CHART_DIR = OUT_DIR / "charts"
TABLE_DIR = OUT_DIR / "tables"

PREFIX = "questionnaire_attention_filtered"

FIELDS = [
    "perspectivePreference",
    "guidanceLevel",
    "backgroundAudio",
    "scriptLength",
    "toneStyle",
    "deliveryFormat",
]

FIELD_TITLES = {
    "perspectivePreference": "Perspective Preference",
    "guidanceLevel": "Guidance Level",
    "backgroundAudio": "Background Audio",
    "scriptLength": "Preferred Script Length",
    "toneStyle": "Tone Style",
    "deliveryFormat": "Delivery Format",
}

FIELD_SUBTITLES = {
    "perspectivePreference": "Multi-select voice preference; counts may exceed N.",
    "guidanceLevel": "Multi-select guidance style; counts may exceed N.",
    "backgroundAudio": "Multi-select audio preference; counts may exceed N.",
    "scriptLength": "Preferred script duration band.",
    "toneStyle": "Multi-select tone preference; counts may exceed N.",
    "deliveryFormat": "Multi-select format preference; counts may exceed N.",
}

FIELD_ORDER = {
    "perspectivePreference": ["first_person", "second_person", "third_person", "no_preference"],
    "guidanceLevel": ["light", "moderate", "step_by_step", "adaptive"],
    "backgroundAudio": ["none", "ambient", "nature", "piano_lofi", "energizing", "other"],
    "toneStyle": ["calm_supportive", "practical_direct", "encouraging", "reflective", "other"],
    "deliveryFormat": ["readable_text", "spoken_audio", "text_and_audio", "interactive_steps"],
}

PERSONALIZATION_OPTIONS = [
    "mind_grounding",
    "day_success_visualization",
    "task_success_visualization",
    "body_grounding",
    "value_grounding",
    "potential_obstacle_visualization",
]

VALUE_LABELS = {
    "first_person": "First person",
    "second_person": "Guide voice",
    "third_person": "Third person",
    "no_preference": "No preference",
    "light": "Light cues",
    "moderate": "Moderate",
    "step_by_step": "Step by step",
    "adaptive": "Adaptive",
    "none": "None",
    "ambient": "Ambient",
    "nature": "Nature",
    "piano_lofi": "Piano/lo-fi",
    "energizing": "Energizing",
    "calm_supportive": "Calm/supportive",
    "practical_direct": "Practical/direct",
    "encouraging": "Encouraging",
    "reflective": "Reflective",
    "readable_text": "Readable text",
    "spoken_audio": "Spoken audio",
    "text_and_audio": "Text + audio",
    "interactive_steps": "Interactive steps",
    "mind_grounding": "Mind grounding",
    "day_success_visualization": "Day success visualization",
    "task_success_visualization": "Task success visualization",
    "body_grounding": "Body grounding",
    "value_grounding": "Value grounding",
    "potential_obstacle_visualization": "Obstacle visualization",
    "other": "Other",
}


def esc(value: object) -> str:
    return html.escape(str(value))


def text(x: float, y: float, value: object, size: int = 13, weight: int = 400, anchor: str = "start") -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-family="Inter, Arial, sans-serif" '
        f'font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="#1f2933">{esc(value)}</text>'
    )


def slug(value: str) -> str:
    return "".join(ch if ch.isalnum() else "_" for ch in value.lower()).strip("_")


def label(value: object) -> str:
    raw = str(value).strip()
    if raw in VALUE_LABELS:
        return VALUE_LABELS[raw]
    if raw.endswith("_plus"):
        raw = raw.replace("_plus", "+")
    if "-" in raw and any(ch.isdigit() for ch in raw):
        return f"{raw.replace('_', ' ')} min"
    return raw.replace("_", " ").title()


def normalize_answer(field: str, value: object) -> str:
    if pd.isna(value):
        return ""
    if field == "scriptLength" and isinstance(value, pd.Timestamp):
        return f"{value.month}-{value.day}"
    raw = str(value).strip()
    if field == "scriptLength":
        parsed = pd.to_datetime(raw, errors="coerce")
        if not pd.isna(parsed) and raw.startswith("2026-"):
            return f"{parsed.month}-{parsed.day}"
    return raw


def as_bool(value: object) -> bool | None:
    if pd.isna(value):
        return None
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        if math.isclose(float(value), 1.0):
            return True
        if math.isclose(float(value), 0.0):
            return False
    raw = str(value).strip().lower()
    if raw in {"true", "yes", "y", "1", "passed", "pass"}:
        return True
    if raw in {"false", "no", "n", "0", "failed", "fail"}:
        return False
    return None


def ensure_dirs() -> None:
    CHART_DIR.mkdir(parents=True, exist_ok=True)
    TABLE_DIR.mkdir(parents=True, exist_ok=True)


def read_workbook() -> tuple[pd.DataFrame, pd.DataFrame, list[str]]:
    workbook = pd.ExcelFile(INPUT_XLSX)
    questionnaire = pd.read_excel(workbook, sheet_name="questionnaire_responses").dropna(how="all").copy()

    attention_rows = []
    response_sheets = [sheet for sheet in workbook.sheet_names if sheet != "questionnaire_responses"]
    for sheet in response_sheets:
        responses = pd.read_excel(workbook, sheet_name=sheet).dropna(how="all").copy()
        if "participantId" not in responses.columns or "attentionCheckPassed" not in responses.columns:
            continue
        focused = responses[responses["attentionCheckPassed"].notna()].copy()
        if focused.empty:
            continue
        focused["sourceSheet"] = sheet
        focused["attentionCheckPassedParsed"] = focused["attentionCheckPassed"].map(as_bool)
        keep_cols = [
            "sourceSheet",
            "participantId",
            "assignmentId",
            "responseId",
            "trialIndex",
            "attentionCheckAnswer",
            "attentionCheckCorrectAnswer",
            "attentionCheckPassed",
            "attentionCheckPassedParsed",
        ]
        attention_rows.append(focused[[col for col in keep_cols if col in focused.columns]])

    if attention_rows:
        attention = pd.concat(attention_rows, ignore_index=True)
    else:
        attention = pd.DataFrame(
            columns=[
                "sourceSheet",
                "participantId",
                "assignmentId",
                "responseId",
                "trialIndex",
                "attentionCheckAnswer",
                "attentionCheckCorrectAnswer",
                "attentionCheckPassed",
                "attentionCheckPassedParsed",
            ]
        )
    return questionnaire, attention, response_sheets


def filter_questionnaire(questionnaire: pd.DataFrame, attention: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    failed_ids = set(
        attention.loc[attention["attentionCheckPassedParsed"].eq(False), "participantId"]
        .dropna()
        .astype(str)
    )
    participant_ids = questionnaire["participantId"].astype(str)
    filtered = questionnaire.loc[~participant_ids.isin(failed_ids)].copy()
    excluded = questionnaire.loc[participant_ids.isin(failed_ids)].copy()
    if not excluded.empty:
        exclusion_details = attention[attention["participantId"].astype(str).isin(failed_ids)].copy()
        excluded = excluded.merge(
            exclusion_details,
            on=["participantId", "assignmentId"],
            how="left",
            suffixes=("", "_attention"),
        )
    return filtered, excluded


def counts_for_field(questionnaire: pd.DataFrame, field: str) -> pd.DataFrame:
    values = questionnaire[field].dropna()
    counts: dict[str, int] = {}
    for value in values:
        normalized = normalize_answer(field, value)
        if not normalized:
            continue
        for part in [item.strip() for item in normalized.split(",") if item.strip()]:
            counts[part] = counts.get(part, 0) + 1

    rows = [
        {
            "field": field,
            "option": option,
            "label": label(option),
            "count": count,
            "respondent_n": int(values.shape[0]),
            "pct_of_respondents": count / int(values.shape[0]) if int(values.shape[0]) else 0,
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
        pieces = df["option"].str.extract(r"^(?P<lower>\d+)-(?P<upper>\d+)")
        df["_lower"] = pd.to_numeric(pieces["lower"], errors="coerce").fillna(999)
        df["_upper"] = pd.to_numeric(pieces["upper"], errors="coerce").fillna(999)
        return df.sort_values(["_lower", "_upper", "count"], ascending=[True, True, False]).drop(
            columns=["_lower", "_upper"]
        )
    return df.sort_values("count", ascending=False)


def parse_personalization(questionnaire: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    source = questionnaire["personalizationFocus"].dropna().astype(str)
    rows = []
    for response_index, value in source.items():
        ranked = [item.strip() for item in value.split(",") if item.strip()]
        seen = set()
        for rank, option in enumerate(ranked, start=1):
            if option not in PERSONALIZATION_OPTIONS or option in seen:
                continue
            seen.add(option)
            rows.append(
                {
                    "response_index": response_index,
                    "option": option,
                    "label": label(option),
                    "rank": rank,
                }
            )

    rank_long = pd.DataFrame(rows)
    respondent_n = int(source.shape[0])
    if rank_long.empty:
        distribution = pd.DataFrame()
        avg = pd.DataFrame()
        return rank_long, distribution, avg

    distribution = (
        rank_long.groupby(["option", "label", "rank"])
        .size()
        .rename("count")
        .reset_index()
    )
    distribution["respondent_n"] = respondent_n
    distribution["pct_of_respondents"] = distribution["count"] / respondent_n if respondent_n else 0

    completed_rows = []
    for option in PERSONALIZATION_OPTIONS:
        for rank in range(1, len(PERSONALIZATION_OPTIONS) + 1):
            match = distribution[(distribution["option"].eq(option)) & (distribution["rank"].eq(rank))]
            count = int(match["count"].iloc[0]) if not match.empty else 0
            completed_rows.append(
                {
                    "option": option,
                    "label": label(option),
                    "rank": rank,
                    "count": count,
                    "respondent_n": respondent_n,
                    "pct_of_respondents": count / respondent_n if respondent_n else 0,
                }
            )
    distribution = pd.DataFrame(completed_rows)

    avg = (
        rank_long.groupby(["option", "label"])
        .agg(avg_rank=("rank", "mean"), first_place_count=("rank", lambda s: int((s == 1).sum())))
        .reset_index()
    )
    avg["respondent_n"] = respondent_n
    avg["first_place_pct"] = avg["first_place_count"] / respondent_n if respondent_n else 0
    avg = avg.sort_values(["avg_rank", "first_place_count"], ascending=[True, False])
    return rank_long, distribution, avg


def write_bar_chart(df: pd.DataFrame, field: str, path: Path, filtered_n: int) -> None:
    chart = df.sort_values("count", ascending=True).copy()
    width = 1120
    row_h = 42
    height = max(320, 128 + row_h * len(chart))
    left = 285
    right = 150
    top = 94
    plot_w = width - left - right
    max_count = max(1, int(chart["count"].max())) if not chart.empty else 1

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 40, FIELD_TITLES[field], size=24, weight=700),
        text(34, 66, f"{FIELD_SUBTITLES[field]} Attention-filtered N={filtered_n}.", size=13),
    ]
    for i, (_, row) in enumerate(chart.iterrows()):
        y = top + i * row_h
        bar_w = (int(row["count"]) / max_count) * plot_w
        parts.append(text(left - 16, y + 27, row["label"], size=13, weight=700, anchor="end"))
        parts.append(f'<rect x="{left}" y="{y + 8}" width="{bar_w:.1f}" height="24" rx="5" fill="#2f6f9f"/>')
        parts.append(text(left + bar_w + 12, y + 27, f'{int(row["count"])} ({row["pct_of_respondents"]:.0%})', size=12))
    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def parse_duration_range(option: object) -> tuple[int, int, bool]:
    raw = str(option).strip()
    has_plus = raw.endswith("_plus") or raw.endswith("+") or "+" in raw
    cleaned = raw.replace("_plus", "").replace("+", "")
    match = re.match(r"^(\d+)-(\d+)$", cleaned)
    if match:
        lower = int(match.group(1))
        upper = int(match.group(2))
        return lower, upper, has_plus
    single = re.match(r"^(\d+)$", cleaned)
    if single:
        value = int(single.group(1))
        return value, value, has_plus
    return 0, 0, has_plus


def write_script_length_violin_chart(df: pd.DataFrame, path: Path, filtered_n: int) -> None:
    chart = df.copy()
    bounds = chart["option"].map(parse_duration_range)
    chart["lower"] = bounds.map(lambda item: item[0])
    chart["upper"] = bounds.map(lambda item: item[1])
    chart["has_plus"] = bounds.map(lambda item: item[2])
    chart["midpoint"] = (chart["lower"] + chart["upper"]) / 2
    chart = chart.sort_values("count", ascending=False).reset_index(drop=True)

    width = 1280
    height = 760
    left = 94
    right = 86
    top = 116
    bottom = 98
    plot_w = width - left - right
    max_minute = max(15, int(chart["upper"].max()) if not chart.empty else 15)
    max_count = max(1, int(chart["count"].max())) if not chart.empty else 1
    y_center = 300
    violin_half_h = 150
    dot_y = 510

    def x_pos(value: float) -> float:
        return left + (value / max_minute) * plot_w

    grid = [i * 0.1 for i in range(max_minute * 10 + 1)]
    bandwidth = 0.85
    densities: list[float] = []
    for x in grid:
        density = 0.0
        for _, row in chart.iterrows():
            lower = float(row["lower"])
            upper = float(row["upper"])
            count = float(row["count"])
            if upper <= lower:
                samples = [lower]
            else:
                sample_count = max(3, int((upper - lower) * 2) + 1)
                samples = [
                    lower + (upper - lower) * index / (sample_count - 1)
                    for index in range(sample_count)
                ]
            for sample in samples:
                z = (x - sample) / bandwidth
                density += (count / len(samples)) * math.exp(-0.5 * z * z)
        densities.append(density)
    max_density = max(densities) if densities else 1

    upper_points = [
        (x_pos(x), y_center - (density / max_density) * violin_half_h)
        for x, density in zip(grid, densities)
    ]
    lower_points = [
        (x_pos(x), y_center + (density / max_density) * violin_half_h)
        for x, density in reversed(list(zip(grid, densities)))
    ]
    polygon = " ".join(f"{x:.1f},{y:.1f}" for x, y in [*upper_points, *lower_points])

    midpoint_mean = (
        (chart["midpoint"] * chart["count"]).sum() / chart["count"].sum()
        if not chart.empty and chart["count"].sum()
        else 0
    )

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(42, 42, "Preferred Script Length", size=26, weight=700),
        text(42, 70, f"Violin-style density from selected duration ranges; dots show unique bands. Attention-filtered N={filtered_n}.", size=13),
    ]

    for tick in range(0, max_minute + 1, 3):
        x = x_pos(tick)
        parts.append(f'<line x1="{x:.1f}" y1="{top}" x2="{x:.1f}" y2="{height - bottom}" stroke="#e6e9ee"/>')
        parts.append(text(x, height - 58, str(tick), size=11, anchor="middle"))
    parts.append(f'<line x1="{left}" y1="{y_center}" x2="{width - right}" y2="{y_center}" stroke="#93a8b8" stroke-width="1"/>')
    parts.append(f'<polygon points="{polygon}" fill="#2f6f9f" opacity="0.78"/>')
    parts.append(f'<line x1="{x_pos(midpoint_mean):.1f}" y1="{y_center - violin_half_h - 18}" x2="{x_pos(midpoint_mean):.1f}" y2="{y_center + violin_half_h + 18}" stroke="#1f2933" stroke-width="2" stroke-dasharray="6 7"/>')
    parts.append(text(x_pos(midpoint_mean) + 10, y_center - violin_half_h - 24, f"mean midpoint {midpoint_mean:.1f} min", size=12, weight=700))
    parts.append(text(left + plot_w / 2, height - 28, "Minutes", size=12, anchor="middle"))

    parts.append(f'<line x1="{left}" y1="{dot_y}" x2="{width - right}" y2="{dot_y}" stroke="#d7dee4"/>')
    parts.append(text(42, dot_y - 22, "Band midpoint bubbles", size=12, weight=700))
    for _, row in chart.iterrows():
        x = x_pos(float(row["midpoint"]))
        radius = 4 + math.sqrt(float(row["count"]) / max_count) * 10
        parts.append(f'<circle cx="{x:.1f}" cy="{dot_y:.1f}" r="{radius:.1f}" fill="#1f2933" opacity="0.55"/>')

    top_band_y = 576
    parts.append(text(42, top_band_y, "Top selected bands", size=12, weight=700))
    for i, (_, row) in enumerate(chart.head(8).iterrows()):
        col = i // 4
        row_i = i % 4
        x = 190 + col * 285
        y = top_band_y + row_i * 24
        parts.append(text(x, y, f'{row["label"]}: {int(row["count"])} ({float(row["pct_of_respondents"]):.0%})', size=11))

    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def compact_for_dashboard(df: pd.DataFrame, field: str, max_rows: int = 10) -> pd.DataFrame:
    if len(df) <= max_rows:
        return df
    ordered = df.sort_values("count", ascending=False).copy()
    top = ordered.head(max_rows - 1).copy()
    remainder = ordered.iloc[max_rows - 1 :].copy()
    respondent_n = int(ordered["respondent_n"].max()) if "respondent_n" in ordered else 0
    other_count = int(remainder["count"].sum())
    other = pd.DataFrame(
        [
            {
                "field": field,
                "option": "other_duration_bands" if field == "scriptLength" else "other_less_common",
                "label": f"Other bands ({len(remainder)})" if field == "scriptLength" else f"Other options ({len(remainder)})",
                "count": other_count,
                "respondent_n": respondent_n,
                "pct_of_respondents": other_count / respondent_n if respondent_n else 0,
            }
        ]
    )
    return pd.concat([top, other], ignore_index=True)


def write_dashboard(all_counts: dict[str, pd.DataFrame], path: Path, filtered_n: int, excluded_n: int) -> None:
    width = 1700
    height = 1410
    panel_w = 790
    panel_h = 360
    margin_x = 54
    margin_y = 106
    gap_x = 40
    gap_y = 54
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(54, 44, "Attention-Filtered Questionnaire Preferences", size=28, weight=700),
        text(54, 74, f"Explicit attention-check failures removed: {excluded_n}. Respondents retained: {filtered_n}.", size=14),
    ]

    for idx, field in enumerate(FIELDS):
        x0 = margin_x + (idx % 2) * (panel_w + gap_x)
        y0 = margin_y + (idx // 2) * (panel_h + gap_y)
        df = compact_for_dashboard(all_counts[field], field).sort_values("count", ascending=True).copy()
        max_count = max(1, int(df["count"].max())) if not df.empty else 1
        parts.append(f'<rect x="{x0}" y="{y0}" width="{panel_w}" height="{panel_h}" rx="8" fill="#f7fafc" stroke="#dfe5e8"/>')
        parts.append(text(x0 + 24, y0 + 40, FIELD_TITLES[field], size=20, weight=700))
        bar_left = x0 + 230
        bar_top = y0 + 70
        bar_w_max = panel_w - 340
        row_h = min(34, (panel_h - 92) / max(1, len(df)))
        for i, (_, row) in enumerate(df.iterrows()):
            y = bar_top + i * row_h
            bar_w = (int(row["count"]) / max_count) * bar_w_max
            parts.append(text(bar_left - 12, y + 20, row["label"], size=11, weight=700, anchor="end"))
            parts.append(f'<rect x="{bar_left}" y="{y + 5}" width="{bar_w:.1f}" height="18" rx="4" fill="#2f6f9f"/>')
            parts.append(text(bar_left + bar_w + 8, y + 20, f'{int(row["count"])} ({row["pct_of_respondents"]:.0%})', size=10))
    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def blue_color(value: float) -> str:
    value = max(0.0, min(1.0, value))
    start = (235, 244, 250)
    end = (33, 105, 151)
    rgb = tuple(round(start[i] + (end[i] - start[i]) * value) for i in range(3))
    return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"


def write_personalization_heatmap(distribution: pd.DataFrame, avg: pd.DataFrame, path: Path) -> None:
    sorted_options = avg["option"].tolist()
    dist = distribution.set_index(["option", "rank"])
    respondent_n = int(distribution["respondent_n"].max()) if not distribution.empty else 0
    max_count = max(1, int(distribution["count"].max())) if not distribution.empty else 1
    width = 1120
    height = 570
    left = 300
    top = 110
    cell_w = 114
    cell_h = 56
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 42, "Personalization Focus Rank Distribution", size=24, weight=700),
        text(34, 68, f"Rows sorted by average rank; attention-filtered N={respondent_n}. Darker cells mean more respondents.", size=13),
    ]
    for rank in range(1, len(PERSONALIZATION_OPTIONS) + 1):
        x = left + (rank - 1) * cell_w + cell_w / 2
        parts.append(text(x, top - 18, f"Rank {rank}", size=12, weight=700, anchor="middle"))
    for row_i, option in enumerate(sorted_options):
        y = top + row_i * cell_h
        parts.append(text(left - 18, y + 34, label(option), size=13, weight=700, anchor="end"))
        for rank in range(1, len(PERSONALIZATION_OPTIONS) + 1):
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


def write_personalization_average_rank(avg: pd.DataFrame, path: Path) -> None:
    width = 1120
    row_h = 50
    height = 150 + row_h * len(avg)
    left = 310
    right = 190
    top = 96
    plot_w = width - left - right
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        text(34, 42, "Personalization Focus Average Rank", size=24, weight=700),
        text(34, 68, "Lower rank is better; longer bar means stronger preference after inversion.", size=13),
    ]
    for tick in range(1, len(PERSONALIZATION_OPTIONS) + 1):
        x = left + ((tick - 1) / (len(PERSONALIZATION_OPTIONS) - 1)) * plot_w
        parts.append(f'<line x1="{x:.1f}" y1="{top - 8}" x2="{x:.1f}" y2="{height - 58}" stroke="#e6e9ee"/>')
        parts.append(text(x, height - 34, str(tick), size=11, anchor="middle"))
    parts.append(text(left + plot_w / 2, height - 12, "Average rank", size=12, anchor="middle"))
    for i, (_, row) in enumerate(avg.iterrows()):
        y = top + i * row_h
        score = (len(PERSONALIZATION_OPTIONS) - float(row["avg_rank"])) / (len(PERSONALIZATION_OPTIONS) - 1)
        bar_w = max(2, score * plot_w)
        parts.append(text(left - 18, y + 28, row["label"], size=13, weight=700, anchor="end"))
        parts.append(f'<rect x="{left}" y="{y + 8}" width="{bar_w:.1f}" height="24" rx="5" fill="#2f6f9f"/>')
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


def convert(svg_path: Path) -> None:
    converter = shutil.which("rsvg-convert")
    if not converter:
        raise RuntimeError("rsvg-convert not found")
    subprocess.run(
        [converter, "-w", "2160", "-f", "png", "-o", str(svg_path.with_suffix(".png")), str(svg_path)],
        check=True,
    )


def write_summary(
    questionnaire: pd.DataFrame,
    filtered: pd.DataFrame,
    attention: pd.DataFrame,
    excluded: pd.DataFrame,
    all_counts: dict[str, pd.DataFrame],
    avg: pd.DataFrame,
) -> None:
    top_rows = []
    for field, counts in all_counts.items():
        if counts.empty:
            continue
        top = counts.sort_values("count", ascending=False).iloc[0]
        top_rows.append(
            {
                "Axis": FIELD_TITLES[field],
                "Top option": top["label"],
                "Count": int(top["count"]),
                "Pct": f'{top["pct_of_respondents"]:.0%}',
            }
        )
    if not avg.empty:
        top = avg.iloc[0]
        top_rows.append(
            {
                "Axis": "Personalization Focus",
                "Top option": f'{top["label"]} (avg rank {top["avg_rank"]:.2f})',
                "Count": int(top["first_place_count"]),
                "Pct": f'{top["first_place_pct"]:.0%} first-place',
            }
        )
    top_df = pd.DataFrame(top_rows)

    def md_table(df: pd.DataFrame) -> str:
        if df.empty:
            return "_No rows._"
        rows = [[str(value) for value in row] for row in df.to_numpy().tolist()]
        headers = [str(column) for column in df.columns]
        widths = [
            max(len(headers[i]), *(len(row[i]) for row in rows)) if rows else len(headers[i])
            for i in range(len(headers))
        ]
        header_line = "| " + " | ".join(headers[i].ljust(widths[i]) for i in range(len(headers))) + " |"
        sep_line = "| " + " | ".join("-" * widths[i] for i in range(len(headers))) + " |"
        body_lines = [
            "| " + " | ".join(row[i].ljust(widths[i]) for i in range(len(headers))) + " |"
            for row in rows
        ]
        return "\n".join([header_line, sep_line, *body_lines])

    recorded_attention_ids = set(attention["participantId"].dropna().astype(str))
    no_recorded = len(set(questionnaire["participantId"].dropna().astype(str)) - recorded_attention_ids)
    chart_links = "\n".join(
        f"- [charts/{path.name}](charts/{path.name})"
        for path in sorted(CHART_DIR.glob(f"{PREFIX}*.png"))
    )
    summary = f"""# Attention-Filtered Questionnaire Preference Charts

Source workbook: `{INPUT_XLSX.name}`

## Filter

- Original questionnaire respondents: {questionnaire["participantId"].nunique()}
- Respondents with recorded attention-check rows: {len(recorded_attention_ids)}
- Respondents with no recorded attention-check result: {no_recorded}
- Explicit failed attention-check respondents removed: {excluded["participantId"].nunique() if "participantId" in excluded else 0}
- Final retained respondents: {filtered["participantId"].nunique()}

Participants without a recorded attention-check result were retained because there is no explicit failure value to remove.

## Top Preference By Axis

{md_table(top_df)}

## Charts

{chart_links}
"""
    (OUT_DIR / f"{PREFIX}_summary.md").write_text(summary, encoding="utf-8")


def main() -> None:
    ensure_dirs()
    questionnaire, attention, _response_sheets = read_workbook()
    filtered, excluded = filter_questionnaire(questionnaire, attention)

    all_counts = {field: counts_for_field(filtered, field) for field in FIELDS}
    combined = pd.concat(all_counts.values(), ignore_index=True)
    rank_long, distribution, avg = parse_personalization(filtered)

    filtered.to_csv(TABLE_DIR / f"{PREFIX}_responses.csv", index=False)
    attention.to_csv(TABLE_DIR / f"{PREFIX}_attention_rows.csv", index=False)
    excluded.to_csv(TABLE_DIR / f"{PREFIX}_excluded_attention_failures.csv", index=False)
    combined.to_csv(TABLE_DIR / f"{PREFIX}_preference_counts.csv", index=False)
    rank_long.to_csv(TABLE_DIR / f"{PREFIX}_personalization_focus_rank_long.csv", index=False)
    distribution.to_csv(TABLE_DIR / f"{PREFIX}_personalization_focus_rank_distribution.csv", index=False)
    avg.to_csv(TABLE_DIR / f"{PREFIX}_personalization_focus_average_rank.csv", index=False)

    filtered_n = int(filtered["participantId"].nunique())
    excluded_n = int(excluded["participantId"].nunique()) if "participantId" in excluded else 0
    for field, df in all_counts.items():
        svg_path = CHART_DIR / f"{PREFIX}_{slug(field)}.svg"
        if field == "scriptLength":
            write_script_length_violin_chart(df, svg_path, filtered_n)
        else:
            write_bar_chart(df, field, svg_path, filtered_n)
        convert(svg_path)

    dashboard_svg = CHART_DIR / f"{PREFIX}_dashboard.svg"
    write_dashboard(all_counts, dashboard_svg, filtered_n, excluded_n)
    convert(dashboard_svg)

    heatmap_svg = CHART_DIR / f"{PREFIX}_personalization_focus_rank_heatmap.svg"
    average_svg = CHART_DIR / f"{PREFIX}_personalization_focus_average_rank.svg"
    write_personalization_heatmap(distribution, avg, heatmap_svg)
    write_personalization_average_rank(avg, average_svg)
    convert(heatmap_svg)
    convert(average_svg)

    write_summary(questionnaire, filtered, attention, excluded, all_counts, avg)
    print(f"Original questionnaire respondents: {questionnaire['participantId'].nunique()}")
    print(f"Excluded attention failures: {excluded_n}")
    print(f"Retained respondents: {filtered_n}")
    print(CHART_DIR / f"{PREFIX}_dashboard.png")
    print(CHART_DIR / f"{PREFIX}_personalization_focus_rank_heatmap.png")
    print(OUT_DIR / f"{PREFIX}_summary.md")


if __name__ == "__main__":
    main()
