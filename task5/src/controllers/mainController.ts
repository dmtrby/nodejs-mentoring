import { STATUS_CODES } from "../constants";
import { IExtendedRequest } from "../types";

const mainController = (req: IExtendedRequest, res) => {
  res.writeHead(STATUS_CODES.success, { "Content-Type": "application/json" });

  const links = {
    self: "/",
    users: {
      href: "/users",
    },
  };

  const jsonContent = JSON.stringify({ _links: links });
  res.end(jsonContent);
};

export default mainController;
