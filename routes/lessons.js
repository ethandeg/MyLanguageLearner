const express = require("express");
const router = new express.Router()
const translatePhrase = require("../MyMemoryAPI")
const Lesson = require("../models/lesson")


router.get("/", async(req, res, next) => {
try{
    const {lang, subUnit} = req.query;
    const material = await Lesson.getLessonsFromSubUnit(subUnit)
    const response = []
    for(row of material) {
      const contents = await translatePhrase(row.material, lang)
      response.push(contents)
    }
    return res.json(response)
} catch(e){
    return next(e)
}

// return res.json(material.rows)
});

router.post("/complete", async(req, res, next) => {
    try{
        const {languageCode, username, lessonId} = req.body;
        const result = await Lesson.completeLesson(username, languageCode, lessonId)
 
        return res.status(201).json(result)
    } catch(e){
        return next(e)
    }

})

router.delete("/complete", async(req, res, next) => {
    try {
        const {languageCode, username, lessonId} = req.body;
        await Lesson.unCompleteLesson(username, languageCode, lessonId)
        return res.json({msg: "deleted"})
    } catch(e){
        return next(e)
    }

})


module.exports = router;