import { Schema, model } from "mongoose";
import { OrderEntity } from "../entities/order.entity";
import { cartItemSchema } from "./cart.model";

const orderSchema = new Schema<OrderEntity>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [cartItemSchema], required: true }, // products from CartEntity
  payment: {
    type: { type: String, required: true },
    address: { type: String, required: false },
    creditCard: { type: String, required: false },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: false },
  },
  comments: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

const Order = model<OrderEntity>("Order", orderSchema);

export default Order;
