import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatCurrencyCompact,
  formatPercent,
  formatRelativeDate,
} from "@/lib/format";
import { ProjectHealthBadge } from "./ProjectHealthBadge";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import type { Project } from "../types";

/** Mobile/tablet card representation of a project list row. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to={`/projects/${project.id}/dashboard`}
              className="font-medium text-foreground hover:text-primary"
            >
              {project.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {project.project_code}
            </p>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>

        {project.location && (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {project.location}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Contract value</p>
            <p className="font-medium text-foreground">
              {formatCurrencyCompact(project.contract_value, project.currency)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Progress</p>
            <p className="font-medium text-foreground">
              {project.physical_progress !== undefined
                ? formatPercent(project.physical_progress)
                : "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <ProjectHealthBadge health={project.health} />
          <span className="text-xs text-muted-foreground">
            Updated{" "}
            {formatRelativeDate(project.last_update ?? project.updated_at)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}