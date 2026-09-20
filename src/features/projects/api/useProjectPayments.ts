// useProjectPayments.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectApi } from "@/services/projectApi";
import { projectQueryKeys } from "./queryKeys";

export function useProjectPayments(
  id: string | undefined,
  params: { page?: number; page_size?: number } = {},
) {
  return useQuery({
    queryKey: projectQueryKeys.payments(id ?? "", params),
    queryFn: () => projectApi.getPayments(id!, params),
    enabled: Boolean(id),
    placeholderData: keepPreviousData,
  });
}