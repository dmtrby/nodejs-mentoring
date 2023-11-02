
import { Request, Response } from "express";
import { AUTH_HEADER, ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { buildResponseData } from "../utils/buildResponseData";
import {
  deleteCart,
  getCartWithProducts,
  getOrCreateCart,
  updateCart,
} from "../services/cart.service";
import { getProduct } from "../services/products.service";
import { CartEntity } from "../entities/cart.entity";
import { calculateTotal } from "../utils/calculateTotal";
import { ProductEntity } from "../entities/product.entity";

const getUserCart = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const cart = await getOrCreateCart(userId);
  const { id, items } = cart;

  const total = calculateTotal(items);
  const itemsToRender = items.map((item) => ({
    product: item.product,
    count: item.count,
  }));

  const result = {
    cart: { id, items: itemsToRender },
    total: total,
  };

  res.status(STATUS_CODES.success).json(buildResponseData(result, null));
};

const deleteUserCart = async (req: Request, res: Response) => {
  const userId = req.headers[AUTH_HEADER] as string;
  const isDeleted = await deleteCart(userId);

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
  const { productId, count } = req.body;

  const productData = (await getProduct(productId)) as ProductEntity;

  if (!productData) {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.INVALID_PRODUCT));
  }

  const currentCart = (await getCartWithProducts(userId)) as CartEntity;
  if (!currentCart) {
    res
      .status(STATUS_CODES.notFound)
      .json(buildResponseData(null, ERROR_MESSAGES.CART_NOT_FOUND));
  }

  await updateCart(currentCart, productData, Number(count));
  const updatedCart = (await getCartWithProducts(userId)) as CartEntity;

  const { id, items } = updatedCart;

  const total = calculateTotal(items);
  const result = {
    cart: { id, items },
    total: total,
  };

  res.status(STATUS_CODES.success).json(buildResponseData(result, null));
};

export default {
  getUserCart,
  deleteUserCart,
  updateUserCart
};
