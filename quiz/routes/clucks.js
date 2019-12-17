const express = require("express");
const router = express.Router();
const queries = require("../db/queries");
const clucks = require("../db/clucks");
const crudHelper = require("./crudHelper");
const viewFolder = "clucks";
const homeRoute = "/clucks";
let obj = new clucks();
let helper = new crudHelper();

function CalcTags(str) {
  str = str + " "; // just to get last hash
  let arr = str.match(/(^|\s|\n)(#[a-z\d-]+)/gi);

  arr = arr.map(elm => elm.trim());
  var countObj = arr.reduce(function(acc, curr) {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  let newArr = [];

  for (key in countObj) {
    newArr.push({ hashtag: key, nos: countObj[key] });
  }

  return newArr;
}

//-------helper validations --------------

const isValidId = (req, res, next) => {
  //return true;
  return next();
  // check if the id is a valid number
  if (!isNaN(req.params.id)) return next();
  res.status(400);
  next(new Error("Invalid Id"));
};

const validPost = post => {
  return true; ///forcibly
  const hasTitle = typeof post.title === "string" && post.title.trim() !== "";
  const hasImageUrl =
    typeof post.imageUrl === "string" && post.imageUrl.trim() !== "";

  return hasTitle && hasImageUrl;
};

//------------- ALL ROUTES ---------------------------

//--- List All Data -----------
router.get("/", (req, res, next) => {
  obj.getAll().then(data => {
    res.render(viewFolder + "/list", { data });
  });
});

//----- Show (Single)
router.get("/view/:id", isValidId, (req, res, next) => {
  helper.viewOne(req, res, next, obj, viewFolder);
});

//--- Show Blank Form -----------
router.get("/new", (req, res, next) => {
  helper.blankView(req, res, next, obj, viewFolder);
});

//----- Post New Data (SAVE)
router.post("/", (req, res, next) => {
  if (!validPost(req.body)) {
    res.status(400);
    next(new Error("Invalid Post"));
    return;
  }

  let hashTags = CalcTags(req.body.content);

  obj.create(req.body, hashTags).then(data => {
    res.render(viewFolder + "/new", data[0]);
  });
});

//----- Show (EDIT)
router.get("/edit/:id", isValidId, (req, res, next) => {
  helper.editOne(req, res, next, obj, viewFolder);
});

//----- Update New Data (Update)
router.patch("/edit/:id", (req, res, next) => {
  if (!validPost(req.params.id, req.body)) {
    res.status(400);
    next(new Error("Invalid Post"));
  }
  helper.updateRec(req, res, next, obj, homeRoute);
});

router.delete("/delete/:id", isValidId, (req, res, next) => {
  helper.deleteRec(req, res, next, obj, homeRoute);
});

module.exports = router;
