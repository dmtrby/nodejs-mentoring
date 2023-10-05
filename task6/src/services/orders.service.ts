import { createOrder } from "../db/orders.db";
import { OrderEntity } from "../entities/order.entity";

const postNewOrder = async (
  newOrderData: Omit<OrderEntity, "id" | "status">
): Promise<OrderEntity> => {
  const newOrder = await createOrder(newOrderData);
  return newOrder;
};

export { postNewOrder };
