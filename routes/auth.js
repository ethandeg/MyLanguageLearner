const express = require("express");
const router = new express.Router()
const User = require("../models/user")
const { createToken } = require("../helpers/tokens")
const schemaCheck = require("../helpers/schemaCheck")
const userAuthenticateSchema = require("../schemas/userAuthenticateSchema.json")
const passwordChangeSchema = require("../schemas/passwordChangeSchema.json")
const {ensureCorrectUserOrAdmin} = require("../middleware/auth")




router.post("/login", async (req, res, next) => {
    try {
        schemaCheck(req.body, userAuthenticateSchema)
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
        schemaCheck(req.body, userAuthenticateSchema)
        const { username, password } = req.body;
        const user = await User.register(username, password)
        const token = createToken(user)
        return res.status(201).json({ _token: token })
    } catch (e) {
        return next(e)
    }

})

router.patch("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        schemaCheck(req.body, passwordChangeSchema)
        const { username, oldPassword, newPassword } = req.body
        await User.authenticate(username, oldPassword)
        await User.editUser(username, { password: newPassword })
        return res.json({ msg: "success" })

    } catch (e) {
        return next(e)
    }

})



module.exports = router