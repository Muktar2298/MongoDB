const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

// -- crateing Mongoose model based on Schema
const Todo = mongoose.model("Todo", todoSchema);

// GET all the Todos
router.get("/", async (req, res) => {});

// GET a single todo by ID
router.get("/:id", async (req, res) => {});

// insert single todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body); // using the Mngoose model
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side Problem!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted succesfully!!",
      });
    }
  });
});

// insert Multiple todos
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side Problem!",
      });
    } else {
      res.status(200).json({
        message: "Todo were inserted succesfully!!",
      });
    }
  });
});

// update single todo by ID
router.put("/:id", async (req, res) => {
  /* await Todo.updateOne(
    { _id: req.params.id },
    { $set: { status: "inactive" } },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side Problem!",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated succesfully!!",
        });
      }
    }
  ); */
  try {
    await Todo.updateOne({ _id: req.params.id }, { $set: { status: "inactive"}});
    res.status(200).json({message: "Todo Was Update successfully!"});
  } catch (error) {
    res.status(500).json({error:'There was a Server Side Error!'})
  }
});

// DELETE single todo
router.post("/:id", async (req, res) => {});

module.exports = router;
