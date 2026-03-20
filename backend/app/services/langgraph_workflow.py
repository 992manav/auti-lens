from __future__ import annotations

from typing import Dict, List, TypedDict

from langgraph.graph import END, START, StateGraph

from app.schemas import AssessmentInput
from app.services.rag_engine import ClinicalRAGEngine
from app.services.risk_model import RandomForestRiskModel


class AssessmentState(TypedDict, total=False):
    payload: AssessmentInput
    modalities_used: List[str]
    risk: Dict[str, float | str]
    retrieval_query: str
    retrieved_docs: List[Dict[str, str | float]]
    recommendation: Dict[str, object]
    unified_report: Dict[str, object]


def create_assessment_graph(
    risk_model: RandomForestRiskModel, rag_engine: ClinicalRAGEngine
):
    def detect_modalities(state: AssessmentState) -> AssessmentState:
        payload = state["payload"]
        modalities = ["aq10", "behavior_video"]
        if payload.eeg_features:
            modalities.append("eeg")
        return {"modalities_used": modalities}

    def score_risk(state: AssessmentState) -> AssessmentState:
        payload = state["payload"]
        risk = risk_model.predict(payload)

        query = (
            f"{risk['risk_level']} autism risk; gaze={payload.behavioral_signals.gaze_score}; "
            f"repetitive={payload.behavioral_signals.repetitive_motion_index}; "
            f"aq10_sum={sum(payload.aq10_responses)}"
        )
        return {"risk": risk, "retrieval_query": query}

    def retrieve_knowledge(state: AssessmentState) -> AssessmentState:
        docs = rag_engine.retrieve(state["retrieval_query"], top_k=5)
        return {"retrieved_docs": docs}

    def generate_recommendation(state: AssessmentState) -> AssessmentState:
        recommendation = rag_engine.build_structured_recommendation(
            risk_level=str(state["risk"]["risk_level"]),
            retrieved_docs=state["retrieved_docs"],
        )
        return {"recommendation": recommendation}

    def finalize_report(state: AssessmentState) -> AssessmentState:
        report = {
            "risk": state["risk"],
            "recommendation": state["recommendation"],
            "orchestration": "langgraph",
            "modalities_used": state["modalities_used"],
        }
        return {"unified_report": report}

    graph = StateGraph(AssessmentState)
    graph.add_node("detect_modalities", detect_modalities)
    graph.add_node("score_risk", score_risk)
    graph.add_node("retrieve_knowledge", retrieve_knowledge)
    graph.add_node("generate_recommendation", generate_recommendation)
    graph.add_node("finalize_report", finalize_report)

    graph.add_edge(START, "detect_modalities")
    graph.add_edge("detect_modalities", "score_risk")
    graph.add_edge("score_risk", "retrieve_knowledge")
    graph.add_edge("retrieve_knowledge", "generate_recommendation")
    graph.add_edge("generate_recommendation", "finalize_report")
    graph.add_edge("finalize_report", END)

    return graph.compile()
