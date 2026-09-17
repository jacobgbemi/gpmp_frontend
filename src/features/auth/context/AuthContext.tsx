import { createContext } from "react";
import type { CurrentUser, LoginCredentials } from "../types";

export interface AuthContextValue {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  /** True while the app is restoring a session on initial load. */
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
