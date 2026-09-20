import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentSummary } from "./PaymentSummary";

describe("PaymentSummary", () => {
  it("renders requested, recommended, approved, paid and pending as five distinct figures", () => {
    render(
      <PaymentSummary
        currency="NGN"
        totals={{
          amount_requested: 100_000_000,
          amount_recommended: 90_000_000,
          amount_approved: 80_000_000,
          amount_paid: 50_000_000,
          pending_amount: 30_000_000,
        }}
      />,
    );

    expect(screen.getByText("Amount Requested")).toBeInTheDocument();
    expect(screen.getByText("Amount Recommended")).toBeInTheDocument();
    expect(screen.getByText("Amount Approved")).toBeInTheDocument();
    expect(screen.getByText("Amount Paid")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();

    // Five distinct amounts, not collapsed into a single total.
    expect(screen.getByText(/100,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/90,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/80,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/50,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/30,000,000/)).toBeInTheDocument();
  });

  it("prefers an authoritative pending override from the dashboard endpoint when given", () => {
    render(
      <PaymentSummary
        currency="NGN"
        totals={{
          amount_requested: 0,
          amount_recommended: 0,
          amount_approved: 0,
          amount_paid: 0,
          pending_amount: 30_000_000,
        }}
        pendingOverride="45000000"
      />,
    );

    expect(screen.getByText(/45,000,000/)).toBeInTheDocument();
  });
});