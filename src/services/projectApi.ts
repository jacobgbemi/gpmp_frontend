import { apiClient } from "./api";
import type { PaginatedResponse } from "@/types/pagination";
import type {
  PaymentApplication,
  Project,
  ProjectDashboard,
  ProjectListParams,
  ProgressUpdate,
} from "@/features/projects/types";

/**
 * Raw HTTP calls for the Projects feature. No React, no state — page
 * components and UI never call apiClient directly; they go through
 * the TanStack Query hooks in features/projects/api instead.
 */
export const projectApi = {
  list: async (
    params: ProjectListParams,
  ): Promise<PaginatedResponse<Project>> => {
    const response = await apiClient.get<PaginatedResponse<Project>>(
      "/api/projects/",
      {
        params: {
          search: params.search || undefined,
          status: params.status || undefined,
          page: params.page,
          page_size: params.page_size,
        },
      },
    );
    return response.data;
  },

  get: async (id: string): Promise<Project> => {
    const response = await apiClient.get<Project>(`/api/projects/${id}/`);
    return response.data;
  },

  getDashboard: async (id: string): Promise<ProjectDashboard> => {
    const response = await apiClient.get<ProjectDashboard>(
      `/api/projects/${id}/dashboard/`,
    );
    return response.data;
  },

  getProgress: async (
    id: string,
    params: { page?: number; page_size?: number } = {},
  ): Promise<PaginatedResponse<ProgressUpdate>> => {
    const response = await apiClient.get<PaginatedResponse<ProgressUpdate>>(
      `/api/projects/${id}/progress/`,
      { params },
    );
    return response.data;
  },

  getPayments: async (
    id: string,
    params: { page?: number; page_size?: number } = {},
  ): Promise<PaginatedResponse<PaymentApplication>> => {
    const response = await apiClient.get<PaginatedResponse<PaymentApplication>>(
      `/api/projects/${id}/payments/`,
      { params },
    );
    return response.data;
  },
};