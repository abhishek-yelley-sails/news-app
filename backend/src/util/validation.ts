import { getUser } from "../data/user.js";
import { SignupInfo, User } from "../definions";

export function isValidEmail(email: string) {
  return !!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
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

export function isPasswordMatching(password: string, repeatPassword: string) {
  return password === repeatPassword;
}

export function isValidName(name: string) {
  const regex = /^[a-zA-Z ]*$/;
  return regex.test(name);
}

export function cleanSpaces(rawData: SignupInfo & { [key: string]: string }) {
  Object.keys(rawData).forEach((key) => {
    rawData[key] = rawData[key].trim();
  });
  if (rawData.name) {
    rawData.name = rawData.name.split(' ').filter((item: string) => item !== '').join(' ');
  }
}

export function isValidCountry(country: string) {
  return country.length === 2;
}

export const isValidPassword = isValidText.bind(null, 6);