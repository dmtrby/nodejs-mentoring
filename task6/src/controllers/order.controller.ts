import { Request, Response } from "express";
import { AUTH_HEADER, ERROR_MESSAGES, STATUS_CODES } from "../constants";
import populateProductsDataIntoCartItems from "../helpers/populateProductsDataIntoCartItems";
import { getCart } from "../services/cart.service";
import { buildResponseData } from "../utils/buildResponseData";
import { CartEntity } from "../entities/cart.entity";
import { calculateTotal } from "../utils/calculateTotal";
import { postNewOrder } from "../services/orders.service";

const createNewOrder = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const { payment, delivery, comments } = req.body;
  const currentCart = (await getCart(userId)) as CartEntity;
  if (currentCart?.items.length === 0) {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.EMPTY_CART));
  }
  const itemsWithProductsData = await populateProductsDataIntoCartItems(
    currentCart.items
  );

  const total = calculateTotal(itemsWithProductsData);
  const orderData = {
    cartId: currentCart.id,
    userId: currentCart.userId,
    payment,
    delivery,
    comments,
    items: itemsWithProductsData,
    total,
  };

  const newCreatedOrder = await postNewOrder(orderData);
  res
    .status(STATUS_CODES.success)
    .json(buildResponseData({ ["order"]: newCreatedOrder }, null));
};
export default { createNewOrder };
