const express = require("express");
const router = new express.Router()
const Language = require("../models/language")


router.get('/', async (req, res, next) => {
    try {
        const response = await Language.getAllLanguages()
        res.json(response)
    } catch (e) {
        return next(e)
    }

})

module.exports = router