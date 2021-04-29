const db = require("../db")


class Language {


    static async getAllLanguages() {
        const result = await db.query(`
        SELECT * FROM languages
        `)

        return result.rows
    }
}


module.exports = Language