import Component from "@/lib/dom";
import styles from "./CategoryNav.module.css";
import Router from "@/lib/router";

interface CategoryNavProps {
  tags?: {
    text: string;
    active: boolean;
    value: string;
  }[];
}

class CategoryNav extends Component<CategoryNavProps> {
  protected render(): string {
    return `${this.props.tags
      ?.map(
        (tag) =>
          `<div id=${tag.value} class="${styles["category"]} ${
            tag.active ? styles["active"] : ""
          }">${tag.text}</div>`
      )
      .join("")}`;
  }
  protected setEvent(): void {
    this.attachEvent("div", "click", (event) => {
      const $el = event.target as HTMLElement;
      Router.push($el.id === "*" ? "/" : `/?category=${$el.id}`);
    });
  }
}

export default CategoryNav;
