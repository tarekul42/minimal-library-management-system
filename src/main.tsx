import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-gray-900 min-h-screen">
    <RouterProvider router={router} />
    </div>
  </StrictMode>
);
