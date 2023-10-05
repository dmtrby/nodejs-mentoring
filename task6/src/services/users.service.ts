import { getUserById } from "../db/users.db";

import { UserEntity } from "../entities/user.entitiy";

const getUser = async (id: UserEntity["id"]): Promise<UserEntity> => {
  const user = await getUserById(id);
  return user;
};

export { getUser };
