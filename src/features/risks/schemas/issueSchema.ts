import { z } from "zod";
import type { IssueSeverity } from "../types";

export const ISSUE_SEVERITY_OPTIONS = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
] as const satisfies { value: IssueSeverity; label: string }[];

const SEVERITY_VALUES = ISSUE_SEVERITY_OPTIONS.map((o) => o.value) as [
  IssueSeverity,
  ...IssueSeverity[],
];

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  severity: z.enum(SEVERITY_VALUES),
  owner: z.string().min(1, "An owner is required"),
  target_date: z.string().optional(),
});

export type CreateIssueFormValues = z.infer<typeof createIssueSchema>;

/**
 * Mirrors the backend rule in apps/risks/services.update_issue: a
 * resolution is required the moment status becomes RESOLVED.
 */
export const resolveIssueSchema = z.object({
  resolution: z.string().min(1, "A resolution is required to resolve an issue"),
});

export type ResolveIssueFormValues = z.infer<typeof resolveIssueSchema>;
