import Component from "@/lib/dom";
import { BaseLayout } from "../layouts";
import { ArticleDetail, getArticle } from "@/lib/apis/article";
import { CATEGORY_MAP } from "@/constans/category";
import styles from "./archive.module.css";

interface ArchivePageProps {
  params: string;
}

interface ArchivePageState {
  article?: ArticleDetail;
}

class ArchivePage extends Component<ArchivePageProps, ArchivePageState> {
  protected render(): string {
    return `<div data-component="BaseLayout"></div>`;
  }

  protected childrenRender(): void {
    const $BaseLayout = document.querySelector("[data-component=BaseLayout]")!;
    new BaseLayout($BaseLayout, {
      children: `
        <div class=${styles["article-header"]}>
          <h2 class=${styles["article-title"]}>${this.state.article?.title}</h2>
          <div class=${styles["article-meta"]}>${
        this.state.article ? CATEGORY_MAP[this.state.article.category] : ""
      } | ${this.state.article?.date}</div>
        </div>
        <div class=${styles["article-thumbnail-container"]}>
          <img src="${this.state.article?.thumbnail}"/>
        </div>
        <section class=${styles["article-contens-container"]}>
          <div class="prose">
            ${this.state.article?.contents}
          </div>
          <div class=${styles["author-container"]}>
            <img src="${this.state.article?.author.thumbnail}"/>
            <div class=${styles["author-text-wrapper"]}>
              <h3>${this.state.article?.author.name}</h3>
              <p>${this.state.article?.author.description}</p>
            </div>
          </div>
          <div class=${styles["tag-section"]}>
            ${this.state.article?.tags
              .map((tag) => `<div>#${tag}</div>`)
              .join("")}
          </div>
        </section>
        <div class=${styles["button-container"]}>
         <a href="/" data-link>블로그 홈</a>
        </div>
      `,
    });
  }
  protected mounted(): void {
    getArticle(Number(this.props.params)).then(({ article }) => {
      this.setState({ article });
    });
  }
}

export default ArchivePage;
