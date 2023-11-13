import { Server } from "http";
import mongoose from "mongoose";
import { logger } from "../loggers/logger";

const gracefulShutdown = (server: Server) => {
  // Graceful shutdown
  let connections: any[] = [];

  server.on("connection", (connection) => {
    // register connections
    connections.push(connection);

    // remove/filter closed connections
    connection.on("close", () => {
      connections = connections.filter(
        (currentConnection) => currentConnection !== connection
      );
    });
  });

  async function shutdown() {
    logger.info({
      message: "Received kill signal, shutting down gracefully",
    });

    server.close(async () => {
      logger.info({
        message: "Closed out remaining connections",
      });
      await mongoose.connection.close();
      process.exit(0);
    });

    setTimeout(() => {
      logger.error({
        message:
          "Could not close connections in time, forcefully shutting down",
      });
      process.exit(1);
    }, 20000);

    // end current connections
    connections.forEach((connection) => connection.end());

    // then destroy connections
    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, 10000);
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

export default gracefulShutdown;
