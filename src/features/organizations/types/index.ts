/**
 * GET /api/organizations/{id}/members/ — apps/organizations/serializers.py
 * OrganizationMemberSerializer.
 */
export interface OrganizationMember {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}
