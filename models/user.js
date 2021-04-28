const db = require("../db")
const { BadRequestError } = require("../expressError")

class User {
    //JSON_BUILD_OBJECT to nest
    //https://stackoverflow.com/questions/42222968/create-nested-json-from-sql-query-postgres-9-4
    static async getAllInformation(username){
        //ideal response for test user:
        // {
        //     username: testuser,
        //     experience: 100,
        //     profilePic: null,
        //     languages: [
        //         {es: Spanish, lessons: [3,4,7]}
        //         {it: Italian, lessons: [1,2,3]}
        //     ],
        //     decks {
        //         1: "unit 1"
        //     }
        // }

            const result = await db.query(`
            WITH completed_lessons AS (
                SELECT language_code, json_agg(lesson_id) AS lessonIds 
                FROM user_lessons WHERE username = $1 GROUP BY language_code
            )
            SELECT u.username, u.experience, u.profile_pic,
            json_agg(json_build_object('code', l.code, 'name', l.name, 'lessons', lessonIds)) AS languages,
            json_object_agg(d.id, d.name) AS decks 
            FROM users AS u
            JOIN user_language ON u.username=user_language.username
            JOIN languages AS l ON user_language.language_code = l.code
            JOIN decks AS d ON d.username=u.username
            JOIN user_lessons ON u.username = user_lessons.username
            JOIN completed_lessons ON completed_lessons.language_code=user_lessons.language_code
            WHERE u.username=$1
            GROUP BY u.username
            `, [username])
            const test = await db.query(`
                SELECT json_agg(lesson_id) AS lessonIds FROM
                user_lessons WHERE username = $1 GROUP BY language_code
            `,[username])
    if(!result.rows.length) throw new BadRequestError
    return test.rows
    }
}
//SAMPLE SELECTING EVERYTHING W/O ARRAY_AGG






module.exports = User