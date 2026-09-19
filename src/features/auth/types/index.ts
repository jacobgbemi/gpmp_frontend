/**
 * Auth types, shaped to match the Django REST Framework + SimpleJWT
 * backend. Adjust here (only here) if the backend response shape
 * changes — nowhere else in the app should redefine these fields.
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenPair {
  access: string;
  refresh: string;
}

/**
 * POST /api/auth/token/refresh/
 *
 * The backend rotates refresh tokens (ROTATE_REFRESH_TOKENS=True), so
 * a new `refresh` is returned alongside the new `access`.
 */
export interface TokenRefreshResponse {
  access: string;
  refresh?: string;
}

export type OrganizationRole =
  | "PLATFORM_ADMIN"
  | "ORGANIZATION_ADMIN"
  | "PROJECT_MANAGER"
  | "PROJECT_CONTROLS"
  | "SITE_INSPECTOR"
  | "CONSULTANT"
  | "CLIENT_OWNER"
  | "VIEWER";

export interface MembershipSummary {
  id: string;
  organization_id: string;
  organization_name: string;
  organization_slug: string;
  role: OrganizationRole;
}

/**
 * GET /api/auth/me/
 */
export interface CurrentUser {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
  memberships?: MembershipSummary[];
}