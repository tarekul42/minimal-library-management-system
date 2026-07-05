import { NavLink } from "react-router";
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
  siteConfig,
  userDashboardNav,
} from "@/config/site";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/site";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
  isStaff: boolean;
  navItems: NavItem[];
}

export function MobileNav({ open, onOpenChange, isAuthenticated, isStaff, navItems }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]" aria-label="Mobile navigation">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Library className="h-5 w-5 text-primary" />
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation links">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => onOpenChange(false)}
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
                <NavLink key={item.href} to={item.href} onClick={() => onOpenChange(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted">
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
                  <NavLink to="/admin" onClick={() => onOpenChange(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted">
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
  );
}
