import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/top", async (req, res, next) => {
  const response = await axios({
    method: 'get',
    url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`
  });
  res.json(response.data);
});
export default router;