import { fetchClient } from "@/http/client";

export interface Article {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  tags: string[];
}

export const getArticleList = () => {
  return fetchClient.get<Article[]>("/article").then((res) => res.data);
};
