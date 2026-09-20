import { useParams } from "react-router-dom";
import { ErrorState } from "@/components/common/ErrorState";
import { PageSkeleton } from "@/components/common/PageSkeleton";
import { useProjectDashboard } from "../api/useProjectDashboard";
import { useProjectPayments } from "../api/useProjectPayments";
import { BudgetChart } from "../components/dashboard/BudgetChart";
import { ExecutiveStatus } from "../components/dashboard/ExecutiveStatus";
import { FinancialSummary } from "../components/dashboard/FinancialSummary";
import { KpiGrid } from "../components/dashboard/KpiGrid";
import { PaymentSummary } from "../components/dashboard/PaymentSummary";
import { ProgressSection } from "../components/dashboard/ProgressSection";
import { ProjectHeader } from "../components/dashboard/ProjectHeader";
import { computePaymentTotals } from "../lib/paymentTotals";

/**
 * The most important screen in the product: "an owner should
 * understand the health of a high-value project within 30 seconds."
 */
export function ProjectDashboardPage() {
  const { id } = useParams<{ id: string }>();

  const dashboardQuery = useProjectDashboard(id);
  // A larger page size here keeps the payment summary accurate without
  // a dedicated backend aggregate endpoint — see paymentTotals.ts.
  const paymentsQuery = useProjectPayments(id, { page_size: 100 });

  if (dashboardQuery.isPending) {
    return <PageSkeleton />;
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return (
      <ErrorState
        kind="500"
        description="We couldn't load this project's dashboard. Please try again."
        actionLabel="Retry"
        onAction={() => dashboardQuery.refetch()}
      />
    );
  }

  const dashboard = dashboardQuery.data;
  const totals = computePaymentTotals(paymentsQuery.data?.results ?? []);

  return (
    <div className="flex flex-col gap-6">
      <ProjectHeader dashboard={dashboard} />
      <KpiGrid dashboard={dashboard} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FinancialSummary dashboard={dashboard} />
        <BudgetChart dashboard={dashboard} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProgressSection dashboard={dashboard} />
        <PaymentSummary
          totals={totals}
          currency={dashboard.project.currency}
          pendingOverride={dashboard.pending_payments}
        />
      </div>

      <ExecutiveStatus dashboard={dashboard} />
    </div>
  );
}