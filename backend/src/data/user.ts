import { hash } from "bcrypt";
import { v4 } from "uuid";

import { User, SignupInfo } from "../definions";
import { NotFoundError } from "../util/error.js";
import { readData, writeData } from "./util.js";

export async function getUser(email: string) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user: User = storedData.users.find((item: User) => item.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  return user;
}

export async function addUser(data: SignupInfo): Promise<User> {
  const storedData = await readData();
  const userId = v4();
  const hashedPw = await hash(data.password, 12);
  if (!storedData.users) {
    storedData.users = [];
  }
  const { repeatPassword, ...userData } = data;
  const user: User = { ...userData, password: hashedPw, userId };
  storedData.users.push(user);
  await writeData(storedData);
  return user;
}

export async function getUserById(userId: string) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user: User = storedData.users.find((item: User) => item.userId === userId);
  if (!user) {
    throw new NotFoundError('Could not find user for id ' + userId);
  }
  const { password, ...userData } = user;
  return userData;
}