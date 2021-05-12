const db = require("../db")
const {NotFoundError, BadRequestError} = require("../expressError")
class Lesson {
    constructor(id, subUnitNumber, material){
        this.id = id;
        this.subUnitNumber = subUnitNumber;
        this.material = material;
    }

    static async getLessonsFromSubUnit(subNum){
        const lessons = await db.query(`SELECT * FROM lessons WHERE subunit_number = $1`,[subNum])
        const result = lessons.rows.map(lesson => new Lesson(lesson.id, lesson.subunit_number, lesson.material))
        return result

    }

    static async completeLesson(username, language_code, lesson_id){
        const response = await db.query(`INSERT INTO user_lessons 
                                        (username, language_code, lesson_id)
                                        VALUES
                                        ($1, $2, $3)
                                        RETURNING
                                        username, language_code, lesson_id`
                                        ,[username, language_code, lesson_id])
        if(!response.rows.length) throw new BadRequestError
        return response.rows[0] 
    
    }

    static async unCompleteLesson(username, language_code, lesson_id){
        const response = await db.query(`DELETE FROM user_lessons 
                                        WHERE username = $1 
                                        AND language_code = $2 
                                        AND lesson_id = $3
                                        RETURNING lesson_id`
                                        ,[username, language_code, lesson_id])
        if(!response.rows.length) throw new BadRequestError
        return "success"
    }

    static async getUnitsAndSubunits(){
        const response = await db.query(
            `SELECT u.unit_name AS "unitName", u.unit_number AS "unitNumber", u.id,
            json_agg(subunits.id) AS "subUnits" FROM units AS u
            JOIN subunits ON subunits.unit_number = u.unit_number GROUP BY
            u.unit_name, u.unit_number, u.id ORDER BY u.unit_number
            `
        )

        return response.rows
    }

    static async getCompletedLessons(lang, username){
        const response = await db.query(
            `SELECT language_code AS "languageCode", json_agg(lesson_id) AS "lessonId"
            FROM user_lessons WHERE language_code=$1
            AND username=$2 GROUP BY language_code`, [lang, username]
        )
        if(!response.rows.length) return {languageCode: lang, lessonId: []}
        return response.rows[0]
    }

}



module.exports = Lesson