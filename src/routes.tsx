import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { SEO } from "./components/seo";
import App from "./App";
import { LoginCallback } from "./pages/login/login-callback";
import { ProtectedRoute } from "./components/protected";
import DashboardLayout from "./components/layouts/dashboard-layout";
import { NotFound } from "./pages/not-found";
import OnboardingLayout from "./components/layouts/onboarding-layout";

export interface RouteMetadata {
  breadcrumb?: string | ((params: unknown) => string); // Breadcrumb can be a string or a function
}

const LoginPage = lazy(() => import("./pages/login/login-page"));
const Dashboard = lazy(() => import("./pages/dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            path: "dashboard",
            element: (
              <>
                <SEO title="Dashboard" />
                <Dashboard />
              </>
            ),
            handle: { breadcrumb: "Dashboard" } as RouteMetadata,
          },
          {
            path: "cases",
            element: (
              <>
                <SEO title="Cases" />
                <h1>Cases</h1>
              </>
            ),
            handle: { breadcrumb: "Cases" } as RouteMetadata,
          },
          {
            path: "clients",
            element: (
              <>
                <SEO title="Clients" />
                <h1>Clients</h1>
              </>
            ),
            handle: {
              breadcrumb: (params) =>
                `Client ${(params as { clientId: string }).clientId}`,
            } as RouteMetadata, // Dynamic breadcrumb
          },
          {
            path: "tasks",
            element: (
              <>
                <SEO title="Tasks" />
                <h1>Tasks</h1>
              </>
            ),
            handle: { breadcrumb: "Tasks" } as RouteMetadata,
          },
          {
            path: "invoices",
            element: (
              <>
                <SEO title="Billing & Invoicing" />
                <h1>Billing & Invoicing</h1>
              </>
            ),
            handle: { breadcrumb: "Billing & Invoicing" } as RouteMetadata,
          },
          {
            path: "calendar",
            element: (
              <>
                <SEO title="Calendar" />
                <h1>Calendar</h1>
              </>
            ),
            handle: { breadcrumb: "Calendar" } as RouteMetadata,
          },
          {
            path: "documents",
            element: (
              <>
                <SEO title="Document" />
                <h1>Document</h1>
              </>
            ),
            handle: { breadcrumb: "Documents" } as RouteMetadata,
          },
          {
            path: "time-tracking",
            element: (
              <>
                <SEO title="Time Tracking" />
                <h1>Time Tracking</h1>
              </>
            ),
            handle: { breadcrumb: "Time Tracking" } as RouteMetadata,
          },
          {
            path: "users",
            element: (
              <>
                <SEO title="Users" />
                <h1>Users</h1>
              </>
            ),
            handle: { breadcrumb: "Users" } as RouteMetadata,
          },
          {
            path: "template",
            element: (
              <>
                <SEO title="Template" />
                <h1>Template</h1>
              </>
            ),
            handle: { breadcrumb: "Template" } as RouteMetadata,
          },
          {
            path: "settings",
            element: (
              <>
                <SEO title="Settings" />
                <h1>Users</h1>
              </>
            ),
            handle: { breadcrumb: "Settings" } as RouteMetadata,
          },
        ],
      },
      // Onboarding routes
      {
        path: "/onboarding",
        element: <OnboardingLayout />,
        children: [
          {
            index: true,
            element: (
              <>
                <SEO title="Sign Up" description="Create an account" />
                <h1>Onboarding</h1>
              </>
            ),
          },
        ],
      },

      // Public routes
      {
        path: "/login",
        element: (
          <>
            <SEO title="Login" description="Log in to your account" />
            <LoginPage />
          </>
        ),
      },
      {
        path: "/auth/openiddict",
        element: <LoginCallback />,
      },

      {
        path: "/error",
        element: <h1>Something went wrong</h1>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
