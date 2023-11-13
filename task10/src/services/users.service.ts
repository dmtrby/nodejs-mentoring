import {
  createNewUser,
  getUserByEmail,
  getUserById,
} from "../repository/users.repository";
import bcrypt from "bcrypt";

import { UserEntity } from "../entities/user.entity";

const getUser = async (id: UserEntity["id"]): Promise<UserEntity | null> => {
  const user = await getUserById(id);
  return user;
};

const getUserUsingEmail = async (
  email: UserEntity["email"]
): Promise<UserEntity | null> => {
  const user = await getUserByEmail(email);
  return user;
};

const createUser = async (
  email: UserEntity["email"],
  password: UserEntity["password"],
  role: UserEntity["role"]
): Promise<boolean> => {
  const existingUserWithEmail = await getUserByEmail(email);

  if (existingUserWithEmail) {
    return false;
  } else {
    const hashToStore = await bcrypt.hash(password, 10);
    await createNewUser(email, hashToStore, role);
    return true;
  }
};

export { getUser, createUser, getUserUsingEmail };
