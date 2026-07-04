import { Outlet, NavLink, Link } from "react-router";
import { useState } from "react";
import { Library, Menu, Search, ChevronDown, LogOut, User, Settings, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import NotificationBell from "@/components/shared/NotificationBell";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/hooks/useAuth";
import {
  userDashboardNav,
  staffDashboardNav,
  adminOnlyDashboardNav,
  siteConfig,
} from "@/config/site";

interface DashboardShellProps {
  role: "member" | "staff" | "admin";
}

export function DashboardShell({ role }: DashboardShellProps) {
  const { user } = useAppSelector((s) => s.auth);
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isStaff = user?.role === "admin" || user?.role === "librarian";
  const navItems = role === "member" ? userDashboardNav : [...staffDashboardNav, ...(user?.role === "admin" ? adminOnlyDashboardNav : [])];

  const initials = (user?.name || "U").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  const homeHref = isStaff ? "/admin" : "/dashboard";

  const SidebarContent = (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === "/dashboard" || item.href === "/admin"}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
              isActive && "bg-primary/10 text-primary",
            )
          }
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Library className="h-5 w-5" />
          </span>
          <span>{siteConfig.name}</span>
        </div>
        <div className="py-4">{SidebarContent}</div>
      </aside>

      {/* Mobile sidebar (drawer) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="border-b border-border">
            <SheetTitle className="flex h-16 items-center gap-2 px-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Library className="h-5 w-5" />
              </span>
              {siteConfig.name}
            </SheetTitle>
          </SheetHeader>
          {SidebarContent}
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex flex-1 flex-col">
        {/* Dashboard topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open sidebar" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="font-semibold lg:hidden">{siteConfig.name}</Link>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search"><Search className="h-5 w-5" /></Button>
            <ThemeToggle />
            <NotificationBell />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 pl-1 pr-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">{user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                    <span className="mt-1 inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">{user?.role}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to={homeHref}><ShieldCheck className="mr-2 h-4 w-4" /> Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${homeHref}/profile`}><User className="mr-2 h-4 w-4" /> Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to={`${homeHref}/settings`}><Settings className="mr-2 h-4 w-4" /> Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
