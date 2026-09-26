import { useMutation, useQueryClient } from "@tanstack/react-query";
import { riskApi } from "@/services/riskApi";
import type { CreateRiskInput } from "../types";

export function useCreateRisk(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateRiskInput) => riskApi.create(projectId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risks", "list", projectId] });
    },
  });
}
