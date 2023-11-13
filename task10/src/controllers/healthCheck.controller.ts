import { Request, Response } from "express";

import { LOG_MESSAGES, STATUS_CODES } from "../constants";
import { buildResponseData } from "../utils/buildResponseData";
import mongoose from "mongoose";

const healthCheckController = async (req: Request, res: Response) => {
  const dbConnectionStatus = mongoose.connection.readyState;

  if (dbConnectionStatus !== 1) {
    res.status(STATUS_CODES.serverError).json(
      buildResponseData(
        {
          message: LOG_MESSAGES.DB_CONNECTION_ERROR,
        },
        null
      )
    );
  }
  res.status(STATUS_CODES.success).json(
    buildResponseData(
      {
        message: LOG_MESSAGES.HEALTHY_APP,
      },
      null
    )
  );
};

export default healthCheckController;
