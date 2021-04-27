const axios = require("axios")
const BASE_URL = "https://api.mymemory.translated.net/get"
//q - term
//langpair - en|it
const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
const translatePhrase = async(query, language) => {
    try{
        let res = await axios.get(`${BASE_URL}?q=${query}&langpair=en|${language}&de=ethandeg1996@outlook.com`)
        const valid = res.data.matches.filter(match => !alphabet.includes(match.translation[0]))
        return valid
    } catch(e){
        console.error(e)
        return "something went wrong"
    }

}


module.exports = translatePhrase