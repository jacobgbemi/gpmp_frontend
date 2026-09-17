import { useNavigate } from "react-router-dom";
import { ErrorState } from "@/components/common/ErrorState";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <ErrorState
        kind="404"
        actionLabel="Go to dashboard"
        onAction={() => navigate("/dashboard")}
      />
    </div>
  );
}
