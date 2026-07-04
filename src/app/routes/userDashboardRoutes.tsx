import { lazy } from "react";
import type { RouteObject } from "react-router";
import { ProtectedRoute } from "@/components/route/ProtectedRoute";
import { DashboardShell } from "@/components/layout/DashboardShell";

export function userDashboardRoutes(): RouteObject[] {
  const UserOverview = lazy(() => import("@/features/dashboard/user/Overview"));
  const MyBorrows = lazy(() => import("@/features/dashboard/user/MyBorrows"));
  const MyReservations = lazy(() => import("@/features/dashboard/user/MyReservations"));
  const Wishlist = lazy(() => import("@/features/dashboard/user/Wishlist"));
  const Fines = lazy(() => import("@/features/dashboard/user/Fines"));
  const Notifications = lazy(() => import("@/features/dashboard/user/Notifications"));
  const Profile = lazy(() => import("@/features/dashboard/user/Profile"));
  const Settings = lazy(() => import("@/features/dashboard/user/Settings"));

  return [
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <DashboardShell role="member" />,
          children: [
            { path: "dashboard", element: <UserOverview /> },
            { path: "dashboard/my-borrows", element: <MyBorrows /> },
            { path: "dashboard/my-reservations", element: <MyReservations /> },
            { path: "dashboard/wishlist", element: <Wishlist /> },
            { path: "dashboard/fines", element: <Fines /> },
            { path: "dashboard/notifications", element: <Notifications /> },
            { path: "dashboard/profile", element: <Profile /> },
            { path: "dashboard/settings", element: <Settings /> },
          ],
        },
      ],
    },
  ];
}
