// useProject.ts
import { useQuery } from "@tanstack/react-query";
import { projectApi } from "@/services/projectApi";
import { projectQueryKeys } from "./queryKeys";

export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: projectQueryKeys.detail(id ?? ""),
    queryFn: () => projectApi.get(id!),
    enabled: Boolean(id),
  });
}