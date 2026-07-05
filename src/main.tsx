import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./app/routes/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/sonner.tsx";
import { AuthInit } from "./components/AuthInit.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthInit>
          <RouterProvider router={router} />
        </AuthInit>
        <Toaster richColors />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
