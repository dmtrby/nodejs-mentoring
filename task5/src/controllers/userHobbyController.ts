import { STATUS_CODES } from "../constants";
import { User } from "../models/user.model";
import { addOrRemoveHobby, getUser } from "../services/user.service";
import { IExtendedRequest } from "../types";

const getUserHobbies = (req: IExtendedRequest, res) => {
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

const updateUserHobbies = (req: IExtendedRequest, res) => {
  let body: any = [];
  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", () => {
      const hobbyToManage = JSON.parse(Buffer.concat(body).toString()).hobby;
      const userId = req.params?.id;
      const wasManaged = addOrRemoveHobby(Number(userId), hobbyToManage);
      if (!wasManaged) {
        res.writeHead(STATUS_CODES.notFound, {
          "Content-Type": "application/json",
        });
        res.end();
      } else {
        res.writeHead(STATUS_CODES.success, {
          "Content-Type": "application/json",
        });

        res.end();
      }
    });
};

export default { getUserHobbies, updateUserHobbies };
