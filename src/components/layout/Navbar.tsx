import { useState } from "react";
import { Link } from "react-router";
import { Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import { AccountMenu } from "./AccountMenu";
import NotificationBell from "@/components/shared/NotificationBell";
import { GlobalSearch } from "./GlobalSearch";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/hooks/useAuth";
import {
  publicNavItems,
  authedNavItems,
  siteConfig,
} from "@/config/site";

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md" aria-label="Site header">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} isAuthenticated={isAuthenticated} isStaff={isStaff} navItems={navItems} />

        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Library className="h-5 w-5" />
          </span>
          <span className="hidden text-lg sm:inline">{siteConfig.name}</span>
        </Link>

        <DesktopNav navItems={navItems} />

        <div className="ml-auto flex items-center gap-1">
          <GlobalSearch />
          <ThemeToggle />
          {isAuthenticated && <NotificationBell />}
          {isAuthenticated && user ? (
            <AccountMenu user={user} isStaff={isStaff} initials={initials} onLogout={logout} />
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
