import type { ErrorKind } from "@/components/common/ErrorState";
import { ApiError } from "@/types/api";

/**
 * Map any error thrown by the API client to the matching ErrorState
 * variant, so every page reacts the same way to 401/403/404/429/5xx
 * and to network failures.
 *
 * 400/409/422 are validation/conflict responses to a *write*; they
 * are shown next to the form field or as a toast using
 * `error.message`, not as a full-page error state.
 */
export function errorKindOf(error: unknown): ErrorKind {
  if (!(error instanceof ApiError)) return "generic";
  if (error.status === 0) return "network";
  if (error.status === 401) return "401";
  if (error.status === 403) return "403";
  if (error.status === 404) return "404";
  if (error.status === 429) return "429";
  if (error.status >= 500) return "500";
  return "generic";
}

/** Client errors that will not succeed on retry. */
export function isNonRetryable(error: unknown): boolean {
  return error instanceof ApiError && error.status >= 400 && error.status < 500;
}
