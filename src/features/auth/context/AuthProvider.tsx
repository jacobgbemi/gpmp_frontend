import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import { tokenStorage } from "@/services/tokenStorage";
import { setSessionExpiredHandler } from "@/services/api";
import type { CurrentUser, LoginCredentials } from "../types";
import { AuthContext, type AuthContextValue } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Centralized auth state for the whole app. Mount once, at the root.
 *
 * On mount it attempts to restore a session from the persisted
 * refresh token before rendering protected routes, so the app never
 * flashes a logged-out state for a user who is actually still
 * authenticated.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    setSessionExpiredHandler(logout);
    return () => setSessionExpiredHandler(null);
  }, [logout]);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Persist the rotated refresh token as well as the new access token.
        const tokens = await authApi.refresh(refreshToken);
        tokenStorage.setTokens(tokens);
        const currentUser = await authApi.getCurrentUser();
        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        tokenStorage.clear();
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const tokens = await authApi.login(credentials);
    tokenStorage.setTokens(tokens);
    const currentUser = await authApi.getCurrentUser();
    setUser(currentUser);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
