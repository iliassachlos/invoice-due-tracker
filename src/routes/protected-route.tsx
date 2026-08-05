import type { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/auth/use-auth";
import { LayoutLoading } from "@/components/layout/layout-loading";

import { paths } from "./paths";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LayoutLoading />;

  if (!user) {
    return <Navigate to={paths.login} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
