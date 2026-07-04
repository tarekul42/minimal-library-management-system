import { type ReactNode } from "react";
import { Link } from "react-router";
import { Library, Quote } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden gradient-primary lg:flex lg:flex-col lg:justify-between lg:p-12 text-primary-foreground">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Library className="h-5 w-5" />
          </span>
          <span className="text-lg">{siteConfig.name}</span>
        </Link>
        <div className="space-y-4">
          <Quote className="h-10 w-10 text-primary-foreground/60" />
          <p className="text-2xl font-medium leading-snug max-w-md text-pretty">
            &ldquo;I&rsquo;ve borrowed 47 books this year without setting foot inside a physical branch. The Athenaeum just works.&rdquo;
          </p>
          <p className="text-primary-foreground/80">&mdash; Sarah Chen, member since 2024</p>
        </div>
        <p className="text-xs text-primary-foreground/60">&copy; {new Date().getFullYear()} {siteConfig.name}</p>
      </div>

      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 font-semibold lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Library className="h-5 w-5" />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
