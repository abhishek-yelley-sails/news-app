import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";

import { Request, Response, NextFunction } from 'express';
import { Errors } from "./definions";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import newsRouter from "./routes/news.js";
import { checkAuthMiddleware } from "./util/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

app.use(checkAuthMiddleware);

app.use("/user", userRouter);

app.use("/news", newsRouter);

app.use((error: Errors, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status as number).json({ error: true, message: message, errors: error });
});

app.listen(process.env.PORT, () => console.log(`Started server! http://localhost:${process.env.PORT}`));