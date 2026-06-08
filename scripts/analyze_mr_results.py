from __future__ import annotations

import html
import math
import re
import shutil
import subprocess
from collections import Counter, defaultdict
from pathlib import Path

import numpy as np
import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
INPUT_XLSX = ROOT / "analysis_outputs" / "data" / "mental_rehearsal_ablation_results.xlsx"
OUT_DIR = ROOT / "analysis_outputs"
CHART_DIR = OUT_DIR / "charts"
TABLE_DIR = OUT_DIR / "tables"

CONDITION_ORDER = ["baseline", "body", "mind", "soul", "full"]
SCOPE_ORDER = ["daily", "task"]
NONBASE_CONDITIONS = ["body", "mind", "soul", "full"]

CONDITION_LABELS = {
    "baseline": "Baseline",
    "body": "Body",
    "mind": "Mind",
    "soul": "Soul",
    "full": "Full",
}

SCOPE_LABELS = {"daily": "Daily", "task": "Task"}

FIELD_LABELS = {
    "perspectivePreference": "Perspective Preference",
    "guidanceLevel": "Guidance Level",
    "backgroundAudio": "Background Audio",
    "scriptLength": "Script Length",
    "toneStyle": "Tone Style",
    "personalizationFocus": "Personalization Focus",
    "deliveryFormat": "Delivery Format",
}

VALUE_LABELS = {
    "first_person": "First person",
    "second_person": "Second person",
    "third_person": "Third person",
    "no_preference": "No preference",
    "light": "Light",
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
    "mind_grounding": "Mind grounding",
    "body_grounding": "Body grounding",
    "day_success_visualization": "Day success visualization",
    "task_success_visualization": "Task success visualization",
    "potential_obstacle_visualization": "Obstacle visualization",
    "value_grounding": "Value grounding",
    "spoken_audio": "Spoken audio",
    "readable_text": "Readable text",
    "text_and_audio": "Text + audio",
    "interactive_steps": "Interactive steps",
    "5-15_plus": "5-15+ min",
    "6-15_plus": "6-15+ min",
}

SCRIPT_THEME_DEFS = {
    "Specific to real task/day": {
        "keywords": [
            "specific",
            "actual",
            "real",
            "schedule",
            "task",
            "tasks",
            "day",
            "priority",
            "priorit",
            "concrete",
            "context",
        ],
        "recommendation": "Tie rehearsal to the user's real schedule, priority task, and concrete first step.",
    },
    "Step-by-step structure": {
        "keywords": ["step", "sequence", "guide", "plan", "structure", "organ", "clear", "run down", "action"],
        "recommendation": "Use a predictable progression: check in, name priority, rehearse steps, close with next action.",
    },
    "Calm emotional support": {
        "keywords": ["calm", "gentle", "warm", "support", "reassur", "encourag", "uplift", "validation"],
        "recommendation": "Keep tone supportive and low-pressure; avoid hype that makes the day feel larger.",
    },
    "Brevity and simplicity": {
        "keywords": ["short", "brief", "punchy", "simple", "sentence", "not too", "long", "complicated"],
        "recommendation": "Offer a short default with optional expansion; many users want guidance, not a long essay.",
    },
    "Grounding and breath/body": {
        "keywords": ["breath", "breathing", "body", "ground", "senses", "energy", "posture", "shoulder"],
        "recommendation": "Start from current body/energy state, then return to a body cue after visualization.",
    },
    "Obstacle coping": {
        "keywords": ["obstacle", "setback", "hard", "uncertain", "handle", "overcome", "waver", "restart", "timeout"],
        "recommendation": "Include one likely obstacle and one realistic recovery move.",
    },
    "Values/intention": {
        "keywords": ["value", "values", "goal", "purpose", "intention", "matters", "important"],
        "recommendation": "Connect work to values briefly, then turn that value into visible action.",
    },
    "Audio/ambience": {
        "keywords": ["audio", "music", "sound", "voice", "rain", "nature", "ambient", "piano", "lofi"],
        "recommendation": "Support spoken/text guidance with optional calm background audio.",
    },
    "Visualization": {
        "keywords": ["visual", "visuali", "picture", "imagine", "envision", "image", "scene"],
        "recommendation": "Use imagery when it clarifies the user's next behavior, not as generic fantasy.",
    },
}

