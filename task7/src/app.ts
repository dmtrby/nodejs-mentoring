import express from "express";
import { Server } from "http";
import { SERVER_PORT } from "./constants";
import ProductController from "./controllers/product.controller";
import CartController from "./controllers/cart.controller";
import OrderController from "./controllers/order.controller";
import errorHandler from "./middlewares/errorHandleMiddleware";
import authMiddleware from "./middlewares/authMiddleware";
import updateCartValidationMiddleware from "./middlewares/updateCartValidationMiddleware";
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";
import { Product } from "./entities/product.entity";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import config from "./config/orm.config";
import { User } from "./entities/user.entity";
import { Cart } from "./entities/cart.entity";
import { CartItem } from "./entities/cartItem.entity";
import { OrderItem } from "./entities/orderItem.entity";
import { Delivery } from "./entities/delivery.entity";
import { Payment } from "./entities/payment.entity";
import { Order } from "./entities/order.entity";

export const DI = {} as {
  server: Server;
  orm: MikroORM;
  em: EntityManager;
  productRepository: EntityRepository<Product>;
  userRepository: EntityRepository<User>;
  cartRepository: EntityRepository<Cart>;
  cartItemRepository: EntityRepository<CartItem>;
  orderItemRepository: EntityRepository<OrderItem>;
  deliveryRepository: EntityRepository<Delivery>;
  paymentRepository: EntityRepository<Payment>;
  orderRepository: EntityRepository<Order>;
};

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.cartItemRepository = DI.orm.em.getRepository(CartItem);
  DI.orderItemRepository = DI.orm.em.getRepository(OrderItem);
  DI.deliveryRepository = DI.orm.em.getRepository(Delivery);
  DI.paymentRepository = DI.orm.em.getRepository(Payment);
  DI.orderRepository = DI.orm.em.getRepository(Order);

  const app = express();
  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next)); // https://mikro-orm.io/docs/identity-map#-requestcontext-helper

  app.get("/api/products/:id", authMiddleware, ProductController.getOneProduct);
  app.get("/api/products", authMiddleware, ProductController.getAllProducts);
  app.get("/api/profile/cart", authMiddleware, CartController.getUserCart);
  app.delete(
    "/api/profile/cart",
    authMiddleware,
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


  app.use(errorHandler); // order is important, should be the last one.

  DI.server = app.listen(SERVER_PORT, () => {
    console.log(
      `server with MicroORM started at http://localhost:${SERVER_PORT}`
    );
  });
})();
