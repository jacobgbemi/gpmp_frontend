/**
 * Project domain types — a 1:1 mirror of the Django Stage 2 API
 * (apps/projects/serializers.py). Do not add fields here that the
 * backend does not return.
 *
 * Money (`*_amount`, `contract_value`, budget/cost totals) and the
 * progress percentages are serialized by DRF's DecimalField as
 * STRINGS (e.g. "500000000.00", "64.50"). Always pass them through
 * `lib/format.ts` rather than doing arithmetic on the raw value.
 */

export type ProjectStatus =
  "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";

export type ProjectType =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "INDUSTRIAL"
  | "HOSPITALITY"
  | "ESTATE_DEVELOPMENT"
  | "INFRASTRUCTURE"
  | "RENOVATION"
  | "OTHER";

export type PaymentStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "RECOMMENDED"
  | "APPROVED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "REJECTED";

/** GET /api/projects/ (each row) and GET /api/projects/{id}/ */
export interface Project {
  id: string;
  /** Organization UUID (not nested). */
  organization: string;
  name: string;
  project_code: string;
  description: string;
  location: string;
  client_name: string;
  contractor_name: string;
  project_type: ProjectType;
  contract_value: string;
  currency: string;
  planned_start_date: string | null;
  planned_end_date: string | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
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
 * Exactly what `selectors.project_dashboard` returns. Notes:
 *  - there is NO nested `project` object — load it with `useProject`.
 *  - `cost_variance` is a MONEY amount: approved_budget minus
 *    forecast_final_cost (positive = under budget, negative = over).
 *  - `schedule_variance` is percentage points: actual - planned
 *    progress (positive = ahead, negative = behind).
 *  - progress is taken from the latest ProgressUpdate ("0.00" when
 *    none exists; `as_of_reporting_date` is then null).
 *  - `pending_payments_*` covers SUBMITTED, UNDER_REVIEW and
 *    RECOMMENDED applications (sum of amount_requested).
 */
export interface ProjectDashboard {
  original_budget: string;
  approved_budget: string;
  actual_spend: string;
  committed_cost: string;
  forecast_final_cost: string;
  cost_variance: string;
  planned_progress_percent: string;
  actual_progress_percent: string;
  schedule_variance: string;
  pending_payments_count: number;
  pending_payments_total: string;
  as_of_reporting_date: string | null;
}

/** GET /api/projects/{id}/progress/ (each row) */
export interface ProgressUpdate {
  id: string;
  reporting_date: string;
  planned_progress_percent: string;
  actual_progress_percent: string;
  /** actual - planned. NOTE: a JSON number, unlike the other decimals. */
  progress_variance_percent: number;
  notes: string;
  submitted_by_email: string;
  created_at: string;
}

/**
 * GET /api/projects/{id}/payments/ (each row) and GET /api/payments/{id}/
 *
 * `amount_recommended` / `amount_approved` are null until that stage
 * of the lifecycle has happened — null means "not yet decided", which
 * is different from a decided amount of 0.
 */
export interface PaymentApplication {
  id: string;
  application_number: string;
  amount_requested: string;
  amount_recommended: string | null;
  amount_approved: string | null;
  amount_paid: string;
  status: PaymentStatus;
  submission_date: string;
  review_date: string | null;
  payment_date: string | null;
  reviewer_notes: string;
  submitted_by_email: string;
  reviewer_email: string | null;
  created_at: string;
  updated_at: string;
}

/** Derived, frontend-only health signal — see lib/health.ts. */
export type ProjectHealth = "ON_TRACK" | "AT_RISK" | "CRITICAL" | "NO_DATA";

/**
 * Client-computed sums of the four payment amounts across the
 * payment applications that were loaded — see lib/paymentTotals.ts.
 */
export interface PaymentTotals {
  amount_requested: number;
  amount_recommended: number;
  amount_approved: number;
  amount_paid: number;
}
