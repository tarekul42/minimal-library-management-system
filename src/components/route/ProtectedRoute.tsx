import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/redux/hook";

export function ProtectedRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
