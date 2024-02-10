import Component from "../lib/dom";
import About from "../pages/about";
import Home from "../pages/home";
import Login from "../pages/login";

export interface Route {
  path: string;
  element: typeof Component<{}, {}>;
}
export const routes: Route[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/about/:id",
    element: About,
  },
];
