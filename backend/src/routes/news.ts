import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/top", async (req, res, next) => {
  res.redirect("/news/top/us");
});

router.get("/top/:country", async (req, res, next) => {
  const country = req.params.country;
  const response = await axios({
    method: 'get',
    url: `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}`
  });
  res.json(response.data);
});

router.get("/search", async (req, res, next) => {
  const search = req.query.q;
  if (!search) {
    return res.json({
      articles: []
    });
  }
  const response = await axios({
    method: 'get',
    url: `https://newsapi.org/v2/everything?q=${search}&language=en&from=2024-07-12&sortBy=publishedAt&apiKey=${process.env.API_KEY}`
  });
  res.json(response.data);
});
export default router;