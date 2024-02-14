import PageNotFound from "../not-found";
import About from "../pages/about";
import Category from "../pages/category";
import Etc from "../pages/etc";
import Home from "@/pages/home/page";
import type { Route } from "../lib/router";
import PageNotFoundV2 from "../not-found-v2";

export const routes: Route[] = [
  {
    path: "/",
    element: Home,
    errorElement: PageNotFound,
    children: [
      {
        path: "category",
        element: Category,
        errorElement: PageNotFoundV2,
        children: [
          {
            path: "etc",
            element: Etc,
          },
        ],
      },
      {
        path: "about",
        children: [
          {
            path: ":id",
            element: About,
          },
        ],
      },
    ],
  },
] as const;
