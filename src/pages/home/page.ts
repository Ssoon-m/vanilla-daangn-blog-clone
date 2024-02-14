import Component from "@/lib/dom";
import { BaseLayout } from "../layouts";
import { getArticleList } from "@/lib/apis/article";

class Home extends Component {
  protected render(): string {
    return `
      <div data-component="BaseLayout"></div>
    `;
  }
  protected mounted(): void {
    const $el = document.querySelector("[data-component=BaseLayout]")!;
    new BaseLayout($el, {
      children: `<div>content??</div>`,
    });
    getArticleList().then(console.log);
  }
}

export default Home;
