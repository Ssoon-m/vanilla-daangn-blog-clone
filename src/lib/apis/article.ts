import { fetchClient } from "@/http/client";

export type category = "culture" | "service" | "career";

export interface Article {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  category: category;
}

export const getArticleList = () => {
  return fetchClient
    .get<{ articles: Article[] }>("/article")
    .then((res) => res.data);
};

export interface ArticleDetail {
  id: number;
  thumbnail: string;
  title: string;
  date: string;
  category: category;
  contents: string;
  author: {
    thumbnail: string;
    name: string;
    description: string;
  };
  tags: string[];
}

export const getArticle = (id: number) => {
  return fetchClient
    .get<{ article: ArticleDetail }>(`/article/detail/${id}`)
    .then((res) => res.data);
};
