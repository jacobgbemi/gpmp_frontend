import type { IssueStatus, RiskStatus } from "../types";

/** Mirrors RISK_STATUS_TRANSITIONS in apps/risks/models.py exactly. */
export const RISK_STATUS_TRANSITIONS: Record<RiskStatus, RiskStatus[]> = {
  OPEN: ["MITIGATING", "MONITORING", "CLOSED"],
  MITIGATING: ["MONITORING", "CLOSED"],
  MONITORING: ["MITIGATING", "CLOSED"],
  CLOSED: [],
};

export function nextRiskStatuses(status: RiskStatus): RiskStatus[] {
  return RISK_STATUS_TRANSITIONS[status] ?? [];
}

/** Mirrors ISSUE_STATUS_TRANSITIONS in apps/risks/models.py exactly. */
export const ISSUE_STATUS_TRANSITIONS: Record<IssueStatus, IssueStatus[]> = {
  OPEN: ["IN_PROGRESS", "RESOLVED", "CLOSED"],
  IN_PROGRESS: ["RESOLVED", "CLOSED"],
  RESOLVED: ["IN_PROGRESS", "CLOSED"],
  CLOSED: [],
};

export function nextIssueStatuses(status: IssueStatus): IssueStatus[] {
  return ISSUE_STATUS_TRANSITIONS[status] ?? [];
}

/**
 * Mirrors _STATUSES_REQUIRING_RESOLUTION in apps/risks/models.py — a
 * resolution is required the moment status becomes RESOLVED.
 */
export function issueStatusRequiresResolution(status: IssueStatus): boolean {
  return status === "RESOLVED";
}
