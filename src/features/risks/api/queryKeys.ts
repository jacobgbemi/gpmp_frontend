import type { IssueListParams, RiskListParams } from "../types";

export const riskQueryKeys = {
  list: (projectId: string, params: RiskListParams = {}) =>
    ["risks", "list", projectId, params] as const,
  detail: (id: string) => ["risks", "detail", id] as const,
};

export const issueQueryKeys = {
  list: (projectId: string, params: IssueListParams = {}) =>
    ["issues", "list", projectId, params] as const,
  detail: (id: string) => ["issues", "detail", id] as const,
};
