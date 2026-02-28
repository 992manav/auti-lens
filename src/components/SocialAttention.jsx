import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import PoseDetector from "./PoseDetector/PoseDetector";

const SocialAttention = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative flex flex-col bg-slate-900">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[100] p-4 bg-gradient-to-b from-slate-900/80 to-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-white/80 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Dashboard
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-purple-600/20 border border-purple-500/30 px-4 py-2 rounded-xl backdrop-blur-md">
              <span className="text-purple-400 font-semibold">
                Social Attention Mode
              </span>
            </div>
            <button className="p-2 bg-white/10 rounded-xl text-white/80 hover:text-white backdrop-blur-md">
              <Info className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Detector */}
      <div className="flex-1 relative">
        <PoseDetector />
      </div>

      {/* Footer Info Overlay */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-6">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl text-white/90 shadow-2xl">
          <h4 className="font-bold mb-1">Stimulus-driven Analysis</h4>
          <p className="text-sm text-white/60">
            Ensure the child is facing the camera. The system is tracking gaze
            direction, action-unit biomarkers, and facial expressions in
            real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialAttention;
