import Component from "@/lib/dom";
import { BaseLayout } from "../layouts";
import { type Article, getArticleList } from "@/lib/apis/article";
import styles from "./home.module.css";
// import ArticleItem from "./components/ArticleItem/ArticleItem";
import ArticleSection from "./components/ArticleSection/ArticleSection";
import TagNav from "./components/TagNav/TagNav";

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
    const $BaseLayout = document.querySelector("[data-component=BaseLayout]")!;
    new BaseLayout($BaseLayout, {
      children: `
      <a data-link href="" class=${styles["main-anchor"]}>
        <div class=${styles["main-image-container"]}>
          <img src="${this.state.articles?.[0].thumbnail}"/>
        </div>
        <div class=${styles["main-text"]}>
          <h2>${this.state.articles?.[0].title}</h2>
          <p>${this.state.articles?.[0].description}</p>
        </div>
      </a>
      <div class=${styles["tag-nav-container"]} data-component="TagNav"></div>
      <section class=${styles["article-section"]} data-component="ArticleSection"></section>
      `,
    });
    const $TagNav = document.querySelector("[data-component=TagNav]")!;
    new TagNav($TagNav, {
      tags: [
        { text: "전체", active: true },
        { text: "문화", active: false },
        { text: "서비스", active: false },
        { text: "커리어", active: false },
      ],
    });

    const $ArticleSection = document.querySelector(
      "[data-component=ArticleSection]"
    )!;
    new ArticleSection($ArticleSection, { articles: this.state.articles });
  }
  protected mounted(): void {
    getArticleList().then(({ articles }) => {
      this.setState({ articles });
    });
  }
}

export default Home;
