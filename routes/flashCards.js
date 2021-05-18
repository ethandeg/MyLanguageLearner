const express = require("express");
const db = require("../db");
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

router.patch("/deck", async(req, res, next) => {
    try {
        const {id, name} = req.body;
        const result = await FlashCard.editDeck(id, name)
        return res.json(result)
    } catch(e){
        return next(e)
    }
})

router.delete("/deck", async(req, res,next) => {
    try {
        const {id} = req.body;
        const result = await FlashCard.deleteDeck(id)
        return res.json(result)
    } catch(e){
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

router.patch("/", async (req, res , next) => {
    try {
        const {id, frontSide, backSide} = req.body;
        const results = await FlashCard.editFlashCard(id, frontSide,backSide)
        return res.json(results)
    } catch(e){
        return next(e)
    }

})

router.delete("/", async (req, res, next) => {
    try {
        const {id} = req.body
        const result = await FlashCard.deleteFlashCard(id)
        return res.json(result)
    } catch(e){
        return next(e)
    }
})




module.exports = router;