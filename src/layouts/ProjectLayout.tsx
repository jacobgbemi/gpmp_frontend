import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProject } from "@/features/projects/api/useProject";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Skeleton } from "@/components/ui/skeleton";

const TABS = [
  { label: "Overview", to: "dashboard" },
  { label: "Progress", to: "progress" },
  { label: "Payments", to: "payments" },
  { label: "Variations", to: "variations" },
  { label: "Risks", to: "risks" },
  { label: "Issues", to: "issues" },
];

const COMING_SOON_TABS = ["Inspections", "Documents", "Reports", "Team"];

/**
 * Shell for every /projects/:id/* route: back link, project name,
 * and the section tabs. Individual pages (dashboard/progress/payments)
 * render inside via <Outlet />.
 */
export function ProjectLayout() {
  const { id } = useParams<{ id: string }>();
  const { data: project, error, isPending, isError, refetch } = useProject(id);

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      {isPending && <Skeleton className="h-8 w-64" />}

      {isError && (
        <QueryErrorState
          error={error}
          what="this project"
          notFound={{
            title: "Project not found",
            description:
              "This project doesn't exist, or you don't have access to it.",
          }}
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && project && (
        <>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {project.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {project.project_code}
              {project.location ? ` · ${project.location}` : ""}
            </p>
          </div>

          <div
            className="flex gap-1 overflow-x-auto border-b border-border"
            role="tablist"
          >
            {TABS.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {tab.label}
              </NavLink>
            ))}
            {COMING_SOON_TABS.map((label) => (
              <span
                key={label}
                aria-disabled="true"
                className="cursor-not-allowed whitespace-nowrap border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground/50"
              >
                {label}
              </span>
            ))}
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
}
