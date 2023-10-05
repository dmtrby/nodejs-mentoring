import http from "http";
import modifyRequestUrl from "../middlewares/modifyRequestUrl";
import { IExtendedRequest } from "../types";

interface IRoute {
  method: string;
  url: string;
  handler: (res, req) => void;
}

const routes: IRoute[] = [];

const addRoute = (method: string, url: string, handler: (res, req) => void) => {
  routes.push({
    method,
    url,
    handler,
  });
};

const findRoute = (
  method: string,
  url: string,
  params: IExtendedRequest["params"]
) => {
  const pathname = url.split("?")[0];
  return routes.find((route) => {
    let urlToCheck = route.url;
    if (urlToCheck.includes(":id")) {
      urlToCheck = urlToCheck.replace(":id", params?.id as string);
    }
    return method === route.method && pathname === urlToCheck;
  });
};

export const router = () => {
  const listen = (port, cb) => {
    http
      .createServer((req, res) => {
        modifyRequestUrl(req);
        const { method, pathname, params } = req as IExtendedRequest;
        const route = findRoute(method as string, pathname as string, params);
        if (route) {
          return route.handler(req, res);
        }

        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route not found.");
      })
      .listen(port, cb);
  };

  return {
    addRoute,
    listen,
  };
};
