/**
 * Centralized JWT token storage.
 *
 * This is the ONLY module in the app allowed to touch localStorage
 * for authentication tokens. Everything else (interceptors, auth
 * context, hooks) goes through these functions.
 *
 * Strategy:
 * - The access token lives in memory only. It is short-lived and
 *   never written to disk, which keeps it out of reach of anything
 *   that can read localStorage (e.g. a compromised third-party script).
 * - The refresh token is persisted to localStorage so a returning
 *   user doesn't have to log in again on every page reload. This is
 *   a pragmatic tradeoff for a JWT-only backend; migrating the
 *   refresh token to an httpOnly cookie set by the server is the
 *   natural next hardening step and does not require changes outside
 *   this file.
 */

const REFRESH_TOKEN_KEY = "glintpm.refreshToken";

let accessToken: string | null = null;

export const tokenStorage = {
  getAccessToken(): string | null {
    return accessToken;
  },

  setAccessToken(token: string | null): void {
    accessToken = token;
  },

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setRefreshToken(token: string | null): void {
    try {
      if (token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    } catch {
      // localStorage may be unavailable (e.g. private browsing).
      // Auth will simply not persist across reloads in that case.
    }
  },

  setTokens(tokens: { access: string; refresh?: string }): void {
    tokenStorage.setAccessToken(tokens.access);
    if (tokens.refresh) {
      tokenStorage.setRefreshToken(tokens.refresh);
    }
  },

  clear(): void {
    accessToken = null;
    tokenStorage.setRefreshToken(null);
  },
};
