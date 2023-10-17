import { Request, Response, NextFunction } from "express";
import { buildResponseData } from "../utils/buildResponseData";
import { AUTH_HEADER, ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { getUser } from "../services/users.service";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers[AUTH_HEADER];
  if (!token) {
    res
      .status(STATUS_CODES.forbidden)
      .json(buildResponseData(null, ERROR_MESSAGES.FORBIDDEN));
  }

  const user = await getUser(token as string);

  if (!user) {
    res
      .status(STATUS_CODES.unauth)
      .json(buildResponseData(null, ERROR_MESSAGES.UNAUTHORIZED));
  }

  next();
};

export default authMiddleware;
