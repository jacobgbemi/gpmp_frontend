import { useAuth } from "@/features/auth/hooks/useAuth";

export function DashboardPage() {
  const { user } = useAuth();
  const firstName = (user?.first_name as string | undefined) || undefined;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card px-6 py-20 text-center">
      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
        {firstName ? `Welcome, ${firstName}` : "Welcome"}
      </span>
      <h1 className="text-2xl font-semibold text-foreground">
        Your project portfolio
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Project intelligence and assurance at a glance.
      </p>
    </div>
  );
}
