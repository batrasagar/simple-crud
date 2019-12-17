"use strict";
const knex = require("./client");
// this is a helper module for querying our db
module.exports = {
  // get all todo
  getAll() {
    return knex("todo").select("*");
  },
  // get one post
  getOne(id) {
    return knex("todo")
      .where("id", id)
      .first();
  },
  // create a post
  create(post) {
    return knex("todo").insert(post, "*");
  },
  // update a post
  update(id, post) {
    return knex("todo")
      .where("id", id)
      .update(post, "*");
  },
  // delete a post
  delete(id) {
    return knex("todo")
      .where("id", id)
      .del();
  }
};
