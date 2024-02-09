import Component from "../lib/dom";

type MyProps = {
  titleList: string[];
};

class Item extends Component<MyProps> {
  render(): string {
    return this.props.titleList
      .map(
        (title) =>
          `<li style="color:red" data-title=${title} class='list'>${title}</li>`
      )
      .join("");
  }
  protected setEvent(): void {
    this.attachEvent(".list", "click", (e) => {
      const t = e.target as HTMLElement;
      e.stopPropagation();
      console.log(t.dataset.title);
    });
  }
}

export default Item;
