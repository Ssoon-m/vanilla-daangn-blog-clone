import PageNotFound from "../not-found";
import Home from "@/pages/home/page";
import type { Route } from "../lib/router";
import ArchivePage from "@/pages/archive/page";

export const routes: Route[] = [
  {
    path: "/",
    element: Home,
    errorElement: PageNotFound,
    children: [
      {
        path: "archive",
        children: [
          {
            path: ":id",
            element: ArchivePage,
          },
        ],
      },
    ],
  },
] as const;
