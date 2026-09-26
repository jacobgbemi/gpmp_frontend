import { forwardRef } from "react";
import { Select, type SelectProps } from "@/components/ui/select";
import { useOrganizationMembers } from "@/features/organizations/api/useOrganizationMembers";

interface OwnerSelectProps extends Omit<SelectProps, "children"> {
  organizationId: string | undefined;
}

/**
 * Populates its options from the project's organization members —
 * the same set the backend validates `owner` against (see
 * `_owner_queryset` in apps/risks/serializers.py).
 */
export const OwnerSelect = forwardRef<HTMLSelectElement, OwnerSelectProps>(
  ({ organizationId, ...props }, ref) => {
    const { data: members, isPending } = useOrganizationMembers(organizationId);

    return (
      <Select ref={ref} {...props}>
        <option value="" disabled>
          {isPending ? "Loading members…" : "Select an owner"}
        </option>
        {members?.map((member) => (
          <option key={member.user_id} value={member.user_id}>
            {[member.first_name, member.last_name].filter(Boolean).join(" ") ||
              member.email}
          </option>
        ))}
      </Select>
    );
  },
);
OwnerSelect.displayName = "OwnerSelect";
