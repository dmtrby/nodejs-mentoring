import express from "express";
import { SERVER_PORT } from "./constants";
import ProductController from "./controllers/product.controller";
import CartController from "./controllers/cart.controller";
import OrderController from "./controllers/order.controller";
import errorHandler from "./middlewares/errorHandleMiddleware";
import authMiddleware from "./middlewares/authMiddleware";
import updateCartValidationMiddleware from "./middlewares/updateCartValidationMiddleware";

const app = express();
app.use(express.json());

app.get("/api/products/:id", authMiddleware, ProductController.getOneProduct);
app.get("/api/products", authMiddleware, ProductController.getAllProducts);
app.get("/api/profile/cart", authMiddleware, CartController.getUserCart);
app.delete("/api/profile/cart", authMiddleware, CartController.deleteUserCart);
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

app.use(errorHandler); // order is important, should be the last one.

app.listen(SERVER_PORT, () => {
  console.log("Server is started");
});
