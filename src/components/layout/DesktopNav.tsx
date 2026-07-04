import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/site";

interface DesktopNavProps {
  navItems: NavItem[];
}

export function DesktopNav({ navItems }: DesktopNavProps) {
  return (
    <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main navigation">
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
  );
}
