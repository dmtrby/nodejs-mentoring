import { UserEntity } from "../entities/user.entity";
import { CartEntity } from "../entities/cart.entity";
import Cart, { CartItem } from "../models/cart.model";
import mongoose from "mongoose";
import { ProductEntity } from "../entities/product.entity";
import { TMongoProductEntity } from "../schema";

const getCartByUserId = async (
  userId: UserEntity["id"]
): Promise<CartEntity | undefined> => {
  const userCart = await Cart.findOne(
    { userId: userId, isDeleted: false },
    { _id: 0, __v: 0 }
  ).populate("items", { _id: 0, __v: 0 });

  return userCart as unknown as CartEntity;
};

const getCartByUserIdWithProducts = async (
  userId: UserEntity["id"]
): Promise<CartEntity | undefined> => {
  const userCart = await Cart.findOne({
    userId: userId,
    isDeleted: false,
  }).populate("items.product");

  return userCart as CartEntity;
};

const deleteCartByUserId = async (
  userId: UserEntity["id"]
): Promise<Boolean> => {
  const res = await Cart.updateOne(
    { userId: userId, isDeleted: false },
    { isDeleted: true }
  );

  return res.acknowledged;
};

const createCartForUserById = async (
  userId: UserEntity["id"]
): Promise<void> => {
  await Cart.create({
    id: new mongoose.Types.ObjectId(),
    userId: userId,
    isDeleted: false,
    items: [],
  });
};

const createCartItem = async (
  cart: CartEntity,
  product: ProductEntity & { _id: number },
  count: number
): Promise<void> => {
  await Cart.findOneAndUpdate(
    { id: cart.id },
    { $push: { items: new CartItem({ product: product._id, count }) } }
  );
};

const removeCartItem = async (
  cart: CartEntity,
  product: TMongoProductEntity,
  count: number
): Promise<void> => {
  await Cart.findOneAndUpdate(
    { id: cart.id },
    {
      $pull: { items: { product: product } },
    }
  );
};

const updateCartItem = async (
  cart: CartEntity,
  product: TMongoProductEntity,
  count: number
): Promise<void> => {
  await Cart.findOneAndUpdate(
    { id: cart.id, "items.product": product },
    {
      $set: { "items.$.count": count },
    }
  );
};

export {
  getCartByUserId,
  createCartForUserById,
  deleteCartByUserId,
  getCartByUserIdWithProducts,
  updateCartItem,
  createCartItem,
  removeCartItem,
};
