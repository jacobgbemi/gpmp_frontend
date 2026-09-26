import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { issueApi } from "@/services/riskApi";
import type { IssueListParams } from "../types";
import { issueQueryKeys } from "./queryKeys";

export function useIssues(
  projectId: string | undefined,
  params: IssueListParams = {},
) {
  return useQuery({
    queryKey: issueQueryKeys.list(projectId ?? "", params),
    queryFn: () => issueApi.list(projectId!, params),
    enabled: Boolean(projectId),
    placeholderData: keepPreviousData,
  });
}
