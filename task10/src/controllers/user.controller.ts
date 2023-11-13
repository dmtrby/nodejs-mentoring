import { Request, Response } from "express";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants";
import { buildResponseData } from "../utils/buildResponseData";
import { createUser, getUserUsingEmail } from "../services/users.service";
import { UserEntity } from "../entities/user.entity";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  const { email, password, role = "user" } = req.body;
  if (!email || !password || !role) {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.ALL_LOGIN_INPUT_REQUIRED));
  }

  const isUserCreated = await createUser(
    email,
    password,
    role as UserEntity["role"]
  );

  if (isUserCreated) {
    res
      .status(STATUS_CODES.success)
      .json(buildResponseData({ success: true }, null));
  } else {
    res
      .status(STATUS_CODES.serverError)
      .json(buildResponseData(null, ERROR_MESSAGES.SMTH_WRONG));
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.ALL_LOGIN_INPUT_REQUIRED));
  }

  const user = await getUserUsingEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user.id, email, role: user.role },
      process.env.TOKEN_KEY!,
      {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      }
    );

    return res.status(200).json({
      token,
    });
  } else {
    res
      .status(STATUS_CODES.badRequest)
      .json(buildResponseData(null, ERROR_MESSAGES.INVALID_CREDS));
  }
};

export default { registerUser, loginUser };
