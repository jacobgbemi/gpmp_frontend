import { apiClient } from "./api";
import type { PaginatedResponse } from "@/types/pagination";
import type {
  CreateIssueInput,
  CreateRiskInput,
  Issue,
  IssueListParams,
  Risk,
  RiskListParams,
  UpdateIssueInput,
  UpdateRiskInput,
} from "@/features/risks/types";

/**
 * Raw HTTP calls for Risks. Listing/creating happens on the project
 * resource; get/patch is the direct /api/risks/{id}/ resource — see
 * apps/risks/views.py.
 */
export const riskApi = {
  list: async (
    projectId: string,
    params: RiskListParams = {},
  ): Promise<PaginatedResponse<Risk>> => {
    const response = await apiClient.get<PaginatedResponse<Risk>>(
      `/api/projects/${projectId}/risks/`,
      {
        params: {
          status: params.status || undefined,
          category: params.category || undefined,
          owner: params.owner || undefined,
          page: params.page,
          page_size: params.page_size,
        },
      },
    );
    return response.data;
  },

  create: async (projectId: string, input: CreateRiskInput): Promise<Risk> => {
    const response = await apiClient.post<Risk>(
      `/api/projects/${projectId}/risks/`,
      input,
    );
    return response.data;
  },

  get: async (id: string): Promise<Risk> => {
    const response = await apiClient.get<Risk>(`/api/risks/${id}/`);
    return response.data;
  },

  update: async (id: string, input: UpdateRiskInput): Promise<Risk> => {
    const response = await apiClient.patch<Risk>(`/api/risks/${id}/`, input);
    return response.data;
  },
};

/**
 * Raw HTTP calls for Issues — same nested-create/flat-detail shape as
 * Risks.
 */
export const issueApi = {
  list: async (
    projectId: string,
    params: IssueListParams = {},
  ): Promise<PaginatedResponse<Issue>> => {
    const response = await apiClient.get<PaginatedResponse<Issue>>(
      `/api/projects/${projectId}/issues/`,
      {
        params: {
          status: params.status || undefined,
          severity: params.severity || undefined,
          owner: params.owner || undefined,
          page: params.page,
          page_size: params.page_size,
        },
      },
    );
    return response.data;
  },

  create: async (
    projectId: string,
    input: CreateIssueInput,
  ): Promise<Issue> => {
    const response = await apiClient.post<Issue>(
      `/api/projects/${projectId}/issues/`,
      input,
    );
    return response.data;
  },

  get: async (id: string): Promise<Issue> => {
    const response = await apiClient.get<Issue>(`/api/issues/${id}/`);
    return response.data;
  },

  update: async (id: string, input: UpdateIssueInput): Promise<Issue> => {
    const response = await apiClient.patch<Issue>(`/api/issues/${id}/`, input);
    return response.data;
  },
};
