import { parse } from "node:url";
import { JSON_HEADERS } from "./utils/utils.js";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { routes } from "./routes/heroRoutes.js";
import { genereteInstances } from "./factory/herosFactory.js";

const currentDir = dirname(fileURLToPath(import.meta.url));
const filePath = join(currentDir, "./../database", "data.json");

const heroService = genereteInstances({
  filePath,
});

const heroRoutes = routes({ heroService });

const allRoutes = {
  ...heroRoutes,
  //404 routes
  default: (request, response) => {
    response.writeHead(404, JSON_HEADERS);
    response.write("uuups, not found");
    response.end();
  },
};
export default function handler(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url, true);
  const key = `${pathname}:${method.toLowerCase()}`;
  console.log(key);
  const chosenRoute = allRoutes[key] || allRoutes.default;

  return Promise.resolve(chosenRoute(request, response)).catch(
    handlerError(response)
  );
}

export function handlerError(response) {
  return (error) => {
    console.log("Whats something was happened", error.stack);
    response.writeHead(500, JSON_HEADERS);
    response.write(JSON.stringify({ error: "internal sever error!!" }));

    return response.end();
  };
}
