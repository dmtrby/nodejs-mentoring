import { STATUS_CODES } from "../constants";
import { NewUser, User } from "../models/user.model";
import { addUser } from "../services/user.service";

const createUserController = (req, res) => {
  let body: any = [];
  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", () => {
      const newUserData = JSON.parse(Buffer.concat(body).toString());

      addUser(newUserData as unknown as NewUser);
      res.writeHead(STATUS_CODES.created, {
        "Content-Type": "application/json",
      });

      const jsonContent = JSON.stringify(newUserData);
      res.end(jsonContent);
    });
};

export default createUserController;
