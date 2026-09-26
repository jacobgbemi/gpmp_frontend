import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Pagination } from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/features/projects/api/useProject";
import {
  canWriteProject,
  useProjectRole,
} from "@/features/projects/hooks/useProjectRole";
import { useRisks } from "../api/useRisks";
import { CreateRiskDialog } from "../components/CreateRiskDialog";
import { RiskCard } from "../components/RiskCard";
import { RiskDetailDialog } from "../components/RiskDetailDialog";
import { RiskFilters } from "../components/RiskFilters";
import { RiskMatrix } from "../components/RiskMatrix";
import { RisksTable } from "../components/RisksTable";
import type { Risk, RiskCategory, RiskStatus } from "../types";

const PAGE_SIZE = 10;

export function RisksPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useProject(id);
  const role = useProjectRole(project);
  const canWrite = canWriteProject(role);

  const [status, setStatus] = useState<RiskStatus | "">("");
  const [category, setCategory] = useState<RiskCategory | "">("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Risk | null>(null);

  const { data, error, isPending, isError, isFetching, refetch } = useRisks(
    id,
    { status, category, page, page_size: PAGE_SIZE },
  );

  // Unfiltered set for the matrix, so it always reflects the whole
  // project regardless of the table's current filters.
  const { data: allData } = useRisks(id, { page_size: 200 });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Risks</h2>
          <p className="text-sm text-muted-foreground">
            Potential problems being tracked and mitigated on this project.
          </p>
        </div>
        {id && canWrite && (
          <CreateRiskDialog
            projectId={id}
            organizationId={project?.organization}
          />
        )}
      </div>

      <RiskMatrix risks={allData?.results ?? []} />

      <RiskFilters
        status={status}
        onStatusChange={(v) => {
          setStatus(v);
          setPage(1);
        }}
        category={category}
        onCategoryChange={(v) => {
          setCategory(v);
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
          what="this project's risks"
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && data && data.results.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <AlertTriangle
            className="h-8 w-8 text-muted-foreground"
            aria-hidden="true"
          />
          <h3 className="text-base font-semibold text-foreground">
            {status || category ? "No matching risks" : "No risks logged yet"}
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            {status || category
              ? "Try adjusting your filters."
              : "Risks logged for this project will appear here."}
          </p>
        </div>
      )}

      {!isPending && !isError && data && data.results.length > 0 && (
        <div
          className={isFetching ? "opacity-60 transition-opacity" : undefined}
        >
          <div className="hidden lg:block">
            <RisksTable risks={data.results} onSelect={setSelected} />
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              count={data.count}
              onPageChange={setPage}
            />
          </div>
          <div className="flex flex-col gap-3 lg:hidden">
            {data.results.map((risk) => (
              <RiskCard key={risk.id} risk={risk} onSelect={setSelected} />
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
        <RiskDetailDialog
          risk={selected}
          onOpenChange={(open) => !open && setSelected(null)}
          projectId={id}
          canTransition={canWrite}
        />
      )}
    </div>
  );
}
