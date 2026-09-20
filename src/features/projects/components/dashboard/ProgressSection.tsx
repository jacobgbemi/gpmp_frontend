import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatPercent,
  formatVariance,
  toNumber,
  varianceTone,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProjectDashboard } from "../../types";

interface TooltipPayloadItem {
  value: number;
  payload: { label: string };
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-foreground">{payload[0].payload.label}</p>
      <p className="text-muted-foreground">{formatPercent(payload[0].value)}</p>
    </div>
  );
}

const TONE_TEXT: Record<"positive" | "negative" | "neutral", string> = {
  positive: "text-primary-dark",
  negative: "text-destructive",
  neutral: "text-foreground",
};

/**
 * Planned-vs-actual progress: a simple two-bar snapshot plus the
 * explicit variance, sourced entirely from the dashboard endpoint.
 */
export function ProgressSection({
  dashboard,
}: {
  dashboard: ProjectDashboard;
}) {
  const planned = toNumber(dashboard.planned_progress);
  const actual = toNumber(dashboard.actual_progress);
  const variance = toNumber(dashboard.schedule_variance);
  const tone = varianceTone(dashboard.schedule_variance, "positive");

  const data = [
    { label: "Planned", value: planned },
    { label: "Actual", value: actual },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Planned</p>
            <p className="text-base font-semibold text-foreground">
              {formatPercent(planned)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Actual</p>
            <p className="text-base font-semibold text-foreground">
              {formatPercent(actual)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Variance</p>
            <p className={cn("text-base font-semibold", TONE_TEXT[tone])}>
              {formatVariance(variance)}
            </p>
          </div>
        </div>

        <div className="h-48 w-full">
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
                domain={[0, 100]}
                tickFormatter={(value: number) => `${value}%`}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                width={40}
              />
              <Tooltip
                cursor={{ fill: "var(--color-surface)" }}
                content={<ChartTooltip />}
              />
              <Bar
                dataKey="value"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                maxBarSize={64}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}