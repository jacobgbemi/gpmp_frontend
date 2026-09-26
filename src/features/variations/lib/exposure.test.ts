import { describe, expect, it } from "vitest";
import { computeVariationExposure } from "./exposure";
import type { Variation } from "../types";

function variation(overrides: Partial<Variation>): Variation {
  return {
    id: "1",
    variation_number: "VO-1",
    title: "Test",
    description: "",
    reason: "",
    category: "OTHER",
    requested_amount: "0",
    estimated_amount: null,
    approved_amount: null,
    status: "PROPOSED",
    requested_date: "2026-01-01",
    approved_date: null,
    notes: "",
    created_by_email: "a@b.com",
    approved_by_email: null,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("computeVariationExposure", () => {
  it("only sums approved_amount for APPROVED/IMPLEMENTED/CLOSED variations", () => {
    const exposure = computeVariationExposure([
      variation({ status: "APPROVED", approved_amount: "1000" }),
      variation({ status: "IMPLEMENTED", approved_amount: "2000" }),
      variation({ status: "CLOSED", approved_amount: "500" }),
    ]);

    expect(exposure.approvedTotal).toBe(3500);
    expect(exposure.approvedCount).toBe(3);
  });

  it("never counts a PROPOSED or UNDER_REVIEW variation as approved cost", () => {
    const exposure = computeVariationExposure([
      variation({
        status: "PROPOSED",
        requested_amount: "9999",
        approved_amount: null,
      }),
      variation({
        status: "UNDER_REVIEW",
        requested_amount: "5000",
        approved_amount: null,
      }),
    ]);

    expect(exposure.approvedTotal).toBe(0);
    expect(exposure.approvedCount).toBe(0);
    expect(exposure.pendingTotal).toBe(14999);
    expect(exposure.pendingCount).toBe(2);
  });

  it("counts a REJECTED variation toward neither total", () => {
    const exposure = computeVariationExposure([
      variation({ status: "REJECTED", requested_amount: "3000" }),
    ]);

    expect(exposure.approvedTotal).toBe(0);
    expect(exposure.pendingTotal).toBe(0);
    expect(exposure.rejectedCount).toBe(1);
  });

  it("sums pending exposure from requested_amount, not estimated_amount", () => {
    const exposure = computeVariationExposure([
      variation({
        status: "PROPOSED",
        requested_amount: "1000",
        estimated_amount: "1500",
      }),
    ]);

    expect(exposure.pendingTotal).toBe(1000);
  });
});
