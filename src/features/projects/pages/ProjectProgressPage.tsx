import { useState } from "react";
import { useParams } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Pagination } from "@/components/common/Pagination";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPercent, formatVariance } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useProjectProgress } from "../api/useProjectProgress";

const PAGE_SIZE = 10;

const TONE_TEXT: Record<"positive" | "negative" | "neutral", string> = {
  positive: "text-primary-dark",
  negative: "text-destructive",
  neutral: "text-foreground",
};

/** actual - planned > 0 is ahead of schedule (favorable). */
function varianceToneOf(variance: number): "positive" | "negative" | "neutral" {
  if (variance === 0) return "neutral";
  return variance > 0 ? "positive" : "negative";
}

export function ProjectProgressPage() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError, refetch } = useProjectProgress(id, {
    page,
    page_size: PAGE_SIZE,
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <QueryErrorState
        error={error}
        what="this project's progress history"
        onRetry={() => refetch()}
      />
    );
  }

  const latest = data.results[0];

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
        <TrendingUp
          className="h-8 w-8 text-muted-foreground"
          aria-hidden="true"
        />
        <h2 className="text-base font-semibold text-foreground">
          No progress updates yet
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Reported progress for this project will appear here once submitted.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {latest && (
        <Card>
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Latest update · {formatDate(latest.reporting_date)} ·{" "}
                {latest.submitted_by_email}
              </p>
              <p className="mt-1 text-sm text-foreground">
                {latest.notes || "No narrative provided."}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm sm:gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Planned</p>
                <p className="font-semibold text-foreground">
                  {formatPercent(latest.planned_progress_percent, 1)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Actual</p>
                <p className="font-semibold text-foreground">
                  {formatPercent(latest.actual_progress_percent, 1)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Variance</p>
                <p
                  className={cn(
                    "font-semibold",
                    TONE_TEXT[varianceToneOf(latest.progress_variance_percent)],
                  )}
                >
                  {formatVariance(latest.progress_variance_percent, 1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Progress history
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reporting date</TableHead>
              <TableHead>Planned</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Variance</TableHead>
              <TableHead>Submitted by</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((update) => (
              <TableRow key={update.id}>
                <TableCell className="whitespace-nowrap">
                  {formatDate(update.reporting_date)}
                </TableCell>
                <TableCell>
                  {formatPercent(update.planned_progress_percent, 1)}
                </TableCell>
                <TableCell>
                  {formatPercent(update.actual_progress_percent, 1)}
                </TableCell>
                <TableCell
                  className={
                    TONE_TEXT[varianceToneOf(update.progress_variance_percent)]
                  }
                >
                  {formatVariance(update.progress_variance_percent, 1)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {update.submitted_by_email}
                </TableCell>
                <TableCell
                  className="max-w-xs truncate text-muted-foreground"
                  title={update.notes}
                >
                  {update.notes || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          count={data.count}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
