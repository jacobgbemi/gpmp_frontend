import {
  formatCurrencyCompact,
  formatPercent,
  formatStatusLabel,
  formatVariance,
  varianceTone,
} from "@/lib/format";
import { projectStatusTone } from "../../lib/statusTone";
import type { ProjectDashboard } from "../../types";
import { KpiCard } from "./KpiCard";

interface KpiGridProps {
  dashboard: ProjectDashboard;
}

/**
 * The six executive KPIs. Order matches stage-2's mobile priority
 * (project status is shown in the header above this grid, so it
 * effectively comes first in reading order on small screens).
 */
export function KpiGrid({ dashboard }: KpiGridProps) {
  const currency = dashboard.project.currency;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
      <KpiCard
        label="Budget"
        value={formatCurrencyCompact(dashboard.approved_budget, currency)}
      />
      <KpiCard
        label="Forecast Final Cost"
        value={formatCurrencyCompact(dashboard.forecast_final_cost, currency)}
        tone={varianceTone(dashboard.cost_variance, "negative")}
      />
      <KpiCard
        label="Physical Progress"
        value={formatPercent(dashboard.actual_progress)}
      />
      <KpiCard
        label="Schedule Variance"
        value={formatVariance(dashboard.schedule_variance)}
        tone={varianceTone(dashboard.schedule_variance, "positive")}
        hint="Actual vs planned progress"
      />
      <KpiCard
        label="Pending Payments"
        value={formatCurrencyCompact(dashboard.pending_payments, currency)}
      />
      <KpiCard
        label="Project Health"
        value={formatStatusLabel(dashboard.project.status)}
        tone={projectStatusTone(dashboard.project.status)}
      />
    </div>
  );
}