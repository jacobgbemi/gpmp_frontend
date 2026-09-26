/**
 * Risk & Issue domain types — a 1:1 mirror of apps/risks/serializers.py.
 * Risks and Issues are separate resources sharing one backend app; we
 * mirror that here rather than splitting into two features.
 */

export type RiskCategory =
  | "COST"
  | "SCHEDULE"
  | "QUALITY"
  | "PROCUREMENT"
  | "CONTRACTOR"
  | "DESIGN"
  | "COMMERCIAL"
  | "REGULATORY"
  | "SAFETY"
  | "OTHER";

export type RiskResponse = "AVOID" | "MITIGATE" | "TRANSFER" | "ACCEPT";
export type RiskStatus = "OPEN" | "MITIGATING" | "MONITORING" | "CLOSED";

/**
 * Computed server-side by the SAME formula this frontend uses for
 * live preview — see lib/riskLevel.ts. Never sent by the client.
 */
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

/** GET /api/projects/{id}/risks/ (each row), GET /api/risks/{id}/ */
export interface Risk {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  probability: number;
  impact: number;
  risk_score: number;
  risk_level: RiskLevel;
  response: RiskResponse;
  mitigation: string;
  contingency: string;
  owner: string;
  owner_email: string;
  status: RiskStatus;
  target_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface RiskListParams {
  status?: RiskStatus | "";
  category?: RiskCategory | "";
  owner?: string;
  page?: number;
  page_size?: number;
}

/** POST /api/projects/{id}/risks/ — status defaults to OPEN server-side. */
export interface CreateRiskInput {
  title: string;
  description?: string;
  category: RiskCategory;
  probability: number;
  impact: number;
  response?: RiskResponse;
  mitigation?: string;
  contingency?: string;
  owner: string;
  target_date?: string;
}

/** PATCH /api/risks/{id}/ */
export interface UpdateRiskInput {
  status?: RiskStatus;
  probability?: number;
  impact?: number;
  response?: RiskResponse;
  mitigation?: string;
  contingency?: string;
  owner?: string;
  target_date?: string;
}

export type IssueSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type IssueStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

/** GET /api/projects/{id}/issues/ (each row), GET /api/issues/{id}/ */
export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: IssueSeverity;
  owner: string;
  owner_email: string;
  status: IssueStatus;
  target_date: string | null;
  resolution: string;
  created_at: string;
  updated_at: string;
}

export interface IssueListParams {
  status?: IssueStatus | "";
  severity?: IssueSeverity | "";
  owner?: string;
  page?: number;
  page_size?: number;
}

/** POST /api/projects/{id}/issues/ — status defaults to OPEN server-side. */
export interface CreateIssueInput {
  title: string;
  description?: string;
  severity: IssueSeverity;
  owner: string;
  target_date?: string;
}

/**
 * PATCH /api/issues/{id}/ — a `resolution` is required by the backend
 * the moment `status` is set to RESOLVED (see
 * apps/risks/services.update_issue).
 */
export interface UpdateIssueInput {
  status?: IssueStatus;
  resolution?: string;
  owner?: string;
  target_date?: string;
}
