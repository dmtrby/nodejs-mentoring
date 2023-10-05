import { v4 as uuidv4 } from "uuid";
import { ORDER_STATUS, OrderEntity } from "../entities/order.entity";
import { orderStorage } from "../storages/order.storage";

// Promises were added to simulate real API

const createOrder = (
  newOrder: Omit<OrderEntity, "id" | "status">
): Promise<OrderEntity> => {
  const orderId = uuidv4() as string;
  const newOrderData = {
    id: orderId,
    ...newOrder,
    status: "created" as ORDER_STATUS,
  };
  orderStorage[orderId] = newOrderData;
  return Promise.resolve(newOrderData);
};

export { createOrder };
