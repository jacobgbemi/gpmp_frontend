import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { PaymentTotals } from "../../types";

interface PaymentSummaryProps {
  totals: PaymentTotals;
  currency: string;
  /** `pending_payments_total` from the dashboard endpoint (source of truth). */
  pendingTotal: string;
  /** `pending_payments_count` from the dashboard endpoint. */
  pendingCount: number;
  /**
   * True when more payment applications exist than were loaded, so the
   * four sums below cover only part of the list.
   */
  isPartial?: boolean;
}

/**
 * Requested / Recommended / Approved / Paid / Pending — always shown
 * as five distinct figures, never collapsed into one.
 */
export function PaymentSummary({
  totals,
  currency,
  pendingTotal,
  pendingCount,
  isPartial = false,
}: PaymentSummaryProps) {
  const rows = [
    { label: "Amount Requested", value: totals.amount_requested },
    { label: "Amount Recommended", value: totals.amount_recommended },
    { label: "Amount Approved", value: totals.amount_approved },
    { label: "Amount Paid", value: totals.amount_paid },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium text-foreground">
              {formatCurrency(row.value, currency)}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="font-medium text-muted-foreground">
            Pending{" "}
            <span className="text-xs font-normal">
              ({pendingCount} awaiting approval)
            </span>
          </span>
          <span className="font-semibold text-primary">
            {formatCurrency(pendingTotal, currency)}
          </span>
        </div>
        {isPartial && (
          <p className="text-xs text-muted-foreground">
            Totals cover the most recent applications only. Open the Payments
            tab for the full list.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
