import {
  BarChart3,
  ClipboardCheck,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Pages beyond the current stage are placeholders: visible, but not yet routed. */
  comingSoon?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  {
    label: "Inspections",
    href: "/inspections",
    icon: ClipboardCheck,
    comingSoon: true,
  },
  { label: "Documents", href: "/documents", icon: FileText, comingSoon: true },
  { label: "Reports", href: "/reports", icon: BarChart3, comingSoon: true },
  { label: "Team", href: "/team", icon: Users, comingSoon: true },
  { label: "Settings", href: "/settings", icon: Settings, comingSoon: true },
];
