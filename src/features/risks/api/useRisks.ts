import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { riskApi } from "@/services/riskApi";
import type { RiskListParams } from "../types";
import { riskQueryKeys } from "./queryKeys";

export function useRisks(
  projectId: string | undefined,
  params: RiskListParams = {},
) {
  return useQuery({
    queryKey: riskQueryKeys.list(projectId ?? "", params),
    queryFn: () => riskApi.list(projectId!, params),
    enabled: Boolean(projectId),
    placeholderData: keepPreviousData,
  });
}
