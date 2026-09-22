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
        }}
        pendingTotal="30000000.00"
        pendingCount={2}
      />,
    );

    expect(screen.getByText("Amount Requested")).toBeInTheDocument();
    expect(screen.getByText("Amount Recommended")).toBeInTheDocument();
    expect(screen.getByText("Amount Approved")).toBeInTheDocument();
    expect(screen.getByText("Amount Paid")).toBeInTheDocument();
    expect(screen.getByText(/Pending/)).toBeInTheDocument();

    // Five distinct amounts, not collapsed into a single total.
    expect(screen.getByText(/100,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/90,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/80,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/50,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/30,000,000/)).toBeInTheDocument();
  });

  it("always uses the dashboard endpoint's pending total, not a client-derived one", () => {
    render(
      <PaymentSummary
        currency="NGN"
        totals={{
          amount_requested: 0,
          amount_recommended: 0,
          amount_approved: 0,
          amount_paid: 0,
        }}
        pendingTotal="45000000.00"
        pendingCount={1}
      />,
    );

    expect(screen.getByText(/45,000,000/)).toBeInTheDocument();
  });

  it("shows a partial-data note when the loaded applications don't cover the full total", () => {
    render(
      <PaymentSummary
        currency="NGN"
        totals={{
          amount_requested: 0,
          amount_recommended: 0,
          amount_approved: 0,
          amount_paid: 0,
        }}
        pendingTotal="0.00"
        pendingCount={0}
        isPartial
      />,
    );

    expect(
      screen.getByText(/most recent applications only/i),
    ).toBeInTheDocument();
  });
});