IDEAL_THEME_DEFS = {
    "Calm start / breathing": {
        "keywords": ["calm", "breath", "breathing", "gentle", "relax", "quiet", "warm", "ground"],
        "recommendation": "Begin with calm check-in and breathing before task content.",
    },
    "Step-by-step day planning": {
        "keywords": ["step", "plan", "organ", "guide", "run down", "clear", "priorit", "schedule"],
        "recommendation": "Make the default flow feel like a concise guided plan for the day.",
    },
    "Task focus / next action": {
        "keywords": ["task", "work", "important", "focus", "activity", "actions", "do for the day"],
        "recommendation": "Name the most important task and close with the next concrete action.",
    },
    "Emotional reassurance": {
        "keywords": ["encourag", "reassur", "support", "validation", "uplift", "good day", "everything will go"],
        "recommendation": "Add reassurance, but keep it realistic and tied to effort or response.",
    },
    "Obstacle preparation": {
        "keywords": ["obstacle", "setback", "hard", "overcome", "handle", "uncertainty", "low energy"],
        "recommendation": "Rehearse one bump and recovery plan.",
    },
    "Values/intention grounding": {
        "keywords": ["value", "goal", "intention", "matters", "purpose", "mindset"],
        "recommendation": "Include one values/intention line, then move back to action.",
    },
    "Audio/music/nature": {
        "keywords": ["audio", "voice", "music", "sound", "nature", "rain", "ambient", "piano", "lofi"],
        "recommendation": "Offer audio and background sound as configurable layers.",
    },
    "Prayer/meditation analogies": {
        "keywords": ["prayer", "pray", "meditat", "sermon", "exercise", "coffee", "book"],
        "recommendation": "Position rehearsal as compatible with existing morning rituals.",
    },
    "Brevity": {
        "keywords": ["short", "brief", "punchy", "sentence", "simple", "not too"],
        "recommendation": "Keep the main script short by default.",
    },
}


def ensure_dirs() -> None:
    CHART_DIR.mkdir(parents=True, exist_ok=True)
    TABLE_DIR.mkdir(parents=True, exist_ok=True)


def label(raw: str) -> str:
    if raw in VALUE_LABELS:
        return VALUE_LABELS[raw]
    return str(raw).replace("_", " ").replace("-", "-").strip().title()


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")


def scenario_scope(scenario_id: str) -> str:
    if str(scenario_id).endswith("_daily"):
        return "daily"
    if str(scenario_id).endswith("_task"):
        return "task"
    return "unknown"


def read_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    workbook = pd.ExcelFile(INPUT_XLSX)
    response_sheet = "responses" if "responses" in workbook.sheet_names else None
    if response_sheet is None and "responses_v0" in workbook.sheet_names:
        response_sheet = "responses_v0"
    if response_sheet is None:
        response_sheet = next(
            sheet for sheet in workbook.sheet_names if sheet != "questionnaire_responses"
        )

    responses = pd.read_excel(workbook, sheet_name=response_sheet)
    questionnaire = pd.read_excel(workbook, sheet_name="questionnaire_responses")

    responses = responses.dropna(how="all").copy()
    questionnaire = questionnaire.dropna(how="all").copy()

    for col in ["leftRating", "rightRating", "elapsedMs"]:
        if col in responses:
            responses[col] = pd.to_numeric(responses[col], errors="coerce")
    if "elapsedMs" in questionnaire:
        questionnaire["elapsedMs"] = pd.to_numeric(questionnaire["elapsedMs"], errors="coerce")

    responses["scenarioType"] = responses["scenarioId"].map(scenario_scope)
    responses["scenarioPerson"] = responses["scenarioId"].astype(str).str.replace(r"_(daily|task)$", "", regex=True)
    responses["winnerCondition"] = np.where(
        responses["choice"].eq("left"), responses["leftCondition"], responses["rightCondition"]
    )
    responses["loserCondition"] = np.where(
        responses["choice"].eq("left"), responses["rightCondition"], responses["leftCondition"]
    )
    improvement_cols = [col for col in ["improvement", "improvements", "reason"] if col in responses.columns]
    if improvement_cols:
        responses["improvementText"] = responses[improvement_cols].bfill(axis=1).iloc[:, 0].fillna("")
    else:
        responses["improvementText"] = ""
    return responses, questionnaire


def make_long_responses(responses: pd.DataFrame) -> pd.DataFrame:
    left = responses[
        [
            "responseId",
            "participantId",
            "assignmentId",
            "trialIndex",
            "scenarioId",
            "scenarioType",
            "scenarioPerson",
            "leftCondition",
            "rightCondition",
            "choice",
            "leftRating",
            "elapsedMs",
        ]
    ].rename(columns={"leftCondition": "condition", "rightCondition": "opponent", "leftRating": "rating"})
    left["side"] = "left"
    left["chosen"] = left["choice"].eq("left").astype(float)

    right = responses[
        [
            "responseId",
            "participantId",
            "assignmentId",
            "trialIndex",
            "scenarioId",
            "scenarioType",
            "scenarioPerson",
            "rightCondition",
            "leftCondition",
            "choice",
            "rightRating",
            "elapsedMs",
        ]
    ].rename(columns={"rightCondition": "condition", "leftCondition": "opponent", "rightRating": "rating"})
    right["side"] = "right"
    right["chosen"] = right["choice"].eq("right").astype(float)
    return pd.concat([left, right], ignore_index=True)


def weighted_group_mean(df: pd.DataFrame, group_cols: list[str], value_col: str, weight_col: str) -> pd.Series:
    tmp = df[group_cols + [value_col, weight_col]].dropna(subset=[value_col]).copy()
    tmp["_weighted_value"] = tmp[value_col] * tmp[weight_col]
    grouped = tmp.groupby(group_cols, dropna=False).agg(
        weighted_sum=("_weighted_value", "sum"), weight_sum=(weight_col, "sum")
    )
    return grouped["weighted_sum"] / grouped["weight_sum"]


