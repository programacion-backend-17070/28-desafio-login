const router = require("express").Router()
const { auth } = require("../middlewares/auth")
const passport = require("passport")
const path = require("path")

router.get("/", auth, (req, res) => {
  console.log(req.body)
  console.log(req.cookies)

  res.cookie("name", 123)

  console.log(req.session)

  res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"))
})

router.get("/login/error", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/error.html"))
})

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login/error"
}))

// registro

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"))
})

router.get("/register/error", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/errorRegistro.html"))
})

router.post("/register", passport.authenticate("register", {
  successRedirect: "/",
  failureRedirect: "/register/error"
}))

module.exports = router