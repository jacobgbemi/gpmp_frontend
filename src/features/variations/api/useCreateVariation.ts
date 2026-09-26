import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationApi } from "@/services/variationApi";
import type { CreateVariationInput } from "../types";

export function useCreateVariation(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateVariationInput) =>
      variationApi.create(projectId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["variations", "list", projectId],
      });
    },
  });
}
