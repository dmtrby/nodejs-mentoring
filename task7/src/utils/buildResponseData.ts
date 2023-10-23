import {
  CartResponse,
  ErrorResponse,
  ProductResponse,
  ProductsResponse,
} from "../schema";

export const buildResponseData = (
  data: any,
  message: ErrorResponse["message"] | null
): CartResponse | ProductResponse | ProductsResponse => {
  const errorData = message ? { message } : null;
  return {
    data: data,
    error: errorData,
  };
};
