import { useQuery } from "@tanstack/react-query";
import { variationApi } from "@/services/variationApi";
import { variationQueryKeys } from "./queryKeys";

export function useVariation(id: string | undefined) {
  return useQuery({
    queryKey: variationQueryKeys.detail(id ?? ""),
    queryFn: () => variationApi.get(id!),
    enabled: Boolean(id),
  });
}
