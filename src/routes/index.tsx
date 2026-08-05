import { createBrowserRouter, Navigate } from "react-router-dom";

import { errorRoutes } from "./error";
import { mainRoutes } from "./main";
import { paths } from "./paths";

export const routes = [
  ...mainRoutes,
  ...errorRoutes,
  { path: "*", element: <Navigate to={paths.notFound} replace /> },
];

const router = createBrowserRouter(routes);

export default router;
