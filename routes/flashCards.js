const express = require("express");
const router = new express.Router()
const FlashCard = require("../models/flashCard")
const schemaCheck = require("../helpers/schemaCheck")
const flashCardCreateSchema = require("../schemas/flashCardCreateSchema.json")
const deckCreateSchema = require("../schemas/deckCreateSchema.json")
const deckUpdateSchema = require("../schemas/deckUpdateSchema.json")
const deckDeleteSchema = require("../schemas/deckDeleteSchema.json")
const flashCardUpdateSchema = require("../schemas/flashCardUpdateSchema.json")
const flashCardDeleteSchema = require("../schemas/flashCardDeleteSchema.json")


router.post("/", async (req, res, next) => {
    try {
        schemaCheck(req.body, flashCardCreateSchema)
        const { frontSide, backSide, deckId } = req.body;
        const result = await FlashCard.createFlashCard(deckId, frontSide, backSide)
        return res.status(201).json(result)
    } catch (e) {
        return next(e)
    }

})

router.post("/deck/new", async (req, res, next) => {
    try {
        schemaCheck(req.body, deckCreateSchema)
        const { username, name } = req.body;
        const result = await FlashCard.createDeck(username, name)
        return res.status(201).json(result)
    } catch (e) {
        return next(e)
    }

})

router.patch("/deck", async (req, res, next) => {
    try {
        schemaCheck(req.body, deckUpdateSchema)
        const { id, name } = req.body;
        const result = await FlashCard.editDeck(id, name)
        return res.json(result)
    } catch (e) {
        return next(e)
    }
})

router.delete("/deck", async (req, res, next) => {
    try {
        schemaCheck(req.body, deckDeleteSchema)
        const { id } = req.body;
        const result = await FlashCard.deleteDeck(id)
        return res.json(result)
    } catch (e) {
        return next(e)
    }
})

router.get("/deck/:deckId", async (req, res, next) => {
    try {

        const { deckId } = req.params;
        const response = await FlashCard.getByDeckId(deckId)
        return res.json(response)
    } catch (e) {
        return next(e)
    }
});

router.patch("/", async (req, res, next) => {
    try {
        schemaCheck(req.body, flashCardUpdateSchema)
        const { id, frontSide, backSide } = req.body;
        const results = await FlashCard.editFlashCard(id, frontSide, backSide)
        return res.json(results)
    } catch (e) {
        return next(e)
    }

})

router.delete("/", async (req, res, next) => {
    try {
        schemaCheck(req.body, flashCardDeleteSchema)
        const { id } = req.body
        const result = await FlashCard.deleteFlashCard(id)
        return res.json(result)
    } catch (e) {
        return next(e)
    }
})




module.exports = router;