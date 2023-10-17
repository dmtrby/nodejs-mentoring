import { User } from "../entities/user.entity";
import { Cart } from "../entities/cart.entity";
import { DI } from "../app";
import { wrap } from "@mikro-orm/core";

const getCartByUserId = async (user: User): Promise<Cart | undefined> => {
  const wrappedUser = wrap(user).toReference();
  const cartsCollection = await DI.cartRepository.findAll({
    populate: ["user", "items"],
  }); // how to load just one cart with user and !isDeleted ?
  const userCart = cartsCollection.find(
    (cart) => cart.user === wrappedUser && !cart.isDeleted
  );

  return userCart;
};

const deleteCartByCart = (cart: Cart): Boolean => {
  wrap(cart).assign({
    isDeleted: true,
  });
  DI.cartItemRepository.flush();
  return true;
};

const createCartForUserById = (user: User): void => {
  const newCart = new Cart(user, false);
  DI.cartRepository.create(newCart);
};

export {
  getCartByUserId,
  createCartForUserById,
  deleteCartByCart,
};
