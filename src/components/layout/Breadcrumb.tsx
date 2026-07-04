import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link to="/" className="inline-flex items-center transition-colors duration-150 hover:text-foreground" aria-label="Home">
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            {item.href && i < items.length - 1 ? (
              <Link to={item.href} className="transition-colors duration-150 hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
