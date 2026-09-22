import {
  AlertTriangle,
  Clock,
  Lock,
  ShieldOff,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorKind =
  "401" | "403" | "404" | "429" | "500" | "network" | "generic";

interface ErrorStateConfig {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ERROR_CONFIG: Record<ErrorKind, ErrorStateConfig> = {
  "401": {
    icon: Lock,
    title: "Session expired",
    description: "Please sign in again to continue.",
  },
  "403": {
    icon: ShieldOff,
    title: "Access restricted",
    description: "You don't have permission to view this page.",
  },
  "404": {
    icon: AlertTriangle,
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has moved.",
  },
  "429": {
    icon: Clock,
    title: "Too many requests",
    description:
      "You're sending requests too quickly. Wait a moment and try again.",
  },
  "500": {
    icon: AlertTriangle,
    title: "Something went wrong",
    description:
      "An unexpected error occurred on our end. Please try again shortly.",
  },
  network: {
    icon: Wifi,
    title: "No connection",
    description:
      "We could not reach the server. Check your internet connection and try again.",
  },
  generic: {
    icon: AlertTriangle,
    title: "Something went wrong",
    description: "Please try again. If the problem persists, contact support.",
  },
};

interface ErrorStateProps {
  kind?: ErrorKind;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Reusable full-region error state for 401/403/404/500/network
 * failures. Pass `kind` for sensible defaults, or override the copy
 * directly.
 */
export function ErrorState({
  kind = "generic",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: ErrorStateProps) {
  const fallback = ERROR_CONFIG[kind];
  const Icon = fallback.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card px-6 py-16 text-center",
        className,
      )}
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">
        {title ?? fallback.title}
      </h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        {description ?? fallback.description}
      </p>
      {onAction && (
        <Button variant="outline" className="mt-2" onClick={onAction}>
          {actionLabel ?? "Try again"}
        </Button>
      )}
    </div>
  );
}
