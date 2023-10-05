import { v4 as uuidv4 } from "uuid";

import { cartsStorage } from "../storages/carts.storage";
import { UserEntity } from "../entities/user.entitiy";
import { CartEntity } from "../entities/cart.entity";

// Promises were added to simulate real API

const getCartByUserId = (
  userId: UserEntity["id"]
): Promise<CartEntity | undefined> => {
  const cartsArray = Object.values(cartsStorage);
  const userCart = cartsArray.find(
    (cart) => cart.userId === userId && !cart.isDeleted
  );
  return Promise.resolve(userCart);
};

const updateCartByCartId = (
  cartId: CartEntity["id"],
  newCartObject: CartEntity
): Promise<Boolean> => {
  cartsStorage[cartId] = newCartObject;
  return Promise.resolve(true);
};

const deleteCartByUserId = (userId: UserEntity["id"]): Promise<Boolean> => {
  const cartsArray = Object.values(cartsStorage);
  const userCart = cartsArray.find(
    (cart) => cart.userId === userId && !cart.isDeleted
  ) as CartEntity;
  cartsStorage[userCart.id] = { ...userCart, isDeleted: true };

  return Promise.resolve(true);
};

const createCartForUserById = (
  userId: UserEntity["id"]
): Promise<CartEntity> => {
  const cartId = uuidv4();
  cartsStorage[cartId] = {
    id: cartId,
    userId: userId,
    isDeleted: false,
    items: [],
  };

  const createdCart = cartsStorage[cartId];
  return Promise.resolve(createdCart);
};

export {
  getCartByUserId,
  createCartForUserById,
  updateCartByCartId,
  deleteCartByUserId,
};
