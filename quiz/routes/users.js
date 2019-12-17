var express = require("express");
var router = express.Router();

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // a week in milliseconds

const users = require("../db/users");
let obj = new users();

const viewFolder = "users";
const homeRoute = "/users";

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

//--- Show Blank Form -----------
router.get("/signup", (req, res, next) => {
  res.render(viewFolder + "/signup");
});

router.post("/signup", (req, res, next) => {
  obj.create(req.body).then(data => {
    res.render(viewFolder + "/signup", data[0]);
  });
});
//--- Show Blank Form -----------
router.get("/login", (req, res, next) => {
  res.render(viewFolder + "/login");
});

//--- Show Blank Form -----------
router.get("/logout", (req, res, next) => {
  res.clearCookie("username");
  res.clearCookie("login");
  res.redirect("/users/login");
});

router.post("/login", (req, res, next) => {
  res.cookie("username", req.body.UserName, { maxAge: COOKIE_MAX_AGE });
  res.cookie("login", 1, {
    maxAge: COOKIE_MAX_AGE
  });
  res.redirect("/clucks");
});
module.exports = router;
