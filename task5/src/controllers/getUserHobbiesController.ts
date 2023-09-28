import { STATUS_CODES } from "../constants";
import { User } from "../models/user.model";
import { getUser } from "../services/user.service";
import { IExtendedRequest } from "../types";

const getUserHobbiesController = (req: IExtendedRequest, res) => {
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
      self: `/users/${userId}/hobbies`,
      homepage: `/`,
    };

    const jsonContent = JSON.stringify({ links, _embedded: hobbies });
    res.writeHead(STATUS_CODES.success, { "Content-Type": "application/json" });
    res.end(jsonContent);
  }
};

export default getUserHobbiesController;
