import { Request, Response } from "express";
import { AUTH_HEADER, ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { buildResponseData } from "../utils/buildResponseData";
import {
  deleteCart,
  getCart,
  getOrCreateCart,
  updateCart,
} from "../services/cart.service";
import { getProduct } from "../services/products.service";
import { Cart } from "../entities/cart.entity";
import { calculateTotal } from "../utils/calculateTotal";
import populateProductsDataIntoCartItems from "../helpers/populateProductsDataIntoCartItems";
import { getUser } from "../services/users.service";
import { User } from "../entities/user.entity";
import { Product } from "../entities/product.entity";

const getUserCart = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const user = (await getUser(userId as string)) as User;
  const cart = await getOrCreateCart(user);

  const { id, items } = cart;

  const itemsWithProductsData = await populateProductsDataIntoCartItems(items);
  // @ts-ignore
  const total = calculateTotal(itemsWithProductsData);
  const result = {
    cart: { id, items: itemsWithProductsData },
    total: total,
  };

  res.status(STATUS_CODES.success).json(buildResponseData(result, null));
};

const deleteUserCart = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const user = (await getUser(userId as string)) as User;
  const isDeleted = await deleteCart(user);

  if (isDeleted) {
    res
      .status(STATUS_CODES.success)
      .json(buildResponseData({ success: true }, null));
  } else {
    throw new Error();
  }
};

const updateUserCart = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const user = (await getUser(userId as string)) as User;
  const { productId, count } = req.body;

  const productData = (await getProduct(productId)) as Product;

  if (!productData) {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.INVALID_PRODUCT));
  }

  const currentCart = (await getCart(user)) as Cart;
  if (!currentCart) {
    res
      .status(STATUS_CODES.notFound)
      .json(buildResponseData(null, ERROR_MESSAGES.CART_NOT_FOUND));
  }

  await updateCart(currentCart, productData, count);
  const updatedCart = (await getCart(user)) as Cart;

  const { id, items } = updatedCart;
  const itemsWithProductsData = await populateProductsDataIntoCartItems(items);
// @ts-ignore
  const total = calculateTotal(itemsWithProductsData);
  const result = {
    cart: { id, items: itemsWithProductsData },
    total: total,
  };

  res.status(STATUS_CODES.success).json(buildResponseData(result, null));
};

export default { getUserCart, deleteUserCart, updateUserCart };
