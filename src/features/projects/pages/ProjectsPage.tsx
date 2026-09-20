import { useState } from "react";
import { FolderKanban } from "lucide-react";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProjects } from "../api/useProjects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectsFilters } from "../components/ProjectsFilters";
import { ProjectsTable } from "../components/ProjectsTable";
import type { ProjectStatus } from "../types";

const PAGE_SIZE = 10;

export function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "">("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search);

  const { data, isPending, isError, isFetching, refetch } = useProjects({
    search: debouncedSearch,
    status,
    page,
    page_size: PAGE_SIZE,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: ProjectStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Your organization's project portfolio.
        </p>
      </div>

      <ProjectsFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
      />

      {isPending && (
        <div
          className="flex flex-col gap-3"
          aria-busy="true"
          aria-label="Loading projects"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <ErrorState
          kind="500"
          description="We couldn't load your projects. Please try again."
          actionLabel="Retry"
          onAction={() => refetch()}
        />
      )}

      {!isPending && !isError && data && data.results.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <FolderKanban
            className="h-8 w-8 text-muted-foreground"
            aria-hidden="true"
          />
          <h2 className="text-base font-semibold text-foreground">
            {search || status ? "No matching projects" : "No projects yet"}
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            {search || status
              ? "Try adjusting your search or filter."
              : "Projects added to your organization will appear here."}
          </p>
        </div>
      )}

      {!isPending && !isError && data && data.results.length > 0 && (
        <div
          className={isFetching ? "opacity-60 transition-opacity" : undefined}
        >
          <div className="hidden lg:block">
            <ProjectsTable projects={data.results} />
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              count={data.count}
              onPageChange={setPage}
            />
          </div>

          <div className="flex flex-col gap-3 lg:hidden">
            {data.results.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <div className="rounded-lg border border-border">
              <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                count={data.count}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}