import { STATUS_CODES } from "../constants";
import { NewUser, User } from "../models/user.model";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../services/user.service";
import { IExtendedRequest } from "../types";

const getOneUser = (req: IExtendedRequest, res) => {
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

const createOneUser = (req, res) => {
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

const deleteOneUser = (req: IExtendedRequest, res) => {
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

const getAllUsers = (req: IExtendedRequest, res) => {
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

const updateOneUser = (req: IExtendedRequest, res) => {
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

export default {
  getOneUser,
  createOneUser,
  deleteOneUser,
  getAllUsers,
  updateOneUser,
};
