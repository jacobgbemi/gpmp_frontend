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

  return value ?? "";
}

export const config = {
  apiBaseUrl: readApiBaseUrl(),
  appName: "GlintPM Private",
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