def cluster_bootstrap_ci(
    df: pd.DataFrame,
    group_cols: list[str],
    value_col: str,
    participant_col: str = "participantId",
    n_boot: int = 2000,
    seed: int = 814,
) -> pd.DataFrame:
    participants = df[participant_col].dropna().unique()
    rng = np.random.default_rng(seed)
    boot_values: dict[tuple, list[float]] = defaultdict(list)

    for _ in range(n_boot):
        sampled = rng.choice(participants, size=len(participants), replace=True)
        counts = pd.Series(sampled).value_counts().rename("_boot_weight")
        sample = df.merge(counts, left_on=participant_col, right_index=True, how="inner")
        means = weighted_group_mean(sample, group_cols, value_col, "_boot_weight")
        for key, value in means.items():
            if not isinstance(key, tuple):
                key = (key,)
            boot_values[key].append(float(value))

    rows = []
    for key, values in boot_values.items():
        rows.append(
            {
                **{col: key[i] for i, col in enumerate(group_cols)},
                "ci_low": float(np.nanpercentile(values, 2.5)),
                "ci_high": float(np.nanpercentile(values, 97.5)),
            }
        )
    return pd.DataFrame(rows)


def condition_summaries(long_df: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    base = (
        long_df.groupby(["scenarioType", "condition"], dropna=False)
        .agg(
            appearances=("chosen", "size"),
            participants=("participantId", "nunique"),
            wins=("chosen", "sum"),
            win_rate=("chosen", "mean"),
            avg_rating=("rating", "mean"),
            rating_sd=("rating", "std"),
        )
        .reset_index()
    )
    win_ci = cluster_bootstrap_ci(long_df, ["scenarioType", "condition"], "chosen")
    rating_ci = cluster_bootstrap_ci(long_df, ["scenarioType", "condition"], "rating", seed=815).rename(
        columns={"ci_low": "rating_ci_low", "ci_high": "rating_ci_high"}
    )
    summary = base.merge(win_ci, on=["scenarioType", "condition"], how="left")
    summary = summary.merge(rating_ci, on=["scenarioType", "condition"], how="left")
    summary = summary.sort_values(
        by=["scenarioType", "condition"],
        key=lambda s: s.map({**{v: i for i, v in enumerate(SCOPE_ORDER)}, **{v: i for i, v in enumerate(CONDITION_ORDER)}})
        if s.name in ["scenarioType", "condition"]
        else s,
    )

    overall = (
        long_df.groupby(["condition"], dropna=False)
        .agg(
            appearances=("chosen", "size"),
            participants=("participantId", "nunique"),
            wins=("chosen", "sum"),
            win_rate=("chosen", "mean"),
            avg_rating=("rating", "mean"),
            rating_sd=("rating", "std"),
        )
        .reset_index()
    )
    return summary, overall


def direct_baseline_summary(responses: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for _, row in responses.iterrows():
        left = row["leftCondition"]
        right = row["rightCondition"]
        if left == "baseline" and right != "baseline":
            target = right
            win = row["choice"] == "right"
        elif right == "baseline" and left != "baseline":
            target = left
            win = row["choice"] == "left"
        else:
            continue
        rows.append(
            {
                "participantId": row["participantId"],
                "scenarioType": row["scenarioType"],
                "condition": target,
                "win_vs_baseline": float(win),
            }
        )

    direct = pd.DataFrame(rows)
    summary = (
        direct.groupby(["scenarioType", "condition"])
        .agg(n=("win_vs_baseline", "size"), participants=("participantId", "nunique"), win_rate=("win_vs_baseline", "mean"))
        .reset_index()
    )
    ci = cluster_bootstrap_ci(direct, ["scenarioType", "condition"], "win_vs_baseline", seed=816).rename(
        columns={"ci_low": "ci_low", "ci_high": "ci_high"}
    )
    return summary.merge(ci, on=["scenarioType", "condition"], how="left")


def fit_bt(responses: pd.DataFrame, scope: str | None = None) -> pd.DataFrame:
    df = responses.copy()
    if scope is not None:
        df = df[df["scenarioType"].eq(scope)].copy()
    y = df["choice"].eq("left").astype(float).to_numpy()
    x = np.zeros((len(df), len(NONBASE_CONDITIONS)))
    for i, (_, row) in enumerate(df.iterrows()):
        for j, condition in enumerate(NONBASE_CONDITIONS):
            if row["leftCondition"] == condition:
                x[i, j] += 1.0
            if row["rightCondition"] == condition:
                x[i, j] -= 1.0

    beta = np.zeros(len(NONBASE_CONDITIONS))
    ridge = 1e-6
    info = np.eye(len(NONBASE_CONDITIONS))
    for _ in range(100):
        z = np.clip(x @ beta, -40, 40)
        p = 1.0 / (1.0 + np.exp(-z))
        w = p * (1.0 - p)
        grad = x.T @ (y - p) - ridge * beta
        info = x.T @ (x * w[:, None]) + ridge * np.eye(len(NONBASE_CONDITIONS))
        step = np.linalg.solve(info, grad)
        beta += step
        if np.max(np.abs(step)) < 1e-8:
            break

    cov = np.linalg.inv(info)
    se = np.sqrt(np.diag(cov))
    rows = [
        {
            "scope": scope or "overall",
            "condition": "baseline",
            "bt_log_odds_vs_baseline": 0.0,
            "se": np.nan,
            "ci_low": np.nan,
            "ci_high": np.nan,
            "odds_vs_baseline": 1.0,
            "p_value": np.nan,
            "n_trials": len(df),
        }
    ]
    for condition, b, s in zip(NONBASE_CONDITIONS, beta, se):
        z = b / s if s > 0 else np.nan
        p_value = math.erfc(abs(z) / math.sqrt(2)) if not np.isnan(z) else np.nan
        rows.append(
            {
                "scope": scope or "overall",
                "condition": condition,
                "bt_log_odds_vs_baseline": float(b),
                "se": float(s),
                "ci_low": float(b - 1.96 * s),
                "ci_high": float(b + 1.96 * s),
                "odds_vs_baseline": float(math.exp(b)),
                "p_value": float(p_value),
                "n_trials": len(df),
            }
        )
    return pd.DataFrame(rows)


def split_counts(questionnaire: pd.DataFrame, field: str) -> pd.DataFrame:
    counts: Counter[str] = Counter()
    n_responses = int(questionnaire[field].notna().sum())
    for value in questionnaire[field].dropna().astype(str):
        for part in value.split(","):
            item = part.strip()
            if item:
                counts[item] += 1
    rows = [
        {
            "field": field,
            "option": option,
            "label": label(option),
            "count": count,
            "response_n": n_responses,
            "pct_of_respondents": count / n_responses if n_responses else 0,
        }
        for option, count in counts.most_common()
    ]
    return pd.DataFrame(rows)


def code_themes(text: str, theme_defs: dict[str, dict[str, list[str] | str]]) -> list[str]:
    clean = str(text).lower()
    found = []
    for theme, meta in theme_defs.items():
        keywords = meta["keywords"]
        if any(keyword in clean for keyword in keywords):  # simple, auditable first-pass coding
            found.append(theme)
    return found


def summarize_themes(
    df: pd.DataFrame,
    text_col: str,
    theme_defs: dict[str, dict[str, list[str] | str]],
    quote_limit: int = 3,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    usable = df[df[text_col].notna() & df[text_col].astype(str).str.strip().ne("")].copy()
    rows = []
    quote_rows = []
    for _, row in usable.iterrows():
        text = str(row[text_col]).strip()
        themes = code_themes(text, theme_defs)
        if not themes:
            themes = ["Other / uncoded"]
        for theme in themes:
            rows.append({"theme": theme, "text": text})
            quote_rows.append({"theme": theme, "quote": text})

    coded = pd.DataFrame(rows)
    if coded.empty:
        return pd.DataFrame(), pd.DataFrame()

    summary = (
        coded.groupby("theme")
        .agg(mentions=("text", "size"))
        .reset_index()
        .sort_values("mentions", ascending=False)
    )
    summary["text_n"] = len(usable)
    summary["pct_of_text_responses"] = summary["mentions"] / len(usable)
    summary["recommendation"] = summary["theme"].map(
        {theme: str(meta["recommendation"]) for theme, meta in theme_defs.items()}
    ).fillna("Review manually; this theme did not match the first-pass codebook.")

    quote_df = pd.DataFrame(quote_rows)
    quote_df["quote_length"] = quote_df["quote"].str.len()

    selected_quotes = []
    for theme, group in quote_df.groupby("theme", dropna=False):
        candidates = group[group["quote_length"].between(45, 240)].copy()
        if candidates.empty:
            candidates = group.copy()
        candidates["_quote_score"] = (candidates["quote_length"] - 130).abs()
        selected_quotes.append(candidates.sort_values("_quote_score").head(quote_limit))
    quote_df = pd.concat(selected_quotes, ignore_index=True).drop(columns=["quote_length", "_quote_score"])
    return summary, quote_df


def svg_text(x: float, y: float, text: str, size: int = 13, weight: str = "400", anchor: str = "start") -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-family="Inter, Arial, sans-serif" '
        f'font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="#1f2933">'
        f"{html.escape(str(text))}</text>"
    )


def write_grouped_bar_svg(
    path: Path,
    title: str,
    subtitle: str,
    categories: list[str],
    groups: list[str],
    values: dict[tuple[str, str], tuple[float, float | None, float | None]],
    y_label: str,
    y_max: float,
    percent: bool = False,
    colors: list[str] | None = None,
) -> None:
    colors = colors or ["#2f6f9f", "#d76f30", "#5d8b45", "#7b5ea7"]
    width = 1060
    height = 700
    left = 86
    right = 42
    top = 106
    bottom = 118
    plot_w = width - left - right
    plot_h = height - top - bottom
    zero_y = top + plot_h
    category_w = plot_w / len(categories)
    bar_w = min(38, category_w / (len(groups) + 1.2))
    fmt = (lambda v: f"{v:.0%}") if percent else (lambda v: f"{v:.2f}")

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        svg_text(left, 42, title, size=24, weight="700"),
        svg_text(left, 68, subtitle, size=13),
        svg_text(22, top + plot_h / 2, y_label, size=12, anchor="middle").replace(
            "<text", '<text transform="rotate(-90 22 {0:.1f})"'.format(top + plot_h / 2), 1
        ),
    ]

    for tick in np.linspace(0, y_max, 6):
        y = zero_y - (tick / y_max) * plot_h
        parts.append(f'<line x1="{left}" y1="{y:.1f}" x2="{width-right}" y2="{y:.1f}" stroke="#e6e9ee"/>')
        parts.append(svg_text(left - 10, y + 4, fmt(tick), size=11, anchor="end"))

    for i, category in enumerate(categories):
        cx = left + i * category_w + category_w / 2
        parts.append(svg_text(cx, zero_y + 30, CONDITION_LABELS.get(category, category), size=13, weight="600", anchor="middle"))
        cluster_w = len(groups) * bar_w
        start_x = cx - cluster_w / 2
        for j, group in enumerate(groups):
            val, ci_low, ci_high = values.get((category, group), (0.0, None, None))
            bar_h = max(0, (val / y_max) * plot_h)
            x = start_x + j * bar_w
            y = zero_y - bar_h
            parts.append(
                f'<rect x="{x:.1f}" y="{y:.1f}" width="{bar_w - 4:.1f}" height="{bar_h:.1f}" '
                f'rx="3" fill="{colors[j % len(colors)]}"/>'
            )
            label_y = max(top + 16, y - 8)
            parts.append(svg_text(x + (bar_w - 4) / 2, label_y, fmt(val), size=10, anchor="middle"))
            if ci_low is not None and ci_high is not None and not (math.isnan(ci_low) or math.isnan(ci_high)):
                e_low = zero_y - (max(0, ci_low) / y_max) * plot_h
                e_high = zero_y - (min(y_max, ci_high) / y_max) * plot_h
                mid_x = x + (bar_w - 4) / 2
                parts.append(f'<line x1="{mid_x:.1f}" y1="{e_high:.1f}" x2="{mid_x:.1f}" y2="{e_low:.1f}" stroke="#1f2933" stroke-width="1.5"/>')
                parts.append(f'<line x1="{mid_x - 5:.1f}" y1="{e_high:.1f}" x2="{mid_x + 5:.1f}" y2="{e_high:.1f}" stroke="#1f2933" stroke-width="1.5"/>')
                parts.append(f'<line x1="{mid_x - 5:.1f}" y1="{e_low:.1f}" x2="{mid_x + 5:.1f}" y2="{e_low:.1f}" stroke="#1f2933" stroke-width="1.5"/>')

    legend_x = left
    legend_y = height - 42
    for j, group in enumerate(groups):
        lx = legend_x + j * 140
        parts.append(f'<rect x="{lx}" y="{legend_y - 12}" width="14" height="14" rx="2" fill="{colors[j % len(colors)]}"/>')
        parts.append(svg_text(lx + 22, legend_y, SCOPE_LABELS.get(group, group), size=12))

    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def write_horizontal_bar_svg(path: Path, title: str, subtitle: str, rows: pd.DataFrame) -> None:
    rows = rows.sort_values("count", ascending=True).copy()
    n = len(rows)
    width = 1080
    row_h = 34
    height = max(280, 122 + row_h * n)
    left = 300
    right = 130
    top = 86
    plot_w = width - left - right
    max_count = max(1, int(rows["count"].max()))
    color = "#2f6f9f"

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        svg_text(34, 38, title, size=24, weight="700"),
        svg_text(34, 64, subtitle, size=13),
    ]
    for i, (_, row) in enumerate(rows.iterrows()):
        y = top + i * row_h
        bar_w = (float(row["count"]) / max_count) * plot_w
        parts.append(svg_text(left - 14, y + 22, row["label"], size=12, anchor="end"))
        parts.append(f'<rect x="{left}" y="{y + 6}" width="{bar_w:.1f}" height="20" rx="3" fill="{color}"/>')
        parts.append(
            svg_text(
                left + bar_w + 10,
                y + 22,
                f'{int(row["count"])} ({float(row["pct_of_respondents"]):.0%})',
                size=12,
            )
        )
    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def write_qual_bar_svg(path: Path, title: str, subtitle: str, rows: pd.DataFrame) -> None:
    if rows.empty:
        rows = pd.DataFrame(
            [{"theme": "No coded responses", "mentions": 0, "pct_of_text_responses": 0.0}]
        )
    chart_rows = rows[["theme", "mentions", "pct_of_text_responses"]].copy()
    chart_rows = chart_rows.rename(
        columns={
            "theme": "label",
            "mentions": "count",
            "pct_of_text_responses": "pct_of_respondents",
        }
    )
    write_horizontal_bar_svg(path, title, subtitle, chart_rows)


