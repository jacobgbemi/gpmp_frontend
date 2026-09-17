import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";

export const authQueryKeys = {
  currentUser: ["auth", "currentUser"] as const,
};

/**
 * Fetches the current authenticated user via TanStack Query, for any
 * component that wants a cached, revalidatable view of the current
 * user outside of the initial auth bootstrap (which AuthProvider
 * handles directly for correctness/ordering).
 */
export function useCurrentUserQuery(enabled = true) {
  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: authApi.getCurrentUser,
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
