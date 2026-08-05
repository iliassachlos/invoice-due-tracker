import NotFoundPage from "@/pages/not-found";

import { paths } from "./paths";

export const errorRoutes = [
  {
    path: paths.notFound,
    element: <NotFoundPage />,
  },
];
