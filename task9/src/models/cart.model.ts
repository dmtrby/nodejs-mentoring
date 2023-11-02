import { Schema, model } from "mongoose";
import { CartEntity, CartItemEntity } from "../entities/cart.entity";

export const cartItemSchema = new Schema<CartItemEntity>({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  count: { type: Number, required: true },
});

const cartSchema = new Schema<CartEntity>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, requred: true },
  items: { type: [cartItemSchema], required: true },
});

const Cart = model<CartEntity>("Cart", cartSchema);
export const CartItem = model<CartItemEntity>("CartItem", cartItemSchema);

export default Cart;
