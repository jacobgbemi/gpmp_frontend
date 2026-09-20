import type { PaymentStatus, ProjectStatus } from "../types";

export type Tone = "neutral" | "positive" | "warning" | "negative" | "info";

/**
 * Visual tone for a project status badge. Falls back to `neutral`
 * for any value not in this list, so an unrecognized backend status
 * still renders (just without color emphasis) instead of breaking.
 */
export function projectStatusTone(status: ProjectStatus | string): Tone {
  switch (status) {
    case "ACTIVE":
      return "positive";
    case "PLANNING":
      return "info";
    case "ON_HOLD":
      return "warning";
    case "CANCELLED":
      return "negative";
    case "COMPLETED":
      return "neutral";
    default:
      return "neutral";
  }
}

/**
 * Tone for a free-form project health indicator. Backend health
 * values aren't fixed yet, so this matches on common keywords rather
 * than an exact enum, and defaults to neutral for anything else.
 */
export function projectHealthTone(health: string | null | undefined): Tone {
  if (!health) return "neutral";
  const value = health.toLowerCase();
  if (value.includes("critical") || value.includes("severe")) return "negative";
  if (
    value.includes("attention") ||
    value.includes("at_risk") ||
    value.includes("at risk")
  )
    return "warning";
  if (
    value.includes("track") ||
    value.includes("good") ||
    value.includes("healthy")
  )
    return "positive";
  return "neutral";
}

export function paymentStatusTone(status: PaymentStatus | string): Tone {
  switch (status) {
    case "PAID":
      return "positive";
    case "APPROVED":
    case "RECOMMENDED":
    case "PARTIALLY_PAID":
      return "info";
    case "UNDER_REVIEW":
    case "SUBMITTED":
      return "warning";
    case "REJECTED":
      return "negative";
    case "DRAFT":
    default:
      return "neutral";
  }
}