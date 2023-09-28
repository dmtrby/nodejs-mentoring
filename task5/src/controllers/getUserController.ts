import { STATUS_CODES } from "../constants";
import { User } from "../models/user.model";
import { getUser } from "../services/user.service";
import { IExtendedRequest } from "../types";

const getUserController = (req: IExtendedRequest, res) => {
  const userId = req.params?.id;
  const user = getUser(Number(userId)) as User;
  if (!user) {
    res.writeHead(STATUS_CODES.notFound, {
      "Content-Type": "application/json",
    });
    res.end();
  } else {
    const { hobbies, ...userData } = user;

    const links = {
      _links: {
        self: `/users/${userId}`,
        homepage: `/`,
        hobbies: {
          href: `/users/${userId}/hobbies`,
        },
      },
    };

    const jsonContent = JSON.stringify({ _links: links, _embedded: userData });
    res.writeHead(STATUS_CODES.success, { "Content-Type": "application/json" });
    res.end(jsonContent);
  }
};

export default getUserController;
