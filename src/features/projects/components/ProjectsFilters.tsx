import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ProjectStatus } from "../types";

const STATUS_OPTIONS: { value: ProjectStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "PLANNING", label: "Planning" },
  { value: "ACTIVE", label: "Active" },
  { value: "ON_HOLD", label: "On hold" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

interface ProjectsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: ProjectStatus | "";
  onStatusChange: (value: ProjectStatus | "") => void;
}

export function ProjectsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: ProjectsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or project code…"
          className="pl-9"
          aria-label="Search projects"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as ProjectStatus | "")
        }
        aria-label="Filter by status"
        className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 sm:w-48"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}