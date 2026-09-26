import { toNumber } from "@/lib/format";
import type { ProjectDashboard, ProjectHealth } from "../types";

/**
 * The backend does not return a "health" value, so the owner-facing
 * health signal is derived here — in ONE place — from the two numbers
 * the backend does provide: cost_variance and schedule_variance.
 *
 *   CRITICAL  forecast is more than 10% over the approved budget,
 *             OR progress is 20+ points behind plan
 *   AT_RISK   forecast is over the approved budget at all,
 *             OR progress is 5+ points behind plan
 *   ON_TRACK  otherwise
 *   NO_DATA   no budget and no progress reported yet
 *
 * Change the thresholds here and nowhere else.
 */
export const HEALTH_THRESHOLDS = {
  criticalOverrunPercent: 10,
  criticalScheduleBehind: 20,
  atRiskScheduleBehind: 5,
} as const;

/** Forecast overrun as a % of approved budget (0 when not over budget). */
export function overrunPercent(dashboard: ProjectDashboard): number {
  const overrun = Math.max(-toNumber(dashboard.cost_variance), 0);
  if (overrun === 0) return 0;
  const approved = toNumber(dashboard.approved_budget);
  // Cost forecast with no approved budget at all is the worst case.
  return approved > 0 ? (overrun / approved) * 100 : 100;
}

export function deriveProjectHealth(
  dashboard: ProjectDashboard,
): ProjectHealth {
  const hasProgress = dashboard.as_of_reporting_date !== null;
  const hasBudget =
    toNumber(dashboard.approved_budget) > 0 ||
    toNumber(dashboard.forecast_final_cost) > 0;

  if (!hasProgress && !hasBudget) return "NO_DATA";

  const overrun = overrunPercent(dashboard);
  const scheduleVariance = hasProgress
    ? toNumber(dashboard.schedule_variance)
    : 0;

  if (
    overrun > HEALTH_THRESHOLDS.criticalOverrunPercent ||
    scheduleVariance <= -HEALTH_THRESHOLDS.criticalScheduleBehind
  ) {
    return "CRITICAL";
  }
  if (
    overrun > 0 ||
    scheduleVariance <= -HEALTH_THRESHOLDS.atRiskScheduleBehind
  ) {
    return "AT_RISK";
  }
  return "ON_TRACK";
}
