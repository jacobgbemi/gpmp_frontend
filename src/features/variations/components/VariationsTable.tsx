import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatCurrencyOrDash,
  formatDate,
  formatStatusLabel,
} from "@/lib/format";
import { VariationStatusBadge } from "./VariationStatusBadge";
import type { Variation } from "../types";

interface VariationsTableProps {
  variations: Variation[];
  currency: string;
  onSelect: (variation: Variation) => void;
}

/**
 * Desktop variation list. Requested / Estimated / Approved are always
 * three separate columns — see stage-3.md: "Clearly distinguish
 * Requested, Estimated, Approved." Hidden below `lg`; VariationCard
 * takes over on smaller screens.
 */
export function VariationsTable({
  variations,
  currency,
  onSelect,
}: VariationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Variation</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Requested</TableHead>
          <TableHead>Estimated</TableHead>
          <TableHead>Approved</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {variations.map((variation) => (
          <TableRow
            key={variation.id}
            className="cursor-pointer"
            onClick={() => onSelect(variation)}
          >
            <TableCell>
              <p className="font-medium text-foreground">
                {variation.variation_number} — {variation.title}
              </p>
              {variation.reason && (
                <p className="max-w-xs truncate text-xs text-muted-foreground">
                  {variation.reason}
                </p>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatStatusLabel(variation.category)}
            </TableCell>
            <TableCell>
              {formatCurrencyOrDash(variation.requested_amount, currency)}
            </TableCell>
            <TableCell>
              {formatCurrencyOrDash(variation.estimated_amount, currency)}
            </TableCell>
            <TableCell className="font-medium text-foreground">
              {formatCurrencyOrDash(variation.approved_amount, currency)}
            </TableCell>
            <TableCell>
              <VariationStatusBadge status={variation.status} />
            </TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(variation.requested_date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
