import { CartEntity } from "./entities/cart.entity";
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "./entities/product.entity";

export interface ErrorResponse {
  message: string;
}

export interface EmptySuccessResponse {
  ["data"]: {
    success: boolean;
  };
  ["error"]: ErrorResponse | null;
}

export interface ProductsResponse {
  ["data"]: [ProductEntity] | null;
  ["error"]: ErrorResponse | null;
}

export interface ProductResponse {
  ["data"]: ProductEntity | null;
  ["error"]: ErrorResponse | null;
}

export interface CheckoutResponse {
  ["data"]: OrderEntity | null;
  ["error"]: ErrorResponse | null;
}

export interface CartResponse {
  ["data"]: CartDataResponse | null;
  ["error"]: ErrorResponse | null;
}

export type CartDataResponse = {
  ["cart"]: Omit<CartEntity, "userId" | "isDeleted">;
  ["total"]: number;
};