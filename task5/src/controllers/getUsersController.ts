import { STATUS_CODES } from "../constants";
import { getUsers } from "../services/user.service";
import { IExtendedRequest } from "../types";

const getUsersController = (req: IExtendedRequest, res) => {
  const userList = getUsers();
  const result = userList.map((user) => {
    const { hobbies, ...otherUserData } = user;

    const links = {
      self: `/users/${otherUserData.id}`,
      homepage: `/`,
      hobbies: {
        href: `/users/${otherUserData.id}/hobbies`,
      },
    };
    return { user: otherUserData, _links: links };
  });

  const links = {
    self: "/users",
    users: {
      href: "/users",
    },
  };

  const jsonContent = JSON.stringify({ _links: links, _embedded: result });
  res.writeHead(STATUS_CODES.success, { "Content-Type": "application/json" });
  res.end(jsonContent);
};

export default getUsersController;
