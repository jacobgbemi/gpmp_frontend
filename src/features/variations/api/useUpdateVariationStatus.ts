import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationApi } from "@/services/variationApi";
import type { UpdateVariationStatusInput } from "../types";
import { variationQueryKeys } from "./queryKeys";

export function useUpdateVariationStatus(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateVariationStatusInput;
    }) => variationApi.updateStatus(id, input),
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
