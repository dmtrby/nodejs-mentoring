import { productsStorage } from "../storages/products.storage";
import { ProductEntity } from "../entities/product.entity";

// Promises were added to simulate real API

const getproductsArray = (): Promise<ProductEntity[]> => {
  const productsArray = Object.values(productsStorage);
  return Promise.resolve(productsArray);
};

const getProductById = (id: ProductEntity["id"]): Promise<ProductEntity> => {
  const product = productsStorage[id];
  return Promise.resolve(product);
};

export { getproductsArray, getProductById };
