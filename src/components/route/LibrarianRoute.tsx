import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/redux/hook";

export function LibrarianRoute() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin" && user?.role !== "librarian") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
