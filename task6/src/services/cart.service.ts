import {
  createCartForUserById,
  deleteCartByUserId,
  getCartByUserId,
  updateCartByCartId,
} from "../db/carts.db";
import { CartEntity } from "../entities/cart.entity";
import { ProductEntity } from "../entities/product.entity";
import { UserEntity } from "../entities/user.entitiy";

const getCart = async (
  userId: UserEntity["id"]
): Promise<CartEntity | undefined> => {
  let cart = await getCartByUserId(userId);
  return cart;
};

const getOrCreateCart = async (
  userId: UserEntity["id"]
): Promise<CartEntity> => {
  let cart = await getCartByUserId(userId);
  if (!cart) {
    cart = await createCartForUserById(userId);
  }

  return cart;
};

const updateCart = async (
  userId: UserEntity["id"],
  productId: ProductEntity["id"],
  count: number
): Promise<void> => {
  const cart = (await getCartByUserId(userId)) as CartEntity;
  const { items, id } = cart;
  const newItemsData = [...items];
  const productArrayIndex = newItemsData.findIndex(
    (item) => item.product.id === productId
  );
  if (productArrayIndex === -1) {
    newItemsData.push({ product: { id: productId }, count });
  } else {
    if (count === 0) {
      newItemsData.splice(productArrayIndex, 1);
    } else {
      newItemsData[productArrayIndex] = { product: { id: productId }, count };
    }
  }
  await updateCartByCartId(id, { ...cart, items: newItemsData });
  Promise.resolve();
};

const deleteCart = async (userId: UserEntity["id"]): Promise<Boolean> => {
  const wasDeleted = await deleteCartByUserId(userId);
  const newCartData = await createCartForUserById(userId);

  return wasDeleted && Boolean(newCartData);
};
export { getCart, updateCart, deleteCart, getOrCreateCart };
