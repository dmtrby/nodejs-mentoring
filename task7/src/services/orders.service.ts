import { createOrder, createOrderItem } from "../db/orders.db";
import { Cart } from "../entities/cart.entity";
import { Delivery } from "../entities/delivery.entity";
import { Order } from "../entities/order.entity";
import { Payment } from "../entities/payment.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { getProduct } from "./products.service";

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
    const productData = (await getProduct(item.product.id)) as Product;
    createOrderItem(
      createdOrder,
      productData,
      item.count,
      productData.price
    );
  }
  return Promise.resolve(createdOrder);
};

export { postNewOrder };
