import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Loader } from "@/components/feedback/Loader";

const HIDE_CHROME_PREFIXES = ["/dashboard", "/admin", "/login", "/register", "/forgot-password", "/reset-password"];

function isHideChrome(pathname: string) {
  return HIDE_CHROME_PREFIXES.some((p) => pathname.startsWith(p));
}

export default function App() {
  const { pathname } = useLocation();

  const mainId = "main-content";

  if (isHideChrome(pathname)) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center">
                <Loader size={32} />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollToTop />
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id={mainId} className="flex-1 flex flex-col w-full outline-none" tabIndex={-1}>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center">
                <Loader size={32} />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
