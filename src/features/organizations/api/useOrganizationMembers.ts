import { useQuery } from "@tanstack/react-query";
import { organizationApi } from "@/services/organizationApi";

/**
 * Members of an organization, for populating an "owner" select on
 * Risk/Issue forms. `staleTime` is generous — org membership rarely
 * changes within a session.
 */
export function useOrganizationMembers(organizationId: string | undefined) {
  return useQuery({
    queryKey: ["organizations", organizationId ?? "", "members"],
    queryFn: () => organizationApi.getMembers(organizationId!),
    enabled: Boolean(organizationId),
    staleTime: 5 * 60 * 1000,
  });
}
