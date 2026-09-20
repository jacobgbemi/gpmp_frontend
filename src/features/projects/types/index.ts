/**
 * Project domain types.
 *
 * Field names are taken directly from the backend's Stage 2 data
 * model spec (Project, ProgressUpdate, PaymentApplication). Money and
 * percentage fields are typed as `string` because DRF's
 * `DecimalField` serializes as a string by default — always pass
 * them through `lib/format.ts` rather than doing arithmetic on the
 * raw value.
 *
 * A few fields the dashboard/list UI needs (physical/planned
 * progress on the project list row, an executive-status narrative on
 * the dashboard) are not part of the backend's minimal Stage 2 field
 * list and are marked optional here. The UI degrades gracefully
 * ("—") when they're absent — adjust these to match the real
 * serializer once Stage 2 backend endpoints exist.
 */

export type ProjectStatus =
  "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";

export type PaymentStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "RECOMMENDED"
  | "APPROVED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "REJECTED";

export interface Project {
  id: string;
  organization: string;
  name: string;
  project_code: string;
  description: string;
  location: string;
  client_name: string;
  contractor_name: string;
  project_type: string;
  contract_value: string;
  currency: string;
  planned_start_date: string | null;
  planned_end_date: string | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  /** Latest ProgressUpdate rollup — optional until the list serializer adds it. */
  physical_progress?: string;
  planned_progress?: string;
  /** Optional computed health indicator distinct from `status`. */
  health?: string;
  last_update?: string | null;
}

export interface ProjectListParams {
  search?: string;
  status?: ProjectStatus | "";
  page?: number;
  page_size?: number;
}

/**
 * GET /api/projects/{id}/dashboard/
 *
 * Top-level fields match the backend's Stage 2 dashboard spec
 * verbatim. `executive_status` and `reporting_date` are additive —
 * the UI shows a calm fallback if they're not present yet.
 */
export interface ProjectDashboard {
  project: {
    id: string;
    name: string;
    project_code: string;
    location: string;
    status: ProjectStatus;
    contract_value: string;
    currency: string;
  };
  original_budget: string;
  approved_budget: string;
  actual_spend: string;
  committed_cost: string;
  forecast_final_cost: string;
  cost_variance: string;
  planned_progress: string;
  actual_progress: string;
  schedule_variance: string;
  pending_payments: string;
  reporting_date?: string;
  executive_status?: {
    financial_status?: string;
    schedule_status?: string;
    progress_status?: string;
    payment_status?: string;
  };
}

export interface ProgressUpdate {
  id: string;
  reporting_date: string;
  planned_progress: string;
  actual_progress: string;
  notes: string;
  submitted_by?: string;
  created_at: string;
}

export interface PaymentApplication {
  id: string;
  project: string;
  reference?: string;
  amount_requested: string;
  amount_recommended: string;
  amount_approved: string;
  amount_paid: string;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

/**
 * Client-computed payment totals for the dashboard's payment
 * summary, derived from the real payment application records rather
 * than a separate backend aggregate — see
 * `features/projects/lib/paymentTotals.ts`.
 */
export interface PaymentTotals {
  amount_requested: number;
  amount_recommended: number;
  amount_approved: number;
  amount_paid: number;
  pending_amount: number;
}