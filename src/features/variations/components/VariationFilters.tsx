import { Select } from "@/components/ui/select";
import { VARIATION_CATEGORY_OPTIONS } from "../schemas/variationSchema";
import type { VariationCategory, VariationStatus } from "../types";

const STATUS_OPTIONS: { value: VariationStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "PROPOSED", label: "Proposed" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "IMPLEMENTED", label: "Implemented" },
  { value: "CLOSED", label: "Closed" },
];

interface VariationFiltersProps {
  status: VariationStatus | "";
  onStatusChange: (value: VariationStatus | "") => void;
  category: VariationCategory | "";
  onCategoryChange: (value: VariationCategory | "") => void;
}

export function VariationFilters({
  status,
  onStatusChange,
  category,
  onCategoryChange,
}: VariationFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as VariationStatus | "")}
        aria-label="Filter by status"
        className="sm:w-48"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <Select
        value={category}
        onChange={(e) =>
          onCategoryChange(e.target.value as VariationCategory | "")
        }
        aria-label="Filter by category"
        className="sm:w-56"
      >
        <option value="">All categories</option>
        {VARIATION_CATEGORY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
