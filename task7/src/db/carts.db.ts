import { User } from "../entities/user.entity";
import { Cart } from "../entities/cart.entity";
import { DI } from "../app";
import { wrap } from "@mikro-orm/core";

const getCartByUserId = async (user: User): Promise<Cart | undefined> => {
  const wrappedUser = wrap(user).toReference();
  const userCart = await DI.cartRepository.find(
    { user: wrappedUser, isDeleted: false },
    { populate: ["user", "items"] }
  );

  return userCart[0] as Cart;
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

export { getCartByUserId, createCartForUserById, deleteCartByCart };
