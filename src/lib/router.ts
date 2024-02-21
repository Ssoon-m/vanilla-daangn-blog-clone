import { pathToRegex } from "../utils/path";
import Component from "./dom";

type HistoryChangeEventData = {
  path: string;
  isReplace: boolean;
};

type ComponentType = typeof Component<{}, {}>;

export type Route = {
  path: string;
  element?: ComponentType;
  errorElement?: ComponentType;
  children?: Route[];
};

const navigateTo = ({
  path,
  isReplace = false,
}: {
  path: string;
  isReplace?: boolean;
}) => {
  const historyChange = new CustomEvent<HistoryChangeEventData>(
    "historychange",
    {
      detail: {
        path,
        isReplace,
      },
    }
  );
  dispatchEvent(historyChange);
};

class Router {
  root: HTMLElement | Element;
  routes: Route[];
  constructor(root: HTMLElement | Element, routes: Route[]) {
    this.root = root;
    this.routes = routes;
    this.initLoad();
  }
  private initLoad() {
    this.loadRouteComponent(this.currentPath);
    this.customizeAnchorBehavior();

    window.addEventListener("historychange", (e: unknown) => {
      const {
        detail: { path, isReplace },
      } = e as CustomEvent<HistoryChangeEventData>;
      if (isReplace) {
        window.history.replaceState({}, "", path);
      } else {
        window.history.pushState({}, "", path);
      }
      this.loadRouteComponent(path);
    });

    window.addEventListener("popstate", () => {
      this.loadRouteComponent(this.currentPath);
    });
  }
  private matchUrlToRoute(routes: Route[], path: string) {
    const segments = path.split("/").map((segment) => {
      if (segment === "") return "/";
      return segment;
    });
    if (segments.length <= 2 && segments[1] === "/") {
      return { Component: routes[0].element, params: undefined };
    }
    function traverse(
      routes: Route[],
      segments: string[],
      errorComponent?: ComponentType
    ) {
      for (const route of routes) {
        const { path, children, element, errorElement } = route;
        const regex = pathToRegex(path);
        const [pathname, segment] = segments[0].match(regex) || [];
        if (!pathname) continue;
        if (segments.length === 1) {
          return { Component: element, params: segment };
        } else if (children) {
          return traverse(
            children,
            segments.slice(1),
            errorElement ?? errorComponent
          );
        } else {
          return { Component: errorComponent, params: undefined };
        }
      }
      return { Component: errorComponent, params: undefined };
    }
    return traverse(routes, segments);
  }
  private loadRouteComponent(path: string) {
    const { Component, params } = this.matchUrlToRoute(this.routes, path);
    if (!Component) {
      throw new Error("no matching component error");
    } else {
      new Component(this.root, { params });
    }
  }
  // attach "data-link" to attribute of anchor tag when use custom anchor tag
  private customizeAnchorBehavior() {
    window.addEventListener("click", (e) => {
      const el = e.target as HTMLElement;
      if (!(el instanceof HTMLAnchorElement)) return;
      const anchor = el.closest("a[data-link]") as HTMLAnchorElement;
      if (!anchor) return;
      e.preventDefault();
      Router.push(anchor.pathname);
    });
  }
  static replace(path: string) {
    navigateTo({ path, isReplace: true });
  }
  static push(path: string) {
    navigateTo({ path });
  }
  static pop() {
    window.history.back();
  }

  get currentPath() {
    return window.location.pathname;
  }
}

export default Router;
