import { apiClient } from "./api";
import type { OrganizationMember } from "@/features/organizations/types";

/**
 * Raw HTTP calls for the Organizations feature. Currently only the
 * members lookup is needed — for populating "owner" selects on Risk
 * and Issue forms.
 */
export const organizationApi = {
  getMembers: async (organizationId: string): Promise<OrganizationMember[]> => {
    const response = await apiClient.get<OrganizationMember[]>(
      `/api/organizations/${organizationId}/members/`,
    );
    return response.data;
  },
};
