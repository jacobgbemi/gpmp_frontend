import {
  formatCurrency,
  formatDate,
  formatPercent,
  toNumber,
} from "@/lib/format";
import type { ProjectDashboard } from "../types";
import { overrunPercent } from "./health";

export interface DashboardSummary {
  financial: string;
  schedule: string;
  progress: string;
  payments: string;
}

/**
 * Plain-language status lines for the "Executive status" panel.
 *
 * The backend returns numbers only (no narrative), so these sentences
 * are built deterministically from those numbers — every figure in
 * them is a backend value. Nothing here is inferred or generated.
 */
export function summarizeDashboard(
  dashboard: ProjectDashboard,
  currency: string,
): DashboardSummary {
  const approved = toNumber(dashboard.approved_budget);
  const forecast = toNumber(dashboard.forecast_final_cost);
  const costVariance = toNumber(dashboard.cost_variance);
  const hasProgress = dashboard.as_of_reporting_date !== null;
  const asOf = formatDate(dashboard.as_of_reporting_date);
  const scheduleVariance = toNumber(dashboard.schedule_variance);

  let financial: string;
  if (approved === 0 && forecast === 0) {
    financial = "No budget has been recorded for this project yet.";
  } else if (costVariance < 0) {
    financial =
      `Forecast final cost of ${formatCurrency(forecast, currency)} is ` +
      `${formatCurrency(Math.abs(costVariance), currency)} ` +
      `(${overrunPercent(dashboard).toFixed(1)}%) over the approved budget.`;
  } else if (costVariance > 0) {
    financial =
      `Forecast final cost of ${formatCurrency(forecast, currency)} is ` +
      `${formatCurrency(costVariance, currency)} within the approved budget.`;
  } else {
    financial = "Forecast final cost is equal to the approved budget.";
  }

  let schedule: string;
  if (!hasProgress) {
    schedule = "No progress has been reported yet.";
  } else if (scheduleVariance < 0) {
    schedule = `Actual progress is ${Math.abs(scheduleVariance).toFixed(1)} percentage points behind plan as at ${asOf}.`;
  } else if (scheduleVariance > 0) {
    schedule = `Actual progress is ${scheduleVariance.toFixed(1)} percentage points ahead of plan as at ${asOf}.`;
  } else {
    schedule = `Actual progress is on plan as at ${asOf}.`;
  }

  const progress = hasProgress
    ? `Physical progress is ${formatPercent(dashboard.actual_progress_percent, 1)} against ${formatPercent(dashboard.planned_progress_percent, 1)} planned.`
    : "No physical progress has been recorded yet.";

  const count = dashboard.pending_payments_count;
  const payments =
    count === 0
      ? "No payment applications are awaiting approval."
      : `${count} payment application${count === 1 ? "" : "s"} totalling ${formatCurrency(dashboard.pending_payments_total, currency)} ${count === 1 ? "is" : "are"} awaiting review or approval.`;

  return { financial, schedule, progress, payments };
}
