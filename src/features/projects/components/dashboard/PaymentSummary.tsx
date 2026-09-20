import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { PaymentTotals } from "../../types";

interface PaymentSummaryProps {
  totals: PaymentTotals;
  currency: string;
  /** Authoritative pending figure from the dashboard endpoint, if available. */
  pendingOverride?: string;
}

/**
 * Requested / Recommended / Approved / Paid / Pending — always shown
 * as five distinct figures. See stage-2.md: "Never collapse these
 * four payment values into one."
 */
export function PaymentSummary({
  totals,
  currency,
  pendingOverride,
}: PaymentSummaryProps) {
  const rows = [
    { label: "Amount Requested", value: totals.amount_requested },
    { label: "Amount Recommended", value: totals.amount_recommended },
    { label: "Amount Approved", value: totals.amount_approved },
    { label: "Amount Paid", value: totals.amount_paid },
  ];

  const pending =
    pendingOverride !== undefined ? pendingOverride : totals.pending_amount;

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
          <span className="font-medium text-muted-foreground">Pending</span>
          <span className="font-semibold text-primary">
            {formatCurrency(pending, currency)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}