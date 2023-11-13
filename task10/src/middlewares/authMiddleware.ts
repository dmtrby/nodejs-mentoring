import { Request, Response, NextFunction } from "express";
import { buildResponseData } from "../utils/buildResponseData";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "../entities/user.entity";
import { TRequestWithUser } from "../schema";
import { logger } from "../loggers/logger";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(STATUS_CODES.forbidden)
      .json(buildResponseData(null, ERROR_MESSAGES.FORBIDDEN));
  }

  const [tokenType, token] = (authHeader as string).split(" ");

  if (tokenType !== "Bearer") {
    res
      .status(STATUS_CODES.forbidden)
      .json(buildResponseData(null, ERROR_MESSAGES.INVALID_TOKEN));
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as UserEntity;

    (req as TRequestWithUser).user = user;
    next();
  } catch (err) {
    logger.error({ message: err });
    res
      .status(STATUS_CODES.unauth)
      .json(buildResponseData(null, ERROR_MESSAGES.UNAUTHORIZED));
  }
};

export default authMiddleware;
