import { CartEntityWithProductsData } from "../entities/cart.entity";

export const calculateTotal = (
  items: CartEntityWithProductsData["items"]
): number => {
  let total = 0;
  items.forEach((item) => {
    const itemTotal = item.product.price * item.count;
    total += itemTotal;
  });

  return total;
};
