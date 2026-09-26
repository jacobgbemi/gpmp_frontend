import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { riskLevelTone } from "../lib/statusTone";
import type { RiskLevel } from "../types";

export function RiskLevelBadge({ level }: { level: RiskLevel }) {
  return <Badge tone={riskLevelTone(level)}>{formatStatusLabel(level)}</Badge>;
}
