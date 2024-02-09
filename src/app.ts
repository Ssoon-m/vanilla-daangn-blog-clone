import Item from "./components/Item";
import Component from "./lib/dom";

type MyState = {
  list: Array<{ title: string }>;
};

class App extends Component<never, MyState> {
  protected setup(): void {
    this.state = {
      list: [
        { title: "운동" },
        { title: "음악감상" },
        { title: "공부" },
        { title: "밥먹기" },
      ],
    };
  }

  protected render() {
    return `<ul class='list' data-component='Item'></ul><button>추가</button>`;
  }

  protected mounted(): void {
    const $el = this.node.querySelector("[data-component=Item]")!;
    new Item($el, { titleList: this.state.list.map((item) => item.title) });
  }

  protected setEvent(): void {
    this.attachEvent("button", "click", () => {
      this.setState({ list: this.state.list.concat({ title: "하이" }) });
    });
  }
}

export default App;
