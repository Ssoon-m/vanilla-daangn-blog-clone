import PageNotFound from "../pages/404";
import { Route } from "../routes";
import { pathToRegex } from "../utils/path";

// 동적 경로 매핑
type HistoryChangeEventData = {
  path: string;
  isReplace: boolean;
};

class Router {
  root: HTMLElement | Element;
  routes: Array<Route & { params: string | null }>;
  constructor(root: HTMLElement | Element, routes: Route[]) {
    this.root = root;
    this.routes = routes.map((route) => ({ ...route, params: null }));
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

  private matchUrlToRoute(path: string) {
    const findRoute = this.routes.find((route) => {
      const regex = pathToRegex(route.path);
      const [pathname, segment] = path.match(regex) || [];
      if (!pathname) return false;
      if (pathname && !segment) return true;
      if (segment.split("/").length > 1) return false;
      route.params = segment;
      return true;
    });
    return findRoute;
  }
  private loadRouteComponent(path: string) {
    const route = this.matchUrlToRoute(path);
    if (!route) {
      new PageNotFound(this.root);
      return;
    }
    if (route.params) {
      new route.element(this.root, { params: route.params });
    } else {
      new route.element(this.root);
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
      Router.navigateTo(anchor.pathname);
    });
  }
  static navigateTo(path: string, isReplace = false) {
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
  }
  get currentPath() {
    return window.location.pathname;
  }
}

export default Router;
