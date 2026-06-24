from __future__ import annotations

import sys
from pathlib import Path

import pandas as pd
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "scripts"))

import explore_filter_significance as analysis  # noqa: E402


INPUT_XLSX = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results_live.xlsx"
OUT_PATH = ROOT / "analysis_outputs" / "charts" / "combined_latest_no_fastest_10pct_condition_diagram.png"

CONDITIONS = ["full", "mind", "body", "soul", "baseline"]
DIMENSION_ORDER = ["body", "mind", "soul", "full", "baseline"]
PAIR_ORDER = [
    ("baseline", "body"),
    ("baseline", "full"),
    ("baseline", "mind"),
    ("baseline", "soul"),
    ("body", "full"),
    ("body", "mind"),
    ("body", "soul"),
    ("full", "mind"),
    ("full", "soul"),
    ("mind", "soul"),
]

CONDITION_COLORS = {
    "full": "#00813a",
    "mind": "#a66500",
    "body": "#164f8b",
    "soul": "#4220a8",
    "baseline": "#be1919",
}

HIGHLIGHTS = {
    "full": "#d9eee2",
    "mind": "#fff1c9",
    "body": "#e5edf6",
    "soul": "#ece6f7",
    "baseline": "#f8dada",
}

FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size=size)


def fmt_num(value: float) -> str:
    return f"{value:.2f}"


def fmt_pct(value: float) -> str:
    return f"{round(value * 100):.0f}%"


def load_filtered() -> tuple[pd.DataFrame, float, int, int]:
    df = analysis.read_followup_rows(INPUT_XLSX)
    attention = df[df["attentionCheckPassed"].ne(0)].copy()
    totals = attention.groupby("participantId")["elapsedMs"].sum()
    threshold = float(totals.quantile(0.10))
    kept = set(totals[totals >= threshold].index)
    filtered = attention[attention["participantId"].isin(kept)].copy()
    return filtered, threshold, int(attention["participantId"].nunique()), int(filtered["participantId"].nunique())


def make_condition_summary(filtered: pd.DataFrame) -> pd.DataFrame:
    long_df = analysis.make_long(filtered)
    summary = (
        long_df.groupby("condition")
        .agg(
            N=("condition", "size"),
            wins=("chosen", "sum"),
            rating=("rating", "mean"),
            three_dim=("three_dim", "mean"),
            overall=("overall_anchor", "mean"),
            body_state=("body_state", "mean"),
            task_goal=("task_goal", "mean"),
            value_connection=("value_connection", "mean"),
        )
        .reindex(CONDITIONS)
    )
    summary["losses"] = summary["N"] - summary["wins"]
    summary["win_rate"] = summary["wins"] / summary["N"]
    return summary


def make_pairwise(filtered: pd.DataFrame) -> list[dict[str, object]]:
    rows = []
    for left_cond, right_cond in PAIR_ORDER:
        mask = (
            filtered["leftCondition"].eq(left_cond)
            & filtered["rightCondition"].eq(right_cond)
        ) | (
            filtered["leftCondition"].eq(right_cond)
            & filtered["rightCondition"].eq(left_cond)
        )
        pair_df = filtered[mask]
        left_wins = 0
        right_wins = 0
        rating_diffs: list[float] = []
        for _, row in pair_df.iterrows():
            chosen = row["leftCondition"] if row["choice"] == "left" else row["rightCondition"]
            left_wins += int(chosen == left_cond)
            right_wins += int(chosen == right_cond)
            left_rating = row["leftRating"] if row["leftCondition"] == left_cond else row["rightRating"]
            right_rating = row["leftRating"] if row["leftCondition"] == right_cond else row["rightRating"]
            rating_diffs.append(float(left_rating) - float(right_rating))
        mean_diff = sum(rating_diffs) / len(rating_diffs) if rating_diffs else 0.0
        if left_wins > right_wins:
            choice = f"{left_cond} {left_wins}-{right_wins}"
        elif right_wins > left_wins:
            choice = f"{right_cond} {right_wins}-{left_wins}"
        else:
            choice = f"split {left_wins}-{right_wins}"
        edge_cond = left_cond if mean_diff >= 0 else right_cond
        rows.append(
            {
                "Comparison": f"{left_cond} vs {right_cond}",
                "N": int(len(pair_df)),
                "Choice result": choice,
                "Rating edge": f"{edge_cond} +{abs(mean_diff):.2f}",
            }
        )
    return rows


