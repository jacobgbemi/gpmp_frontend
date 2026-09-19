/**
 * Centralized frontend configuration.
 *
 * All environment-derived values must be read here, and only here.
 * Never read `import.meta.env` directly from components/services.
 */

function readApiBaseUrl(): string {
  const value = import.meta.env.VITE_API_BASE_URL;

  if (!value) {
    // Fail loudly in development so a missing .env is obvious,
    // rather than silently sending requests to the wrong host.
    // eslint-disable-next-line no-console
    console.error(
      "VITE_API_BASE_URL is not set. Create a .env.local file based on .env.example.",
    );
  }

  // Strip trailing slashes: request paths already start with "/api/...".
  const baseUrl = (value ?? "").replace(/\/+$/, "");

  if (baseUrl.endsWith("/api")) {
    // eslint-disable-next-line no-console
    console.warn(
      "VITE_API_BASE_URL should not include the /api suffix — requests already " +
        "start with /api/, so this would call /api/api/... and return 404.",
    );
  }

  return baseUrl;
}

export const config = {
  apiBaseUrl: readApiBaseUrl(),
  appName: "GlintPM Private",
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;