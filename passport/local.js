const LocalStrategy = require("passport-local").Strategy
const users = {
  //
  //lalo: {
  //   username: lalo,
  //   password: 123,
  //   name: lalo 
  // }
  "lalo": {
    username: "lalo",
    password: "123",
    name: "lalo"
  }
}

module.exports = (passport) => {
  const authUser = (username, password, done) => {
    const user = users[username]

    if(!user) {
      console.log("noexiste")
      // no existe el usuario
      return done(null, false)
    }

    if (password != user.password) {
      console.log("passwords no coinciden")
      // no coinciden contras
      return done(null, false)
    }

    done(null, user)
  }

  const registerUser = (req, username, password, done) => {
    const user = users[username]
    if (user) {
      return done(null, false)
    }

    users[username] = {
      username,
      password,
      name: req.body.name
    }

    console.log(users)

    done(null, users[username])
  }

  passport.use("login", new LocalStrategy(authUser))
  passport.use("register", new LocalStrategy({
    passReqToCallback: true
  }, registerUser))

  passport.serializeUser((user, done) => done(null, user.username))
  passport.deserializeUser((username, done) => done(null, users[username]))
  // { passport: { id: 1 }}
  // req.user
}