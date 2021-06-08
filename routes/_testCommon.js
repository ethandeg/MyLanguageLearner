"use strict";

const db = require("../db.js");
const User = require("../models/user");
const FlashCard = require("../models/flashCard");
const Language = require("../models/Language");
const Lesson = require("../models/Lesson");
const { createToken } = require("../helpers/tokens");


async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM languages");
  await db.query("DELETE FROM flashcards");
  await db.query("DELETE FROM lessons");
  await db.query("DELETE FROM units");
  await db.query("DELETE FROM subunits");
  await db.query("DELETE FROM user_language");
  await db.query("DELETE FROM user_lessons");

  const lang1 = await Language.create(
      {
        code: "ru",
        name: "Russian",
        flag: null
      });
      console.log("************************")
      console.log(lang1)
  const lang2 = await Language.create(
      {
        code: "es",
        name: "Spanish",
        flag: null
      });
// console.log(lang1)
// console.log(lang2)

  const u1 = await User.register({
    username: "u1",
    password: "password1"
  });
  await User.register({
    username: "u2",
    password: "password2"
  });
  await User.register({
    username: "u3",
    password: "password3"
  });

  await User.newLearner(u1, lang1.code);
  console.log(u1)
  console.log("******************************************************************************")
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", admin: false });
const u2Token = createToken({ username: "u2", admin: false });
const adminToken = createToken({username: "admin", admin: true})


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken
};
