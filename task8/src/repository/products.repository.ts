import { ProductEntity } from "../entities/product.entity";
import Product from "../models/product.model";

const getproductsArray = async (): Promise<ProductEntity[]> => {
  const products = await Product.find({}, { _id: 0, __v: 0 });
  return products;
};

const getProductById = async (
  id: ProductEntity["id"]
): Promise<ProductEntity | null> => {
  const product = await Product.findOne({ id: id });
  return product;
};

export default { getproductsArray, getProductById };
