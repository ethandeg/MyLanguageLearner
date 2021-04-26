const express = require("express")
const cors = require("cors")

const app = express()
const testCall = require("./MyMemoryAPI")
app.use(express.json())
app.use(cors())


app.get("/", async(req, res, next) => {
    let call = await testCall("I only have six friends", "ru")
    res.json(call)
})


app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  
  /** Generic error handler. */
  
  app.use(function (err, req, res, next) {
    if (err.stack) console.error(err.stack);
  
    res.status(err.status || 500).json({
      message: err.message,
      status: err.status
    });
  });
  
  
  module.exports = app;