def make_charts(
    condition_by_scope: pd.DataFrame,
    direct_baseline: pd.DataFrame,
    bt_scores: pd.DataFrame,
    final_counts: dict[str, pd.DataFrame],
    script_themes: pd.DataFrame,
    ideal_themes: pd.DataFrame,
    script_qual_source: str,
) -> None:
    values = {}
    for _, row in condition_by_scope.iterrows():
        values[(row["condition"], row["scenarioType"])] = (row["win_rate"], row["ci_low"], row["ci_high"])
    write_grouped_bar_svg(
        CHART_DIR / "condition_win_rate_by_daily_vs_task.svg",
        "Condition Win Rate by Scenario Type",
        "Cluster bootstrap 95% intervals by participant; each script appearance is one observation.",
        CONDITION_ORDER,
        SCOPE_ORDER,
        values,
        "Win rate",
        1.0,
        percent=True,
    )

    rating_values = {}
    for _, row in condition_by_scope.iterrows():
        rating_values[(row["condition"], row["scenarioType"])] = (
            row["avg_rating"],
            row["rating_ci_low"],
            row["rating_ci_high"],
        )
    write_grouped_bar_svg(
        CHART_DIR / "condition_average_rating_by_daily_vs_task.svg",
        "Average Rating by Condition and Scenario Type",
        "Cluster bootstrap 95% intervals by participant.",
        CONDITION_ORDER,
        SCOPE_ORDER,
        rating_values,
        "Average rating",
        max(5.0, math.ceil(float(condition_by_scope["avg_rating"].max()))),
        percent=False,
    )

    direct_values = {}
    for _, row in direct_baseline.iterrows():
        direct_values[(row["condition"], row["scenarioType"])] = (row["win_rate"], row["ci_low"], row["ci_high"])
    write_grouped_bar_svg(
        CHART_DIR / "direct_win_rate_vs_baseline_by_daily_vs_task.svg",
        "Direct Win Rate vs Baseline",
        "Only trials where a non-baseline condition was paired directly against baseline.",
        NONBASE_CONDITIONS,
        SCOPE_ORDER,
        direct_values,
        "Win rate vs baseline",
        1.0,
        percent=True,
    )

    bt_overall = bt_scores[bt_scores["scope"].eq("overall")].copy()
    bt_values = {}
    for _, row in bt_overall.iterrows():
        ci_low = math.exp(row["ci_low"]) if not pd.isna(row["ci_low"]) else None
        ci_high = math.exp(row["ci_high"]) if not pd.isna(row["ci_high"]) else None
        bt_values[(row["condition"], "overall")] = (
            row["odds_vs_baseline"],
            ci_low,
            ci_high,
        )
    write_grouped_bar_svg(
        CHART_DIR / "bradley_terry_scores_vs_baseline.svg",
        "Bradley-Terry Odds vs Baseline",
        "Values below 1.0 mean lower odds of being chosen than baseline after accounting for pairings.",
        CONDITION_ORDER,
        ["overall"],
        bt_values,
        "Odds vs baseline",
        max(1.2, math.ceil(float(bt_overall["odds_vs_baseline"].max()) * 10) / 10),
        percent=False,
        colors=["#5d8b45"],
    )

    for field, counts in final_counts.items():
        write_horizontal_bar_svg(
            CHART_DIR / f"final_{slugify(field)}.svg",
            FIELD_LABELS[field],
            f"Count and percent of final questionnaire respondents; multi-select items count independently.",
            counts,
        )

    write_qual_bar_svg(
        CHART_DIR / "qual_script_improvement_themes.svg",
        "Script Improvement Themes",
        f"First-pass coded themes from {script_qual_source}.",
        script_themes,
    )
    write_qual_bar_svg(
        CHART_DIR / "qual_ideal_mental_rehearsal_themes.svg",
        "Ideal Mental Rehearsal Themes",
        "First-pass coded themes from final open-ended questionnaire responses.",
        ideal_themes,
    )


