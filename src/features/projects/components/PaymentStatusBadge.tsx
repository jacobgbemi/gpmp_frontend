// PaymentStatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { paymentStatusTone } from "../lib/statusTone";
import type { PaymentStatus } from "../types";

export function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus | string;
}) {
  return (
    <Badge tone={paymentStatusTone(status)}>{formatStatusLabel(status)}</Badge>
  );
}
