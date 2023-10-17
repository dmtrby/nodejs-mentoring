import { Cart } from "./entities/cart.entity";

import { Product } from "./entities/product.entity";

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
  ["data"]: [Product] | null;
  ["error"]: ErrorResponse | null;
}

export interface ProductResponse {
  ["data"]: Product | null;
  ["error"]: ErrorResponse | null;
}

export interface CartResponse {
  ["data"]: CartDataResponse | null;
  ["error"]: ErrorResponse | null;
}

export type CartDataResponse = {
  ["cart"]: Cart;
  ["total"]: number;
};
