import {
  createCartForUserById,
  getCartByUserId,
  deleteCartByUserId,
  getCartByUserIdWithProducts,
  createCartItem,
  updateCartItem,
  removeCartItem,
} from "../repository/carts.repository";
import { CartEntity } from "../entities/cart.entity";
import { UserEntity } from "../entities/user.entity";
import { ProductEntity } from "../entities/product.entity";
import { TMongoProductEntity } from "../schema";

const getCart = async (
  userId: UserEntity["id"]
): Promise<CartEntity | undefined> => {
  let cart = await getCartByUserId(userId);
  return cart;
};

const getCartWithProducts = async (
  userId: UserEntity["id"]
): Promise<CartEntity | undefined> => {
  let cart = await getCartByUserIdWithProducts(userId);
  return cart;
};

const getOrCreateCart = async (
  userId: UserEntity["id"]
): Promise<CartEntity> => {
  let cart = await getCartByUserId(userId);
  if (!cart) {
    await createCartForUserById(userId);
  }

  cart = (await getCartByUserIdWithProducts(userId)) as CartEntity;
  return cart;
};

const updateCart = async (
  cart: CartEntity,
  product: ProductEntity,
  count: number
): Promise<void> => {
  const { items } = cart;
  const productInsideCart = items.find(
    (item) => item.product.id === product.id
  );
  if (!productInsideCart && count !== 0) {
    await createCartItem(cart, product as TMongoProductEntity, count);
  }

  if (productInsideCart && count === 0) {
    await removeCartItem(cart, product as TMongoProductEntity, count);
  }

  if (productInsideCart && count > 0) {
    await updateCartItem(cart, product as TMongoProductEntity, count);
  }

  Promise.resolve();
};

const deleteCart = async (userId: UserEntity["id"]): Promise<Boolean> => {
  const wasDeleted = deleteCartByUserId(userId);

  return wasDeleted;
};
export {
  getCart,
  updateCart,
  deleteCart,
  getOrCreateCart,
  getCartWithProducts,
};
