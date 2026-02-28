import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

const questions = [
  "Does your child look at you when you call his/her name?",
  "How easy is it for you to get eye contact with your child?",
  "Does your child point to indicate that s/he wants something? (e.g. a toy that is out of reach)",
  "Does your child point to share interest with you? (e.g. pointing at an interesting sight)",
  "Does your child pretend? (e.g. care for dolls, talk on a toy phone)",
  "Does your child follow where you're looking?",
  "If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them? (e.g. stroking their hair, hugging them)",
  "Would you describe your child’s first words as: (Typical/Delayed)",
  "Does your child use simple gestures? (e.g. wave bye-bye)",
  "Does your child stare at nothing with no apparent purpose?",
];

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const finalScore = answers.reduce(
      (acc, curr) => acc + (curr === "yes" ? 1 : 0),
      0,
    );
    setScore(finalScore);
    setSubmitted(true);
  };

  if (submitted) {
    const isHighRisk = score >= 6;
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
          {isHighRisk ? (
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          ) : (
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          )}
          <h2 className="text-3xl font-bold mb-2">Screening Result</h2>
          <div className="text-5xl font-bold mb-4 text-slate-900">
            {score}/10
          </div>
          <p className="text-slate-600 mb-8 text-lg">
            {isHighRisk
              ? "Elevated Risk detected. We recommend a full clinical evaluation by a specialist."
              : "Low Risk detected. Your child's responses are within the typical developmental range."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            AQ-10 Screening
          </h1>
          <p className="text-lg text-slate-600">
            Please answer the following questions about your child's behavior.
            This tool is for screening purposes and does not replace a clinical
            diagnosis.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-100 bg-slate-50"
            >
              <p className="text-lg font-medium text-slate-900 mb-4">
                {idx + 1}. {q}
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleAnswer(idx, "yes")}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    answers[idx] === "yes"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  Yes / Easy
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer(idx, "no")}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    answers[idx] === "no"
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  No / Difficult
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl mb-12"
          >
            Submit Screening
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
