import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProjectLayout } from "@/layouts/ProjectLayout";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { PublicRoute } from "@/components/common/PublicRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";
import { ProjectDashboardPage } from "@/features/projects/pages/ProjectDashboardPage";
import { ProjectProgressPage } from "@/features/projects/pages/ProjectProgressPage";
import { ProjectPaymentsPage } from "@/features/projects/pages/ProjectPaymentsPage";

/**
 * Stage 2 route map. Auth (Stage 1) plus Projects + the owner
 * dashboard (Stage 2). Do not add Variations/Risks/Inspections/
 * Documents/Reports/Team routes until their stages are built.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/projects/:id" element={<ProjectLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ProjectDashboardPage />} />
            <Route path="progress" element={<ProjectProgressPage />} />
            <Route path="payments" element={<ProjectPaymentsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}