def text_size(draw: ImageDraw.ImageDraw, text: str, text_font: ImageFont.FreeTypeFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=text_font)
    return box[2] - box[0], box[3] - box[1]


def draw_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    text_font: ImageFont.FreeTypeFont,
    fill: str = "#0c1220",
    anchor: str = "left",
) -> None:
    x, y = xy
    if anchor == "right":
        w, _ = text_size(draw, text, text_font)
        x -= w
    elif anchor == "center":
        w, _ = text_size(draw, text, text_font)
        x -= w // 2
    draw.text((x, y), text, font=text_font, fill=fill)


def draw_badge(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    w: int,
    h: int,
    text: str,
    fill: str,
    text_font: ImageFont.FreeTypeFont,
) -> None:
    draw.rounded_rectangle((x, y, x + w, y + h), radius=9, fill=fill)
    tw, th = text_size(draw, text, text_font)
    draw.text((x + (w - tw) // 2, y + (h - th) // 2 - 1), text, font=text_font, fill="#07101e")


def draw_table(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    widths: list[int],
    headers: list[str],
    rows: list[list[dict[str, object]]],
    row_h: int,
) -> int:
    header_h = 60
    total_w = sum(widths)
    header_font = font(18, True)
    cell_font = font(19)
    bold_font = font(19, True)
    line = "#d7dde7"
    header_fill = "#f1f4f8"
    zebra = "#fbfbfc"

    draw.rectangle((x, y, x + total_w, y + header_h), fill=header_fill)
    cx = x
    for i, header in enumerate(headers):
        draw_text(draw, (cx + 14, y + 22), header, header_font)
        if i > 0:
            draw.line((cx, y, cx, y + header_h + row_h * len(rows)), fill=line, width=1)
        cx += widths[i]
    draw.line((x, y + header_h, x + total_w, y + header_h), fill=line, width=1)

    cy = y + header_h
    for row_index, row in enumerate(rows):
        if row_index % 2 == 1:
            draw.rectangle((x, cy, x + total_w, cy + row_h), fill=zebra)
        draw.line((x, cy + row_h, x + total_w, cy + row_h), fill=line, width=1)
        cx = x
        for i, cell in enumerate(row):
            value = str(cell.get("text", ""))
            align = str(cell.get("align", "left"))
            color = str(cell.get("color", "#0c1220"))
            cell_font = bold_font if cell.get("bold") else font(19)
            badge = cell.get("badge")
            if badge:
                bw = min(widths[i] - 18, max(82, text_size(draw, value, cell_font)[0] + 28))
                bx = cx + widths[i] - bw - 8 if align == "right" else cx + 9
                draw_badge(draw, bx, cy + 9, bw, row_h - 18, value, str(badge), cell_font)
            else:
                tx = cx + 14
                if align == "right":
                    tx = cx + widths[i] - 14
                elif align == "center":
                    tx = cx + widths[i] // 2
                draw_text(draw, (tx, cy + 21), value, cell_font, fill=color, anchor=align)
            cx += widths[i]
        cy += row_h
    return cy


def section_title(draw: ImageDraw.ImageDraw, x: int, y: int, index: int, title: str, subtitle: str) -> int:
    draw_text(draw, (x, y), f"{index}. {title}", font(34, True))
    draw_text(draw, (x, y + 41), subtitle, font(20), fill="#41516b")
    return y + 74


def render() -> None:
    filtered, threshold, before_n, after_n = load_filtered()
    summary = make_condition_summary(filtered)
    pairwise = make_pairwise(filtered)

    width = 1240
    height = 1740
    margin = 36
    img = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(img)

    y = 30
    y = section_title(
        draw,
        margin,
        y,
        1,
        "Overall condition performance",
        "Attention-filtered; fastest 10% participants removed by total elapsed time.",
    )
    headers = ["Condition", "N", "Wins", "Win %", "Mean rating", "3-dim", "Overall", "Read"]
    widths = [168, 74, 104, 98, 146, 98, 108, 342]
    reads = {
        "full": "Best overall; no fastest 10%",
        "mind": "Task clarity",
        "body": "Body strength",
        "soul": "Value connection",
        "baseline": "Trails",
    }
    overall_rows = []
    for cond in CONDITIONS:
        row = summary.loc[cond]
        overall_rows.append(
            [
                {"text": cond, "bold": True, "color": CONDITION_COLORS[cond]},
                {"text": f"{int(row.N)}", "align": "right"},
                {"text": f"{int(row.wins)}-{int(row.losses)}", "align": "center"},
                {
                    "text": fmt_pct(float(row.win_rate)),
                    "align": "center",
                    "badge": HIGHLIGHTS["full"] if cond == "full" else HIGHLIGHTS["baseline"] if cond == "baseline" else None,
                },
                {"text": fmt_num(float(row.rating)), "align": "right"},
                {
                    "text": fmt_num(float(row.three_dim)),
                    "align": "right",
                    "badge": HIGHLIGHTS["full"] if cond == "full" else None,
                },
                {
                    "text": fmt_num(float(row.overall)),
                    "align": "right",
                    "badge": HIGHLIGHTS["full"] if cond == "full" else HIGHLIGHTS["baseline"] if cond == "baseline" else None,
                },
                {"text": reads[cond]},
            ]
        )
    y = draw_table(draw, margin, y, widths, headers, overall_rows, row_h=57) + 78

    y = section_title(
        draw,
        margin,
        y,
        2,
        "Dimension scores",
        "Mean ratings on 1-10 follow-up dimensions. Ease excluded from 3-dim score.",
    )
    headers = ["Condition", "Body state", "Task goal", "Value conn."]
    widths = [212, 270, 270, 290]
    dim_rows = []
    for cond in DIMENSION_ORDER:
        row = summary.loc[cond]
        dim_rows.append(
            [
                {"text": cond, "bold": True, "color": CONDITION_COLORS[cond]},
                {
                    "text": fmt_num(float(row.body_state)),
                    "align": "right",
                    "badge": HIGHLIGHTS["body"] if cond == "body" else HIGHLIGHTS["full"] if cond == "full" else None,
                },
                {
                    "text": fmt_num(float(row.task_goal)),
                    "align": "right",
                    "badge": HIGHLIGHTS["mind"] if cond == "mind" else HIGHLIGHTS["full"] if cond == "full" else None,
                },
                {
                    "text": fmt_num(float(row.value_connection)),
                    "align": "right",
                    "badge": HIGHLIGHTS["soul"] if cond == "soul" else HIGHLIGHTS["full"] if cond == "full" else None,
                },
            ]
        )
    y = draw_table(draw, margin, y, widths, headers, dim_rows, row_h=58) + 78

    y = section_title(
        draw,
        margin,
        y,
        3,
        "Pairwise comparison detail",
        "Small cells; use as direction checks, not final rank proof.",
    )
    headers = ["Comparison", "N", "Choice result", "Rating edge"]
    widths = [404, 88, 352, 270]
    pair_rows = []
    for row in pairwise:
        pair_rows.append(
            [
                {"text": str(row["Comparison"]), "bold": True},
                {"text": str(row["N"]), "align": "right"},
                {"text": str(row["Choice result"])},
                {"text": str(row["Rating edge"])},
            ]
        )
    draw_table(draw, margin, y, widths, headers, pair_rows, row_h=54)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT_PATH)
    print(f"Wrote {OUT_PATH}")
    print(f"Kept {after_n}/{before_n} participants; removed threshold <= {threshold / 1000:.1f}s total elapsed")


if __name__ == "__main__":
    render()
