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
        //     decks [{
        //         1: "unit 1"
        //     }]
        // }

            const result = await db.query(`
                SELECT username, experience, profile_pic AS profilePic 
                FROM users WHERE username=$1
            `,[username])

            const languages = await db.query(`
            SELECT language_code, name AS code, json_agg(lesson_id) AS lessons
            FROM user_lessons JOIN languages ON user_lessons.language_code = languages.code
            WHERE username = $1 GROUP BY language_code, languages.name;

            `, [username])

            const deck = await db.query(`
                        SELECT json_agg(json_build_object(id, name)) AS decks FROM decks
                        WHERE username=$1
            `, [username])
    // if(!result.rows.length) throw new BadRequestError

    return {...result.rows[0], languages: languages.rows, deck: deck.rows}
    }
}
//SAMPLE SELECTING EVERYTHING W/O ARRAY_AGG






module.exports = User