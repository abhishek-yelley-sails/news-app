import { hash } from "bcrypt";
import { v4 } from "uuid";

import { User, SignupInfo, EditableUserInfo } from "../definions";
import { NotFoundError, InvalidEditRequest } from "../util/error.js";
import { readData, writeData } from "./util.js";
import { checkPassword } from "../util/auth.js";
import { cleanSpaces, isValidCountry, isValidEmail, isValidName, isValidPassword } from "../util/validation.js";

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

export async function updateUser(data: User): Promise<User> {
  const storedData = await readData();
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users = storedData.users.filter((user: User) => user.userId !== data.userId);
  storedData.users.push(data);
  await writeData(storedData);
  return data;
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

async function getUserByIdUnfiltered(userId: string) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user: User = storedData.users.find((item: User) => item.userId === userId);
  if (!user) {
    throw new NotFoundError('Could not find user for id ' + userId);
  }
  return user;
}

export async function editUserInfo(userId: User["userId"], info: EditableUserInfo) {
  const user = await getUserByIdUnfiltered(userId);
  if (info.name) {
    if (!isValidName(info.name)) {
      throw new InvalidEditRequest("Invalid Name!");
    }
    user.name = info.name;
  }
  if (info.email) {
    if (!isValidEmail(info.email)) {
      throw new InvalidEditRequest("Invalid Email!");
    }
    user.email = info.email;
  }
  if (info.country) {
    if (!isValidCountry(info.country)) {
      throw new InvalidEditRequest("Invalid Country!");
    }
    user.country = info.country;
  }
  await updateUser(user);
  return await getUserById(userId);
}

export async function editUserPassword(userId: User["userId"], currentPassword: string, newPassword: string) {
  const user = await getUserByIdUnfiltered(userId);
  currentPassword = currentPassword.trim();
  newPassword = newPassword.trim();
  const isCurrentPasswordValid = await checkPassword(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new InvalidEditRequest("Current password in incorrect");
  }
  if (!isValidPassword(newPassword)) {
    throw new InvalidEditRequest("Invalid password!");
  }
  user.password = await hash(newPassword, 12);
  await updateUser(user);
}