def convert_svg_charts_to_png(width_px: int = 2160) -> None:
    converter = shutil.which("rsvg-convert")
    if not converter:
        raise RuntimeError("rsvg-convert is required to export PNG charts from SVG outputs.")

    for svg_path in sorted(CHART_DIR.glob("*.svg")):
        png_path = svg_path.with_suffix(".png")
        subprocess.run(
            [converter, "-w", str(width_px), "-f", "png", "-o", str(png_path), str(svg_path)],
            check=True,
        )


def markdown_table(df: pd.DataFrame, columns: list[str], max_rows: int = 10) -> str:
    if df.empty:
        return "_No rows._"
    view = df[columns].head(max_rows).copy()
    str_rows = [[str(value) for value in row] for row in view.to_numpy().tolist()]
    headers = [str(column) for column in columns]
    widths = [
        max(len(headers[i]), *(len(row[i]) for row in str_rows)) if str_rows else len(headers[i])
        for i in range(len(headers))
    ]
    header_line = "| " + " | ".join(headers[i].ljust(widths[i]) for i in range(len(headers))) + " |"
    sep_line = "| " + " | ".join("-" * widths[i] for i in range(len(headers))) + " |"
    body_lines = [
        "| " + " | ".join(row[i].ljust(widths[i]) for i in range(len(headers))) + " |"
        for row in str_rows
    ]
    return "\n".join([header_line, sep_line, *body_lines])


