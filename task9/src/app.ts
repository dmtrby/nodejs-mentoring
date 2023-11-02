import { connect } from "mongoose";
import { config } from "dotenv";

import express from "express";
import { SERVER_PORT } from "./constants";
import ProductController from "./controllers/product.controller";
import CartController from "./controllers/cart.controller";
import OrderController from "./controllers/order.controller";
import UserController from "./controllers/user.controller";
import errorHandler from "./middlewares/errorHandleMiddleware";
import authMiddleware from "./middlewares/authMiddleware";
import updateCartValidationMiddleware from "./middlewares/updateCartValidationMiddleware";
import accessCheckMiddleware from "./middlewares/accessCheckMiddleware";

export const init = (async () => {
  config();
  await connect(process.env.MONGO_DB_STRING as string);

  const app = express();
  app.use(express.json());

  app.get("/api/products/:id", authMiddleware, ProductController.getOneProduct);
  app.get("/api/products", authMiddleware, ProductController.getAllProducts);
  app.get("/api/profile/cart", authMiddleware, CartController.getUserCart);
  app.delete(
    "/api/profile/cart",
    authMiddleware,
    accessCheckMiddleware,
    CartController.deleteUserCart
  );
  app.put(
    "/api/profile/cart",
    authMiddleware,
    updateCartValidationMiddleware,
    CartController.updateUserCart
  );

  app.post(
    "/api/profile/cart/checkout",
    authMiddleware,
    OrderController.createNewOrder
  );
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.loginUser);

  app.use(errorHandler); // order is important, should be the last one.

  app.listen(SERVER_PORT, () => {
    console.log(
      `server with MongoDB started at http://localhost:${SERVER_PORT}`
    );
  });
})();
