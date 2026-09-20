import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectsPage } from "./ProjectsPage";
import { useProjects } from "../api/useProjects";
import type { Project } from "../types";

vi.mock("../api/useProjects");

const mockedUseProjects = vi.mocked(useProjects);

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: "1",
    organization: "org-1",
    name: "Escravos Pipeline Upgrade",
    project_code: "EPU-001",
    description: "",
    location: "Delta State",
    client_name: "Client Co",
    contractor_name: "Contractor Co",
    project_type: "Pipeline",
    contract_value: "500000000",
    currency: "NGN",
    planned_start_date: null,
    planned_end_date: null,
    actual_start_date: null,
    actual_end_date: null,
    status: "ACTIVE",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function renderPage() {
  return render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  );
}

describe("ProjectsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading state while fetching", () => {
    mockedUseProjects.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      isFetching: true,
      refetch: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    renderPage();

    expect(screen.getByLabelText(/loading projects/i)).toBeInTheDocument();
  });

  it("shows an empty state when there are no projects", () => {
    mockedUseProjects.mockReturnValue({
      data: { count: 0, next: null, previous: null, results: [] },
      isPending: false,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    renderPage();

    expect(screen.getByText(/no projects yet/i)).toBeInTheDocument();
  });

  it("shows an error state with a retry action", () => {
    const refetch = vi.fn();
    mockedUseProjects.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      isFetching: false,
      refetch,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    renderPage();

    expect(
      screen.getByText(/couldn't load your projects/i),
    ).toBeInTheDocument();
    screen.getByRole("button", { name: /retry/i }).click();
    expect(refetch).toHaveBeenCalled();
  });

  it("renders project rows when data is available", () => {
    mockedUseProjects.mockReturnValue({
      data: { count: 1, next: null, previous: null, results: [project()] },
      isPending: false,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    renderPage();

    expect(
      screen.getAllByText("Escravos Pipeline Upgrade").length,
    ).toBeGreaterThan(0);
  });
});