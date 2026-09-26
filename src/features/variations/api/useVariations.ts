import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { variationApi } from "@/services/variationApi";
import type { VariationListParams } from "../types";
import { variationQueryKeys } from "./queryKeys";

export function useVariations(
  projectId: string | undefined,
  params: VariationListParams = {},
) {
  return useQuery({
    queryKey: variationQueryKeys.list(projectId ?? "", params),
    queryFn: () => variationApi.list(projectId!, params),
    enabled: Boolean(projectId),
    placeholderData: keepPreviousData,
  });
}
