import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { VariationExposure } from "../lib/exposure";

interface VariationSummaryProps {
  exposure: VariationExposure;
  currency: string;
}

/**
 * Answers, in order: "what has already been approved?" and "what
 * could still cost me more?" — the two questions this module exists
 * to make unambiguous. Pending exposure is visually distinct from
 * approved cost; it is never summed into it.
 */
export function VariationSummary({
  exposure,
  currency,
}: VariationSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Card>
        <CardContent className="flex flex-col gap-1 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Approved cost impact
          </p>
          <p className="text-xl font-semibold text-primary-dark">
            {formatCurrency(exposure.approvedTotal, currency)}
          </p>
          <p className="text-xs text-muted-foreground">
            {exposure.approvedCount} variation
            {exposure.approvedCount === 1 ? "" : "s"} affecting the budget
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-1 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Pending exposure
          </p>
          <p className="text-xl font-semibold text-foreground">
            {formatCurrency(exposure.pendingTotal, currency)}
          </p>
          <p className="text-xs text-muted-foreground">
            {exposure.pendingCount} awaiting a decision — not yet approved cost
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-1 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Rejected
          </p>
          <p className="text-xl font-semibold text-muted-foreground">
            {exposure.rejectedCount}
          </p>
          <p className="text-xs text-muted-foreground">
            Not counted toward cost
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
