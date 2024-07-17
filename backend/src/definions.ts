import { Request } from "express";

export interface SignupInfo {
  name: string,
  email: string,
  password: string,
  repeatPassword: string,
}

export interface Errors {
  [key: string]: string;
}

export interface User {
  name: string,
  email: string,
  country?: string,
  password: string,
  userId: string,
}

export interface Token {
  userId: string,
}

export interface TokenRequest extends Request {
  token: Token,
}

export interface EditableUserInfo {
  name?: string,
  email?: string,
  country?: string,
}