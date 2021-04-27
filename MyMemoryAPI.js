const axios = require("axios")
const BASE_URL = "https://api.mymemory.translated.net/get"
let BASE_EMAIL = "no"
let count = 0
const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
const translatePhrase = async(query, language) => {
    try{
        let res = await axios.get(`${BASE_URL}?q=${query}&langpair=en|${language}&de=${BASE_URL}${count}@gmail.com`)
        const valid = res.data.matches.filter(match => !alphabet.includes(match.translation[0]))
        return valid
    } catch(e){
        count++
        let res = await axios.get(`${BASE_URL}?q=${query}&langpair=en|${language}&de=${BASE_URL}${count}@gmail.com`)
        const valid = res.data.matches.filter(match => !alphabet.includes(match.translation[0]))
        return valid
    }

}


module.exports = translatePhrase