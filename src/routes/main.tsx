import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "@/components/layout/main/layout";
import { LayoutLoading } from "@/components/layout/layout-loading";
import LoginPage from "@/pages/login";

import { GuestRoute } from "./guest-route";
import { ProtectedRoute } from "./protected-route";
import { paths } from "./paths";

export const Homepage = lazy(() => import("@/pages/home/"));

// eslint-disable-next-line react-refresh/only-export-components
export const mainRoutes = [
  {
    path: paths.home,
    element: (
      <Layout>
        <Suspense fallback={<LayoutLoading />}>
          <Outlet />
        </Suspense>
      </Layout>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        ),
      },
      {
        path: paths.login,
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
    ],
  },
];
