import React from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Brain, Camera, FileText, ChevronRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Quiz Based ASD Screening",
      description:
        "Fast-track screening using the clinically validated AQ-10 questionnaire.",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      path: "/quiz",
      color: "bg-blue-50",
    },
    {
      title: "Social Attention Screening",
      description:
        "Webcam-based gaze and facial expression tracking for social engagement analysis.",
      icon: <Camera className="w-8 h-8 text-purple-500" />,
      path: "/social-attention",
      color: "bg-purple-50",
    },
    {
      title: "Natural Home Behavior",
      description:
        "Full-body movement and gesture tracking to detect repetitive patterns and motor coordination.",
      icon: <Activity className="w-8 h-8 text-green-500" />,
      path: "/natural-behavior",
      color: "bg-green-50",
    },
    {
      title: "Neural Signal Analysis",
      description:
        "EEG-based neurophysiological biomarker extraction for enhanced diagnostic precision.",
      icon: <Brain className="w-8 h-8 text-orange-500" />,
      path: "/eeg-analysis",
      color: "bg-orange-50",
    },
  ];

  return (
    <div className="h-full w-full bg-white text-slate-900 p-6 md:p-12 overflow-y-auto relative z-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            AUTI-LENS
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            AI-powered early autism screening and management. Combining video
            analysis, neural signals, and clinical insights.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={() => navigate(tool.path)}
              className={`flex items-start p-8 rounded-3xl transition-all duration-300 hover:shadow-xl border border-slate-100 text-left group ${tool.color}`}
            >
              <div className="p-4 rounded-2xl bg-white shadow-sm mr-6 group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2 flex items-center">
                  {tool.title}
                  <ChevronRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>
                <p className="text-slate-600">{tool.description}</p>
              </div>
            </button>
          ))}
        </div>

        <section className="mt-20 p-8 rounded-3xl bg-slate-900 text-white">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Our Methodology</h2>
              <p className="text-slate-400 text-lg mb-6">
                AUTI-LENS uses a multimodal approach, integrating behavioral
                signals with neural biomarkers to provide a comprehensive risk
                stratification score.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Clinical & Data Foundation
                </li>
                <li className="flex items-center text-slate-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  AI Screening Engine
                </li>
                <li className="flex items-center text-slate-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Clinical Decision Support
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 aspect-square bg-slate-800 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-500 mb-2">95%</div>
                <div className="text-slate-400">Classification Accuracy</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
