import type { VariationListParams } from "../types";

export const variationQueryKeys = {
  all: ["variations"] as const,
  list: (projectId: string, params: VariationListParams = {}) =>
    ["variations", "list", projectId, params] as const,
  detail: (id: string) => ["variations", "detail", id] as const,
};
