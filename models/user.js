const db = require("../db")
const { BadRequestError } = require("../expressError")

class User {
    //JSON_BUILD_OBJECT to nest
    //https://stackoverflow.com/questions/42222968/create-nested-json-from-sql-query-postgres-9-4
    static async getAllInformation(username) {


        const result = await db.query(`
                SELECT username, experience, profile_pic AS profilePic 
                FROM users WHERE username=$1
            `, [username])
        if (!result.rows.length) throw new BadRequestError
        const languages = await db.query(`
            SELECT language_code AS code, name, json_agg(lesson_id) AS lessons
            FROM user_lessons JOIN languages ON user_lessons.language_code = languages.code
            WHERE username = $1 GROUP BY language_code, languages.name

            `, [username])

        const deck = await db.query(`
                        SELECT id, name FROM decks WHERE username =$1 
            `, [username])


        return { ...result.rows[0], languages: languages.rows, deck: deck.rows }
    }
}
//SAMPLE SELECTING EVERYTHING W/O ARRAY_AGG






module.exports = User