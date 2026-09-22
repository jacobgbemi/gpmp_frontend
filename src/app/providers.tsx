import { StrictMode, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { isNonRetryable } from "@/lib/apiErrors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't retry 4xx (403/404/429/validation): it can't succeed and
      // only delays the error state. Retry other failures once.
      retry: (failureCount, error) =>
        !isNonRetryable(error) && failureCount < 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * All app-wide providers, composed in one place. Order matters:
 * QueryClientProvider must wrap AuthProvider (auth uses TanStack
 * Query internally), and BrowserRouter must wrap AuthProvider since
 * auth redirects rely on router context.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>{children}</AuthProvider>
          </BrowserRouter>
          <Toaster />
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
