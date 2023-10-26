import { UserEntity } from "../entities/user.entity";
import User from "../models/user.model";

const getUserById = async (
  id: UserEntity["id"]
): Promise<UserEntity | null> => {
  const user = await User.findOne({ id: id }, { _id: 0, __v: 0 });
  return user;
};

export { getUserById };
