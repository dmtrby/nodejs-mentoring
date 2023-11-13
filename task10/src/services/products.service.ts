import ProductModel from "../repository/products.repository";
import { ProductEntity } from "../entities/product.entity";

const getProduct = async (id: ProductEntity["id"]): Promise<ProductEntity | null> => {
  const product = await ProductModel.getProductById(id);
  return product;
};

const getProducts = async (): Promise<ProductEntity[]> => {
  const products = await ProductModel.getproductsArray();
  return products;
};

export { getProduct, getProducts };
