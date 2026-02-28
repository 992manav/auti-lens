import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Particles from "./components/Particles";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import SocialAttention from "./components/SocialAttention";
import NaturalBehavior from "./components/NaturalBehavior";
import EEGAnalysis from "./components/EEGAnalysis";

/**
 * Main App component with routing
 * Renders different screening modes for AUTI-LENS
 */
const App = () => {
  const basename = import.meta.env.VITE_APP_BASE_PATH || "/";
  
  console.log("App loaded, basename:", basename);

  return (
    <Router basename={basename}>
      <div className="App h-screen w-full overflow-hidden">
        {/* Animated particle background - persistent across some routes or can be conditional */}
        <Particles />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/social-attention" element={<SocialAttention />} />
          <Route path="/natural-behavior" element={<NaturalBehavior />} />
          <Route path="/eeg-analysis" element={<EEGAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
