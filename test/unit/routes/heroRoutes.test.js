import { mock, describe, it } from "node:test";
import assert from "node:assert";
import { routes } from "../../../src/routes/heroRoutes.js";
import { JSON_HEADERS } from "../../../src/utils/utils.js";

describe("Hero routes - endpoint test suites", () => {
  it("should call /heroes:get route", async () => {
    const databaseMock = [
      {
        id: "dfff4dc8-e402-4c37-bbb9-3ff149f100dd",
        name: "Batman",
        age: 50,
        power: "rich",
      },
    ];

    const heroServiceStub = {
      find: async () => databaseMock,
    };

    const endpoints = routes({
      heroService: heroServiceStub,
    });

    const endpoint = "/heroes:get";
    const request = {};

    const mockedWrite = mock.fn((item) => {
      const expected = JSON.stringify({ results: databaseMock });
      assert.strictEqual(
        item,
        expected,
        "write should be called with the correct payload"
      );
    });

    const mockedEnd = mock.fn((item) => {
      assert.strictEqual(
        item,
        undefined,
        "end should be called without params"
      );
    });

    const response = {
      write: mockedWrite,
      end: mockedEnd,
    };

    const route = endpoints[endpoint];

    await route(request, response);
  });
});
