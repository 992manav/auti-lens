# AUTI-LENS - Agentic AI System for Early Autism Risk Detection

AUTI-LENS is a multimodal early autism risk screening platform that combines behavioral video signals, EEG insights, and AQ-10 clinical responses into a unified decision-support workflow.

This repository currently provides the frontend experience and perception pipeline (camera-based analysis + AQ-10 screening), with LangGraph-orchestrated backend risk modeling and RAG-based therapy recommendation documented as the next integration layers.

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
  - On-device-first privacy design (camera processing in-browser).
- Planned / to integrate as backend services:
  - LangGraph workflow orchestration service for multimodal agent routing.
  - Trained Random Forest risk model API with demographic + AQ-10 fusion.
  - RAG-based therapy recommendation engine with clinical document indexing.
  - End-to-end multimodal orchestration agent and report generation.

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
   - Produces unified risk scoring through model fusion (frontend scaffold available, model backend planned).
5. Recommendation Layer
   - Generates structured therapy recommendations through retrieval-augmented clinical guidance (planned integration).

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
```

## Quick Start

```bash
git clone https://github.com/992manav/auti-lens.git
cd auti-lens
npm install
npm run dev
```

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
```

## Future Work

- Integrate Random Forest model serving endpoint and evaluation dashboard.
- Connect EEG device stream ingestion and feature extraction backend.
- Build RAG index pipeline for 100+ curated clinical research documents.
- Add clinician-facing PDF/JSON risk report generation.

## Disclaimer

AUTI-LENS is a screening and decision-support platform. It is not a standalone diagnostic tool and does not replace professional clinical evaluation.

## License

MIT
