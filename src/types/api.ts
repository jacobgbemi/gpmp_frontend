/**
 * Shared, backend-shape-agnostic API types.
 */

export interface ApiErrorBody {
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
