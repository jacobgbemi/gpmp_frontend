import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { issueSeverityTone } from "../lib/statusTone";
import type { IssueSeverity } from "../types";

export function IssueSeverityBadge({ severity }: { severity: IssueSeverity }) {
  return (
    <Badge tone={issueSeverityTone(severity)}>
      {formatStatusLabel(severity)}
    </Badge>
  );
}
