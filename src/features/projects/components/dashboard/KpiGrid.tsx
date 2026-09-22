import {
  formatCurrencyCompact,
  formatPercent,
  formatSignedCurrency,
  formatStatusLabel,
  formatVariance,
  varianceTone,
} from "@/lib/format";
import { deriveProjectHealth } from "../../lib/health";
import { projectHealthTone } from "../../lib/statusTone";
import type { ProjectDashboard } from "../../types";
import { KpiCard } from "./KpiCard";

interface KpiGridProps {
  dashboard: ProjectDashboard;
  currency: string;
}

/**
 * The six executive KPIs. Project status is shown in the header above
 * this grid, so on small screens it is effectively first in reading
 * order (stage-2 mobile priority).
 */
export function KpiGrid({ dashboard, currency }: KpiGridProps) {
  const health = deriveProjectHealth(dashboard);
  const pendingCount = dashboard.pending_payments_count;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
      <KpiCard
        label="Budget"
        value={formatCurrencyCompact(dashboard.approved_budget, currency)}
        hint="Approved budget"
      />
      <KpiCard
        label="Forecast Final Cost"
        value={formatCurrencyCompact(dashboard.forecast_final_cost, currency)}
        // cost_variance = approved budget - forecast: positive is
        // under budget (good), negative is over budget (bad).
        tone={varianceTone(dashboard.cost_variance, "positive")}
        hint={`${formatSignedCurrency(dashboard.cost_variance, currency)} vs budget`}
      />
      <KpiCard
        label="Physical Progress"
        value={formatPercent(dashboard.actual_progress_percent, 1)}
        hint={`${formatPercent(dashboard.planned_progress_percent, 1)} planned`}
      />
      <KpiCard
        label="Schedule Variance"
        value={formatVariance(dashboard.schedule_variance, 1)}
        tone={varianceTone(dashboard.schedule_variance, "positive")}
        hint="Actual vs planned progress"
      />
      <KpiCard
        label="Pending Payments"
        value={formatCurrencyCompact(
          dashboard.pending_payments_total,
          currency,
        )}
        hint={`${pendingCount} application${pendingCount === 1 ? "" : "s"}`}
      />
      <KpiCard
        label="Project Health"
        value={formatStatusLabel(health)}
        tone={projectHealthTone(health)}
      />
    </div>
  );
}
