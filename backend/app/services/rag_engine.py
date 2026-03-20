from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer


@dataclass
class ClinicalDocument:
    doc_id: str
    title: str
    source: str
    content: str


class ClinicalRAGEngine:
    def __init__(self) -> None:
        self.documents = self._build_curated_documents()
        self.vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
        self.doc_matrix = self.vectorizer.fit_transform([d.content for d in self.documents])

    def _build_curated_documents(self) -> List[ClinicalDocument]:
        domains = [
            "social communication",
            "joint attention",
            "expressive language",
            "receptive language",
            "sensory regulation",
            "behavioral flexibility",
        ]
        interventions = [
            "naturalistic developmental behavioral intervention",
            "parent-mediated interaction coaching",
            "play-based reciprocal engagement",
            "structured visual scheduling",
            "occupational sensory integration",
            "speech-language pragmatic drills",
            "routine desensitization protocol",
            "peer imitation scaffolding",
            "reinforcement shaping with fading prompts",
            "co-regulation and emotional labeling",
        ]
        goals = [
            "increase spontaneous eye contact",
            "improve response to name",
            "reduce repetitive motor patterns",
            "increase turn-taking duration",
            "improve gesture-based requesting",
            "improve tolerance to transitions",
        ]

        docs: List[ClinicalDocument] = []
        idx = 1
        for domain in domains:
            for intervention in interventions:
                for goal in goals[:2]:
                    docs.append(
                        ClinicalDocument(
                            doc_id=f"DOC-{idx:03d}",
                            title=f"{domain.title()} using {intervention.title()}",
                            source="Curated Autism Research Digest",
                            content=(
                                f"Domain: {domain}. Intervention: {intervention}. "
                                f"Clinical objective: {goal}. "
                                "Recommended schedule includes 20-30 minute structured sessions, "
                                "parent observation logs, and weekly progression review with therapist. "
                                "Outcome metrics include social initiations, gaze stability, "
                                "communication intent, and adaptive behavior score trends."
                            ),
                        )
                    )
                    idx += 1

        # 6 * 10 * 2 = 120 curated docs
        return docs

    def retrieve(self, query: str, top_k: int = 5) -> List[Dict[str, str | float]]:
        q = self.vectorizer.transform([query])
        scores = (self.doc_matrix @ q.T).toarray().flatten()
        top_idx = np.argsort(scores)[::-1][:top_k]

        results: List[Dict[str, str | float]] = []
        for i in top_idx:
            doc = self.documents[int(i)]
            results.append(
                {
                    "doc_id": doc.doc_id,
                    "title": doc.title,
                    "source": doc.source,
                    "score": round(float(scores[i]), 4),
                    "excerpt": doc.content[:220] + "...",
                }
            )
        return results

    def build_structured_recommendation(
        self, risk_level: str, retrieved_docs: List[Dict[str, str | float]]
    ) -> Dict[str, List[str] | str]:
        if risk_level == "high":
            cadence = "5 sessions/week with therapist-led + parent-led hybrid implementation"
            monitor = "weekly multidisciplinary review"
        elif risk_level == "moderate":
            cadence = "3 sessions/week with parent-mediated home reinforcement"
            monitor = "biweekly developmental review"
        else:
            cadence = "2 sessions/week preventive developmental enrichment"
            monitor = "monthly check-in"

        goals = [
            "Increase reciprocal social communication signals",
            "Improve attention shifting and response-to-name behavior",
            "Reduce repetitive movement intensity and increase adaptive engagement",
        ]
        plan = [
            f"Primary cadence: {cadence}",
            "Use visual prompts and turn-taking games for joint attention training",
            "Track gaze, expression variability, and movement symmetry as longitudinal markers",
            "Include AQ-10 reassessment checkpoints every 6-8 weeks",
        ]
        monitoring = [
            f"Clinical governance: {monitor}",
            "Escalate to full diagnostic evaluation if risk trajectory is rising over 2 checkpoints",
            "Maintain caregiver diary of triggers, soothing success, and communication gains",
        ]

        return {
            "summary": f"Personalized therapy guidance generated for {risk_level} risk profile.",
            "goals": goals,
            "plan": plan,
            "monitoring": monitoring,
            "references": retrieved_docs,
        }
