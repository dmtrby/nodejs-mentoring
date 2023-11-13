import { NextFunction, Request, RequestHandler, Response } from "express";

import { logger } from "../loggers/logger";

const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const requestLogger: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime();
  logger.info({
    message: "Request [STARTED]",
    method: req.method,
    path: req.path,
    params: `Params: ${
      Object.keys(req.params).length
        ? JSON.stringify(req.params)
        : "No params passed"
    }`,

    body: `Body: ${
      Object.keys(req.body).length ? JSON.stringify(req.body) : "Empty"
    }`,
  });

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    logger.info({
      message: `Request [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`,
      method: req.method,
      path: req.path,
    });
  });

  next();
};

export default requestLogger;
