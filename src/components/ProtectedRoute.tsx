import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";

const HOME: Record<UserRole, string> = {
  admin: "/admin",
  merchant: "/merchant",
  agent: "/agent",
  customer: "/app",
};

export function ProtectedRoute({
  role,
  children,
}: {
  role: UserRole | UserRole[];
  children: ReactNode;
}) {
  const { state } = useAuth();
  const location = useLocation();

  if (state.status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const allowed = Array.isArray(role) ? role : [role];
  if (!allowed.includes(state.role)) {
    return <Navigate to={HOME[state.role]} replace />;
  }

  return <>{children}</>;
}