def format_pct(value: float) -> str:
    return f"{value:.0%}"


def write_summary(
    responses: pd.DataFrame,
    questionnaire: pd.DataFrame,
    condition_by_scope: pd.DataFrame,
    overall: pd.DataFrame,
    direct_baseline: pd.DataFrame,
    bt_scores: pd.DataFrame,
    final_counts: dict[str, pd.DataFrame],
    script_themes: pd.DataFrame,
    script_quotes: pd.DataFrame,
    ideal_themes: pd.DataFrame,
    ideal_quotes: pd.DataFrame,
    script_qual_source: str,
) -> None:
    overall_sorted = overall.sort_values("win_rate", ascending=False).copy()
    overall_sorted["win_rate_fmt"] = overall_sorted["win_rate"].map(format_pct)
    overall_sorted["avg_rating_fmt"] = overall_sorted["avg_rating"].map(lambda v: f"{v:.2f}")

    by_scope_view = condition_by_scope.copy()
    by_scope_view["win_rate_fmt"] = by_scope_view["win_rate"].map(format_pct)
    by_scope_view["avg_rating_fmt"] = by_scope_view["avg_rating"].map(lambda v: f"{v:.2f}")
    by_scope_view["condition"] = by_scope_view["condition"].map(CONDITION_LABELS)
    by_scope_view["scenarioType"] = by_scope_view["scenarioType"].map(SCOPE_LABELS)

    top_final = []
    for field, counts in final_counts.items():
        if counts.empty:
            continue
        top = counts.iloc[0]
        top_final.append(
            {
                "question": FIELD_LABELS[field],
                "top_option": top["label"],
                "count": int(top["count"]),
                "pct": format_pct(float(top["pct_of_respondents"])),
            }
        )
    top_final_df = pd.DataFrame(top_final)

    bt_view = bt_scores[bt_scores["scope"].eq("overall")].copy()
    bt_view["condition"] = bt_view["condition"].map(CONDITION_LABELS)
    bt_view["bt_log_odds_vs_baseline"] = bt_view["bt_log_odds_vs_baseline"].map(lambda v: f"{v:.2f}")
    bt_view["odds_vs_baseline"] = bt_view["odds_vs_baseline"].map(lambda v: f"{v:.2f}x")
    bt_view["p_value"] = bt_view["p_value"].map(lambda v: "" if pd.isna(v) else f"{v:.3f}")

    script_theme_view = script_themes.head(8).copy()
    script_theme_view["pct_of_text_responses"] = script_theme_view["pct_of_text_responses"].map(format_pct)
    ideal_theme_view = ideal_themes.head(8).copy()
    ideal_theme_view["pct_of_text_responses"] = ideal_theme_view["pct_of_text_responses"].map(format_pct)

    chart_links = "\n".join(
        f"- [{path.name}](charts/{path.name})" for path in sorted(CHART_DIR.glob("*.png"))
    )

    quote_lines = []
    for theme in script_theme_view["theme"].head(5):
        quotes = script_quotes[script_quotes["theme"].eq(theme)]["quote"].head(2).tolist()
        if quotes:
            quote_lines.append(f"- **{theme}:** " + " / ".join(f'"{q[:180]}"' for q in quotes))

    ideal_quote_lines = []
    for theme in ideal_theme_view["theme"].head(5):
        quotes = ideal_quotes[ideal_quotes["theme"].eq(theme)]["quote"].head(2).tolist()
        if quotes:
            ideal_quote_lines.append(f"- **{theme}:** " + " / ".join(f'"{q[:180]}"' for q in quotes))

    summary = f"""# Mental Rehearsal Ablation Analysis

Generated from read-only Google Sheet export.

## Dataset

- Pairwise trials: {len(responses)}
- Unique pairwise participants: {responses["participantId"].nunique()}
- Final questionnaire rows: {len(questionnaire)}
- Unique questionnaire participants: {questionnaire["participantId"].nunique()}
- Conditions: {", ".join(CONDITION_LABELS[c] for c in CONDITION_ORDER)}
- Scenario types: Daily and Task

## Overall Condition Readout

{markdown_table(overall_sorted.assign(condition=overall_sorted["condition"].map(CONDITION_LABELS)), ["condition", "appearances", "wins", "win_rate_fmt", "avg_rating_fmt"])}

## Daily vs Task

{markdown_table(by_scope_view, ["scenarioType", "condition", "appearances", "wins", "win_rate_fmt", "avg_rating_fmt"], max_rows=20)}

## Bradley-Terry Model

{markdown_table(bt_view, ["condition", "bt_log_odds_vs_baseline", "odds_vs_baseline", "p_value"])}

## Final Questionnaire Top Options

{markdown_table(top_final_df, ["question", "top_option", "count", "pct"], max_rows=20)}

## Qualitative: Script Improvements

Source: {script_qual_source}.

{markdown_table(script_theme_view, ["theme", "mentions", "pct_of_text_responses", "recommendation"], max_rows=12)}

Representative quotes:

{chr(10).join(quote_lines)}

## Qualitative: Ideal Mental Rehearsal

{markdown_table(ideal_theme_view, ["theme", "mentions", "pct_of_text_responses", "recommendation"], max_rows=12)}

Representative quotes:

{chr(10).join(ideal_quote_lines)}

## Product Implications

1. Default script should be calm, specific, and structured: current users repeatedly ask for real task/day grounding plus a gentle step-by-step arc.
2. Keep scripts concise by default. Offer expansion or interactive steps rather than making every script long.
3. Combine body grounding with practical planning. Users like breathing/body check-ins when they lead into concrete action.
4. Include one obstacle rehearsal. It appears often enough in both preferences and ideal guidance to justify a standard slot.
5. Audio should be configurable, not mandatory. Nature/ambient/spoken layers matter, but some users choose none/readable text.

## Charts

{chart_links}
"""
    (OUT_DIR / "analysis_summary.md").write_text(summary, encoding="utf-8")


