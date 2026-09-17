import { Skeleton } from "@/components/ui/skeleton";

/**
 * Generic page-level loading skeleton: a header line plus a few
 * content blocks. Use inside a route/page while its data loads.
 */
export function PageSkeleton() {
  return (
    <div
      className="flex flex-col gap-6"
      aria-busy="true"
      aria-label="Loading content"
    >
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={index} className="h-28 w-full" />
        ))}
      </div>
    </div>
  );
}
