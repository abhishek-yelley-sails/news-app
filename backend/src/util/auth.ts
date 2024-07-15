import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import { compare } from "bcrypt";

import { Request, Response, NextFunction } from "express";
import { Token, TokenRequest } from "../definions";

import { NotAuthError } from "./error.js";

export function checkPassword(password: string, storedPassword: string) {
  return compare(password, storedPassword);
}

export function createJSONToken(userId: string) {
  if (process.env.JWT_KEY)
    return sign({ userId }, process.env.JWT_KEY, { expiresIn: '1h' });
  throw new Error("Missing JWT_KEY!");
}

export function validateJSONToken(token: string): Token {
  if (process.env.JWT_KEY)
    return verify(token, process.env.JWT_KEY) as Token;
  throw new Error("Missing JWT_KEY!");
}

export function checkAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    (req as TokenRequest).token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  next();
}