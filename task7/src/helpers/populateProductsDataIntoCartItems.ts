// @ts-nocheck
import { Cart } from "../entities/cart.entity";
import { CartItem } from "../entities/cartItem.entity";
import { getProduct } from "../services/products.service";

const populateProductsDataIntoCartItems = async (
  items: Cart["items"]
): Promise<CartItem[]> => {
  let itemsWithProductsData: CartItem[] = [];
  for (const item of items) {
    const productData = await getProduct(item.product.id);
    itemsWithProductsData.push({ product: productData, count: item.count });
  }
  return itemsWithProductsData;
};

export default populateProductsDataIntoCartItems;
