import { getUserById } from "../repository/users.repository";

import { UserEntity } from "../entities/user.entity";

const getUser = async (id: UserEntity["id"]): Promise<UserEntity | null> => {
  const user = await getUserById(id);
  return user;
};

export { getUser };
