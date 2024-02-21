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
