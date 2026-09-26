import { toNumber } from "@/lib/format";
import type { PaymentApplication, PaymentTotals } from "../types";

/**
 * Sums each of the four payment amounts independently across the
 * given payment applications. Deliberately never nets them into a
 * single figure — Requested, Recommended, Approved and Paid are
 * different stages of the lifecycle.
 *
 * `amount_recommended` / `amount_approved` are null until a payment
 * reaches that stage; null counts as 0 in the sum (nothing has been
 * recommended/approved yet).
 *
 * The "pending" figure is NOT computed here: the dashboard endpoint
 * returns it (`pending_payments_total`) and is the source of truth.
 */
export function computePaymentTotals(
  payments: PaymentApplication[],
): PaymentTotals {
  return payments.reduce<PaymentTotals>(
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
}
