import { User } from "../entities/user.entity";
import { DI } from "../app";

const getUserById = async (id: User["id"]): Promise<User | null> => {
  const user = await DI.userRepository.findOne({ id: id });
  return user;
};

export { getUserById };
