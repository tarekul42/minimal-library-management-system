import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="bg-gray-950 min-h-screen">
        <RouterProvider router={router} />
        <Toaster richColors />
      </div>
    </Provider>
  </StrictMode>,
);
