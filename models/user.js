const db = require("../db")
const { BadRequestError, NotFoundError } = require("../expressError")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { sqlForPartialUpdate } = require("../helpers/sql")
const { user } = require("../db")

class User {
    //JSON_BUILD_OBJECT to nest
    //https://stackoverflow.com/questions/42222968/create-nested-json-from-sql-query-postgres-9-4
    static async getAllInformation(username) {


        const result = await db.query(`
                SELECT username, experience, profile_pic AS "profilePic", email, admin 
                FROM users WHERE username=$1
            `, [username])
        if (!result.rows.length) throw new BadRequestError
        const languages = await db.query(`
        SELECT language_code AS "languageCode", name FROM user_language JOIN languages
        ON user_language.language_code = languages.code WHERE username=$1;
       

            `, [username])

        const deck = await db.query(`
                        SELECT id, name FROM decks WHERE username =$1 
            `, [username])


        return { ...result.rows[0], languages: languages.rows, deck: deck.rows }
    }

    static async getAllUsers() {
        const result = await db.query(`
            SELECT username, experience, profile_pic AS profilePic, email, admin 
            FROM users;
        `)

        if (!result.rows.length) throw new BadRequestError
        return result.rows
    }

    static async newLearner(username, langCode) {
        const result = await db.query(
            `INSERT INTO user_language
            (username, language_code)
            VALUES
            ($1, $2)
            RETURNING username, language_code AS "languageCode"`,
            [username, langCode])

        if (!result.rows.length) throw BadRequestError
        return result.rows[0]
    }

    static async quitLearning(username, langCode) {
        const result = await db.query(
            `DELETE FROM user_language
            WHERE username=$1 AND
            language_code=$2
            `, [username, langCode]
        )

        return result
    }


    static async register(username, password) {

        const duplicateCheck = await db.query(`SELECT username FROM users WHERE username=$1`, [username])
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate username: ${username}`)
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
        const result = await db.query(
            `INSERT INTO users (username, password)
            VALUES ($1, $2) RETURNING username`, [username, hashedPassword]
        )

        return result.rows[0]
    }

    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username, password FROM users
            WHERE username=$1`, [username]
        )
        const user = result.rows[0]
        if (user) {
            const isValid = await bcrypt.compare(password, user.password)
            if (isValid) {
                delete user.password;
                return user
            }

        }
        
        throw new BadRequestError("Username/password is invalid")
    }

    static async earnExperience(username, amount) {
        const result = await db.query(
            `UPDATE users
            SET experience = experience + $2
            WHERE username=$1 
            RETURNING username, experience`, [username, amount]
        )
        if (!result.rows.length) throw new BadRequestError;
        return result.rows[0]
    }

    static async editUser(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)
        }
        const { setCols, values } = sqlForPartialUpdate(data)
        const usernameVarIdx = `$${values.length + 1}`
        const querySql =
            `UPDATE users
            SET ${setCols}
            WHERE username = ${usernameVarIdx}
            RETURNING 
            username, profile_pic AS "profilePic", experience, email, admin`


        const result = await db.query(querySql, [...values, username])
        if (!result.rows[0]) throw new NotFoundError(`No user ${username}`)
        delete user.password
        return result.rows[0]
    }

}






module.exports = User