import { useMutation, useQueryClient } from "@tanstack/react-query";
import { issueApi } from "@/services/riskApi";
import type { CreateIssueInput } from "../types";

export function useCreateIssue(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateIssueInput) => issueApi.create(projectId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issues", "list", projectId],
      });
    },
  });
}
