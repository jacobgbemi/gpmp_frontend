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
 * GET /api/auth/me/
 *
 * Kept intentionally loose (`[key: string]: unknown`) on top of the
 * known fields, since the backend may return additional profile
 * fields (organization, role, etc.) that later stages will consume.
 */
export interface CurrentUser {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
  [key: string]: unknown;
}
