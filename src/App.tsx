import { Outlet } from "react-router";
import NavMenu from "@/pages/shared/NavMenu/NavMenu";
import Footer from "@/pages/shared/Footer/Footer";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollToTop />
      <NavMenu />
      <main className="flex-1 flex flex-col w-full">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
