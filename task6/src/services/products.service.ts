import { getProductById, getproductsArray } from "../db/products.db";
import { ProductEntity } from "../entities/product.entity";

const getProduct = async (id: ProductEntity["id"]): Promise<ProductEntity> => {
  const product = await getProductById(id);
  return product;
};

const getProducts = async (): Promise<ProductEntity[]> => {
  const products = await getproductsArray();
  return products;
};

export { getProduct, getProducts };
