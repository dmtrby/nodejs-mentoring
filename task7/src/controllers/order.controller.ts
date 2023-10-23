import { Request, Response } from "express";
import { AUTH_HEADER, ERROR_MESSAGES, STATUS_CODES } from "../constants";
import populateProductsDataIntoCartItems from "../helpers/populateProductsDataIntoCartItems";
import { getCart } from "../services/cart.service";
import { buildResponseData } from "../utils/buildResponseData";
import { Cart } from "../entities/cart.entity";
import { calculateTotal } from "../utils/calculateTotal";
import { postNewOrder } from "../services/orders.service";
import { Payment } from "../entities/payment.entity";
import { Delivery } from "../entities/delivery.entity";
import { User } from "../entities/user.entity";
import { getUser } from "../services/users.service";

type TBody = {
  payment: Payment;
  delivery: Delivery;
  comments: string;
};

const createNewOrder = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const user = (await getUser(userId as string)) as User;
  const { payment, delivery, comments } = req.body as TBody;
  const cart = (await getCart(user)) as Cart;
  if (cart?.items.length === 0) {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.EMPTY_CART));
  }
  const itemsWithProductsData = await populateProductsDataIntoCartItems(
    cart.items
  );

  // @ts-ignore
  const total = calculateTotal(itemsWithProductsData);

  const createdOrder = await postNewOrder(
    cart,
    user,
    delivery,
    payment,
    comments,
    total
  );
  const { user: orderUser, cart: orderCart, ...order } = createdOrder;
  res
    .status(STATUS_CODES.success)
    .json(
      buildResponseData(
        {
          order: {
            ...order,
            items: itemsWithProductsData,
            userId: orderUser.id,
            cartId: orderCart.id,
          },
        },
        null
      )
    );
};
export default { createNewOrder };
