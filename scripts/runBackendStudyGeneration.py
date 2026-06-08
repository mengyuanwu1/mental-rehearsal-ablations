"""Generate study scripts through the real backend ablation pipeline.

This helper is intentionally thin. The TypeScript study repo owns the
synthetic persona inputs; this Python file only validates those inputs
against backend Pydantic schemas and calls `generate_ablation_rehearsal`.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from typing import Any

ARM_GENERATION_SOURCE_SUFFIX = {
    "body": "body_grounding_backend",
    "mind": "mind_success_visualization_backend",
    "soul": "soul_value_anchoring_backend",
    "full": "full_three_phase_backend",
}


def _word_count(text: str) -> int:
    return len(text.strip().split())


_BASELINE_SYSTEM_PROMPT = """You are a generic assistant producing a baseline control script for an experiment.

The user asks: "Help me mentally prepare my day."

Use only the visible schedule/task context provided. Do not use or infer body data, values, goals, life priority, priority rank, or hidden personalization.

Keep this baseline intentionally simple and generic. Do not use mental rehearsal techniques: no visualization, no breathwork, no body grounding, no values anchoring, no identity language, no affirmations, no reflective imagery questions, no PETTLEP-style cues, no success-case imagery.

Do not make the schedule smarter. Do not prioritize. Do not coach deeply. Just give a plain, ordinary, LLM-style preparation note that restates the visible items and suggests moving through them.

Keep it short: about 90-130 words for daily schedules and 50-90 words for task contexts. Return only the script text."""


def _baseline_user_prompt(payload: dict[str, Any]) -> str:
    return (
        "Generate the baseline response to this user request: "
        '"Help me mentally prepare my day."\n\n'
        "Visible context:\n"
        f"{json.dumps(payload, ensure_ascii=False, indent=2)}"
    )


def _generate_baseline(payload: dict[str, Any]) -> dict[str, Any]:
    from app.schemas.common import ConversationMessage
    from app.services.llm import generate_raw_output

    script, model, used_mock = generate_raw_output(
        messages=[
            ConversationMessage(role="system", content=_BASELINE_SYSTEM_PROMPT),
            ConversationMessage(role="user", content=_baseline_user_prompt(payload)),
        ],
        reasoning_effort="low",
        max_output_tokens=350,
    )
    return {
        "condition": "baseline",
        "generation_source": "openai.simple_baseline_prompt",
        "model": model,
        "used_mock": used_mock,
        "input": payload,
        "script": script.strip(),
    }


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit(
            "Usage: runBackendStudyGeneration.py <request-plan.json> <result.json>"
        )

    request_plan_path = Path(sys.argv[1]).resolve()
    result_path = Path(sys.argv[2]).resolve()
    backend_root = Path(__file__).resolve().parents[2] / "backend"
    if str(backend_root) not in sys.path:
        sys.path.insert(0, str(backend_root))

    os.environ["OPENAI_MODEL"] = (
        os.getenv("ABLATION_OPENAI_MODEL")
        or os.getenv("OPENAI_MODEL")
        or "gpt-5.5"
    )

    from app.schemas.rehearsal_ablation import MentalRehearsalAblationRequest
    from app.services import rehearsal_ablation as rehearsal_ablation_service

    prompt_override_path = os.getenv("OVERRIDE_REHEARSAL_SYSTEM_PROMPT_PATH", "").strip()
    rehearsal_generation_source = "backend.generate_ablation_rehearsal"
    if prompt_override_path:
        prompt_path = Path(prompt_override_path).resolve()
        rehearsal_ablation_service._SYSTEM_PROMPT = prompt_path.read_text(
            encoding="utf-8",
        )
        rehearsal_generation_source = (
            f"backend.generate_ablation_rehearsal:{prompt_path.name}"
        )
        print(f"Using rehearsal prompt override: {prompt_path}", flush=True)

    plan = json.loads(request_plan_path.read_text(encoding="utf-8"))
    reuse_existing = os.getenv("REUSE_EXISTING_BACKEND_RESULTS") == "1"
    reuse_baseline = os.getenv("REUSE_BASELINE_RESULTS") == "1"
    scenario_filter = {
        item.strip()
        for item in os.getenv("SCENARIO_FILTER", "").split(",")
        if item.strip()
    }
    arm_filter = {
        item.strip()
        for item in os.getenv("ARM_FILTER", "").split(",")
        if item.strip()
    }
    existing: dict[str, Any] = {}
    if (reuse_existing or reuse_baseline) and result_path.exists():
        existing = json.loads(result_path.read_text(encoding="utf-8"))

    existing_responses = existing.get("responses", {}) if isinstance(existing, dict) else {}
    responses: dict[str, dict[str, dict]] = {}

    for scenario in plan["scenarios"]:
        scenario_id = scenario["id"]
        responses[scenario_id] = dict(existing_responses.get(scenario_id, {}))
        scenario_selected = not scenario_filter or scenario_id in scenario_filter

        baseline_payload = scenario.get("baseline")
        if baseline_payload is not None:
            should_generate_baseline = scenario_selected and (
                not arm_filter or "baseline" in arm_filter
            )
            force_filtered_baseline = should_generate_baseline and bool(
                scenario_filter or arm_filter
            )
            if (
                not should_generate_baseline
                or (
                    (reuse_existing or reuse_baseline)
                    and not force_filtered_baseline
                    and responses[scenario_id].get("baseline")
                )
            ):
                response = responses[scenario_id]["baseline"]
                print(
                    f"{scenario_id}/baseline: reused, {response.get('model')}, "
                    f"{_word_count(response.get('script', ''))} words",
                    flush=True,
                )
            else:
                response = _generate_baseline(baseline_payload)
                responses[scenario_id]["baseline"] = response
                mode = "mock" if response["used_mock"] else "real"
                print(
                    f"{scenario_id}/baseline: {mode}, {response['model']}, "
                    f"{_word_count(response['script'])} words",
                    flush=True,
                )

        for arm, payload in scenario["requests"].items():
            should_generate_arm = scenario_selected and (
                not arm_filter or arm in arm_filter
            )
            force_filtered_generation = should_generate_arm and bool(
                scenario_filter or arm_filter
            )
            if not should_generate_arm or (
                reuse_existing
                and not force_filtered_generation
                and responses[scenario_id].get(arm)
            ):
                response = responses[scenario_id][arm]
                print(
                    f"{scenario_id}/{arm}: reused, {response.get('model')}, "
                    f"{_word_count(response.get('script', ''))} words",
                    flush=True,
                )
                continue

            request = MentalRehearsalAblationRequest.model_validate(payload)
            response = rehearsal_ablation_service.generate_ablation_rehearsal(request)
            responses[scenario_id][arm] = response.model_dump(
                mode="json",
                exclude_none=True,
                exclude_defaults=True,
            )
            source_suffix = ARM_GENERATION_SOURCE_SUFFIX.get(arm, arm)
            responses[scenario_id][arm]["generation_source"] = (
                f"{rehearsal_generation_source}:{source_suffix}"
            )
            mode = "mock" if response.used_mock else "real"
            print(
                f"{scenario_id}/{arm}: {mode}, {response.model}, "
                f"{_word_count(response.script)} words",
                flush=True,
            )

    result = {
        "generatedAt": plan["generatedAt"],
        "requestedModel": plan["requestedModel"],
        "generationSource": (
            "baseline=openai.simple_baseline_prompt; "
            f"rehearsal={rehearsal_generation_source}"
        ),
        "responses": responses,
    }
    result_path.write_text(
        f"{json.dumps(result, ensure_ascii=False, indent=2)}\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
