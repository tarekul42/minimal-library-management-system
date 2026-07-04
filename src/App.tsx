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
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
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
