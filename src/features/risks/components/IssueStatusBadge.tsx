import { Badge } from "@/components/ui/badge";
import { formatStatusLabel } from "@/lib/format";
import { issueStatusTone } from "../lib/statusTone";
import type { IssueStatus } from "../types";

export function IssueStatusBadge({ status }: { status: IssueStatus }) {
  return (
    <Badge tone={issueStatusTone(status)}>{formatStatusLabel(status)}</Badge>
  );
}
