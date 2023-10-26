import { CartEntity } from "../entities/cart.entity";
import { OrderEntity } from "../entities/order.entity";
import { UserEntity } from "../entities/user.entity";
import Order from "../models/order.model";
import { v4 } from "uuid";

const getOrder = async (
  cart: CartEntity,
  userId: UserEntity["id"]
): Promise<OrderEntity> => {
  const order = await Order.findOne({ userId, cartId: cart.id }).populate(
    "items.product"
  );
  return order as OrderEntity;
};

const createOrder = async (
  cart: CartEntity,
  userId: UserEntity["id"],
  delivery: OrderEntity["delivery"],
  payment: OrderEntity["payment"],
  comments: string,
  total: number
): Promise<void> => {
  await Order.create({
    id: v4(),
    userId: userId,
    cartId: cart.id,
    items: cart.items, // products from CartEntity
    payment: {
      type: payment.type,
      paddress: payment.address || "",
      creditCard: payment.creditCard || "",
    },
    delivery: {
      type: delivery.type,
      address: delivery.address || "",
    },
    comments: comments,
    status: "created",
    total: total,
  });
};

export { createOrder, getOrder };
