const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:8000";

const toFixed3 = (value) => Math.round(value * 1000) / 1000;

const buildPayload = ({ answers, ageMonths, sex }) => {
  const aq10_responses = answers.map((answer) => (answer === "yes" ? 1 : 0));
  const positiveCount = aq10_responses.reduce((sum, value) => sum + value, 0);

  const severity = positiveCount / 10;
  const behavioral_signals = {
    gaze_score: toFixed3(Math.max(0.2, 0.85 - severity * 0.5)),
    expression_variability: toFixed3(Math.max(0.2, 0.8 - severity * 0.45)),
    movement_symmetry: toFixed3(Math.max(0.2, 0.88 - severity * 0.55)),
    repetitive_motion_index: toFixed3(Math.min(0.95, 0.15 + severity * 0.7)),
  };

  const eeg_features = {
    theta_beta_ratio: toFixed3(Math.min(0.95, 0.3 + severity * 0.6)),
    connectivity_score: toFixed3(Math.max(0.15, 0.85 - severity * 0.55)),
  };

  return {
    aq10_responses,
    demographics: {
      age_months: ageMonths,
      sex,
    },
    behavioral_signals,
    eeg_features,
  };
};

export const submitUnifiedAssessment = async ({ answers, ageMonths, sex }) => {
  const payload = buildPayload({ answers, ageMonths, sex });

  const response = await fetch(`${API_BASE_URL}/api/agent/assess`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Assessment API failed (${response.status}): ${errorBody || "Unknown error"}`,
    );
  }

  return response.json();
};
