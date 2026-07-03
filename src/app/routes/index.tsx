import { createBrowserRouter } from "react-router";
import App from "@/App";
import { marketingRoutes } from "./marketingRoutes";
import { authRoutes } from "./authRoutes";
import { userDashboardRoutes } from "./userDashboardRoutes";
import { adminDashboardRoutes } from "./adminDashboardRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...marketingRoutes(),
      ...authRoutes(),
      ...userDashboardRoutes(),
      ...adminDashboardRoutes(),
    ],
  },
]);
