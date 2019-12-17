"use strict";
const knex = require("./client");
// this is a helper module for querying our db
module.exports = class Model {
  constructor(tblName) {
    this.tblName = tblName;
  }
  // get all todo
  getAll() {
    return knex(this.tblName)
      .select("*")
      .orderBy("id", "desc");
  }
  // get one post
  getOne(id) {
    return knex(this.tblName)
      .where("id", id)
      .first();
  }
  // create a post
  create(post) {
    return knex(this.tblName).insert(post, "*");
  }
  // update a post
  update(id, post) {
    return knex(this.tblName)
      .where("id", id)
      .update(post, "*");
  }
  // delete a post
  delete(id) {
    return knex(this.tblName)
      .where("id", id)
      .del();
  }
};
