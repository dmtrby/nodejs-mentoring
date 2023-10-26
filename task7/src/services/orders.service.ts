import { createOrder, createOrderItem } from "../repository/orders.repository";
import { Cart } from "../entities/cart.entity";
import { Delivery } from "../entities/delivery.entity";
import { Order } from "../entities/order.entity";
import { Payment } from "../entities/payment.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";

const postNewOrder = async (
  cart: Cart,
  user: User,
  delivery: Delivery,
  payment: Payment,
  comments: string,
  total: number
): Promise<Order> => {
  const createdOrder = createOrder(
    cart,
    user,
    delivery,
    payment,
    comments,
    total
  );

  for (const item of cart.items) {
    createOrderItem(
      createdOrder,
      item.product as unknown as Product,
      item.count,
      (item.product as unknown as Product).price
    );
  }
  return Promise.resolve(createdOrder);
};

export { postNewOrder };
