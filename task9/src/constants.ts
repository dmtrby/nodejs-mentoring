export const SERVER_PORT = 3000;

export enum STATUS_CODES {
  success = 200,
  notFound = 404,
  forbidden = 403,
  created = 201,
  serverError = 500,
  unauth = 401,
  badRequest = 400,
}

export const ERROR_MESSAGES = {
  SMTH_WRONG: "Ooops, something went wrong",
  MISSING_PRODUCT: "No product with such id",
  UNAUTHORIZED: "User is not authorized",
  FORBIDDEN: "You must be authorized user",
  USER_HAS_NO_ACCESS: 'This user has no rules to do it',
  INVALID_PRODUCT: "Products are not valid",
  CART_NOT_FOUND: "Cart was not found",
  EMPTY_CART: "Cart is empty",
  INVALID_DATA_FOR_CART_UPDATE: "Cart data provided for update is invalid",
  ALL_LOGIN_INPUT_REQUIRED: "All input is required",
  INVALID_CREDS: "Invalid Credentials",
  INVALID_TOKEN: "Invalid Token",
};

export const AUTH_HEADER = "x-user-id";
