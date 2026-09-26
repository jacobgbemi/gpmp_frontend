import { z } from "zod";
import type { VariationCategory } from "../types";

const moneyString = z
  .string()
  .min(1, "Required")
  .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
    message: "Enter a valid, non-negative amount",
  });

export const VARIATION_CATEGORY_OPTIONS = [
  { value: "SCOPE_CHANGE", label: "Scope change" },
  { value: "DESIGN_CHANGE", label: "Design change" },
  { value: "SITE_CONDITION", label: "Site condition" },
  { value: "CLIENT_REQUEST", label: "Client request" },
  { value: "REGULATORY", label: "Regulatory" },
  { value: "MATERIAL_SUBSTITUTION", label: "Material substitution" },
  { value: "ERROR_OMISSION", label: "Error or omission" },
  { value: "OTHER", label: "Other" },
] as const satisfies { value: VariationCategory; label: string }[];

const CATEGORY_VALUES = VARIATION_CATEGORY_OPTIONS.map((o) => o.value) as [
  VariationCategory,
  ...VariationCategory[],
];

export const createVariationSchema = z.object({
  variation_number: z.string().min(1, "Variation number is required"),
  title: z.string().min(1, "Title is required"),
  category: z.enum(CATEGORY_VALUES),
  requested_amount: moneyString,
  estimated_amount: z
    .string()
    .refine((v) => v === "" || (!Number.isNaN(Number(v)) && Number(v) >= 0), {
      message: "Enter a valid, non-negative amount",
    })
    .optional(),
  requested_date: z.string().optional(),
  reason: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateVariationFormValues = z.infer<typeof createVariationSchema>;

export const approveVariationSchema = z.object({
  approved_amount: moneyString,
  notes: z.string().optional(),
});

export type ApproveVariationFormValues = z.infer<typeof approveVariationSchema>;
