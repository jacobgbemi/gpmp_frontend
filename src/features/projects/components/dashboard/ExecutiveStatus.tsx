import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStatusLabel } from "@/lib/format";
import type { DashboardSummary } from "../../lib/dashboardSummary";
import { projectHealthTone } from "../../lib/statusTone";
import type { ProjectHealth } from "../../types";

const ROWS: { key: keyof DashboardSummary; label: string }[] = [
  { key: "financial", label: "Financial status" },
  { key: "schedule", label: "Schedule status" },
  { key: "progress", label: "Progress status" },
  { key: "payments", label: "Payment status" },
];

/**
 * Plain-language status lines built from the dashboard endpoint's
 * numbers (see lib/dashboardSummary.ts). The backend returns no
 * narrative, and nothing here is AI-generated or inferred.
 */
export function ExecutiveStatus({
  summary,
  health,
}: {
  summary: DashboardSummary;
  health: ProjectHealth;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Executive status</CardTitle>
        <Badge tone={projectHealthTone(health)}>
          {formatStatusLabel(health)}
        </Badge>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-3">
          {ROWS.map((row) => (
            <div key={row.key}>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {row.label}
              </dt>
              <dd className="text-sm text-foreground">{summary[row.key]}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
