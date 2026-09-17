import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { config } from "@/app/config";
import { ApiError, type ApiErrorBody } from "@/types/api";
import { tokenStorage } from "./tokenStorage";

/**
 * The single Axios instance used by the entire app. Do not create
 * additional axios instances elsewhere — add a new service file that
 * imports this one instead.
 */
export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the current access token to every outgoing request.
apiClient.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      requestConfig.headers.set("Authorization", `Bearer ${token}`);
    }
    return requestConfig;
  },
);

/**
 * Endpoints that must never trigger a refresh-and-retry cycle, to
 * avoid infinite loops when the credentials themselves are the problem.
 */
const AUTH_ENDPOINTS = ["/api/auth/token/", "/api/auth/token/refresh/"];

function isAuthEndpoint(url?: string): boolean {
  if (!url) return false;
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

// Queue of requests waiting on an in-flight token refresh, so that
// concurrent 401s only trigger a single refresh call.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post<{ access: string }>(
      `${config.apiBaseUrl}/api/auth/token/refresh/`,
      { refresh: refreshToken },
    );
    const newAccessToken = response.data.access;
    tokenStorage.setAccessToken(newAccessToken);
    return newAccessToken;
  } catch {
    tokenStorage.clear();
    return null;
  }
}

/**
 * Notified whenever a request fails auth and the refresh token is
 * also invalid/missing, so the app can redirect to /login.
 * Set by AuthProvider on mount.
 */
let onSessionExpired: (() => void) | null = null;
export function setSessionExpiredHandler(handler: (() => void) | null): void {
  onSessionExpired = handler;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const originalRequest = error.config as
      (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    const status = error.response?.status;

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint(originalRequest.url)
    ) {
      originalRequest._retry = true;

      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const newAccessToken = await refreshPromise;

      if (newAccessToken) {
        originalRequest.headers.set(
          "Authorization",
          `Bearer ${newAccessToken}`,
        );
        return apiClient(originalRequest);
      }

      onSessionExpired?.();
    }

    return Promise.reject(toApiError(error));
  },
);

function toApiError(error: AxiosError<ApiErrorBody>): ApiError {
  if (error.response) {
    const body = error.response.data;
    const message =
      (typeof body?.detail === "string" && body.detail) ||
      error.message ||
      "Something went wrong. Please try again.";
    return new ApiError(message, error.response.status, body);
  }

  if (error.request) {
    return new ApiError(
      "Unable to reach the server. Check your connection.",
      0,
    );
  }

  return new ApiError(error.message || "Unexpected error.", 0);
}
