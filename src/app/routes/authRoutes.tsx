import { lazy } from "react";
import type { RouteObject } from "react-router";
import { GuestOnlyRoute } from "@/components/route/GuestOnlyRoute";

export function authRoutes(): RouteObject[] {
  const Login = lazy(() => import("@/features/auth/Login"));
  const Register = lazy(() => import("@/features/auth/Register"));
  const ForgotPassword = lazy(() => import("@/features/auth/ForgotPassword"));
  const ResetPassword = lazy(() => import("@/features/auth/ResetPassword"));

  return [
    {
      element: <GuestOnlyRoute />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ];
}
