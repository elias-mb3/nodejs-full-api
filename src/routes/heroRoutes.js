import { once } from "node:events";
import Hero from "../entities/hero.js";
import { JSON_HEADERS } from "../utils/utils.js";

export const routes = ({ heroService }) => ({
  "/heroes:get": async (request, response) => {
    const heroes = await heroService.find();
    response.write(JSON.stringify({ results: heroes }));
    return response.end();
  },
  "/heroes:post": async (request, response) => {
    const data = await once(request, "data");
    const item = JSON.parse(data);
    const hero = new Hero(item);

    const id = await heroService.create(hero);

    response.writeHead(201, JSON_HEADERS);
    response.write(
      JSON.stringify({ id, success: "User created successfully" })
    );
    return response.end();
  },
});
