import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { FullPageSpinner } from "./FullPageSpinner";

interface LocationState {
  from?: { pathname: string };
}

/**
 * Wrap routes that should only be visible to signed-out users
 * (e.g. /login). Authenticated users are redirected to /dashboard,
 * or back to wherever they originally tried to go.
 */
export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isAuthenticated) {
    const state = location.state as LocationState | null;
    const redirectTo = state?.from?.pathname ?? "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
