// ProjectStatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { projectStatusTone } from "../lib/statusTone";
import type { ProjectStatus } from "../types";

export function ProjectStatusBadge({
  status,
}: {
  status: ProjectStatus | string;
}) {
  return (
    <Badge tone={projectStatusTone(status)}>{formatStatusLabel(status)}</Badge>
  );
}
