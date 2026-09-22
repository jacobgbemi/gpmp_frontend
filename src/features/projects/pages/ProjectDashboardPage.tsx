import { useParams } from "react-router-dom";
import { PageSkeleton } from "@/components/common/PageSkeleton";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "../api/useProject";
import { useProjectDashboard } from "../api/useProjectDashboard";
import { useProjectPayments } from "../api/useProjectPayments";
import { BudgetChart } from "../components/dashboard/BudgetChart";
import { ExecutiveStatus } from "../components/dashboard/ExecutiveStatus";
import { FinancialSummary } from "../components/dashboard/FinancialSummary";
import { KpiGrid } from "../components/dashboard/KpiGrid";
import { PaymentSummary } from "../components/dashboard/PaymentSummary";
import { ProgressSection } from "../components/dashboard/ProgressSection";
import { ProjectHeader } from "../components/dashboard/ProjectHeader";
import { summarizeDashboard } from "../lib/dashboardSummary";
import { deriveProjectHealth } from "../lib/health";
import { computePaymentTotals } from "../lib/paymentTotals";

// The backend caps page_size at 100 (common/pagination.py).
const PAYMENT_SUMMARY_PAGE_SIZE = 100;

/**
 * The most important screen in the product: "an owner should
 * understand the health of a high-value project within 30 seconds."
 *
 * The dashboard endpoint returns numbers only, so the project itself
 * (name, currency, contract value...) comes from `useProject`.
 */
export function ProjectDashboardPage() {
  const { id } = useParams<{ id: string }>();

  const projectQuery = useProject(id);
  const dashboardQuery = useProjectDashboard(id);
  const paymentsQuery = useProjectPayments(id, {
    page_size: PAYMENT_SUMMARY_PAGE_SIZE,
  });

  if (dashboardQuery.isPending || projectQuery.isPending) {
    return <PageSkeleton />;
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return (
      <QueryErrorState
        error={dashboardQuery.error}
        what="this project's dashboard"
        onRetry={() => dashboardQuery.refetch()}
      />
    );
  }

  if (projectQuery.isError || !projectQuery.data) {
    return (
      <QueryErrorState
        error={projectQuery.error}
        what="this project"
        onRetry={() => projectQuery.refetch()}
      />
    );
  }

  const project = projectQuery.data;
  const dashboard = dashboardQuery.data;
  const currency = project.currency;

  const payments = paymentsQuery.data;
  const totals = computePaymentTotals(payments?.results ?? []);
  const health = deriveProjectHealth(dashboard);
  const summary = summarizeDashboard(dashboard, currency);

  return (
    <div className="flex flex-col gap-6">
      <ProjectHeader project={project} dashboard={dashboard} />
      <KpiGrid dashboard={dashboard} currency={currency} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FinancialSummary dashboard={dashboard} currency={currency} />
        <BudgetChart dashboard={dashboard} currency={currency} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProgressSection dashboard={dashboard} />
        {paymentsQuery.isError ? (
          <QueryErrorState
            error={paymentsQuery.error}
            what="the payment summary"
            onRetry={() => paymentsQuery.refetch()}
          />
        ) : payments ? (
          <PaymentSummary
            totals={totals}
            currency={currency}
            pendingTotal={dashboard.pending_payments_total}
            pendingCount={dashboard.pending_payments_count}
            isPartial={payments.count > payments.results.length}
          />
        ) : (
          <Skeleton className="h-64 w-full" />
        )}
      </div>

      <ExecutiveStatus summary={summary} health={health} />
    </div>
  );
}
