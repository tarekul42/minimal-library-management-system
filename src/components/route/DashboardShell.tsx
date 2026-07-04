import { Outlet, useLocation } from "react-router";

interface DashboardShellProps {
  role: "member" | "staff" | "admin";
}

const mainId = "main-content";

export function DashboardShell({ role: _role }: DashboardShellProps) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen">
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <main id={mainId} className="flex-1 outline-none" tabIndex={-1} key={pathname}>
        <Outlet />
      </main>
    </div>
  );
}
