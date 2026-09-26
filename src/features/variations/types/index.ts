/**
 * Variation domain types — a 1:1 mirror of apps/variations/serializers.py.
 *
 * IMPORTANT BUSINESS RULE (see backend apps/variations/models.py docstring
 * and README "approved variation rule"): only a variation whose status has
 * reached APPROVED, IMPLEMENTED or CLOSED ever counts as approved cost.
 * PROPOSED, UNDER_REVIEW and REJECTED variations are visible but must never
 * be summed into "approved" totals — see lib/exposure.ts, the one place
 * this rule is applied on the frontend.
 */

export type VariationCategory =
  | "SCOPE_CHANGE"
  | "DESIGN_CHANGE"
  | "SITE_CONDITION"
  | "CLIENT_REQUEST"
  | "REGULATORY"
  | "MATERIAL_SUBSTITUTION"
  | "ERROR_OMISSION"
  | "OTHER";

export type VariationStatus =
  | "PROPOSED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "IMPLEMENTED"
  | "CLOSED";

/**
 * GET /api/projects/{id}/variations/ (each row), GET /api/variations/{id}/
 *
 * `estimated_amount` and `approved_amount` are null until estimated /
 * approved respectively — null is "not yet decided", distinct from 0.
 */
export interface Variation {
  id: string;
  variation_number: string;
  title: string;
  description: string;
  reason: string;
  category: VariationCategory;
  requested_amount: string;
  estimated_amount: string | null;
  approved_amount: string | null;
  status: VariationStatus;
  requested_date: string;
  approved_date: string | null;
  notes: string;
  created_by_email: string;
  approved_by_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface VariationListParams {
  status?: VariationStatus | "";
  category?: VariationCategory | "";
  page?: number;
  page_size?: number;
}

/** POST /api/projects/{id}/variations/ — status is always forced to PROPOSED server-side. */
export interface CreateVariationInput {
  variation_number: string;
  title: string;
  description?: string;
  reason?: string;
  category: VariationCategory;
  requested_amount: string;
  estimated_amount?: string;
  requested_date?: string;
  notes?: string;
}

/** PATCH /api/variations/{id}/ — any transition except reaching APPROVED. */
export interface UpdateVariationStatusInput {
  status: VariationStatus;
}

/** POST /api/variations/{id}/approve/ — the only path to APPROVED. */
export interface ApproveVariationInput {
  approved_amount: string;
  notes?: string;
}
