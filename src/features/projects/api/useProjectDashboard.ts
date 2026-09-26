// useProjectDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { projectApi } from "@/services/projectApi";
import { projectQueryKeys } from "./queryKeys";

export function useProjectDashboard(id: string | undefined) {
  return useQuery({
    queryKey: projectQueryKeys.dashboard(id ?? ""),
    queryFn: () => projectApi.getDashboard(id!),
    enabled: Boolean(id),
    // The dashboard is the "is my project okay right now" screen —
    // keep it reasonably fresh rather than caching for a long time.
    staleTime: 30 * 1000,
  });
}
