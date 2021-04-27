const express = require("express");
const router = new express.Router()
const db = require("../db")



router.get("/", async(req,res,next) => {
  const results = await db.query(`SELECT * FROM users`);
  return res.json(results.rows)

})


module.exports = router;