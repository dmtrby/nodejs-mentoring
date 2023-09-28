import { STATUS_CODES } from "../constants";
import { addOrRemoveHobby, updateUser } from "../services/user.service";
import { IExtendedRequest } from "../types";

const updateUserController = (req: IExtendedRequest, res) => {
  let body: any = [];
  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", () => {
      const newUserData = JSON.parse(Buffer.concat(body).toString());
      const userId = req.params?.id;
      const wasManaged = updateUser(Number(userId), newUserData);
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

export default updateUserController;
