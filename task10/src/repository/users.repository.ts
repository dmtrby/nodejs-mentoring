import mongoose from "mongoose";
import { UserEntity } from "../entities/user.entity";
import User from "../models/user.model";

const getUserById = async (
  id: UserEntity["id"]
): Promise<UserEntity | null> => {
  const user = await User.findOne({ id: id }, { _id: 0, __v: 0 });
  return user;
};

const getUserByEmail = async (
  email: UserEntity["email"]
): Promise<UserEntity | null> => {
  const user = await User.findOne({ email: email }, { _id: 0, __v: 0 });
  return user;
};

const createNewUser = async (
  email: UserEntity["email"],
  password: UserEntity["password"],
  role: UserEntity["role"]
): Promise<void> => {
  await User.create({
    id: new mongoose.Types.ObjectId(),
    email: email,
    password: password,
    role: role,
  });
};

export { getUserById, getUserByEmail, createNewUser };
