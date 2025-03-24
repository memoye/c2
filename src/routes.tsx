import { CallbackHandler } from "./components/callback";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";
// import { getDefaultStore } from "jotai";
import App from "./App";
import LoginPage from "./pages/login/login-form";

const Dashboard = lazy(() => import("./pages/dashboard"));

// const store = getDefaultStore();

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
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/callback",
    element: <CallbackHandler />,
  },
  // {
  //   path: "/protected",
  //   element: <ProtectedPage />,
  //   loader: async () => {
  //     if (!store.get(isAuthenticatedAtom)) {
  //       await userManager.signinRedirect();
  //       return null;
  //     }
  //     return apiClient.get("/protected-data");
  //   },
  // },
]);
