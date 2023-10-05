import { productsStorage } from "../storages/products.storage";
import { UserEntity } from "../entities/user.entitiy";

// Promises were added to simulate real API

const getUserById = (id: UserEntity["id"]): Promise<UserEntity> => {
  const product = productsStorage[id];
  return Promise.resolve(product);
};

export { getUserById };
