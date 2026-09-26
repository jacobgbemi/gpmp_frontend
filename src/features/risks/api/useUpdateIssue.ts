import { useMutation, useQueryClient } from "@tanstack/react-query";
import { issueApi } from "@/services/riskApi";
import type { UpdateIssueInput } from "../types";
import { issueQueryKeys } from "./queryKeys";

export function useUpdateIssue(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateIssueInput }) =>
      issueApi.update(id, input),
    onSuccess: (issue) => {
      queryClient.setQueryData(issueQueryKeys.detail(issue.id), issue);
      queryClient.invalidateQueries({
        queryKey: ["issues", "list", projectId],
      });
    },
  });
}
