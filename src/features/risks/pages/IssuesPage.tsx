import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlertOctagon } from "lucide-react";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Pagination } from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/features/projects/api/useProject";
import {
  canWriteProject,
  useProjectRole,
} from "@/features/projects/hooks/useProjectRole";
import { useIssues } from "../api/useIssues";
import { CreateIssueDialog } from "../components/CreateIssueDialog";
import { IssueCard } from "../components/IssueCard";
import { IssueDetailDialog } from "../components/IssueDetailDialog";
import { IssueFilters } from "../components/IssueFilters";
import { IssuesTable } from "../components/IssuesTable";
import type { Issue, IssueSeverity, IssueStatus } from "../types";

const PAGE_SIZE = 10;

export function IssuesPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useProject(id);
  const role = useProjectRole(project);
  const canWrite = canWriteProject(role);

  const [status, setStatus] = useState<IssueStatus | "">("");
  const [severity, setSeverity] = useState<IssueSeverity | "">("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Issue | null>(null);

  const { data, error, isPending, isError, isFetching, refetch } = useIssues(
    id,
    { status, severity, page, page_size: PAGE_SIZE },
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Issues</h2>
          <p className="text-sm text-muted-foreground">
            Problems that have already happened and need resolving.
          </p>
        </div>
        {id && canWrite && (
          <CreateIssueDialog
            projectId={id}
            organizationId={project?.organization}
          />
        )}
      </div>

      <IssueFilters
        status={status}
        onStatusChange={(v) => {
          setStatus(v);
          setPage(1);
        }}
        severity={severity}
        onSeverityChange={(v) => {
          setSeverity(v);
          setPage(1);
        }}
      />

      {isPending && (
        <div className="flex flex-col gap-3" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <QueryErrorState
          error={error}
          what="this project's issues"
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && data && data.results.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <AlertOctagon
            className="h-8 w-8 text-muted-foreground"
            aria-hidden="true"
          />
          <h3 className="text-base font-semibold text-foreground">
            {status || severity ? "No matching issues" : "No issues logged yet"}
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            {status || severity
              ? "Try adjusting your filters."
              : "Issues logged for this project will appear here."}
          </p>
        </div>
      )}

      {!isPending && !isError && data && data.results.length > 0 && (
        <div
          className={isFetching ? "opacity-60 transition-opacity" : undefined}
        >
          <div className="hidden lg:block">
            <IssuesTable issues={data.results} onSelect={setSelected} />
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              count={data.count}
              onPageChange={setPage}
            />
          </div>
          <div className="flex flex-col gap-3 lg:hidden">
            {data.results.map((issue) => (
              <IssueCard key={issue.id} issue={issue} onSelect={setSelected} />
            ))}
            <div className="rounded-lg border border-border">
              <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                count={data.count}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      )}

      {id && (
        <IssueDetailDialog
          issue={selected}
          onOpenChange={(open) => !open && setSelected(null)}
          projectId={id}
          canTransition={canWrite}
        />
      )}
    </div>
  );
}
