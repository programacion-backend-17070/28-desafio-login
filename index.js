(() => {
  const express = require("express")
  const session = require("express-session")
  const cookieParser = require("cookie-parser")
  const passport = require("passport")

  const homeRouter = require("./routes/home")
  const initializePassport = require("./passport/local")

  const app = express()
  
  initializePassport(passport)

  app.use(express.json()) // req.body
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser()) // req.cookies

  app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })) // req.session

  app.use(passport.initialize())
  app.use(passport.session())

  // app.use("/static/", express.static(path.join(__dirname, "../public")))

  app.use("/", homeRouter)
  app.listen(8080, () => console.log("listening"))
})()