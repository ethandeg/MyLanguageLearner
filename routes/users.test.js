"use strict";

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
  deckIds,
  flashCardIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */


describe("GET /user", function () {
  test("works for admins", async function () {
    const resp = await request(app)
        .get("/user")
        .set("authorization", adminToken);
    expect(resp.body).toEqual(
        [
            {"admin": false, "email": null, "experience": 0, "profilepic": null, "username": "u1"},
             {"admin": false, "email": null, "experience": 0, "profilepic": null, "username": "u2"},
              {"admin": false, "email": null, "experience": 0,
    "profilepic": null, "username": "u3"}
    ]
    );
})


  test("unauth for non-admin users", async function () {
    const resp = await request(app)
        .get("/user")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .get("/user");
    expect(resp.statusCode).toEqual(401);
  });

});

/************************************** GET /users/:username */

describe("GET /user/:username", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .get(`/user/u2`)
        .set("authorization", adminToken);
    expect(resp.body).toEqual({
     
        username: "u2",
        admin: false,
        email: null,
        experience: 0,
        profilePic: null,
        deck: [],
        languages: []
      
    });
  });

  test("works for same user", async function () {
    const resp = await request(app)
        .get(`/user/u2`)
        .set("authorization", u2Token);
    expect(resp.body).toEqual({

        username: "u2",
        admin: false,
        email: null,
        experience: 0,
        profilePic: null,
        deck: [],
        languages: []
      
    });
  });





  test("not found if user not found", async function () {
    const resp = await request(app)
        .get(`/user/nope`)
        .set("authorization",adminToken);
    expect(resp.statusCode).toEqual(404);
  });
});

// /************************************** PATCH /users/:username */

describe("PATCH /user/:username", () => {
  test("works for admins", async function () {
    const resp = await request(app)
        .patch(`/user/u1`)
        .send({
          email: "test@gmail.com",
        })
        .set("authorization", adminToken);
    expect(resp.body).toEqual({

        username: "u1",
        experience: 0,
        admin: false,
        email: "test@gmail.com",
        profilePic: null

    });
  });
  test("works for admins", async function () {
    const resp = await request(app)
        .patch(`/user/u1`)
        .send({
          email: "test@gmail.com",
        })
        .set("authorization", u1Token);
    expect(resp.body).toEqual({

        username: "u1",
        experience: 0,
        admin: false,
        email: "test@gmail.com",
        profilePic: null

    });
  });

  test("unauth if not same user", async function () {
    const resp = await request(app)
        .patch(`/user/u1`)
        .send({
          email: "new@gmail.com",
        })
        .set("authorization", u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if no such user", async function () {
    const resp = await request(app)
        .patch(`/user/nope`)
        .send({
          profilePic: "Nope",
        })
        .set("authorization", adminToken);
    expect(resp.statusCode).toEqual(404);
  });


});






// /************************************** post /user/language/

describe("POST /user/language AND delete", function() {
    test("Works for admin", async function (){
        const resp = await request(app)
        .post(`/user/language`)
        .send({
            username: "u1",
            languageCode: 'ru'
        })
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({
            username: 'u1',
            languageCode:'ru'
        })
        const delResp = await request(app)
        .delete(`/user/language`)
        .send({username: 'u1', languageCode: 'ru'})
        .set("authorization", adminToken)
        expect(delResp.statusCode).toEqual(200)
    })

    test("Works for correct user", async function() {
        const resp = await request(app)
        .post(`/user/language`)
        .send({
            username: "u1",
            languageCode: 'ru'
        })
        .set("authorization", u1Token)
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({
            username: 'u1',
            languageCode:'ru'
        })
        const delResp = await request(app)
        .delete(`/user/language`)
        .send({username: 'u1', languageCode: 'ru'})
        .set("authorization", u1Token)
        expect(delResp.statusCode).toEqual(200)
    })

    test("Error for wrong user", async function() {
        const resp = await request(app)
        .post(`/user/language`)
        .send({
            username: 'u1',
            languageCode: 'ru'
        })
        .set("authorization", u2Token)
        expect(resp.statusCode).toEqual(401)
        const delResp = await request(app)
        .delete(`/user/language`)
        .send({username: 'u1', languageCode: 'ru'})
        .set("authorization", u2Token)
        expect(delResp.statusCode).toEqual(401)
    })
})

describe("POST /user/experience", function() {
    test("works for admin", async function() {
        const resp = await request(app)
        .post(`/user/experience`)
        .send({username: "u1", experience: 10})
        .set("authorization", adminToken)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({username: "u1", experience: 10})
    })
    test("works for correct user", async function() {
        const resp = await request(app)
        .post(`/user/experience`)
        .send({username: "u1", experience: 10})
        .set("authorization", u1Token)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({username: "u1", experience: 10})
    })
    test("does not work for unauth", async function() {
        const resp = await request(app)
        .post(`/user/experience`)
        .send({username: "u1", experience: 10})
        .set("authorization", u2Token)
        expect(resp.statusCode).toEqual(401)

    })
})


