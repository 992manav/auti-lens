# � AUTI-LENS - AI-Powered Autism Screening Platform

An intelligent, multi-modal early autism spectrum disorder (ASD) screening and management platform built with React 19, Vite 7, and MediaPipe. Combines video analysis, behavioral assessment, and EEG biomarkers for comprehensive diagnostic support.

## 🚀 Features

- **📋 Quiz-Based Screening**: Fast-track assessment using the clinically validated AQ-10 questionnaire
- **👁️ Social Attention Analysis**: Webcam-based gaze and facial expression tracking for social engagement evaluation
- **🎬 Natural Behavior Monitoring**: Full-body movement and gesture tracking to detect repetitive patterns and motor coordination issues
- **🧬 EEG Signal Analysis**: Neural biomarker extraction for enhanced diagnostic precision
- **⚡️ Real-time Processing**: Smooth 30fps detection using MediaPipe ML models
- **📱 Responsive Design**: Works seamlessly on mobile and desktop devices
- **🔒 Privacy First**: All processing happens locally in the browser - no data transmission
- **🎨 Intuitive UI**: Modern interface with smooth animations and clear visual feedback
- **🌐 Multi-Modal Approach**: Integrates behavioral signals with neural biomarkers for comprehensive risk stratification

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Home.jsx                # Landing page with screening options
│   ├── Quiz.jsx                # AQ-10 questionnaire screening
│   ├── SocialAttention.jsx      # Gaze and facial expression analysis
│   ├── NaturalBehavior.jsx      # Full-body pose and gesture tracking
│   ├── EEGAnalysis.jsx          # Neural signal biomarker extraction
│   ├── ErrorBoundary.jsx        # Error handling wrapper
│   ├── Particles.jsx            # Animated background effects
│   ├── PoseDetector/            # Pose detection and visualization
│   │   ├── PoseDetector.jsx     # Video feed and skeleton overlay
│   │   ├── DetectorControls.jsx # Camera and control buttons
│   │   ├── StatusIndicator.jsx  # Detection status display
│   │   ├── EmotionIndicator.jsx # Facial expression display
│   │   └── FaceMesh.jsx         # Face landmark visualization
│   └── icons/                   # SVG icon components
├── hooks/
│   ├── usePoseDetection.js      # MediaPipe pose integration
│   └── useFaceExpression.js     # MediaPipe facial expression analysis
├── constants/
│   ├── camera.js                # Camera configuration
│   ├── pose.js                  # Pose detection settings
│   └── face.js                  # Face detection settings
├── utils/
│   ├── poseHelpers.js           # Camera and device utilities
│   └── frameBuster.js           # Security utility (clickjacking prevention)
├── App.jsx                      # Root component with routing
├── main.jsx                     # Application entry point
└── main.css                     # Global styles and themes
```

## 🛠️ Tech Stack

- **Core**: React 19, Vite 7
- **AI/ML**: @mediapipe/tasks-vision (PoseLandmarker, FaceLandmarker)
- **Styling**: Tailwind CSS 4, DaisyUI 5
- **Tools**: Biome (lint & format)

## 📦 Quick Start

```bash
# Clone the repository

cd mediapipe-pose-estimation

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Use

### Home Screen

1. Select one of four screening modalities from the main dashboard

### Quiz-Based Screening (AQ-10)

1. Answer 10 clinically-validated questions about autism spectrum traits
2. Receive instant risk assessment based on your responses
3. Results are displayed with interpretation guidance

### Social Attention Screening

1. Position your face in front of the webcam
2. The system analyzes gaze patterns and facial expressions in real-time
3. Social engagement metrics are tracked and visualized
4. Complete the assessment to receive a social attention score

### Natural Home Behavior Analysis

1. Stand in full view of the camera
2. Perform natural movements and gestures
3. The system detects 33 body landmarks in real-time
4. Analyzes motor coordination and identifies repetitive patterns
5. Skeleton visualization overlays on your video feed
6. Results highlight areas of concern and normal behaviors

### EEG Signal Analysis

1. Simulated EEG data processing (real hardware integration available)
2. Extracts neurophysiological biomarkers
3. Provides neural signal interpretation for diagnostic support

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Base path for deployment (use "/" for root or "/subdirectory/" for subfolders)
VITE_APP_BASE_PATH=/mediapipe-pose-estimation/
```

### Camera Settings

Adjust camera resolution in [src/constants/camera.js](src/constants/camera.js):

```javascript
export const MOBILE_CAMERA_SETTINGS = {
  height: { ideal: 720 },
  width: { ideal: 1280 },
};
```

### Pose Detection Settings

Customize detection parameters in [src/constants/pose.js](src/constants/pose.js):

```javascript
export const POSE_CONFIG = {
  numPoses: 1,
  minPoseDetectionConfidence: 0.5,
  minPosePresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
};
```

### Visualization Styles

Modify skeleton appearance in [src/constants/pose.js](src/constants/pose.js):

```javascript
export const DRAWING_STYLES = {
  landmarkColor: "#5dd4c0",
  landmarkRadius: 5,
  connectionColor: "#8de67c",
  connectionWidth: 3,
};
```

## 🌐 Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

Requires:

- WebGL support
- WebAssembly support
- getUserMedia API (camera access)

## 📋 Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start development server on port 8080 |
| `npm run build`   | Build for production                  |
| `npm run preview` | Preview production build              |
| `npm run lint`    | Run Biome linter                      |
| `npm run format`  | Format code with Biome                |
| `npm run check`   | Run all Biome checks                  |

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Base path for deployment (use "/" for root)
VITE_APP_BASE_PATH=/
```

## 🙏 Attribution

- [MediaPipe](https://ai.google.dev/edge/mediapipe) - ML solutions by Google
- [Lucide React](https://lucide.dev/) - Open source icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React Router](https://reactrouter.com/) - Client-side routing

## 📚 Clinical References

AUTI-LENS supports assessment using:

- **AQ-10 Questionnaire**: Clinically validated autism spectrum quotient screening tool
- **Behavioral Analysis**: Movement patterns and motor coordination assessment
- **Facial Expression Analysis**: Social engagement indicators through facial landmark tracking
- **Multimodal Integration**: Combines multiple data sources for enhanced diagnostic accuracy

## 📜 License

MIT License - feel free to use this project for personal or educational purposes.

---

Built with ❤️ for early autism spectrum disorder detection and support
