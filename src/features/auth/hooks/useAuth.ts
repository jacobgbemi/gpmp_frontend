import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Access centralized auth state. Must be used within <AuthProvider>.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
