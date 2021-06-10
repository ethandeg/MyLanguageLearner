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
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("POST /auth/register", function () {
    test("can register an account", async function() {
        const resp = await request(app)
        .post(`/auth/register`)
        .send({username: 'testuser', password: "testpassword"})
        expect(resp.statusCode).toEqual(201)
        expect(resp.body._token).toBeTruthy()
    })

    test("bad request if not all values", async function() {
        const resp = await request(app)
        .post(`/auth/register`)
        .send({username: 'testuser'})
        expect(resp.statusCode).toEqual(400)
    })

    test("bad request if duplicate username", async function() {
        const resp = await request(app)
        .post(`/auth/register`)
        .send({username: 'u1', password: "password"})
        expect(resp.statusCode).toEqual(400)
    })
})

describe("POST /auth/login", function () {
    test("can login", async function() {
        const resp = await request(app)
        .post(`/auth/login`)
        .send({username: "u1", password: "password1"})
        expect(resp.statusCode).toEqual(200)
        expect(resp.body._token).toBeTruthy()
    })
    test("bad request if wrong credentials", async function() {
        const resp = await request(app)
        .post(`/auth/login`)
        .send({username: "u1", password: "pasrd1"})
        expect(resp.statusCode).toEqual(400)

    })
    test("bad request if missing values", async function() {
        const resp = await request(app)
        .post(`/auth/login`)
        .send({username: "u1"})
        expect(resp.statusCode).toEqual(400)

    })
})


describe("PATCH /auth", function() {
    test("Admin can update password", async function() {
        const resp = await request(app)
        .patch(`/auth`)
        .send({username: "u1", oldPassword: "password1", newPassword: "blahblah"})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body.msg).toEqual('success')
    })
    test("Correct user can update password", async function() {
        const resp = await request(app)
        .patch(`/auth`)
        .send({username: "u1", oldPassword: "password1", newPassword: "blahblah"})
        .set("authorization", u1Token)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body.msg).toEqual('success')
    })
    test("not correct user gets unauthorized error", async function() {
        const resp = await request(app)
        .patch(`/auth`)
        .send({username: "u1", oldPassword: "password1", newPassword: "blahblah"})
        .set("authorization", u2Token)
        expect(resp.statusCode).toEqual(401)

    })
    test("bad request if incorrect body values", async function() {
        const resp = await request(app)
        .patch(`/auth`)
        .send({username: "u1", oldPasord: "password1", newPassword: "blahblah"})
        .set("authorization", u2Token)
        expect(resp.statusCode).toEqual(401)

    })
})