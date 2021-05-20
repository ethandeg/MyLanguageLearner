const express = require("express");
const router = new express.Router()
const User = require("../models/user")
const { createToken } = require("../helpers/tokens")



router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password)
        const token = createToken(user)
        return res.json({ _token: token })
    } catch (e) {
        return next(e)
    }
})


router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.register(username, password)
        const token = createToken(user)
        return res.status(201).json({ _token: token })
    } catch (e) {
        return next(e)
    }

})

router.patch("/", async (req, res, next) => {
    try {
        const { username, oldPassword, newPassword } = req.body
        await User.authenticate(username, oldPassword)
        await User.editUser(username, { password: newPassword })
        return res.json({ msg: "success" })

    } catch (e) {
        return next(e)
    }

})



module.exports = router