import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { IssueSeverityBadge } from "./IssueSeverityBadge";
import { IssueStatusBadge } from "./IssueStatusBadge";
import type { Issue } from "../types";

interface IssuesTableProps {
  issues: Issue[];
  onSelect: (issue: Issue) => void;
}

export function IssuesTable({ issues, onSelect }: IssuesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Target date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow
            key={issue.id}
            className="cursor-pointer"
            onClick={() => onSelect(issue)}
          >
            <TableCell>
              <p className="font-medium text-foreground">{issue.title}</p>
              {issue.description && (
                <p className="max-w-xs truncate text-xs text-muted-foreground">
                  {issue.description}
                </p>
              )}
            </TableCell>
            <TableCell>
              <IssueSeverityBadge severity={issue.severity} />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {issue.owner_email}
            </TableCell>
            <TableCell>
              <IssueStatusBadge status={issue.status} />
            </TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(issue.target_date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
