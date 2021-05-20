const express = require("express");
const router = new express.Router()
const translatePhrase = require("../MyMemoryAPI")
const Lesson = require("../models/lesson")
const schemaCheck = require("../helpers/schemaCheck")
const lessonCompleteSchema = require("../schemas/lessonCompleteSchema.json")



router.post("/complete", async (req, res, next) => {
    try {
        schemaCheck(req.body, lessonCompleteSchema)
        const { languageCode, username, lessonId } = req.body;
        const result = await Lesson.completeLesson(username, languageCode, lessonId)

        return res.status(201).json(result)
    } catch (e) {
        return next(e)
    }

})

router.delete("/complete", async (req, res, next) => {
    try {
        schemaCheck(req.body, lessonCompleteSchema)
        const { languageCode, username, lessonId } = req.body;
        await Lesson.unCompleteLesson(username, languageCode, lessonId)
        return res.json({ msg: "deleted" })
    } catch (e) {
        return next(e)
    }

})

//route to query for associated  subunits for a given unit
router.get("/units", async (req, res, next) => {
    try {
        const result = await Lesson.getUnitsAndSubunits()
        return res.json(result)
    } catch (e) {
        return next(e)
    }

})
//units => subunits => lessons => user_lessons
// first, grab all units and subunits, send them
//then route to request completed lessons for a specific language and user
router.get("/units/lessons/completed", async (req, res, next) => {
    try {
        const { languageCode, username } = req.query;
        const response = await Lesson.getCompletedLessons(languageCode, username)
        return res.json(response)
    } catch (e) {
        return next(e)
    }
})
//route to query for lessons for a given subunit, translated in a specific language
router.get("/translate", async (req, res, next) => {
    try {
        //soon to do =>
        //narrow down res from api to just segment, translation, looks like pulling english results still?
        const { languageCode, subUnit } = req.query;
        const material = await Lesson.getLessonsFromSubUnit(subUnit)
        const promises = []
        for (row of material) {
            const contents = translatePhrase(row.material, languageCode)
            //promise.all => array of promises
            //push each promise from api call to an array
            promises.push(contents)
        }
        //call promise.all to the promises array
        Promise.all(promises).then(values => {
            // const response = values.map((val,i ) => {
            //     return {segment: val[i].segment, translation: val[i].translation}
            // })
            // console.log(response)

            return res.json(values)
        })

    } catch (e) {
        return next(e)
    }

    // return res.json(material.rows)
});
module.exports = router;