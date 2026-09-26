import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { IssueSeverityBadge } from "./IssueSeverityBadge";
import { IssueStatusBadge } from "./IssueStatusBadge";
import type { Issue } from "../types";

export function IssueCard({
  issue,
  onSelect,
}: {
  issue: Issue;
  onSelect: (issue: Issue) => void;
}) {
  return (
    <Card
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(issue)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(issue)}
    >
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-foreground">{issue.title}</p>
          <IssueSeverityBadge severity={issue.severity} />
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">{issue.owner_email}</span>
          <IssueStatusBadge status={issue.status} />
        </div>
        {issue.target_date && (
          <p className="text-xs text-muted-foreground">
            Target {formatDate(issue.target_date)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
