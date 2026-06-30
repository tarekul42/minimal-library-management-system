import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
