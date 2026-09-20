// ProjectHealthBadge.tsx
import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { projectHealthTone } from "../lib/statusTone";

export function ProjectHealthBadge({
  health,
}: {
  health: string | null | undefined;
}) {
  if (!health) return <span className="text-sm text-muted-foreground">—</span>;
  return (
    <Badge tone={projectHealthTone(health)}>{formatStatusLabel(health)}</Badge>
  );
}