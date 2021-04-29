const db = require("../db");
const {BadRequestError} = require("../expressError")
class FlashCard {

    static async getByDeckId(id){
        const results = await db.query(`SELECT * FROM flashcards WHERE deck_id = $1`,[id])
        if(!results.rows.length) throw new BadRequestError;
        return results.rows
    }
}


module.exports=FlashCard;