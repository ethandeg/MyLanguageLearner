const db = require("../db")


class Language {


    static async getAllLanguages() {
        const result = await db.query(`
        SELECT * FROM languages
        `)

        return result.rows
    }

    static async create(code,name,flag){
        const result = await db.query(
            `INSERT INTO languages (code, name, flag)
            VALUES ($1, $2, $3) RETURNING *`,[code,name,flag]
        )

        return result.rows
    }
}


module.exports = Language