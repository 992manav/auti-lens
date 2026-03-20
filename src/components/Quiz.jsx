import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { submitUnifiedAssessment } from "../services/assessmentApi";

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
  const [ageMonths, setAgeMonths] = useState(48);
  const [sex, setSex] = useState("other");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [unifiedReport, setUnifiedReport] = useState(null);

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setApiError("");
    setIsSubmitting(true);

    const finalScore = answers.reduce(
      (acc, curr) => acc + (curr === "yes" ? 1 : 0),
      0,
    );

    try {
      const report = await submitUnifiedAssessment({ answers, ageMonths, sex });
      setUnifiedReport(report);
      setScore(Math.round((report?.risk?.risk_probability ?? 0) * 10));
    } catch (error) {
      setApiError(
        "Backend assessment is currently unavailable. Showing local AQ-10 fallback score.",
      );
      setScore(finalScore);
    } finally {
      setIsSubmitting(false);
    }

    setSubmitted(true);
  };

  if (submitted) {
    const backendRisk = unifiedReport?.risk;
    const riskLevel = backendRisk?.risk_level;
    const isHighRisk = riskLevel ? riskLevel === "high" : score >= 6;
    const percentage = backendRisk
      ? Math.round(backendRisk.risk_probability * 100)
      : Math.round((score / 10) * 100);

    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-3xl p-8 shadow-xl">
          <div className="text-center">
            {isHighRisk ? (
              <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            ) : (
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            )}
            <h2 className="text-3xl font-bold mb-2">Screening Result</h2>
            <div className="text-5xl font-bold mb-4 text-slate-900">
              {percentage}%
            </div>
            {backendRisk ? (
              <p className="text-slate-600 mb-2 text-lg">
                Risk level:{" "}
                <span className="font-semibold uppercase">
                  {backendRisk.risk_level}
                </span>
              </p>
            ) : null}
            <p className="text-slate-600 mb-8 text-lg">
              {isHighRisk
                ? "Elevated Risk detected. We recommend a full clinical evaluation by a specialist."
                : "Low Risk detected. Your child's responses are within the typical developmental range."}
            </p>
            {apiError ? (
              <p className="mb-6 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
                {apiError}
              </p>
            ) : null}
          </div>

          {unifiedReport?.recommendation ? (
            <section className="mb-8 border border-slate-200 rounded-2xl p-6 bg-slate-50">
              <h3 className="text-xl font-bold mb-2">Therapy Recommendation</h3>
              <p className="text-slate-700 mb-4">
                {unifiedReport.recommendation.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Goals</h4>
                  <ul className="space-y-1 text-slate-700">
                    {unifiedReport.recommendation.goals.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Plan</h4>
                  <ul className="space-y-1 text-slate-700">
                    {unifiedReport.recommendation.plan.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Monitoring</h4>
                  <ul className="space-y-1 text-slate-700">
                    {unifiedReport.recommendation.monitoring.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ) : null}

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

        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-2">
              Child Age (Months)
            </span>
            <input
              type="number"
              min={18}
              max={144}
              value={ageMonths}
              onChange={(e) => setAgeMonths(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-2">
              Sex
            </span>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </section>

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
            disabled={isSubmitting}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl mb-12"
          >
            {isSubmitting
              ? "Running Unified Assessment..."
              : "Submit Screening"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
