import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { buildResponseData } from "../utils/buildResponseData";

const schema = joi.object({
  productId: joi.string().min(1).max(50).required(),
  count: joi.number().min(0).max(10).required(),
});

const updateCartValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, count } = req.body;
  const { error } = schema.validate({ productId, count });

  if (error) {
    res
      .status(STATUS_CODES.badRequest)
      .json(
        buildResponseData(null, ERROR_MESSAGES.INVALID_DATA_FOR_CART_UPDATE)
      );
  } else {
    next();
  }
};

export default updateCartValidationMiddleware;
