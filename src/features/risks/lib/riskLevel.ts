import type { RiskLevel } from "../types";

/**
 * Mirrors `_score` and `get_risk_level` in apps/risks/services.py and
 * apps/risks/serializers.py exactly — probability × impact, banded on
 * a standard 5×5 matrix. Used for the live preview in the risk form
 * before the backend has computed and returned the real value.
 */
export function computeRiskScore(probability: number, impact: number): number {
  return probability * impact;
}

export function deriveRiskLevel(score: number): RiskLevel {
  if (score >= 15) return "CRITICAL";
  if (score >= 8) return "HIGH";
  if (score >= 4) return "MEDIUM";
  return "LOW";
}
