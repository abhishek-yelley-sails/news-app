import { Request } from "express";

export interface SignupInfo {
  email: string,
  password: string
}

export interface Errors {
  [key: string]: string;
}

export interface User {
  email: string,
  password: string,
  userId: string,
}

export interface Token {
  userId: string,
}

export interface TokenRequest extends Request {
  token: Token,
}