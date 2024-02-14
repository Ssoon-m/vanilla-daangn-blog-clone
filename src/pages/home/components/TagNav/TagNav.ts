import Component from "@/lib/dom";
import styles from "./TagNav.module.css";

interface TagNavProps {
  tags: {
    text: string;
    active: boolean;
  }[];
}

class TagNav extends Component<TagNavProps> {
  protected render(): string {
    return `${this.props.tags
      .map(
        (tag) =>
          `<div class="${styles["tag"]} ${
            tag.active ? styles["active"] : ""
          }">${tag.text}</div>`
      )
      .join("")}`;
  }
}

export default TagNav;
