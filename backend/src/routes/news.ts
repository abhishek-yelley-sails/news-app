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
export default router;