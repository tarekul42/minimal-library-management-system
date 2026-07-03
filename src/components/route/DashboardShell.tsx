import { Outlet } from "react-router";

interface DashboardShellProps {
  role: "member" | "staff" | "admin";
}

export function DashboardShell({ role: _role }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
