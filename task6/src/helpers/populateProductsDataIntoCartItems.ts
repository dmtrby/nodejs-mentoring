import { CartEntity, CartItemEntityWithProductsData } from "../entities/cart.entity";
import { getProduct } from "../services/products.service";

const populateProductsDataIntoCartItems = async (
  items: CartEntity["items"]
): Promise<CartItemEntityWithProductsData[]> => {
  let itemsWithProductsData: CartItemEntityWithProductsData[] = [];
  for (const item of items) {
    const productData = await getProduct(item.product.id);
    itemsWithProductsData.push({ product: productData, count: item.count });
  }
  return itemsWithProductsData;
};

export default populateProductsDataIntoCartItems;
