import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Library, Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import NotificationBell from "@/components/shared/NotificationBell";
import { GlobalSearch } from "./GlobalSearch";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/hooks/useAuth";
import {
  publicNavItems,
  authedNavItems,
  siteConfig,
  userDashboardNav,
} from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isStaff = user?.role === "admin" || user?.role === "librarian";
  const navItems = isAuthenticated ? authedNavItems : publicNavItems;
  const initials = (user?.name || "U")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Library className="h-5 w-5 text-primary" />
                {siteConfig.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                      isActive && "bg-primary/10 text-primary",
                    )
                  }
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </NavLink>
              ))}
              {isAuthenticated && (
                <>
                  <div className="my-2 h-px bg-border" />
                  <p className="px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Account
                  </p>
                  {userDashboardNav.slice(0, 4).map((item) => (
                    <NavLink key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </NavLink>
                  ))}
                  {isStaff && (
                    <>
                      <div className="my-2 h-px bg-border" />
                      <p className="px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Staff
                      </p>
                      <NavLink to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted">
                        <ShieldCheck className="h-4 w-4" />
                        Admin Panel
                      </NavLink>
                    </>
                  )}
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Library className="h-5 w-5" />
          </span>
          <span className="hidden text-lg sm:inline">{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  isActive && "bg-primary/10 text-primary",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1">
          <GlobalSearch />
          <ThemeToggle />
          {isAuthenticated && <NotificationBell />}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                  <span className="mt-1 inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">
                    {user.role}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/wishlist" className="cursor-pointer">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/my-borrows" className="cursor-pointer">My Borrows</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isStaff && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
