import { http, HttpResponse } from "msw";
import { ARTICLE_LIST } from "./data/article";

export const handlers = [
  http.get("/article", ({ request }) => {
    return HttpResponse.json({ articles: ARTICLE_LIST });
  }),
];
