import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/redux/hook";

export function GuestOnlyRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
