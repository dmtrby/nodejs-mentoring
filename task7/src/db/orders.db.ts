import { wrap } from "@mikro-orm/core";
import { DI } from "../app";
import { Cart } from "../entities/cart.entity";
import { Delivery } from "../entities/delivery.entity";
import { Order } from "../entities/order.entity";
import { Payment } from "../entities/payment.entity";
import { User } from "../entities/user.entity";
import { Product } from "../entities/product.entity";
import { OrderItem } from "../entities/orderItem.entity";

// Promises were added to simulate real API

const createOrder = (
  cart: Cart,
  user: User,
  delivery: Delivery,
  payment: Payment,
  comments: string,
  total: number
): Order => {
  const createdDelivery = new Delivery(delivery.type, delivery.address);
  const createdPayment = new Payment(
    payment.type,
    payment.address,
    payment.creditCard
  );
  DI.deliveryRepository.create(createdDelivery);
  DI.paymentRepository.create(createdPayment);
  const createdOrder = new Order(
    user,
    cart,
    createdPayment,
    createdDelivery,
    comments,
    total
  );

  const newCreatedOrder = DI.orderRepository.create(createdOrder);
  return newCreatedOrder;
};

const createOrderItem = (
  order: Order,
  product: Product,
  count: number,
  offeredPrice: number
): void => {
  const newOrderItem = new OrderItem(order, product, offeredPrice, count);
  DI.orderItemRepository.create(newOrderItem);
  DI.orderItemRepository.flush();
  DI.orderRepository.flush();
};

export { createOrder, createOrderItem };
