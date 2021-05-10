const express = require("express");
const router = new express.Router()
const User = require("../models/user")



router.get("/", async (req, res, next) => {
  try {
    const result = await User.getAllUsers()
    return res.json(result)
  } catch (e) {
    return next(e)
  }

})

router.post("/language/new", async (req, res, next) => {
  try {
    const { username, languageCode } = req.body;
    const result = await User.newLearner(username, languageCode)
    return res.status(201).json(result)
  } catch (e) {
    return next(e)
  }
});

router.delete("/language/remove", async (req, res, next) => {
  try {
    const { username, languageCode } = req.body;

    await User.quitLearning(username, languageCode)
    return res.json({ msg: 'deleted' })
  } catch (e) {
    return next(e)
  }

})

router.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params
    const results = await User.getAllInformation(username)
    return res.json(results)
  } catch (e) {
    return next(e)
  }

})


module.exports = router;