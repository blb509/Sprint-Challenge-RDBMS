const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig.js");
const Model = require("../models/action-model");

router.get("/actions", async (req, res) => {
  try {
    const actions = await Model.find();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/actions/:id", async (req, res) => {
  try {
    const action = await Model.findById(req.params.id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  "19": "Another record with that value exists"
};

router.post("/actions", async (req, res) => {
  try {
    const [id] = await db("actions").insert(req.body);

    const action = await db("actions")
      .where({ id: id })
      .first();

    res.status(201).json(action);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

module.exports = router;
