import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "./navItems";

interface NavListProps {
  onNavigate?: () => void;
}

/**
 * The list of navigation links shared between the desktop sidebar
 * and the mobile navigation drawer. Items beyond Stage 1 are shown
 * as disabled placeholders — their pages don't exist yet.
 */
export function NavList({ onNavigate }: NavListProps) {
  return (
    <nav
      className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
      aria-label="Primary"
    >
      {navItems.map((item) => {
        const Icon = item.icon;

        if (item.comingSoon) {
          return (
            <span
              key={item.label}
              aria-disabled="true"
              className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground/60"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
              <span className="ml-auto rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Soon
              </span>
            </span>
          );
        }

        return (
          <NavLink
            key={item.label}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-primary-light text-primary"
                  : "text-foreground/80 hover:bg-surface hover:text-foreground",
              )
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
