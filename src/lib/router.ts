import { pathToRegex } from "../utils/path";
import Component from "./dom";

type HistoryChangeEventData = {
  path: string;
  search: string;
  isReplace?: boolean;
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
  search,
  isReplace = false,
}: HistoryChangeEventData) => {
  const historyChange = new CustomEvent<HistoryChangeEventData>(
    "historychange",
    {
      detail: {
        path,
        search,
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
    this.loadRouteComponent(Router.currentPath());
    this.customizeAnchorBehavior();

    window.addEventListener("historychange", (e: unknown) => {
      const {
        detail: { path, search, isReplace },
      } = e as CustomEvent<HistoryChangeEventData>;
      if (isReplace) {
        window.history.replaceState({}, "", path + search);
      } else {
        window.history.pushState(
          {
            scrollTop:
              document.body.scrollHeight ||
              document.documentElement.scrollHeight,
          },
          "",
          path + search
        );
      }
      this.loadRouteComponent(path);
    });

    window.addEventListener("popstate", () => {
      this.loadRouteComponent(Router.currentPath());
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
      Router.push(anchor.pathname + anchor.search);
    });
  }
  static replace(path: string) {
    const { pathname, search } = new URL(window.location.origin + path);
    navigateTo({ path: pathname, search, isReplace: true });
  }
  static push(path: string) {
    const { pathname, search } = new URL(window.location.origin + path);
    navigateTo({ path: pathname, search });
  }
  static pop() {
    window.history.back();
  }
  static searchParams() {
    const { search } = new URL(window.location.href);
    return new URLSearchParams(search);
  }
  static currentPath() {
    return window.location.pathname;
  }
}

export default Router;
