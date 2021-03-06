const express = require("express")
const cors = require("cors")

const app = express()
const translatePhrase = require("./MyMemoryAPI")
const lessonRoutes = require("./routes/lessons");
const userRoutes = require("./routes/users")
const languageRoutes = require("./routes/languages")
const flashCardRoutes = require("./routes/flashCards")
const authRoutes = require("./routes/auth")
const db = require("./db");
const {authenticateJWT, ensureLoggedIn} = require("./middleware/auth")
app.use(express.json())
app.use(cors())
app.use(authenticateJWT)

app.use("/lesson", lessonRoutes)
app.use("/user", userRoutes)
app.use("/language", languageRoutes)
app.use("/flashcards", flashCardRoutes)
app.use("/auth", authRoutes)



app.get("/translate",ensureLoggedIn, async (req, res, next) => {
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