import { Article } from "@/lib/apis/article";
import Component from "@/lib/dom";
import styles from "./ArticleSection.module.css";
import { CATEGORY_MAP } from "@/constans/category";

interface ArticleSectionProps {
  articles?: Article[];
}

class ArticleSection extends Component<ArticleSectionProps> {
  protected render(): string {
    return `${this.props.articles
      ?.map(
        (article) =>
          `<div class=${styles["article-container"]}>
            <a href="" data-link>
              <div class=${styles["article-image"]}>
                <img src="${article.thumbnail}" alt=${article.title}/>
              </div>
              <h3>
                ${article.title}
              </h3>
              <p>
                ${article.description}
              </p>
            </a>
            <a class=${styles["article-category"]}>
              ${CATEGORY_MAP[article.category]}
            </a>
          </div>`
      )
      .join("")}`;
  }
}

export default ArticleSection;
