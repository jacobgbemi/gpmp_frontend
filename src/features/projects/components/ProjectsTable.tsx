import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatCurrencyCompact,
  formatDate,
  formatRelativeDate,
  formatStatusLabel,
} from "@/lib/format";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import type { Project } from "../types";

interface ProjectsTableProps {
  projects: Project[];
}

/**
 * Desktop project list. Hidden below `lg`; ProjectCards take over on
 * smaller screens (see ProjectsPage).
 */
export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Contract value</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Planned end</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <Link
                to={`/projects/${project.id}/dashboard`}
                className="font-medium text-foreground hover:text-primary"
              >
                {project.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {project.project_code}
              </p>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {project.location || "—"}
            </TableCell>
            <TableCell>
              {formatCurrencyCompact(project.contract_value, project.currency)}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatStatusLabel(project.project_type)}
            </TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(project.planned_end_date)}
            </TableCell>
            <TableCell>
              <ProjectStatusBadge status={project.status} />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatRelativeDate(project.updated_at)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
