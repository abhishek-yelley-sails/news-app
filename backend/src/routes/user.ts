import { Router } from "express";

import { TokenRequest } from "../definions";

import { editUserInfo, editUserPassword, getUserById } from "../data/user.js";

const router = Router();

router.get("/info", async (req, res, next) => {
  try {
    const userId = (req as TokenRequest).token.userId;
    return res.redirect("/user/" + userId + "/info");
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

router.patch("/info/edit", async (req, res, next) => {
  try {
    const userId = (req as TokenRequest).token.userId;
    console.log(userId);
    const user = await editUserInfo(userId, req.body);
    return res.json({
      message: "success",
      user
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/password/edit", async (req, res, next) => {
  try {
    const userId = (req as TokenRequest).token.userId;
    const { currentPassword, newPassword } = req.body;
    const user = await editUserPassword(userId, currentPassword, newPassword);
    return res.json({
      message: "success",
      userId,
    });
  } catch (error) {
    next(error);
  }
});

export default router;