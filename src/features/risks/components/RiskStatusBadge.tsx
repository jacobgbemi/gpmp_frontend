import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { riskStatusTone } from "../lib/statusTone";
import type { RiskStatus } from "../types";

export function RiskStatusBadge({ status }: { status: RiskStatus }) {
  return (
    <Badge tone={riskStatusTone(status)}>{formatStatusLabel(status)}</Badge>
  );
}
