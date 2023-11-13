import { Request, Response, NextFunction } from "express";
import { buildResponseData } from "../utils/buildResponseData";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { TRequestWithUser } from "../schema";

const accessCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as TRequestWithUser;

  if (user.role !== "admin") {
    res
      .status(STATUS_CODES.forbidden)
      .json(buildResponseData(null, ERROR_MESSAGES.USER_HAS_NO_ACCESS));
  }

  next();
};

export default accessCheckMiddleware;
