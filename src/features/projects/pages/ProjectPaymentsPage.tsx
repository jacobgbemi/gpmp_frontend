import { useState } from "react";
import { useParams } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { Pagination } from "@/components/common/Pagination";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyOrDash, formatDate } from "@/lib/format";
import { useProject } from "../api/useProject";
import { useProjectPayments } from "../api/useProjectPayments";
import { PaymentStatusBadge } from "../components/PaymentStatusBadge";

const PAGE_SIZE = 10;

/**
 * Payment applications for this project. Requested / Recommended /
 * Approved / Paid are always shown as separate columns, never netted.
 * Recommended/Approved render "—" (via formatCurrencyOrDash) until
 * they are actually null on the backend, since null means "not yet
 * decided", not zero.
 */
export function ProjectPaymentsPage() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);

  const { data: project } = useProject(id);
  const { data, error, isPending, isError, refetch } = useProjectPayments(id, {
    page,
    page_size: PAGE_SIZE,
  });

  const currency = project?.currency ?? "NGN";

  if (isPending) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (isError || !data) {
    return (
      <QueryErrorState
        error={error}
        what="this project's payment applications"
        onRetry={() => refetch()}
      />
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
        <CreditCard
          className="h-8 w-8 text-muted-foreground"
          aria-hidden="true"
        />
        <h2 className="text-base font-semibold text-foreground">
          No payment applications yet
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Contractor payment applications for this project will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application</TableHead>
            <TableHead>Requested</TableHead>
            <TableHead>Recommended</TableHead>
            <TableHead>Approved</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium text-foreground">
                {payment.application_number}
              </TableCell>
              <TableCell>
                {formatCurrencyOrDash(payment.amount_requested, currency)}
              </TableCell>
              <TableCell>
                {formatCurrencyOrDash(payment.amount_recommended, currency)}
              </TableCell>
              <TableCell>
                {formatCurrencyOrDash(payment.amount_approved, currency)}
              </TableCell>
              <TableCell>
                {formatCurrencyOrDash(payment.amount_paid, currency)}
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={payment.status} />
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDate(payment.submission_date)}
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
  );
}
