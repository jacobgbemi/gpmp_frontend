import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationApi } from "@/services/variationApi";
import type { ApproveVariationInput } from "../types";
import { variationQueryKeys } from "./queryKeys";

export function useApproveVariation(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ApproveVariationInput }) =>
      variationApi.approve(id, input),
    onSuccess: (variation) => {
      queryClient.setQueryData(
        variationQueryKeys.detail(variation.id),
        variation,
      );
      queryClient.invalidateQueries({
        queryKey: ["variations", "list", projectId],
      });
    },
  });
}
