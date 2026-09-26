import { useState } from "react";
import { useParams } from "react-router-dom";
import { GitBranch } from "lucide-react";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Pagination } from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/features/projects/api/useProject";
import {
  canApproveVariation,
  canWriteProject,
  useProjectRole,
} from "@/features/projects/hooks/useProjectRole";
import { useVariations } from "../api/useVariations";
import { CreateVariationDialog } from "../components/CreateVariationDialog";
import { VariationCard } from "../components/VariationCard";
import { VariationDetailDialog } from "../components/VariationDetailDialog";
import { VariationFilters } from "../components/VariationFilters";
import { VariationsTable } from "../components/VariationsTable";
import { VariationSummary } from "../components/VariationSummary";
import { computeVariationExposure } from "../lib/exposure";
import type { Variation, VariationCategory, VariationStatus } from "../types";

const PAGE_SIZE = 10;

export function VariationsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useProject(id);
  const role = useProjectRole(project);

  const [status, setStatus] = useState<VariationStatus | "">("");
  const [category, setCategory] = useState<VariationCategory | "">("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Variation | null>(null);

  const { data, error, isPending, isError, isFetching, refetch } =
    useVariations(id, { status, category, page, page_size: PAGE_SIZE });

  // A larger, unfiltered fetch just for the exposure summary, so the
  // three headline numbers don't shift as the table below is filtered.
  const { data: allData } = useVariations(id, { page_size: 200 });
  const exposure = computeVariationExposure(allData?.results ?? []);

  const currency = project?.currency ?? "NGN";
  const canWrite = canWriteProject(role);
  const canApprove = canApproveVariation(role);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Variations</h2>
          <p className="text-sm text-muted-foreground">
            Proposed, reviewed and approved cost changes to this project.
          </p>
        </div>
        {id && canWrite && <CreateVariationDialog projectId={id} />}
      </div>

      <VariationSummary exposure={exposure} currency={currency} />

      <VariationFilters
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
          what="this project's variations"
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && data && data.results.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <GitBranch
            className="h-8 w-8 text-muted-foreground"
            aria-hidden="true"
          />
          <h3 className="text-base font-semibold text-foreground">
            {status || category
              ? "No matching variations"
              : "No variations yet"}
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            {status || category
              ? "Try adjusting your filters."
              : "Proposed variations for this project will appear here."}
          </p>
        </div>
      )}

      {!isPending && !isError && data && data.results.length > 0 && (
        <div
          className={isFetching ? "opacity-60 transition-opacity" : undefined}
        >
          <div className="hidden lg:block">
            <VariationsTable
              variations={data.results}
              currency={currency}
              onSelect={setSelected}
            />
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              count={data.count}
              onPageChange={setPage}
            />
          </div>

          <div className="flex flex-col gap-3 lg:hidden">
            {data.results.map((variation) => (
              <VariationCard
                key={variation.id}
                variation={variation}
                currency={currency}
                onSelect={setSelected}
              />
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
        <VariationDetailDialog
          variation={selected}
          onOpenChange={(open) => !open && setSelected(null)}
          projectId={id}
          currency={currency}
          canApprove={canApprove}
          canTransition={canWrite}
        />
      )}
    </div>
  );
}
