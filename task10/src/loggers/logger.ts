import { createLogger, transports, format } from "winston";

const DEFAULT_LEVEL = "info";

export const logger = createLogger({
  level: process.env.LOG_LEVEL || DEFAULT_LEVEL,
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    format.printf((info) => {
      const { level, timestamp, message, method, path } = info;
      const requestDetails = method ? `: ${method}, ${path}` : "";

      return `${level}: ${[timestamp]}: ${message}${requestDetails}`;
    })
  ),
});
