import { HOST, PORT } from "../constants";

const modifyRequestUrl = (req) => {
  const { url: reqUrl } = req;
  const parsedUrl = new URL(reqUrl as string, `${HOST}/${PORT}`);
  req.pathname = parsedUrl.pathname;

  const pathnameArr = parsedUrl.pathname.split("/");

  pathnameArr.forEach((path) => {
    if (path === "users" && path.length > 2) {
      req.params = {
        id: pathnameArr[2],
      };
    }
  });
};

export default modifyRequestUrl;
