const axios = require("axios")
const BASE_URL = "https://api.mymemory.translated.net/get"
//q - term
//langpair - en|it

const testCall = async(query, language) => {
    let res = await axios.get(`${BASE_URL}?q=${query}&langpair=en|${language}`)
    return res.data.matches[0]
}


module.exports = testCall