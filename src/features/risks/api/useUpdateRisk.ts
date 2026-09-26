import { useMutation, useQueryClient } from "@tanstack/react-query";
import { riskApi } from "@/services/riskApi";
import type { UpdateRiskInput } from "../types";
import { riskQueryKeys } from "./queryKeys";

export function useUpdateRisk(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateRiskInput }) =>
      riskApi.update(id, input),
    onSuccess: (risk) => {
      queryClient.setQueryData(riskQueryKeys.detail(risk.id), risk);
      queryClient.invalidateQueries({ queryKey: ["risks", "list", projectId] });
    },
  });
}
