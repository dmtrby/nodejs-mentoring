import { STATUS_CODES } from "../constants";
import { addOrRemoveHobby } from "../services/user.service";
import { IExtendedRequest } from "../types";

const updateUserHobbyController = (req: IExtendedRequest, res) => {
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

export default updateUserHobbyController;
