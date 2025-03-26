import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAtomValue } from "jotai";
import { authInitializedAtom, isAuthenticatedAtom } from "@/atoms/auth-atoms";
import { DashboardLayoutSkeleton } from "./layouts/dashboard-layout";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isInitialized = useAtomValue(authInitializedAtom);
  const { pathname, search } = useLocation();

  if (!isInitialized) return <DashboardLayoutSkeleton />;

  if (!isAuthenticated) {
    sessionStorage.setItem(
      "preAuthRoute",
      pathname ? `${pathname}${search}` : "",
    );
    return <Navigate to="/login" replace />;
  }

  return children;
};
