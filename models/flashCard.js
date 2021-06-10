const db = require("../db");
const { BadRequestError } = require("../expressError")
class FlashCard {

    static async getByDeckId(id) {
        const results = await db.query(`SELECT id, deck_id AS "deckId", front_side AS "frontSide", back_side AS "backSide" FROM flashcards WHERE deck_id = $1`, [id])
        return results.rows
    }

    static async createDeck(username, name) {
        const results = await db.query(
            `INSERT INTO decks (username, name) VALUES ($1, $2) RETURNING username,name, id`, [username, name]
        )
        return results.rows[0]
    }

    static async createFlashCard(deckId, front, back) {
        const results = await db.query(
            `INSERT INTO flashcards (deck_id, front_side, back_side)
            VALUES 
            ($1, $2, $3)
            RETURNING deck_id AS "deckId", front_side AS "frontSide", back_side AS "backSide", id`, [deckId, front, back]
        )

        if (!results.rows[0]) throw new BadRequestError;
        return results.rows[0]
    }

    static async editFlashCard(id, frontSide, backSide){
        const results = await db.query(
            `UPDATE flashcards
            SET front_side = $2, back_side=$3
            WHERE id = $1
            RETURNING id, deck_id AS "deckId", front_side AS "frontSide", back_side AS "backSide"`, [id, frontSide, backSide]
        )
        if(!results.rows[0]) throw new BadRequestError
        return results.rows[0]
    }

    static async deleteFlashCard(id){
        const results = await db.query(
            `DELETE FROM flashcards WHERE id = $1 RETURNING id`, [id]
        )
        if(!results.rows[0]) throw new BadRequestError
        return results.rows[0]
    }

    static async editDeck(id, name){
        const results = await db.query(
            `UPDATE decks
            SET name=$2
            WHERE id=$1
            RETURNING *`,[id, name]
        )

        if(!results.rows[0]) throw new BadRequestError
        return results.rows[0]
    }

    static async deleteDeck(id) {
        const results = await db.query(
            `DELETE FROM decks WHERE id=$1 RETURNING id`, [id]
        )

        if(!results.rows[0]) throw new BadRequestError
        return results.rows[0]
    }

    
}


module.exports = FlashCard;