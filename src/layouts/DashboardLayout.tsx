import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/common/Sidebar";
import { TopNav } from "@/components/common/TopNav";

/**
 * Authenticated application shell: sidebar + top nav + content area.
 * Collapses to a hamburger-triggered drawer on small screens.
 */
export function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-surface">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
