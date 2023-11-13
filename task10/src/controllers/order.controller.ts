import { Request, Response } from "express";
import { AUTH_HEADER, ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { getCartWithProducts } from "../services/cart.service";
import { buildResponseData } from "../utils/buildResponseData";

import { calculateTotal } from "../utils/calculateTotal";
import { postNewOrder } from "../services/orders.service";

import { OrderEntity } from "../entities/order.entity";
import { CartEntity } from "../entities/cart.entity";

type TBody = {
  payment: OrderEntity["payment"];
  delivery: OrderEntity["delivery"];
  comments: string;
};

const createNewOrder = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const { payment, delivery, comments } = req.body as TBody;
  const cart = (await getCartWithProducts(userId)) as CartEntity;

  if (cart?.items.length === 0) {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.EMPTY_CART));
  }

  const total = calculateTotal(cart.items);

  const createdOrder = await postNewOrder(
    cart,
    userId,
    delivery,
    payment,
    comments,
    total
  );

  res.status(STATUS_CODES.success).json(
    buildResponseData(
      {
        order: {
          createdOrder,
        },
      },
      null
    )
  );
};
export default { createNewOrder };
