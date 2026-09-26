import { apiClient } from "./api";
import type { PaginatedResponse } from "@/types/pagination";
import type {
  ApproveVariationInput,
  CreateVariationInput,
  UpdateVariationStatusInput,
  Variation,
  VariationListParams,
} from "@/features/variations/types";

/**
 * Raw HTTP calls for the Variations feature.
 *
 * Listing/creating happens on the *project* resource
 * (/api/projects/{id}/variations/); everything else (get/patch/approve)
 * is a direct /api/variations/{id}/ call — see apps/variations/views.py.
 */
export const variationApi = {
  list: async (
    projectId: string,
    params: VariationListParams = {},
  ): Promise<PaginatedResponse<Variation>> => {
    const response = await apiClient.get<PaginatedResponse<Variation>>(
      `/api/projects/${projectId}/variations/`,
      {
        params: {
          status: params.status || undefined,
          category: params.category || undefined,
          page: params.page,
          page_size: params.page_size,
        },
      },
    );
    return response.data;
  },

  create: async (
    projectId: string,
    input: CreateVariationInput,
  ): Promise<Variation> => {
    const response = await apiClient.post<Variation>(
      `/api/projects/${projectId}/variations/`,
      input,
    );
    return response.data;
  },

  get: async (id: string): Promise<Variation> => {
    const response = await apiClient.get<Variation>(`/api/variations/${id}/`);
    return response.data;
  },

  updateStatus: async (
    id: string,
    input: UpdateVariationStatusInput,
  ): Promise<Variation> => {
    const response = await apiClient.patch<Variation>(
      `/api/variations/${id}/`,
      input,
    );
    return response.data;
  },

  approve: async (
    id: string,
    input: ApproveVariationInput,
  ): Promise<Variation> => {
    const response = await apiClient.post<Variation>(
      `/api/variations/${id}/approve/`,
      input,
    );
    return response.data;
  },
};
