const db = require("../db")
const { BadRequestError } = require("../expressError")


class Language {


    static async getAllLanguages() {
        const result = await db.query(`
        SELECT * FROM languages
        `)

        return result.rows
    }

    static async create(name, code='ru', flag){
        const result = await db.query(
            `INSERT INTO languages (name, code, flag)
            VALUES ($1, $2, $3)
            RETURNING *`,[name, code, flag]
        )
        if(!result.rows.length) throw new BadRequestError()
        return result.rows[0]
    }
}


module.exports = Language