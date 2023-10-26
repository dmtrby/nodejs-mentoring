import { wrap } from "@mikro-orm/core";
import {
  createCartItem,
  getCartItems,
  updateCartItem,
} from "../repository/cartItems.repository";
import {
  createCartForUserById,
  getCartByUserId,
  deleteCartByCart,
  getCartByUserIdWithProducts,
} from "../repository/carts.repository";
import { Cart } from "../entities/cart.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";

const getCart = async (user: User): Promise<Cart | undefined> => {
  let cart = await getCartByUserId(user);
  return cart;
};

const getCartWithProducts = async (user: User): Promise<Cart | undefined> => {
  let cart = await getCartByUserIdWithProducts(user);
  return cart;
};

const getOrCreateCart = async (user: User): Promise<Cart> => {
  let cart = await getCartByUserId(user);
  if (!cart) {
    createCartForUserById(user);
  }
  cart = (await getCartByUserIdWithProducts(user)) as Cart;

  return cart;
};

const updateCart = async (
  cart: Cart,
  product: Product,
  count: number
): Promise<void> => {
  const items = await getCartItems(cart, product);

  if (!items.length) {
    createCartItem(cart, product, count);
  } else {
    updateCartItem(items[0], count);
  }
  Promise.resolve();
};

const deleteCart = async (user: User): Promise<Boolean> => {
  const wrappedUser = wrap(user).toReference();
  const currentCart = (await getCartByUserId(wrappedUser)) as unknown as Cart;
  const wasDeleted = deleteCartByCart(currentCart);

  return wasDeleted;
};
export {
  getCart,
  updateCart,
  deleteCart,
  getOrCreateCart,
  getCartWithProducts,
};
