import { Schema, model } from "mongoose";
import { ProductEntity } from "../entities/product.entity";

export const productSchema = new Schema<ProductEntity>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = model<ProductEntity>("Product", productSchema);

export default Product;
