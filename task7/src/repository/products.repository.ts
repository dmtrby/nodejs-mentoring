import { Product } from "../entities/product.entity";
import { DI } from "../app";

const getproductsArray = async (): Promise<Product[]> => {
  const products = await DI.productRepository.findAll();
  return products;
};

const getProductById = async (id: Product["id"]): Promise<Product | null> => {
  const product = await DI.productRepository.findOne({ id: id });
  return product;
};

export default { getproductsArray, getProductById };
