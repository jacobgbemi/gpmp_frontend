import type { VariationStatus } from "../types";

/**
 * Mirrors VARIATION_STATUS_TRANSITIONS in apps/variations/models.py.
 * Used only to decide which "move to…" actions to show — the backend
 * is the sole authority and re-validates every transition on write.
 *
 * Reaching APPROVED is deliberately absent here: it only ever happens
 * through the dedicated approve action (see ApproveVariationDialog),
 * never through this generic transition list.
 */
export const VARIATION_STATUS_TRANSITIONS: Record<
  VariationStatus,
  VariationStatus[]
> = {
  PROPOSED: ["UNDER_REVIEW", "REJECTED"],
  UNDER_REVIEW: ["REJECTED"],
  APPROVED: ["IMPLEMENTED", "CLOSED"],
  REJECTED: ["CLOSED"],
  IMPLEMENTED: ["CLOSED"],
  CLOSED: [],
};

// Mirrors _APPROVABLE_FROM in apps/variations/services.py.
const APPROVABLE_FROM: VariationStatus[] = ["PROPOSED", "UNDER_REVIEW"];

export function isVariationApprovable(status: VariationStatus): boolean {
  return APPROVABLE_FROM.includes(status);
}

export function nextVariationStatuses(
  status: VariationStatus,
): VariationStatus[] {
  return VARIATION_STATUS_TRANSITIONS[status] ?? [];
}
