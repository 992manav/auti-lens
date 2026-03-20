from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import AssessmentInput, RiskPrediction, TherapyRecommendation, UnifiedAssessment
from app.services.langgraph_workflow import create_assessment_graph
from app.services.rag_engine import ClinicalRAGEngine
from app.services.risk_model import RandomForestRiskModel

app = FastAPI(
    title="AUTI-LENS Agentic Backend",
    description="LangGraph-orchestrated multimodal autism risk and therapy recommendation backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

risk_model = RandomForestRiskModel()
rag_engine = ClinicalRAGEngine()
assessment_graph = create_assessment_graph(risk_model=risk_model, rag_engine=rag_engine)


@app.get("/health")
def health() -> dict:
    return {
        "status": "ok",
        "service": "auti-lens-backend",
        "model": "random-forest",
        "orchestration": "langgraph",
    }


@app.get("/metrics/model")
def model_metrics() -> dict:
    assert risk_model.metrics is not None
    return {
        "model_type": "RandomForestClassifier",
        "accuracy": risk_model.metrics.accuracy,
        "n_samples": risk_model.metrics.n_samples,
        "features": risk_model.metrics.feature_names,
    }


@app.post("/api/risk/predict", response_model=RiskPrediction)
def predict_risk(payload: AssessmentInput) -> RiskPrediction:
    prediction = risk_model.predict(payload)
    return RiskPrediction(**prediction)


@app.post("/api/therapy/recommend", response_model=TherapyRecommendation)
def recommend_therapy(payload: AssessmentInput) -> TherapyRecommendation:
    risk = risk_model.predict(payload)
    query = (
        f"{risk['risk_level']} autism risk profile with AQ-10 score {sum(payload.aq10_responses)} "
        f"and repetitive motion index {payload.behavioral_signals.repetitive_motion_index}"
    )
    docs = rag_engine.retrieve(query, top_k=5)
    recommendation = rag_engine.build_structured_recommendation(
        risk_level=str(risk["risk_level"]),
        retrieved_docs=docs,
    )
    return TherapyRecommendation(**recommendation)


@app.post("/api/agent/assess", response_model=UnifiedAssessment)
def run_agentic_assessment(payload: AssessmentInput) -> UnifiedAssessment:
    result = assessment_graph.invoke({"payload": payload})
    return UnifiedAssessment(**result["unified_report"])
