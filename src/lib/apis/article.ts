import { fetchClient } from "@/http/client";

export interface Article {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  tag: string;
}

export const getArticleList = () => {
  return fetchClient
    .get<{ articles: Article[] }>("/article")
    .then((res) => res.data);
};
