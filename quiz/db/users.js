let model = require("./model");
module.exports = class cls extends model {
  constructor() {
    super("Users");
  }
  checkLogin(uid, pwd) {
    console.log(uid, pwd);
    const knex = require("./client");
    return knex.raw(
      `Select count(*)Nos from "Users" where "UserName"='${uid}' and "Password"='${pwd}' `
    );
  }
};
