import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "./App";

const Dashboard = lazy(() => import("./pages/dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
    ],
  },
]);
