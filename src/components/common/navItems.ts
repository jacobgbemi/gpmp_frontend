import {
  AlertTriangle,
  BarChart3,
  ClipboardCheck,
  CreditCard,
  FileText,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Pages beyond Stage 1 are placeholders: visible, but not yet routed. */
  comingSoon?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
    comingSoon: true,
  },
  { label: "Payments", href: "/payments", icon: CreditCard, comingSoon: true },
  {
    label: "Variations",
    href: "/variations",
    icon: GitBranch,
    comingSoon: true,
  },
  { label: "Progress", href: "/progress", icon: TrendingUp, comingSoon: true },
  {
    label: "Risks & Issues",
    href: "/risks",
    icon: AlertTriangle,
    comingSoon: true,
  },
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
