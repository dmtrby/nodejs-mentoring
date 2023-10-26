import { getUserById } from "../repository/users.repository";

import { User } from "../entities/user.entity";

const getUser = async (id: User["id"]): Promise<User | null> => {
  const user = await getUserById(id);
  return user;
};

export { getUser };
