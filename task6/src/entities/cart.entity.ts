import { ProductEntity } from "./product.entity";

export interface CartItemEntity {
  product: Omit<ProductEntity, "title" | "description" | "price">;
  count: number;
}

export interface CartItemEntityWithProductsData {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface CartEntityWithProductsData {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntityWithProductsData[];
}
