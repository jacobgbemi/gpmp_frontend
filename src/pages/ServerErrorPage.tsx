import { ErrorState } from "@/components/common/ErrorState";

export function ServerErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <ErrorState
        kind="500"
        actionLabel="Reload page"
        onAction={() => window.location.reload()}
      />
    </div>
  );
}
