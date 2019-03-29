const db = require("../data/dbConfig.js");

module.exports = {
  findById
};

function findById(id) {
  let project = db("projects")
    .where({ id })
    .first();

  return project;
}
