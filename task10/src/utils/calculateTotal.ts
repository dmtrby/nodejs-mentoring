import { CartEntity } from "../entities/cart.entity";

export const calculateTotal = (items: CartEntity["items"]): number => {
  let total = 0;
  for (const item of items) {
    const itemTotal = item.product.price * item.count;
    total += itemTotal;
  }

  return total;
};
