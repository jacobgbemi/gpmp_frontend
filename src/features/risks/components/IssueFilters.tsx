import { Select } from "@/components/ui/select";
import { ISSUE_SEVERITY_OPTIONS } from "../schemas/issueSchema";
import type { IssueSeverity, IssueStatus } from "../types";

const STATUS_OPTIONS: { value: IssueStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

interface IssueFiltersProps {
  status: IssueStatus | "";
  onStatusChange: (value: IssueStatus | "") => void;
  severity: IssueSeverity | "";
  onSeverityChange: (value: IssueSeverity | "") => void;
}

export function IssueFilters({
  status,
  onStatusChange,
  severity,
  onSeverityChange,
}: IssueFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as IssueStatus | "")}
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
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value as IssueSeverity | "")}
        aria-label="Filter by severity"
        className="sm:w-48"
      >
        <option value="">All severities</option>
        {ISSUE_SEVERITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
