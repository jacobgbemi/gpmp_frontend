import { toNumber } from "@/lib/format";
import type { Variation } from "../types";

const APPROVED_LIKE_STATUSES = new Set<Variation["status"]>([
  "APPROVED",
  "IMPLEMENTED",
  "CLOSED",
]);
const PENDING_STATUSES = new Set<Variation["status"]>([
  "PROPOSED",
  "UNDER_REVIEW",
]);

export interface VariationExposure {
  /** Sum of approved_amount for APPROVED/IMPLEMENTED/CLOSED variations only. */
  approvedTotal: number;
  approvedCount: number;
  /** Sum of requested_amount for PROPOSED/UNDER_REVIEW — potential, not committed, cost. */
  pendingTotal: number;
  pendingCount: number;
  rejectedCount: number;
}

/**
 * THE core Stage 3 business rule, enforced in exactly one place:
 * only APPROVED (or later — IMPLEMENTED/CLOSED) variations ever
 * contribute to "approved" cost exposure. A PROPOSED or UNDER_REVIEW
 * variation's requested_amount is shown separately as *pending*
 * exposure — what the project might cost if approved — and a
 * REJECTED variation contributes to neither total.
 */
export function computeVariationExposure(
  variations: Variation[],
): VariationExposure {
  let approvedTotal = 0;
  let approvedCount = 0;
  let pendingTotal = 0;
  let pendingCount = 0;
  let rejectedCount = 0;

  for (const variation of variations) {
    if (APPROVED_LIKE_STATUSES.has(variation.status)) {
      // approved_amount is only ever set once a variation is approved,
      // so this is never summing a null/undecided figure.
      approvedTotal += toNumber(variation.approved_amount);
      approvedCount += 1;
    } else if (PENDING_STATUSES.has(variation.status)) {
      pendingTotal += toNumber(variation.requested_amount);
      pendingCount += 1;
    } else if (variation.status === "REJECTED") {
      rejectedCount += 1;
    }
  }

  return {
    approvedTotal,
    approvedCount,
    pendingTotal,
    pendingCount,
    rejectedCount,
  };
}
