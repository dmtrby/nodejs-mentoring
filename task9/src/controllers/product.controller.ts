import { Request, Response } from "express";
import { getProduct, getProducts } from "../services/products.service";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { buildResponseData } from "../utils/buildResponseData";

const getOneProduct = async (req: Request, res: Response) => {
  const id = req.params?.id;
  const product = await getProduct(id);
  if (product) {
    res.status(STATUS_CODES.success).json(buildResponseData(product, null));
  } else {
    res
      .status(STATUS_CODES.notFound)
      .json(buildResponseData(null, ERROR_MESSAGES.MISSING_PRODUCT));
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.status(STATUS_CODES.success).json(buildResponseData(products, null));
};


export default { getOneProduct, getAllProducts };
