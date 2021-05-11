const axios = require("axios")
const BASE_URL = "https://api.mymemory.translated.net/get"
const BASE_EMAIL = "jimmya"
let count = 0


const reduceResponse = (arr) => {

    const obj = {segment: null, translation: []}
    arr.map(seg => {
        const segment = arr[0].segment
        if(obj.segment !== segment){
            obj.segment = segment
        } 
        obj.translation.push(seg.translation)
        
    })
    return obj 
}
const translatePhrase = async(query, language) => {
    try{
        let res = await axios.get(`${BASE_URL}?q=${query}&langpair=en|${language}&de=${BASE_EMAIL}${count}@gmail.com`)

       
        const reduced = reduceResponse(res.data.matches)
        return reduced
    } catch(e){
        count++
        let res = await axios.get(`${BASE_URL}?q=${query}&langpair=en|${language}&de=${BASE_EMAIL}${count}@gmail.com`)

       
        const reduced = reduceResponse(res.data.matches)
        return reduced
    }

}


module.exports = translatePhrase