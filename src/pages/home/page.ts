import Component from "@/lib/dom";
import { BaseLayout } from "../layouts";
import { type Article, getArticleList, category } from "@/lib/apis/article";
import styles from "./home.module.css";
// import ArticleItem from "./components/ArticleItem/ArticleItem";
import ArticleSection from "./components/ArticleSection/ArticleSection";
import TagNav from "./components/TagNav/TagNav";
import { TAG_MAP } from "@/constans/tag";
import Router from "@/lib/router";

interface HomeState {
  articles?: Article[];
  tags: { text: string; active: boolean; value: string }[];
  isLoading: boolean;
}

class Home extends Component<never, HomeState> {
  protected render(): string {
    return `<div data-component="BaseLayout"></div>`;
  }

  protected childrenRender(): void {
    const $BaseLayout = document.querySelector("[data-component=BaseLayout]")!;
    new BaseLayout($BaseLayout, {
      children: `${
        this.state.isLoading
          ? "<div>loading...</div>"
          : `<a data-link href="" class=${styles["main-anchor"]}>
      <div class=${styles["main-image-container"]}>
        <img src="${this.state.articles?.[0].thumbnail}"/>
      </div>
      <div class=${styles["main-text"]}>
        <h2>${this.state.articles?.[0].title}</h2>
        <p>${this.state.articles?.[0].description}</p>
      </div>
    </a>
    <div class=${styles["tag-nav-container"]} data-component="TagNav"></div>
    <section class=${styles["article-section"]} data-component="ArticleSection"></section>`
      }
      `,
    });
    if (!this.state.isLoading) {
      const $TagNav = document.querySelector("[data-component=TagNav]")!;
      new TagNav($TagNav, {
        tags: this.state.tags,
      });

      const $ArticleSection = document.querySelector(
        "[data-component=ArticleSection]"
      )!;
      new ArticleSection($ArticleSection, { articles: this.state.articles });
    }
  }
  protected mounted(): void {
    this.setState({ isLoading: true });
    getArticleList().then(({ articles }) => {
      console.log("isLadfdaf");
      const _articles = this.getArticleListByTag(articles);
      const tags = this.getTagsByArticle(articles);
      this.setState({ articles: _articles, tags, isLoading: false });
    });
  }
  private getArticleListByTag(articles: Article[]) {
    const search = Router.searchParams();
    const tag = search.get("tags");
    if (tag) {
      return articles.filter((article) => article.tag === tag);
    } else {
      return articles;
    }
  }
  private getTagsByArticle(articles: Article[]) {
    const tags = [
      "*",
      ...new Set(articles.map((article) => article.tag)),
    ] as const;
    const search = Router.searchParams();
    const _tag = search.get("tags");

    return tags.map((tag) => ({
      text: tag === "*" ? "전체" : TAG_MAP[tag],
      active: !_tag && tag === "*" ? true : tag === _tag,
      value: tag,
    }));
  }
}

export default Home;
