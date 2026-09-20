import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatVariance, varianceTone } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProjectDashboard } from "../../types";

const TONE_TEXT: Record<"positive" | "negative" | "neutral", string> = {
  positive: "text-primary-dark",
  negative: "text-destructive",
  neutral: "text-foreground",
};

export function FinancialSummary({
  dashboard,
}: {
  dashboard: ProjectDashboard;
}) {
  const currency = dashboard.project.currency;
  const rows: { label: string; value: string; emphasis?: boolean }[] = [
    {
      label: "Original Budget",
      value: formatCurrency(dashboard.original_budget, currency),
    },
    {
      label: "Approved Budget",
      value: formatCurrency(dashboard.approved_budget, currency),
    },
    {
      label: "Actual Spend",
      value: formatCurrency(dashboard.actual_spend, currency),
    },
    {
      label: "Committed Cost",
      value: formatCurrency(dashboard.committed_cost, currency),
    },
    {
      label: "Forecast Final Cost",
      value: formatCurrency(dashboard.forecast_final_cost, currency),
      emphasis: true,
    },
  ];

  const costTone = varianceTone(dashboard.cost_variance, "negative");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span
              className={cn(
                "font-medium",
                row.emphasis && "text-base text-foreground",
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">Cost Variance</span>
          <span className={cn("font-semibold", TONE_TEXT[costTone])}>
            {formatVariance(dashboard.cost_variance)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}