import { Link } from "react-router-dom";
import { NavList } from "./NavList";

/**
 * Fixed desktop sidebar. Hidden below the lg breakpoint in favor of
 * MobileNav.
 */
export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/dashboard" className="text-base font-semibold text-primary">
          GlintPM <span className="text-foreground">Private</span>
        </Link>
      </div>
      <NavList />
    </aside>
  );
}
