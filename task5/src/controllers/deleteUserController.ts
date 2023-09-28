import { STATUS_CODES } from "../constants";
import { deleteUser } from "../services/user.service";
import { IExtendedRequest } from "../types";

const deleteUserController = (req: IExtendedRequest, res) => {
  const userId = req.params?.id;
  const wasRemoved = deleteUser(Number(userId));
  if (wasRemoved) {
    res.writeHead(STATUS_CODES.success, { "Content-Type": "application/json" });

    res.end();
  } else {
    res.writeHead(STATUS_CODES.notFound, {
      "Content-Type": "application/json",
    });

    res.end();
  }
};

export default deleteUserController;
