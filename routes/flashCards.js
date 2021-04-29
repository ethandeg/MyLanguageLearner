const express = require("express");
const router = new express.Router()
const FlashCard = require("../models/flashCard")

router.get("/:deck_id", async(req, res,next) => {
    try {
        const {deck_id} = req.params;
        const response = await FlashCard.getByDeckId(deck_id)
        return res.json(response)
    } catch(e){
        return next(e)
    }
})


module.exports=router;