import { http, HttpResponse } from "msw";
import { ARTICLE_DETAIL, ARTICLE_LIST } from "./data/article";

export const handlers = [
  http.get("/article", ({ request }) => {
    return HttpResponse.json({ articles: ARTICLE_LIST });
  }),
  http.get("/article/detail/:id", ({ params }) => {
    return HttpResponse.json({
      article: ARTICLE_DETAIL.filter(
        (article) => article.id === Number(params.id)
      )[0],
    });
  }),
];
