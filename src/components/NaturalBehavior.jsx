import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlayCircle, ShieldCheck } from "lucide-react";
import PoseDetector from "./PoseDetector/PoseDetector";

const NaturalBehavior = () => {
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
            <div className="bg-green-600/20 border border-green-500/30 px-4 py-2 rounded-xl backdrop-blur-md">
              <span className="text-green-400 font-semibold">
                Natural Home Behavior Monitoring
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Detector */}
      <div className="flex-1 relative">
        <PoseDetector />
      </div>

      {/* Analysis Sidebar */}
      <div className="absolute right-6 top-24 z-[100] w-72 flex flex-col gap-4">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl text-white">
          <h4 className="font-bold mb-4 flex items-center">
            <PlayCircle className="w-5 h-5 mr-2 text-green-500" />
            Real-time Metrics
          </h4>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">
                Gesture Frequency
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-2/3"></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">
                Movement Symmetry
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-4/5"></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">
                Repetition Index
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-1/4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl text-white">
          <h4 className="font-bold mb-2 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-blue-500" />
            Privacy Active
          </h4>
          <p className="text-xs text-white/50">
            Identity isolation and on-device processing enabled. No facial data
            is stored or transmitted.
          </p>
        </div>
      </div>

      {/* Footer Info Overlay */}
      <div className="absolute bottom-24 left-6 z-[100] max-w-sm">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl text-white/90 shadow-2xl">
          <h4 className="font-bold mb-1">Motor Behavior Scoring</h4>
          <p className="text-sm text-white/60">
            Capturing spontaneous behavior. Focus on joint tracking, hand
            coordination, and symmetry of movement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NaturalBehavior;
