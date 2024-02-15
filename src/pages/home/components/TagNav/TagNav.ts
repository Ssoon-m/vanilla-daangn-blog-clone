import Component from "@/lib/dom";
import styles from "./TagNav.module.css";
import Router from "@/lib/router";

interface TagNavProps {
  tags?: {
    text: string;
    active: boolean;
    value: string;
  }[];
}

class TagNav extends Component<TagNavProps> {
  protected render(): string {
    return `${this.props.tags
      ?.map(
        (tag) =>
          `<div id=${tag.value} class="${styles["tag"]} ${
            tag.active ? styles["active"] : ""
          }">${tag.text}</div>`
      )
      .join("")}`;
  }
  protected setEvent(): void {
    this.attachEvent("div", "click", (event) => {
      const $el = event.target as HTMLElement;
      Router.push($el.id === "*" ? "/" : `/?tags=${$el.id}`);
    });
  }
}

export default TagNav;
