import type { Tone } from "@/features/projects/lib/statusTone";
import type { VariationStatus } from "../types";

/**
 * Deliberately restrained — the design brief for Stage 3 explicitly
 * warns against making this "look like an alarm panel". Only
 * REJECTED reads as negative; everything else is a calm, informative
 * tone even for pending states.
 */
export function variationStatusTone(status: VariationStatus): Tone {
  switch (status) {
    case "APPROVED":
    case "IMPLEMENTED":
      return "positive";
    case "CLOSED":
      return "neutral";
    case "REJECTED":
      return "negative";
    case "UNDER_REVIEW":
      return "warning";
    case "PROPOSED":
    default:
      return "info";
  }
}
