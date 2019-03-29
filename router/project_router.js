const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig.js");
const Model = require("../models/project-model");

router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Model.findById(req.params.id);
    const project_id = req.params.id;
    const projAct = await db("actions").where({ project_id });

    project.actions = projAct;

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  "19": "Another record with that value exists"
};

router.post("/projects", async (req, res) => {
  try {
    const [id] = await db("projects").insert(req.body);

    const project = await db("projects")
      .where({ id: id })
      .first();

    res.status(201).json(project);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

module.exports = router;
