import { Request, Response, NextFunction } from "express";
import { buildResponseData } from "../utils/buildResponseData";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";

const errorHandleMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(STATUS_CODES.serverError)
    .json(buildResponseData(null, ERROR_MESSAGES.SMTH_WRONG));
};

export default errorHandleMiddleware;
