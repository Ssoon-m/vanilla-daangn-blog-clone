import Component from "@/lib/dom";
import styles from "./TagNav.module.css";

interface TagNavProps {
  tags: {
    text: string;
    active: boolean;
    value: string;
  }[];
}

class TagNav extends Component<TagNavProps> {
  protected render(): string {
    return `${this.props.tags
      .map(
        (tag) =>
          `<a href='/tags/${tag.value}' data-link class="${styles["tag"]} ${
            tag.active ? styles["active"] : ""
          }">${tag.text}</a>`
      )
      .join("")}`;
  }
}

export default TagNav;
