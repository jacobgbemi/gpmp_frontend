// useProjectProgress.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectApi } from "@/services/projectApi";
import { projectQueryKeys } from "./queryKeys";

export function useProjectProgress(
  id: string | undefined,
  params: { page?: number; page_size?: number } = {},
) {
  return useQuery({
    queryKey: projectQueryKeys.progress(id ?? "", params),
    queryFn: () => projectApi.getProgress(id!, params),
    enabled: Boolean(id),
    placeholderData: keepPreviousData,
  });
}
