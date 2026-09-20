import { MapPin } from "lucide-react";
import { formatCurrencyCompact, formatDate } from "@/lib/format";
import { ProjectStatusBadge } from "../ProjectStatusBadge";
import type { ProjectDashboard } from "../../types";

export function ProjectHeader({ dashboard }: { dashboard: ProjectDashboard }) {
  const { project } = dashboard;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            {project.name}
          </h2>
          <ProjectStatusBadge status={project.status} />
        </div>
        <p className="text-sm text-muted-foreground">{project.project_code}</p>
        {project.location && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {project.location}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:items-end">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Contract value
        </p>
        <p className="text-xl font-semibold text-primary">
          {formatCurrencyCompact(project.contract_value, project.currency)}
        </p>
        {dashboard.reporting_date && (
          <p className="text-xs text-muted-foreground">
            As of {formatDate(dashboard.reporting_date)}
          </p>
        )}
      </div>
    </div>
  );
}