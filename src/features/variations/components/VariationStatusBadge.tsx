import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { variationStatusTone } from "../lib/statusTone";
import type { VariationStatus } from "../types";

export function VariationStatusBadge({ status }: { status: VariationStatus }) {
  return (
    <Badge tone={variationStatusTone(status)}>
      {formatStatusLabel(status)}
    </Badge>
  );
}
