import type { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/auth/use-auth";
import { LayoutLoading } from "@/components/layout/layout-loading";

import { paths } from "./paths";

type GuestRouteProps = PropsWithChildren;

// Keeps user from accessing guest routes if they are already logged in
export const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LayoutLoading />;

  if (user) return <Navigate to={paths.home} replace />;

  return <>{children}</>;
};
