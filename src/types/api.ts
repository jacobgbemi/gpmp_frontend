/**
 * Shared, backend-shape-agnostic API types.
 */

/**
 * Error bodies from the Django backend. Two shapes exist:
 *  - the project envelope produced by `common.exceptions`:
 *      { success: false, message: string, errors: ... | null }
 *  - raw DRF / SimpleJWT bodies: { detail: string, code?: string }
 * Both are accepted so a message can always be surfaced.
 */
export interface ApiErrorBody {
  success?: boolean;
  message?: string;
  errors?: Record<string, unknown> | unknown[] | null;
  detail?: string;
  code?: string;
  [field: string]: unknown;
}

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody | undefined;

  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}