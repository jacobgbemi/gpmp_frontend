import { z } from "zod";
import type { RiskCategory, RiskResponse } from "../types";

export const RISK_CATEGORY_OPTIONS = [
  { value: "COST", label: "Cost" },
  { value: "SCHEDULE", label: "Schedule" },
  { value: "QUALITY", label: "Quality" },
  { value: "PROCUREMENT", label: "Procurement" },
  { value: "CONTRACTOR", label: "Contractor" },
  { value: "DESIGN", label: "Design" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "REGULATORY", label: "Regulatory" },
  { value: "SAFETY", label: "Safety" },
  { value: "OTHER", label: "Other" },
] as const satisfies { value: RiskCategory; label: string }[];

export const RISK_RESPONSE_OPTIONS = [
  { value: "AVOID", label: "Avoid" },
  { value: "MITIGATE", label: "Mitigate" },
  { value: "TRANSFER", label: "Transfer" },
  { value: "ACCEPT", label: "Accept" },
] as const satisfies { value: RiskResponse; label: string }[];

const CATEGORY_VALUES = RISK_CATEGORY_OPTIONS.map((o) => o.value) as [
  RiskCategory,
  ...RiskCategory[],
];
const RESPONSE_VALUES = RISK_RESPONSE_OPTIONS.map((o) => o.value) as [
  RiskResponse,
  ...RiskResponse[],
];

// Kept as a validated string (not z.coerce.number()) so the form's
// TypeScript type matches what <input type="number"> actually gives
// react-hook-form; converted to a real number only when submitting.
const scoreField = z
  .string()
  .min(1, "Required")
  .refine(
    (v) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= 1 && n <= 5;
    },
    { message: "Must be a whole number between 1 and 5" },
  );

export const createRiskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(CATEGORY_VALUES),
  probability: scoreField,
  impact: scoreField,
  response: z.enum(RESPONSE_VALUES),
  mitigation: z.string().optional(),
  contingency: z.string().optional(),
  owner: z.string().min(1, "An owner is required"),
  target_date: z.string().optional(),
});

export type CreateRiskFormValues = z.infer<typeof createRiskSchema>;
