import User from "../../models/user.model";
import Product from "../../models/product.model";
import mongoose, { connect, disconnect } from "mongoose";
import Cart, { CartItem } from "../../models/cart.model";
import { v4 } from "uuid";

export const seeder = (async () => {
  await connect("mongodb://127.0.0.1:27017/task8");
  const user1 = new User({
    id: new mongoose.Types.ObjectId(),
  });
  const user2 = new User({
    id: new mongoose.Types.ObjectId(),
  });
  const user3 = new User({
    id: new mongoose.Types.ObjectId(),
  });
  const user4 = new User({
    id: new mongoose.Types.ObjectId(),
  });

  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();

  const product1 = new Product({
    _id: new mongoose.Types.ObjectId(),
    id: v4(),
    title: "opel",
    description: "common opel car",
    price: 1200,
  });
  const product2 = new Product({
    _id: new mongoose.Types.ObjectId(),
    id: v4(),
    title: "audi",
    description: "common audi car",
    price: 1500,
  });
  const product3 = new Product({
    _id: new mongoose.Types.ObjectId(),
    id: v4(),
    title: "bmw",
    description: "common bmw car",
    price: 2000,
  });
  const product4 = new Product({
    _id: new mongoose.Types.ObjectId(),
    id: v4(),
    title: "mazda",
    description: "common mazda car",
    price: 1700,
  });

  await product1.save();
  await product2.save();
  await product3.save();
  await product4.save();

  const cartItem1 = new CartItem({
    product: product1._id,
    count: 1,
  });

  const cartItem2 = new CartItem({
    product: product2._id,
    count: 3,
  });

  const cartItem3 = new CartItem({
    product: product3._id,
    count: 1,
  });

  const cart1 = new Cart({
    id: new mongoose.Types.ObjectId(),
    userId: user1.id,
    isDeleted: false,
    items: [cartItem1, cartItem2, cartItem3],
  });

  await cart1.save();
  await disconnect();
})();
