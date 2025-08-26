const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.goToSignup)
.post( wrapAsync(userController.signupUsers));

router.route("/login")
.get(userController.goToLogin)
.post(passport.authenticate("local", {failureRedirect : '/login', failureFlash: true}), userController.loginUsers);


router.get("/logout", userController.logoutUser);


module.exports = router;
