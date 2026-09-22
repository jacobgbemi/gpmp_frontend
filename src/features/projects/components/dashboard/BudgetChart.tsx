import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyCompact, toNumber } from "@/lib/format";
import type { ProjectDashboard } from "../../types";

interface TooltipPayloadItem {
  value: number;
  payload: { label: string };
}

function ChartTooltip({
  active,
  payload,
  currency,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  currency: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-foreground">{payload[0].payload.label}</p>
      <p className="text-muted-foreground">
        {formatCurrencyCompact(payload[0].value, currency)}
      </p>
    </div>
  );
}

/**
 * A single, honest snapshot comparing Approved Budget, Actual Spend
 * and Forecast Final Cost — real values from the dashboard endpoint,
 * not an invented time series.
 */
export function BudgetChart({
  dashboard,
  currency,
}: {
  dashboard: ProjectDashboard;
  currency: string;
}) {
  const data = [
    {
      label: "Budget",
      value: toNumber(dashboard.approved_budget),
      fill: "var(--color-primary)",
    },
    {
      label: "Actual",
      value: toNumber(dashboard.actual_spend),
      fill: "var(--color-accent)",
    },
    {
      label: "Forecast",
      value: toNumber(dashboard.forecast_final_cost),
      fill: "var(--color-primary-dark)",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual vs Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) =>
                  formatCurrencyCompact(value, currency)
                }
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                width={64}
              />
              <Tooltip
                cursor={{ fill: "var(--color-surface)" }}
                content={<ChartTooltip currency={currency} />}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={64}>
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
