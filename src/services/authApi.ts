import { apiClient } from "./api";
import type {
  CurrentUser,
  LoginCredentials,
  TokenPair,
  TokenRefreshResponse,
} from "@/features/auth/types";

/**
 * Raw HTTP calls to the auth endpoints. No React, no state — this
 * file only knows how to talk to the backend. Feature-level hooks in
 * features/auth/api consume these.
 */
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<TokenPair> => {
    const response = await apiClient.post<TokenPair>(
      "/api/auth/token/",
      credentials,
    );
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<TokenRefreshResponse> => {
    const response = await apiClient.post<TokenRefreshResponse>(
      "/api/auth/token/refresh/",
      {
        refresh: refreshToken,
      },
    );
    return response.data;
  },

  getCurrentUser: async (): Promise<CurrentUser> => {
    const response = await apiClient.get<CurrentUser>("/api/auth/me/");
    return response.data;
  },
};