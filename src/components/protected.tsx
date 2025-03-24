import { Navigate, useLocation } from "react-router";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@/atoms/auth-atoms";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};
