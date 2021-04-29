const express = require("express")
const cors = require("cors")

const app = express()
const translatePhrase = require("./MyMemoryAPI")
const lessonRoutes = require("./routes/lessons");
const userRoutes = require("./routes/users")
const languageRoutes = require("./routes/languages")
const flashCardRoutes = require("./routes/flashCards")
const db = require("./db");
app.use(express.json())
app.use(cors())

app.use("/lesson", lessonRoutes)
app.use("/user", userRoutes)
app.use("/language", languageRoutes)
app.use("/flashcards", flashCardRoutes)

app.get("/", async (req, res, next) => {
  const { q, lang } = req.query;
  let call = await translatePhrase(q, lang)
  res.json(call)
});







app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});


module.exports = app;