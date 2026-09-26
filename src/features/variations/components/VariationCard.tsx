import { Card, CardContent } from "@/components/ui/card";
import {
  formatCurrencyOrDash,
  formatDate,
  formatStatusLabel,
} from "@/lib/format";
import { VariationStatusBadge } from "./VariationStatusBadge";
import type { Variation } from "../types";

interface VariationCardProps {
  variation: Variation;
  currency: string;
  onSelect: (variation: Variation) => void;
}

export function VariationCard({
  variation,
  currency,
  onSelect,
}: VariationCardProps) {
  return (
    <Card
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(variation)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(variation);
      }}
    >
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-foreground">
              {variation.variation_number} — {variation.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatStatusLabel(variation.category)}
            </p>
          </div>
          <VariationStatusBadge status={variation.status} />
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Requested</p>
            <p className="font-medium text-foreground">
              {formatCurrencyOrDash(variation.requested_amount, currency)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Estimated</p>
            <p className="font-medium text-foreground">
              {formatCurrencyOrDash(variation.estimated_amount, currency)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Approved</p>
            <p className="font-medium text-foreground">
              {formatCurrencyOrDash(variation.approved_amount, currency)}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {formatDate(variation.requested_date)}
        </p>
      </CardContent>
    </Card>
  );
}
