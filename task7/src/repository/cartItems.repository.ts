import { Cart } from "../entities/cart.entity";
import { DI } from "../app";
import { wrap } from "@mikro-orm/core";
import { CartItem } from "../entities/cartItem.entity";
import { Product } from "../entities/product.entity";

const getCartItems = async (
  cart: Cart,
  product: Product
): Promise<CartItem[]> => {
  const wrappedCart = wrap(cart).toReference();
  const wrappedProduct = wrap(product).toReference();
  const cartsCollection = await DI.cartItemRepository.find(
    { cart: wrappedCart, product: wrappedProduct },
    {
      populate: ["product"],
    }
  );

  return cartsCollection;
};

const createCartItem = (cart: Cart, product: Product, count: number): void => {
  const newCartItem = new CartItem(count, cart, product);
  DI.cartItemRepository.create(newCartItem);
};

const updateCartItem = (cartItem: CartItem, count: number): void => {
  if (count !== 0) {
    wrap(cartItem).assign({
      cart: cartItem.cart,
      product: cartItem.product,
      count: count,
    });
  } else {
    DI.cartItemRepository.nativeDelete(cartItem);
  }
};

export { getCartItems, createCartItem, updateCartItem };
