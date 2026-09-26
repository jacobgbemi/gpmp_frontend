import { useMemo } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { OrganizationRole } from "@/features/auth/types";
import type { Project } from "../types";

/**
 * The current user's role on a project's organization, mirroring the
 * backend's `get_project_role` (apps/projects/permissions.py). Used
 * only to shape the UI (hide actions the user can't take) — the
 * backend remains the source of truth and re-checks on every write,
 * so this is never relied on for actual authorization.
 */
export function useProjectRole(
  project: Project | undefined,
): OrganizationRole | null {
  const { user } = useAuth();

  return useMemo(() => {
    if (!project || !user?.memberships) return null;
    const membership = user.memberships.find(
      (m) => m.organization_id === project.organization,
    );
    return membership?.role ?? null;
  }, [project, user]);
}

// Mirrors PROJECT_WRITE_ROLES in apps/projects/permissions.py.
const PROJECT_WRITE_ROLES: OrganizationRole[] = [
  "PLATFORM_ADMIN",
  "ORGANIZATION_ADMIN",
  "PROJECT_MANAGER",
  "PROJECT_CONTROLS",
];

// Mirrors VARIATION_APPROVAL_ROLES in apps/variations/permissions.py.
const VARIATION_APPROVAL_ROLES: OrganizationRole[] = [
  "PLATFORM_ADMIN",
  "ORGANIZATION_ADMIN",
  "PROJECT_CONTROLS",
];

export function canWriteProject(role: OrganizationRole | null): boolean {
  return role !== null && PROJECT_WRITE_ROLES.includes(role);
}

export function canApproveVariation(role: OrganizationRole | null): boolean {
  return role !== null && VARIATION_APPROVAL_ROLES.includes(role);
}
