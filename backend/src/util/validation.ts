import { getUser } from "../data/user.js";
import { User } from "../definions";

export function isValidEmail(email: string) {
  return email && email.includes('@');
}

export async function isExistingUser(email: string) {
  try {
    const user: User = await getUser(email);
    return true;
  } catch (e) {
    return false;
  }
}

export function isValidText(minLength = 1, password: string) {
  return password && password.trim().length >= minLength;
}

export const isValidPassword = isValidText.bind(null, 6);