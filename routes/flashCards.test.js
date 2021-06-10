"use strict"
const request = require("supertest");
const { set } = require("../app");

const app = require("../app");


const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
  lessonIds,
  flashCardIds,
  deckIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
describe("POST AND DELETE /flashcards/deck AND /flashcards", function() {
    test("admin can create a deck and a flashCard", async function() {
        const resp = await request(app)
        .post(`/flashcards/deck`)
        .send({username: "u1", name: "new deck"})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(201)
        // const flashRes = await request(app)
        // .post(`/flashcards`)
        // .send({frontSide: "test", backSide:"test2", deckId:resp.body.id})
        // .set("authorization", adminToken)
        // expect(flashRes.statusCode).toEqual(201)
        // const delResp = await request(app)
        // .delete(`/flashcards`)
        // .send()
    })
    test("correct user can create a deck", async function() {
        const resp = await request(app)
        .post(`/flashcards/deck`)
        .send({username: "u1", name: "new deck for me"})
        .set("authorization", u1Token)
        expect(resp.statusCode).toEqual(201)
        // const flashRes = await request(app)
        // .post(`/flashcards`)
        // .send({frontSide: "test", backSide:"test2", deckId:resp.body.id})
        // .set("authorization", u1Token)
        // expect(flashRes.statusCode).toEqual(201)
    })
    test("unauthorized when wrong user", async function() {
        const resp = await request(app)
        .post(`/flashcards/deck`)
        .send({username: "u1", name: "new deck for me 2"})
        .set("authorization", u2Token)
        expect(resp.statusCode).toEqual(401)
    })
    test("bad request when not valid body", async function() {
        const resp = await request(app)
        .post(`/flashcards/deck`)
        .send({username: "u1", nam: "new deck for me 2"})
        .set("authorization", u1Token)
        expect(resp.statusCode).toEqual(400)
    })
})


describe("POST /flashcards", function() {
    test("Logged in can create a flashcard", async function() {
        const resp = await request(app)
        .post(`/flashcards`)
        .send({frontSide: "test", backSide: "test2", deckId: deckIds[0]})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(201)
    })
    test("Error when not logged in", async function() {
        const resp = await request(app)
        .post(`/flashcards`)
        .send({frontSide: "test", backSide: "test2", deckId: deckIds[0]})
        expect(resp.statusCode).toEqual(401)
    })
    test("Bad Request when incorrect/missing values", async function() {
        const resp = await request(app)
        .post(`/flashcards`)
        .send({frontSide: "test",  deckId: deckIds[0]})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(400)
    })
})

describe("GET /flashcards/deck/deckId", function() {
    test("Can view flashcard previews from a deck", async function(){
        const resp = await request(app)
        .get(`/flashcards/deck/${deckIds[0]}`)
        expect(resp.statusCode).toEqual(200)
    })
})


describe("PATCH /flashcards/deck", function() {
    test("Can edit deck name as admin", async function() {
        const resp = await request(app)
        .patch(`/flashcards/deck`)
        .send({id: deckIds[0], name:"my new deck"})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({id: deckIds[0], name: "my new deck", username:"u1"})
    })

    test("Bad request error on missing values", async function() {
        const resp = await request(app)
        .patch(`/flashcards/deck`)
        .send({id: deckIds[0]})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(400)

    })
    test("Unauthorized if no user", async function() {
        const resp = await request(app)
        .patch(`/flashcards/deck`)
        .send({id: deckIds[0], name: "my new deck"})
        expect(resp.statusCode).toEqual(401)

    })
})

describe("DELETE /flashcards", function(){
    test("can delete flashcard", async function() {
        const resp = await request(app)
        .delete(`/flashcards`)
        .send({id: flashCardIds[0]})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({id: flashCardIds[0]})
    })
    test("unauthorized cannot delete flashcard", async function() {
        const resp = await request(app)
        .delete(`/flashcards`)
        .send({id: flashCardIds[0]})
        expect(resp.statusCode).toEqual(401)

    })
    test("Bad Request error with not the right values", async function() {
        const resp = await request(app)
        .delete(`/flashcards`)
        .send({something: "something"})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(400)

    })
})

describe("DELETE /flashcards/deck", function(){
    test("Can delete deck", async function() {
        const resp = await request(app)
        .delete(`/flashcards/deck`)
        .send({id: deckIds[0]})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({id: deckIds[0]})
    })
    test("unauthorized error", async function() {
        const resp = await request(app)
        .delete(`/flashcards/deck`)
        .send({id: deckIds[0]})
        expect(resp.statusCode).toEqual(401)
    })
    test("wrong info sent error", async function() {
        const resp = await request(app)
        .delete(`/flashcards/deck`)
        .send({if: deckIds[0]})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(400)

    })
})


