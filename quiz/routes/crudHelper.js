module.exports = class curdHelper {
  //------  Show All Records --------
  viewAll(req, res, next, knexObj, viewFolder) {
    knexObj.getAll().then(data => {
      res.render(viewFolder + "/list", { data });
      //console.log(data);
    });
  }

  viewOne(req, res, next, knexObj, viewFolder) {
    const { id } = req.params;
    knexObj.getOne(id).then(data => {
      if (data) {
        res.render(viewFolder + "/view", data);
      } else {
        res.status(404);
        next(new Error("Record Not Found"));
      }
    });
  }

  editOne(req, res, next, knexObj, viewFolder) {
    const { id } = req.params;
    knexObj.getOne(id).then(data => {
      if (data) {
        res.render(viewFolder + "/edit", data);
      } else {
        res.status(404);
        next(new Error("Record Not Found"));
      }
    });
  }

  blankView(req, res, next, knexObj, viewFolder) {
    res.render(viewFolder + "/new");
  }

  saveRec(req, res, next, knexObj, viewFolder) {
    knexObj.create(req.body).then(data => {
      res.render(viewFolder + "/new", data[0]);
    });
  }
  updateRec(req, res, next, knexObj, homeRoute) {
    knexObj.update(req.params.id, req.body).then(posts => {
      //res.render(viewFolder + "/new", posts[0]);
      res.redirect(homeRoute);
    });
  }
  deleteRec(req, res, next, knexObj, homeRoute) {
    knexObj.delete(req.params.id).then(() => {
      res.redirect(homeRoute);
    });
  }
};
