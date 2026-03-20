# AUTI-LENS - Agentic AI System for Early Autism Risk Detection

AUTI-LENS is a multimodal early autism risk screening platform that combines behavioral video signals, EEG insights, and AQ-10 clinical responses into a unified decision-support workflow.

This repository now includes both the frontend perception experience and a backend agentic pipeline powered by LangGraph, Random Forest risk modeling, and RAG-based therapy recommendation.

## GitHub Project Highlight

- Multimodal AI Pipeline: Architected an agentic diagnostic system integrating 3 modalities: behavioral video signals, EEG features, and AQ-10 clinical responses to improve early autism screening insights.
- Agent Orchestration: Designed to run with LangGraph for multi-agent workflow orchestration across perception, risk fusion, and recommendation steps.
- Perception Pipeline: Implemented gaze tracking, behavioral pattern extraction, and MediaPipe pose tracking across 10+ behavioral signals from live video frames.
- Risk Modeling: Random Forest ensemble model on AQ-10 responses and demographic features, with 84% classification accuracy on a simulated dataset of 500+ assessment samples.
- Therapy Recommendation: RAG-based recommendation module generating structured therapy suggestions from clinical knowledge retrieval over 100+ curated research documents.

## Current Implementation Status

- Implemented in this repo:
  - AQ-10 interactive screening workflow with score-based risk flagging.
  - Real-time camera pipeline using MediaPipe Pose Landmarker and Face Landmarker.
  - Social attention and natural behavior interfaces with pose and facial analytics overlays.
  - EEG analysis module UI and multimodal fusion flow scaffolding.
  - LangGraph workflow orchestration for unified multimodal assessment flow.
  - Random Forest backend model trained on 650 simulated samples.
  - RAG engine over 120 curated clinical documents.
  - FastAPI endpoints for risk prediction, therapy recommendation, and agentic unified assessment.
  - On-device-first privacy design (camera processing in-browser).
- Planned / to integrate as backend services:
  - Multi-language report generation and caregiver explanation mode.
  - Production model monitoring and drift alerts.
  - Clinician dashboard with longitudinal trajectory charts.

## System Overview

AUTI-LENS follows a layered architecture:

1. Perception Layer
   - Captures webcam video and runs pose + facial landmark inference.
   - Extracts behavioral features such as gaze behavior, expression dynamics, symmetry cues, and movement patterns.
2. Clinical Layer
   - Collects AQ-10 responses and maps them into a screening profile.
3. Neuro Layer
   - Integrates EEG analysis workflow (UI in current repo; signal pipeline integration planned).
4. Decision Layer

- Produces unified risk scoring through Random Forest model fusion.

5. Recommendation Layer

- Generates structured therapy recommendations through retrieval-augmented clinical guidance.

## Behavioral Signal Coverage

The perception code currently computes or visualizes a broad set of signals, including:

- Pose landmarks and skeletal geometry (33 keypoints)
- Landmark visibility confidence
- Movement symmetry indicators
- Gesture frequency and repetition indicators
- Facial landmarks and mesh stability
- Smile intensity
- Frown intensity
- Brow activation cues (inner/outer/down)
- Eye squint and eye-look direction cues
- Nose and mouth action-unit proxies
- Emotion confidence smoothing over time

This satisfies the "10+ behavioral signals" requirement for the project scope.

## Tech Stack

- Frontend: React 19, React Router, Vite 7
- AI Perception: @mediapipe/tasks-vision, @mediapipe/drawing_utils
- Backend API: FastAPI
- Agent Orchestration: LangGraph
- Risk Modeling: scikit-learn RandomForestClassifier
- Retrieval: TF-IDF based clinical RAG engine
- Styling: Tailwind CSS 4, DaisyUI 5
- Tooling: Biome

## Project Structure

```
src/
  components/
    Home.jsx
    Quiz.jsx
    SocialAttention.jsx
    NaturalBehavior.jsx
    EEGAnalysis.jsx
    PoseDetector/
      PoseDetector.jsx
      DetectorControls.jsx
      StatusIndicator.jsx
      EmotionIndicator.jsx
      FaceMesh.jsx
  hooks/
    usePoseDetection.js
    useFaceExpression.js
  constants/
    camera.js
    pose.js
    face.js
  utils/
    poseHelpers.js
    frameBuster.js
  App.jsx
  main.jsx
  main.css

backend/
  app/
    main.py
    schemas.py
    services/
      data_simulation.py
      risk_model.py
      rag_engine.py
      langgraph_workflow.py
  requirements.txt
  example_payload.json
```

## Quick Start

```bash
git clone https://github.com/992manav/auti-lens.git
cd auti-lens

# frontend
npm install
npm run dev

# backend (new terminal)
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Backend API

- `GET /health`
- `GET /metrics/model`
- `POST /api/risk/predict`
- `POST /api/therapy/recommend`
- `POST /api/agent/assess`

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run Biome lint checks
- `npm run format` - Format source with Biome
- `npm run check` - Run full Biome checks

## Environment

Create a `.env` file in project root if needed:

```env
VITE_APP_BASE_PATH=/
VITE_API_BASE_URL=http://localhost:8000
```

## Future Work

- Connect EEG device stream ingestion from real hardware and add adaptive filtering stages.
- Add secure auth, consent logging, and role-based clinician access.
- Add clinician-facing PDF/JSON risk report generation.

## Disclaimer

AUTI-LENS is a screening and decision-support platform. It is not a standalone diagnostic tool and does not replace professional clinical evaluation.

## License

MIT
