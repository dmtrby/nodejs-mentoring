import { createOrder, getOrder } from "../repository/orders.repository";
import { CartEntity } from "../entities/cart.entity";
import { OrderEntity } from "../entities/order.entity";
import { UserEntity } from "../entities/user.entity";
import { deleteCartByUserId } from "../repository/carts.repository";

const postNewOrder = async (
  cart: CartEntity,
  userId: UserEntity["id"],
  delivery: OrderEntity["delivery"],
  payment: OrderEntity["payment"],
  comments: string,
  total: number
): Promise<OrderEntity> => {
  await createOrder(cart, userId, delivery, payment, comments, total);

  await deleteCartByUserId(userId);

  const order = await getOrder(cart, userId);

  return order;
};

export { postNewOrder };
