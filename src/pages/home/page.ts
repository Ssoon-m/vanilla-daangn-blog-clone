import Component from "@/lib/dom";
import { BaseLayout } from "../layouts";
import { type Article, getArticleList } from "@/lib/apis/article";
import styles from "./home.module.css";
// import ArticleItem from "./components/ArticleItem/ArticleItem";
import ArticleSection from "./components/ArticleSection/ArticleSection";
import TagNav from "./components/TagNav/TagNav";
import { TAG_MAP } from "@/constans/tag";

interface HomeState {
  articles?: Article[];
}

class Home extends Component<never, HomeState> {
  protected render(): string {
    return `
      <div data-component="BaseLayout"></div>
    `;
  }
  private extractTags() {
    if (this.state.articles) {
      return [...new Set(this.state.articles.map((article) => article.tag))];
    } else {
      return [];
    }
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
      tags: [{ text: "전체", active: true, value: "*" }].concat(
        this.extractTags().map((tag) => ({
          text: TAG_MAP[tag],
          active: false,
          value: tag,
        }))
      ),
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
