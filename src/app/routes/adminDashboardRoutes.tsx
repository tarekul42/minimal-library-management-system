import { lazy } from "react";
import type { RouteObject } from "react-router";
import { AdminRoute } from "@/components/route/AdminRoute";
import { LibrarianRoute } from "@/components/route/LibrarianRoute";
import { DashboardShell } from "@/components/route/DashboardShell";

const AdminOverview = lazy(() => import("@/features/dashboard/admin/Overview"));
const ManageUsers = lazy(() => import("@/features/dashboard/admin/ManageUsers"));
const ManageBooks = lazy(() => import("@/features/dashboard/admin/ManageBooks"));
const ManageAuthors = lazy(() => import("@/features/dashboard/admin/ManageAuthors"));
const ManageCategories = lazy(() => import("@/features/dashboard/admin/ManageCategories"));
const ManageBorrows = lazy(() => import("@/features/dashboard/admin/ManageBorrows"));
const ManageFines = lazy(() => import("@/features/dashboard/admin/ManageFines"));
const Reports = lazy(() => import("@/features/dashboard/admin/Reports"));
const Analytics = lazy(() => import("@/features/dashboard/admin/Analytics"));
const AdminSettings = lazy(() => import("@/features/dashboard/admin/Settings"));

export function adminDashboardRoutes(): RouteObject[] {
  return [
    {
      element: <LibrarianRoute />,
      children: [
        {
          element: <DashboardShell role="staff" />,
          children: [
            { path: "admin", element: <AdminOverview /> },
            { path: "admin/analytics", element: <Analytics /> },
            { path: "admin/reports", element: <Reports /> },
            { path: "admin/books", element: <ManageBooks /> },
            { path: "admin/authors", element: <ManageAuthors /> },
            { path: "admin/categories", element: <ManageCategories /> },
            { path: "admin/borrows", element: <ManageBorrows /> },
            { path: "admin/fines", element: <ManageFines /> },
            { path: "admin/settings", element: <AdminSettings /> },
          ],
        },
      ],
    },
    {
      element: <AdminRoute />,
      children: [
        {
          element: <DashboardShell role="admin" />,
          children: [
            { path: "admin/users", element: <ManageUsers /> },
          ],
        },
      ],
    },
  ];
}
