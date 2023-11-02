import { Request } from "express";
import { CartEntity } from "./entities/cart.entity";
import { ProductEntity } from "./entities/product.entity";
import { UserEntity } from "./entities/user.entity";

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

export interface CartResponse {
  ["data"]: CartDataResponse | null;
  ["error"]: ErrorResponse | null;
}

export type CartDataResponse = {
  ["cart"]: CartEntity;
  ["total"]: number;
};

export type TMongoProductEntity = ProductEntity & { _id: number };

export type TRequestWithUser = Request & { user: UserEntity };
