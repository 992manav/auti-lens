from typing import Dict, List, Literal, Optional

from pydantic import BaseModel, Field, conlist


class Demographics(BaseModel):
    age_months: int = Field(ge=18, le=144, description="Child age in months")
    sex: Literal["male", "female", "other"] = "other"


class BehavioralSignals(BaseModel):
    gaze_score: float = Field(default=0.5, ge=0.0, le=1.0)
    expression_variability: float = Field(default=0.5, ge=0.0, le=1.0)
    movement_symmetry: float = Field(default=0.5, ge=0.0, le=1.0)
    repetitive_motion_index: float = Field(default=0.5, ge=0.0, le=1.0)


class AssessmentInput(BaseModel):
    aq10_responses: conlist(int, min_length=10, max_length=10)
    demographics: Demographics
    behavioral_signals: BehavioralSignals = BehavioralSignals()
    eeg_features: Dict[str, float] = Field(default_factory=dict)


class RiskPrediction(BaseModel):
    risk_probability: float
    risk_level: Literal["low", "moderate", "high"]
    model_accuracy: float
    model_type: str


class RetrievedDocument(BaseModel):
    doc_id: str
    title: str
    source: str
    score: float
    excerpt: str


class TherapyRecommendation(BaseModel):
    summary: str
    goals: List[str]
    plan: List[str]
    monitoring: List[str]
    references: List[RetrievedDocument]


class UnifiedAssessment(BaseModel):
    risk: RiskPrediction
    recommendation: TherapyRecommendation
    orchestration: str = "langgraph"
    modalities_used: List[str]
