import { errorKindOf } from "@/lib/apiErrors";
import { ErrorState } from "./ErrorState";

interface QueryErrorStateProps {
  /** The error from a failed TanStack Query (may be undefined in tests). */
  error: unknown;
  /** What failed to load, e.g. "your projects" — used in the generic copy. */
  what: string;
  onRetry?: () => void;
  /** Custom copy for a 404 (e.g. "Project not found"). */
  notFound?: { title: string; description: string };
}

/**
 * The single place that turns a failed query into UI, so a 403, 404,
 * 429, 5xx and a network failure each get the right message instead
 * of everything reading "Something went wrong".
 */
export function QueryErrorState({
  error,
  what,
  onRetry,
  notFound,
}: QueryErrorStateProps) {
  const kind = errorKindOf(error);

  const isGeneric = kind === "500" || kind === "generic";
  const description = isGeneric
    ? `We couldn't load ${what}. Please try again.`
    : kind === "404"
      ? notFound?.description
      : undefined;
  const title = kind === "404" ? notFound?.title : undefined;

  // Retrying a 403 or 404 cannot succeed.
  const canRetry = kind !== "403" && kind !== "404" && kind !== "401";

  return (
    <ErrorState
      kind={kind}
      title={title}
      description={description}
      actionLabel="Retry"
      onAction={canRetry ? onRetry : undefined}
    />
  );
}
