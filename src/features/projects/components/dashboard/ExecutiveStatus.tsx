import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectDashboard } from "../../types";

const ROWS: {
  key: keyof NonNullable<ProjectDashboard["executive_status"]>;
  label: string;
}[] = [
  { key: "financial_status", label: "Financial status" },
  { key: "schedule_status", label: "Schedule status" },
  { key: "progress_status", label: "Progress status" },
  { key: "payment_status", label: "Payment status" },
];

/**
 * Renders the backend-provided executive narrative verbatim — never
 * generates or infers this copy on the frontend. If the backend
 * hasn't populated a field yet, that line is simply omitted rather
 * than filled with a placeholder sentence.
 */
export function ExecutiveStatus({
  dashboard,
}: {
  dashboard: ProjectDashboard;
}) {
  const status = dashboard.executive_status;
  const availableRows = ROWS.filter((row) => status?.[row.key]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Executive status</CardTitle>
      </CardHeader>
      <CardContent>
        {availableRows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No executive status summary has been published for this reporting
            period yet.
          </p>
        ) : (
          <dl className="flex flex-col gap-3">
            {availableRows.map((row) => (
              <div key={row.key}>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-sm text-foreground">{status?.[row.key]}</dd>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}