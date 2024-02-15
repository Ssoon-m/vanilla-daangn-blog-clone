import Component from "@/lib/dom";
import { BaseLayout } from "../layouts";
import { type Article, getArticleList } from "@/lib/apis/article";
import styles from "./home.module.css";
import ArticleSection from "./components/ArticleSection/ArticleSection";
import CategoryNav from "./components/CategoryNav/CategoryNav";
import { CATEGORY_MAP } from "@/constans/category";
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
          : `
          <a data-link href="/archive/${this.state.articles?.[0].id}" class=${styles["main-anchor"]}>
            <div class=${styles["main-image-container"]}>
              <img src="${this.state.articles?.[0].thumbnail}"/>
            </div>
            <div class=${styles["main-text"]}>
              <h2>${this.state.articles?.[0].title}</h2>
              <p>${this.state.articles?.[0].description}</p>
            </div>        
          </a>
          <div class=${styles["category-nav-container"]} data-component="CategoryNav"></div>
          <section class=${styles["article-section"]} data-component="ArticleSection"></section>
        `
      }`,
    });
    if (!this.state.isLoading) {
      const $CategoryNav = document.querySelector(
        "[data-component=CategoryNav]"
      )!;
      new CategoryNav($CategoryNav, {
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
      const _articles = this.getArticleListByTag(articles);
      const tags = this.getTagsByArticle(articles);
      this.setState({ articles: _articles, tags, isLoading: false });
    });
  }
  private getArticleListByTag(articles: Article[]) {
    const search = Router.searchParams();
    const category = search.get("category");
    if (category) {
      return articles.filter((article) => article.category === category);
    } else {
      return articles;
    }
  }
  private getTagsByArticle(articles: Article[]) {
    const categories = [
      "*",
      ...new Set(articles.map((article) => article.category)),
    ] as const;
    const search = Router.searchParams();
    const _category = search.get("category");

    return categories.map((category) => ({
      text: category === "*" ? "전체" : CATEGORY_MAP[category],
      active: !_category && category === "*" ? true : category === _category,
      value: category,
    }));
  }
}

export default Home;
