import type { ProjectListParams } from "../types";

/**
 * Centralized query key factory for the Projects feature. Keeping
 * these in one place is what makes cache invalidation
 * (`queryClient.invalidateQueries`) reliable — every hook that reads
 * or invalidates project data imports from here instead of writing
 * its own key array.
 */
export const projectQueryKeys = {
  all: ["projects"] as const,
  list: (params: ProjectListParams) => ["projects", "list", params] as const,
  detail: (id: string) => ["projects", "detail", id] as const,
  dashboard: (id: string) => ["projects", id, "dashboard"] as const,
  progress: (id: string, params: { page?: number; page_size?: number } = {}) =>
    ["projects", id, "progress", params] as const,
  payments: (id: string, params: { page?: number; page_size?: number } = {}) =>
    ["projects", id, "payments", params] as const,
};
