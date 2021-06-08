"use strict";

const request = require("supertest");

const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */



describe("GET /user", function () {
  test("works for admins", async function () {
    const resp = await request(app)
        .get("/users")
        .set("authorization", adminToken);
        console.log
    expect(resp.body).toEqual(
      [
        {
          username: "u1",
          experience: 0,
          profilePic: null,
          email: null,
          admin: false,
        },
        {
          username: "u2",
          experience: 0,
          profilePic: null,
          email: null,
          admin: false,
        },
        {
          username: "u3",
          experience: 0,
          profilePic: null,
          email: null,
          admin: false,
        },
      ],
    );
  });

//   test("unauth for non-admin users", async function () {
//     const resp = await request(app)
//         .get("/users")
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .get("/users");
//     expect(resp.statusCode).toEqual(401);
//   });

});

/************************************** GET /users/:username */

// describe("GET /users/:username", function () {
//   test("works for admin", async function () {
//     const resp = await request(app)
//         .get(`/users/u1`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//         firstName: "U1F",
//         lastName: "U1L",
//         email: "user1@user.com",
//         isAdmin: false,
//         applications: [testJobIds[0]],
//       },
//     });
//   });

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .get(`/users/u1`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//         firstName: "U1F",
//         lastName: "U1L",
//         email: "user1@user.com",
//         isAdmin: false,
//         applications: [testJobIds[0]],
//       },
//     });
//   });

//   test("unauth for other users", async function () {
//     const resp = await request(app)
//         .get(`/users/u1`)
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .get(`/users/u1`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found if user not found", async function () {
//     const resp = await request(app)
//         .get(`/users/nope`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });

// /************************************** PATCH /users/:username */

// describe("PATCH /users/:username", () => {
//   test("works for admins", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: "New",
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//         firstName: "New",
//         lastName: "U1L",
//         email: "user1@user.com",
//         isAdmin: false,
//       },
//     });
//   });

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: "New",
//         })
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//         firstName: "New",
//         lastName: "U1L",
//         email: "user1@user.com",
//         isAdmin: false,
//       },
//     });
//   });

//   test("unauth if not same user", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: "New",
//         })
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: "New",
//         });
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found if no such user", async function () {
//     const resp = await request(app)
//         .patch(`/users/nope`)
//         .send({
//           firstName: "Nope",
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });

//   test("bad request if invalid data", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: 42,
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(400);
//   });

//   test("works: can set new password", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           password: "new-password",
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//         firstName: "U1F",
//         lastName: "U1L",
//         email: "user1@user.com",
//         isAdmin: false,
//       },
//     });
//     const isSuccessful = await User.authenticate("u1", "new-password");
//     expect(isSuccessful).toBeTruthy();
//   });
// });

// /************************************** DELETE /users/:username */

// describe("DELETE /users/:username", function () {
//   test("works for admin", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({ deleted: "u1" });
//   });

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({ deleted: "u1" });
//   });

//   test("unauth if not same user", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`)
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found if user missing", async function () {
//     const resp = await request(app)
//         .delete(`/users/nope`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });

// /************************************** POST /users/:username/jobs/:id */

// describe("POST /users/:username/jobs/:id", function () {
//   test("works for admin", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({ applied: testJobIds[1] });
//   });

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({ applied: testJobIds[1] });
//   });

//   test("unauth for others", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found for no such username", async function () {
//     const resp = await request(app)
//         .post(`/users/nope/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });

//   test("not found for no such job", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/0`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });

//   test("bad request invalid job id", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/0`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });
