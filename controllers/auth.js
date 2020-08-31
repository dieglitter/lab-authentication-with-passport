const User = require("../models/User.model.js")
const { hashSync, genSaltSync } = require("bcrypt")
const passport = require("../config/passport")
const flash = require('connect-flash')

    exports.signupView = (req, res) => {
        res.render("auth/signup")
    }
  
  exports.signupProcess = async (req, res) => {
    const { username, password } = req.body
  
    if (username === "" || password === "") {
      return res.render("auth/signup", { error: "Missing fields." })
    }
  
    const existingUser = await User.findOne({ username })
    console.log(req.body, existingUser)
    if (existingUser) {
      return res.render("auth/signup", { error: "Error, try again." })
    }
    const hashPwd = hashSync(password, genSaltSync(12))
    await User.create({
      username,
      password: hashPwd
    })
    res.redirect("/login")
  }

  exports.loginView = (req, res) => {
    res.render("auth/login", { error: req.flash("error") })
  }
  exports.loginProcess = passport.authenticate("local", {
    successRedirect: "/private",
    failureRedirect: "/auth/login",
    failureFlash: true
  })
  
  exports.private = (req, res) => {
    res.render("auth/private", req.user)
  }
  

 

