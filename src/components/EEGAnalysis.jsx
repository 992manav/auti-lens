import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Cpu, Zap } from "lucide-react";

const EEGAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 overflow-y-auto text-slate-900">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <Brain className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold">EEG Neural Signal Analysis</h1>
          </div>
          <p className="text-lg text-slate-600">
            Advanced neurophysiological biomarker extraction using bandpass
            filtering, ICA, and wavelet denoising for high-precision ASD risk
            stratification.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-orange-400" />
              Processing Pipeline
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-orange-400">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Acquisition</h4>
                  <p className="text-sm text-slate-400">
                    Multi-sensor brain activity capture
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-orange-400">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Denoising</h4>
                  <p className="text-sm text-slate-400">
                    Bandpass + ICA + Wavelet cleaning
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-orange-400">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Classification</h4>
                  <p className="text-sm text-slate-400">
                    Spectral & nonlinear pattern matching
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center text-slate-900">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Signal Status
              </h3>
              <p className="text-slate-600 mb-6 italic">
                Connect your EEG device to begin real-time neural biomarker
                extraction.
              </p>
            </div>
            <button className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg">
              Connect Device
            </button>
          </div>
        </div>

        <section className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
          <h4 className="font-bold text-orange-900 mb-2">
            Multimodal Fusion Note
          </h4>
          <p className="text-orange-800 text-sm">
            EEG data is fused with behavioral streams (Social Attention &
            Natural Behavior) to create a high-confidence "Unified Risk
            Probability" score.
          </p>
        </section>
      </div>
    </div>
  );
};

export default EEGAnalysis;
