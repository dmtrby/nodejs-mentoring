import ProductModel from "../db/products.db";
import { Product } from "../entities/product.entity";

const getProduct = async (id: Product["id"]): Promise<Product | null> => {
  const product = await ProductModel.getProductById(id);
  return product;
};

const getProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.getproductsArray();
  return products;
};

export { getProduct, getProducts };
