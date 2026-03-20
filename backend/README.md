# AUTI-LENS Backend

This backend implements the agentic stack described in the project:

- LangGraph orchestration for multimodal assessment flow
- Random Forest risk modeling trained on 650 simulated AQ-10 + demographic + behavioral + EEG samples
- RAG-based therapy recommendation retrieval over 120 curated clinical documents
- FastAPI endpoints for risk prediction, recommendation, and full unified assessment

## Setup

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `GET /metrics/model`
- `POST /api/risk/predict`
- `POST /api/therapy/recommend`
- `POST /api/agent/assess`

## Example Request

```json
{
  "aq10_responses": [1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
  "demographics": {
    "age_months": 48,
    "sex": "male"
  },
  "behavioral_signals": {
    "gaze_score": 0.36,
    "expression_variability": 0.41,
    "movement_symmetry": 0.44,
    "repetitive_motion_index": 0.68
  },
  "eeg_features": {
    "theta_beta_ratio": 0.76,
    "connectivity_score": 0.38
  }
}
```
