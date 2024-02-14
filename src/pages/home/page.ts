import Component from "@/lib/dom";
import { BaseLayout } from "../layouts";
import { type Article, getArticleList } from "@/lib/apis/article";
import styles from "./home.module.css";

interface HomeState {
  articles?: Article[];
}

class Home extends Component<never, HomeState> {
  protected render(): string {
    return `
      <div data-component="BaseLayout"></div>
    `;
  }
  protected childrenRender(): void {
    const $el = document.querySelector("[data-component=BaseLayout]")!;
    new BaseLayout($el, {
      children: `
      <a data-link href="" class=${styles["main-anchor"]}>
        <div class=${styles["main-image-container"]}>
          <img src="${this.state.articles?.[0].thumbnail}"></img>
        </div>
        <div class=${styles["main-text"]}>
          <h2>${this.state.articles?.[0].title}</h2>
          <p>${this.state.articles?.[0].description}</p>
        </div>
      </a>
      <section class=${styles["article-section"]}>
        ${this.state.articles
          ?.map((article) => `<li>${article.title}</li>`)
          .join("")}
      </section>
      `,
    });
  }
  protected mounted(): void {
    getArticleList().then(({ articles }) => {
      this.setState({ articles });
    });
  }
}

export default Home;
