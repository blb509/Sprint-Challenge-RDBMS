const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById
};

function find() {
  return db("actions");
}

function findById(id) {
  return db("actions")
    .where({ id })
    .first();
}
