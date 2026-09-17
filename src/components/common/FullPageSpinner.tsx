import { cn } from "@/lib/utils";

interface FullPageSpinnerProps {
  label?: string;
  className?: string;
}

/**
 * Full-viewport loading state, used while auth session restoration
 * is in progress (before we know if the user is logged in).
 */
export function FullPageSpinner({
  label = "Loading…",
  className,
}: FullPageSpinnerProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-background",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-light border-t-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
