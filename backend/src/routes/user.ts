import { Router } from "express";

import { TokenRequest } from "../definions";

import { getUserById } from "../data/user.js";

const router = Router();

router.get("/info", async (req, res, next) => {
  try {
    const userId = (req as TokenRequest).token.userId;
    return res.redirect("./" + userId + "/info");
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/info", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;