const express = require("express");
const router = new express.Router()
const db = require("../db")
const User = require("../models/user")



router.get("/", async(req,res,next) => {
  const results = await db.query(`SELECT * FROM users`);
  return res.json(results.rows)

})

router.get("/:username", async(req, res, next) => {
  try {
    const {username} = req.params
    const results = await User.getAllInformation(username)
    return res.json(results)
  } catch(e){
    return next(e)
  }

})


module.exports = router;