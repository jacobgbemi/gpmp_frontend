import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "../hooks/useAuth";
import { authApi } from "@/services/authApi";
import { tokenStorage } from "@/services/tokenStorage";

vi.mock("@/services/authApi");

const mockedAuthApi = vi.mocked(authApi);

function TestConsumer() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) return <div>loading</div>;

  return (
    <div>
      <div data-testid="authenticated">{String(isAuthenticated)}</div>
      <div data-testid="email">{user?.email ?? "none"}</div>
      <button
        onClick={() => {
          void login({ email: "owner@example.com", password: "secret123" });
        }}
      >
        login
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

function renderWithProviders() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    </QueryClientProvider>,
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    tokenStorage.clear();
  });

  it("starts unauthenticated when there is no persisted refresh token", async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    });
  });

  it("authenticates the user after a successful login", async () => {
    mockedAuthApi.login.mockResolvedValue({
      access: "access-token",
      refresh: "refresh-token",
    });
    mockedAuthApi.getCurrentUser.mockResolvedValue({
      id: 1,
      email: "owner@example.com",
    });

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    });

    await act(async () => {
      screen.getByText("login").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
      expect(screen.getByTestId("email")).toHaveTextContent(
        "owner@example.com",
      );
    });

    expect(tokenStorage.getRefreshToken()).toBe("refresh-token");
  });

  it("clears user and tokens on logout", async () => {
    mockedAuthApi.login.mockResolvedValue({
      access: "access-token",
      refresh: "refresh-token",
    });
    mockedAuthApi.getCurrentUser.mockResolvedValue({
      id: 1,
      email: "owner@example.com",
    });

    renderWithProviders();

    await act(async () => {
      screen.getByText("login").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    });

    await act(async () => {
      screen.getByText("logout").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
      expect(screen.getByTestId("email")).toHaveTextContent("none");
    });

    expect(tokenStorage.getRefreshToken()).toBeNull();
    expect(tokenStorage.getAccessToken()).toBeNull();
  });
});