def main() -> None:
    ensure_dirs()
    responses, questionnaire = read_data()
    long_df = make_long_responses(responses)

    condition_by_scope, overall = condition_summaries(long_df)
    direct_baseline = direct_baseline_summary(responses)
    bt_scores = pd.concat(
        [fit_bt(responses), fit_bt(responses, "daily"), fit_bt(responses, "task")],
        ignore_index=True,
    )

    final_counts: dict[str, pd.DataFrame] = {}
    for field in FIELD_LABELS:
        counts = split_counts(questionnaire, field)
        final_counts[field] = counts
        counts.to_csv(TABLE_DIR / f"final_{slugify(field)}_counts.csv", index=False)

    reason_df = responses[["responseId", "participantId", "scenarioType", "winnerCondition", "loserCondition", "improvementText"]].copy()
    if reason_df["improvementText"].notna().sum() > 0 and reason_df["improvementText"].astype(str).str.strip().ne("").any():
        script_qual_df = reason_df
        script_qual_col = "improvementText"
        script_qual_source = "pairwise improvement responses"
    else:
        script_qual_df = questionnaire[["participantId", "idealMorningGuidance"]].rename(
            columns={"idealMorningGuidance": "scriptImprovementEvidence"}
        )
        script_qual_col = "scriptImprovementEvidence"
        script_qual_source = "final ideal-guidance responses because pairwise reason field is blank"
    script_themes, script_quotes = summarize_themes(script_qual_df, script_qual_col, SCRIPT_THEME_DEFS)
    ideal_themes, ideal_quotes = summarize_themes(questionnaire[["participantId", "idealMorningGuidance"]].copy(), "idealMorningGuidance", IDEAL_THEME_DEFS)

    condition_by_scope.to_csv(TABLE_DIR / "condition_by_daily_vs_task.csv", index=False)
    overall.to_csv(TABLE_DIR / "condition_overall.csv", index=False)
    direct_baseline.to_csv(TABLE_DIR / "direct_vs_baseline.csv", index=False)
    bt_scores.to_csv(TABLE_DIR / "bradley_terry_scores.csv", index=False)
    script_themes.to_csv(TABLE_DIR / "qual_script_improvement_themes.csv", index=False)
    script_quotes.to_csv(TABLE_DIR / "qual_script_improvement_quotes.csv", index=False)
    ideal_themes.to_csv(TABLE_DIR / "qual_ideal_mental_rehearsal_themes.csv", index=False)
    ideal_quotes.to_csv(TABLE_DIR / "qual_ideal_mental_rehearsal_quotes.csv", index=False)
    long_df.to_csv(TABLE_DIR / "long_condition_appearances.csv", index=False)

    make_charts(condition_by_scope, direct_baseline, bt_scores, final_counts, script_themes, ideal_themes, script_qual_source)
    convert_svg_charts_to_png()
    write_summary(
        responses,
        questionnaire,
        condition_by_scope,
        overall,
        direct_baseline,
        bt_scores,
        final_counts,
        script_themes,
        script_quotes,
        ideal_themes,
        ideal_quotes,
        script_qual_source,
    )

    print(f"Wrote charts: {CHART_DIR}")
    print(f"Wrote tables: {TABLE_DIR}")
    print(f"Wrote summary: {OUT_DIR / 'analysis_summary.md'}")


if __name__ == "__main__":
    main()
