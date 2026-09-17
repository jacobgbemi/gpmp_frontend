import { Outlet } from "react-router-dom";

/**
 * Shell for unauthenticated routes (currently just /login).
 * A restrained, private-office presentation: brand panel on the
 * left for larger screens, form on the right.
 */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden w-1/2 flex-col justify-between bg-primary px-12 py-10 text-primary-foreground lg:flex">
        <span className="text-sm font-semibold tracking-wide">
          GlintPM Private
        </span>
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-semibold leading-tight">
            Project control and assurance, built for owners.
          </p>
          <p className="max-w-md text-sm text-primary-foreground/80">
            Understand cost, schedule, risk and contractor performance on your
            high-value projects — at a glance.
          </p>
        </div>
        <span className="text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} GlintPM. All rights reserved.
        </span>
      </div>

      <div className="flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
