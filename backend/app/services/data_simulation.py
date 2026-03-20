from __future__ import annotations

from dataclasses import dataclass
from typing import Tuple

import numpy as np


@dataclass
class SimulatedDataset:
    X: np.ndarray
    y: np.ndarray
    feature_names: list[str]


def _normalize(values: np.ndarray) -> np.ndarray:
    return (values - values.min()) / (values.max() - values.min() + 1e-8)


def generate_assessment_dataset(n_samples: int = 650, seed: int = 42) -> SimulatedDataset:
    rng = np.random.default_rng(seed)

    aq10 = rng.integers(0, 2, size=(n_samples, 10))
    age_months = rng.integers(24, 120, size=(n_samples, 1))
    sex_binary = rng.integers(0, 2, size=(n_samples, 1))

    gaze_score = _normalize(rng.normal(0.55 - aq10[:, [0]] * 0.2, 0.15).clip(0, 1))
    movement_symmetry = _normalize(rng.normal(0.6 - aq10[:, [3]] * 0.2, 0.16).clip(0, 1))
    repetitive_index = _normalize(rng.normal(0.35 + aq10[:, [9]] * 0.25, 0.14).clip(0, 1))
    expression_variability = _normalize(rng.normal(0.52 - aq10[:, [1]] * 0.18, 0.15).clip(0, 1))

    eeg_theta_beta = _normalize(rng.normal(1.9 + aq10[:, [6]] * 0.45, 0.35))
    eeg_connectivity = _normalize(rng.normal(0.58 - aq10[:, [4]] * 0.12, 0.1).clip(0, 1))

    X = np.hstack(
        [
            aq10,
            age_months,
            sex_binary,
            gaze_score,
            movement_symmetry,
            repetitive_index,
            expression_variability,
            eeg_theta_beta,
            eeg_connectivity,
        ]
    )

    latent = (
        aq10 @ np.array([0.19, 0.15, 0.12, 0.13, 0.11, 0.08, 0.1, 0.06, 0.03, 0.2])
        + (age_months[:, 0] > 42).astype(float) * 0.05
        + sex_binary[:, 0] * 0.04
        + (1.0 - gaze_score[:, 0]) * 0.2
        + (1.0 - movement_symmetry[:, 0]) * 0.14
        + repetitive_index[:, 0] * 0.2
        + eeg_theta_beta[:, 0] * 0.13
        + (1.0 - eeg_connectivity[:, 0]) * 0.07
        + rng.normal(0, 0.22, n_samples)
    )

    threshold = np.quantile(latent, 0.58)
    y = (latent > threshold).astype(int)

    feature_names = [
        *[f"aq10_q{i + 1}" for i in range(10)],
        "age_months",
        "sex_binary",
        "gaze_score",
        "movement_symmetry",
        "repetitive_motion_index",
        "expression_variability",
        "eeg_theta_beta",
        "eeg_connectivity",
    ]

    return SimulatedDataset(X=X.astype(float), y=y.astype(int), feature_names=feature_names)
