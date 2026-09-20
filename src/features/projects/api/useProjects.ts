// useProjects.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectApi } from "@/services/projectApi";
import type { ProjectListParams } from "../types";
import { projectQueryKeys } from "./queryKeys";

/**
 * Paginated, searchable, filterable project list.
 * `keepPreviousData` avoids a loading flash when the user paginates
 * or changes filters — the old page stays visible (dimmed by the
 * caller, if desired) until the new one arrives.
 */
export function useProjects(params: ProjectListParams) {
  return useQuery({
    queryKey: projectQueryKeys.list(params),
    queryFn: () => projectApi.list(params),
    placeholderData: keepPreviousData,
  });
}