let model = require("./model");
const knex = require("./client");

module.exports = class cls extends model {
  constructor() {
    super("clucks");
  }

  // create a post
  create(post, hashtags) {
    let obj1 = knex(this.tblName).insert(post, "*");
    let obj2 = knex("hashtags").insert(hashtags, "*");

    return Promise.all([obj1, obj2]).then(data => {
      return { data1: data[0], data2: data[1] };
    });
  }

  getAll() {
    const knex = require("./client");

    let objArr = knex(this.tblName)
      .select("*")
      .orderBy("id", "desc");

    let objArr2 = knex("hashtags")
      .select("*")
      .orderBy("nos", "desc");

    let newObj = objArr.map(function(obj, index) {
      let dt1 = obj.created_at;
      let dt2 = Date.now();

      let displayDiff = "just now";
      let dtDiff = dt2 - dt1;
      let diffDays = Math.floor(dtDiff / (1000 * 3600 * 24));
      let diffHrs = Math.floor(dtDiff / (1000 * 3600));
      let diffMin = Math.floor(dtDiff / (1000 * 60));

      if (diffMin >= 1) {
        displayDiff = diffMin + " minutes ago";
      }
      if (diffHrs >= 1) {
        displayDiff = diffHrs + " hours ago";
      }
      if (diffDays >= 1) {
        displayDiff = diffDays + " days ago";
      }
      obj.created_at = displayDiff;
      return obj;
    });

    // return { data1: objArr2, data2: newObj }

    return Promise.all([objArr2, newObj]).then(data => {
      return { data1: data[0], data2: data[1] };
    });

    // return newObj;
  }
};
