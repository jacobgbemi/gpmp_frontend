import { Select } from "@/components/ui/select";
import { RISK_CATEGORY_OPTIONS } from "../schemas/riskSchema";
import type { RiskCategory, RiskStatus } from "../types";

const STATUS_OPTIONS: { value: RiskStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "OPEN", label: "Open" },
  { value: "MITIGATING", label: "Mitigating" },
  { value: "MONITORING", label: "Monitoring" },
  { value: "CLOSED", label: "Closed" },
];

interface RiskFiltersProps {
  status: RiskStatus | "";
  onStatusChange: (value: RiskStatus | "") => void;
  category: RiskCategory | "";
  onCategoryChange: (value: RiskCategory | "") => void;
}

export function RiskFilters({
  status,
  onStatusChange,
  category,
  onCategoryChange,
}: RiskFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as RiskStatus | "")}
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
        onChange={(e) => onCategoryChange(e.target.value as RiskCategory | "")}
        aria-label="Filter by category"
        className="sm:w-56"
      >
        <option value="">All categories</option>
        {RISK_CATEGORY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
