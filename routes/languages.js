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

router.post("/", async (req,res,next) => {
    try {
        const {name,code, flag} = req.body;
        const response = await Language.create(name,code,flag)
        res.json(response)
    } catch(e){
        return next(e)
    }
})

module.exports = router