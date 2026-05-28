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


def _word_count(text: str) -> int:
    return len(text.strip().split())


_BASELINE_SYSTEM_PROMPT = """You are a general-purpose writing assistant producing a baseline control script for a study.

Use only the visible schedule or task-preparation context provided by the user. Do not use or infer body data, energy, sleep, values, life priority, goals, demographics, priority rank, or hidden personalization. Do not use the mental-rehearsal scaffold, PETTLEP framing, value anchoring, or cue-guided imagery style.

Write a neutral, vanilla preparation script that helps the person mentally prepare to follow the visible schedule or task context. Treat all listed schedule items as ordinary visible items, not ranked priorities. Keep the script similar in length to the experimental scripts, about 180-230 words. Use plain paragraphs, no bullets or section headings. Return only the script text."""


def _baseline_user_prompt(payload: dict[str, Any]) -> str:
    return (
        "Generate the baseline control script from this visible input only:\n"
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
        max_output_tokens=900,
    )
    return {
        "condition": "baseline",
        "generation_source": "openai.vanilla_baseline_prompt",
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
    from app.services.rehearsal_ablation import generate_ablation_rehearsal

    plan = json.loads(request_plan_path.read_text(encoding="utf-8"))
    reuse_existing = os.getenv("REUSE_EXISTING_BACKEND_RESULTS") == "1"
    existing: dict[str, Any] = {}
    if reuse_existing and result_path.exists():
        existing = json.loads(result_path.read_text(encoding="utf-8"))

    existing_responses = existing.get("responses", {}) if isinstance(existing, dict) else {}
    responses: dict[str, dict[str, dict]] = {}

    for scenario in plan["scenarios"]:
        scenario_id = scenario["id"]
        responses[scenario_id] = dict(existing_responses.get(scenario_id, {}))

        baseline_payload = scenario.get("baseline")
        if baseline_payload is not None:
            if reuse_existing and responses[scenario_id].get("baseline"):
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
            if reuse_existing and responses[scenario_id].get(arm):
                response = responses[scenario_id][arm]
                print(
                    f"{scenario_id}/{arm}: reused, {response.get('model')}, "
                    f"{_word_count(response.get('script', ''))} words",
                    flush=True,
                )
                continue

            request = MentalRehearsalAblationRequest.model_validate(payload)
            response = generate_ablation_rehearsal(request)
            responses[scenario_id][arm] = response.model_dump(
                mode="json",
                exclude_none=True,
                exclude_defaults=True,
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
        "generationSource": "baseline=openai.vanilla_baseline_prompt; rehearsal=backend.generate_ablation_rehearsal",
        "responses": responses,
    }
    result_path.write_text(
        f"{json.dumps(result, ensure_ascii=False, indent=2)}\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
