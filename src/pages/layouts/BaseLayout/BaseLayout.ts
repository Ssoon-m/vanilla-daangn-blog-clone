import Component from "@/lib/dom";
import Router from "@/lib/router";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import styles from "./BaseLayout.module.css";

interface BaseLayoutProps {
  children: string;
}

class BaseLayout extends Component<BaseLayoutProps> {
  protected render(): string {
    return `  
      <div data-component="AppHeader"></div>
      <main class=${styles["main"]}>${this.props.children}</main>
      <div data-component="AppFooter"></div>
    `;
  }
  protected mounted(): void {
    const $AppHeader = document.querySelector("[data-component=AppHeader]")!;
    const $AppFooter = document.querySelector("[data-component=AppFooter]")!;
    new AppHeader($AppHeader);
    new AppFooter($AppFooter);
  }
  protected setEvent(): void {
    this.attachEvent("button", "click", () => {
      // Router.replace(`/about/${Math.ceil(Math.random() * 10)}`);
      Router.pop();
    });
  }
}

export default BaseLayout;
