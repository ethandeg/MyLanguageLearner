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


describe("POST/DELETE /lesson/complete", function() {
    test("Complete lesson if admin and uncomplete", async function() {
        const resp = await request(app)
        .post(`/lesson/complete`)
        .send({username: "u1", languageCode: 'ru', lessonId: lessonIds[0]})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({username: "u1", languageCode: 'ru', lessonId: lessonIds[0]})
        const delResp = await request(app)
        .delete(`/lesson/complete`)
        .send({username: "u1", languageCode: 'ru', lessonId: lessonIds[0]})
        .set("authorization", adminToken)
        expect(delResp.statusCode).toEqual(200)
    })
    test("Complete lesson if correct user and uncomplete", async function() {
        const resp = await request(app)
        .post(`/lesson/complete`)
        .send({username: "u1", languageCode: 'ru', lessonId: lessonIds[0]})
        .set("authorization", u1Token)
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({username: "u1", languageCode: 'ru', lessonId: lessonIds[0]})
        const delResp = await request(app)
        .delete(`/lesson/complete`)
        .send({username: "u1", languageCode: 'ru', lessonId: lessonIds[0]})
        .set("authorization", u1Token)
        expect(delResp.statusCode).toEqual(200)
    })
})


describe("GET /lesson/units", function() {
  test("Get all units and subunits", async function() {
    const resp = await request(app)
    .get("/lesson/units")
    .set("authorization", adminToken)
    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toBeTruthy()
  })
})

describe("GET /lesson/units/lessons/completed", function() {
  test("Get all completed lesson for a user", async function() {
    const resp = await request(app)
    .get(`/lesson/units/lessons/completed`)
    .set("authorization", adminToken)
    expect(resp.statusCode).toEqual(200)
  })
})