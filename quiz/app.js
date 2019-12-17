let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let methodOverride = require("method-override");
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let clucks = require("./routes/clucks");
let hbs = require("hbs");

let app = express();
app.use(logger("dev"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

hbs.registerHelper("select", function(selected, options) {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"');
});

hbs.registerHelper("ifCond", function(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.username = req.cookies.username;
  res.locals.login = req.cookies.login;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.message = err.message;
  // console.log("--------exit middleware");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/clucks", clucks);

// error handler

module.exports = app;
