import { describe, expect, it } from "vitest";
import { computePaymentTotals } from "./paymentTotals";
import type { PaymentApplication } from "../types";

function payment(overrides: Partial<PaymentApplication>): PaymentApplication {
  return {
    id: "1",
    application_number: "PA-0001",
    amount_requested: "0",
    amount_recommended: null,
    amount_approved: null,
    amount_paid: "0",
    status: "DRAFT",
    submission_date: "2026-01-01",
    review_date: null,
    payment_date: null,
    reviewer_notes: "",
    submitted_by_email: "owner@example.com",
    reviewer_email: null,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("computePaymentTotals", () => {
  it("sums each of the four amounts independently, never collapsing them", () => {
    const totals = computePaymentTotals([
      payment({
        amount_requested: "100",
        amount_recommended: "90",
        amount_approved: "80",
        amount_paid: "50",
      }),
      payment({
        amount_requested: "200",
        amount_recommended: "150",
        amount_approved: "150",
        amount_paid: "100",
      }),
    ]);

    expect(totals.amount_requested).toBe(300);
    expect(totals.amount_recommended).toBe(240);
    expect(totals.amount_approved).toBe(230);
    expect(totals.amount_paid).toBe(150);
  });

  it("treats a null recommended/approved amount as not-yet-decided (0 in the sum)", () => {
    const totals = computePaymentTotals([
      payment({
        amount_requested: "100",
        amount_recommended: null,
        amount_approved: null,
      }),
    ]);
    expect(totals.amount_recommended).toBe(0);
    expect(totals.amount_approved).toBe(0);
  });

  it("returns all zeros for an empty list", () => {
    const totals = computePaymentTotals([]);
    expect(totals).toEqual({
      amount_requested: 0,
      amount_recommended: 0,
      amount_approved: 0,
      amount_paid: 0,
    });
  });
});
