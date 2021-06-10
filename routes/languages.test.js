"use strict"
const request = require("supertest");

const app = require("../app");


const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
  lessonIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /language", function() {
    test("can get all languages", async function() {
        const resp = await request(app)
        .get("/language")
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body[0].name).toBeTruthy()
    })
})