import { createBrowserRouter } from "react-router";

import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Opportunities from "./pages/Opportunities";
import Partners from "./pages/Partners";
import Pricing from "./pages/Pricing";

/*
 * Add a page by dropping a component in src/pages and adding one entry to
 * `children` below — it inherits the nav and footer automatically:
 *
 *   { path: "pricing", element: <Pricing /> }
 *
 * For a heavier page, code-split it instead so it is not in the initial
 * bundle:
 *
 *   { path: "pricing", lazy: async () => ({ Component: (await import("./pages/Pricing")).default }) }
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "opportunities", element: <Opportunities /> },
      { path: "partners", element: <Partners /> },
      { path: "pricing", element: <Pricing /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
