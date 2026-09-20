import { toNumber } from "@/lib/format";
import type { PaymentApplication, PaymentTotals } from "../types";

/**
 * Sums each of the four payment amounts independently across a
 * project's payment applications. Deliberately never nets these into
 * a single figure — see stage-2.md: "Never collapse these four
 * payment values into one." `pending_amount` is the only derived
 * value here, and it is itself kept separate from the four inputs.
 */
export function computePaymentTotals(
  payments: PaymentApplication[],
): PaymentTotals {
  const totals = payments.reduce(
    (acc, payment) => {
      acc.amount_requested += toNumber(payment.amount_requested);
      acc.amount_recommended += toNumber(payment.amount_recommended);
      acc.amount_approved += toNumber(payment.amount_approved);
      acc.amount_paid += toNumber(payment.amount_paid);
      return acc;
    },
    {
      amount_requested: 0,
      amount_recommended: 0,
      amount_approved: 0,
      amount_paid: 0,
    },
  );

  return {
    ...totals,
    pending_amount: Math.max(totals.amount_approved - totals.amount_paid, 0),
  };
}