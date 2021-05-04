const express = require("express");
const router = new express.Router()
const FlashCard = require("../models/flashCard")


router.post("/", async (req, res, next) => {
    try {
        const { frontSide, backSide, deckId } = req.body;
        const result = await FlashCard.createFlashCard(deckId, frontSide, backSide)
        return res.status(201).json(result)
    } catch (e) {
        return next(e)
    }

})

router.post("/deck/new", async (req, res, next) => {
    try {
        const { username, name } = req.body;
        const result = await FlashCard.createDeck(username, name)
        return res.status(201).json(result)
    } catch (e) {
        return next(e)
    }

})

router.get("/deck/:deck_id", async (req, res, next) => {
    try {
        const { deck_id } = req.params;
        const response = await FlashCard.getByDeckId(deck_id)
        return res.json(response)
    } catch (e) {
        return next(e)
    }
});




module.exports = router;