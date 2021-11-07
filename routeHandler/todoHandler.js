const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

// -- crateing Mongoose model based on Schema
const Todo = new mongoose.model("Todo", todoSchema);

//  instance methode
router.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data: data,
  });
});

// static methods
router.get("/js", async (req, res) => {
  const data = await Todo.findByJS();
  res.status(200).json({ data: data });
});

// query helpers
router.get("/language", async (req, res) => {
  // const data = await Todo.find().byLanguage("JS");
  const data = await Todo.find().byLanguage("React");
  res.status(200).json({ data });
});

// GET all the Todos
router.get("/", (req, res) => {
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ error: "Server Side Problem" });
      } else {
        res.status(200).json({
          result: data,
          message: "Success!",
        });
      }
    });
});

// GET a single todo by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findOne({ _id: req.params.id });
    res.status(200).json({ data: data, message: "Success" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side Problem!" });
  }
});

// insert single todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted succesfully!!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side Problem!",
    });
  }
});

// insert Multiple todos
router.post("/all", async (req, res) => {
  /*  // way -01
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
  }); */
  // way -02
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todo were inserted succesfully!!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side Problem!",
    });
  }
});

// update single todo by ID
router.put("/:id", async (req, res) => {
  /*   // way -01
  await Todo.updateOne(
    { _id: req.params.id },
    { $set: { status: "inactive" } },
    (err) => {
      if (err) {
        res.status(500).json({ error: "There was a Server Side Error!" });
      } else {
        res.status(200).json({ message: "Todo Was Update successfully!" });
      }
    }
  ); */

  // way -02
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      { $set: { status: "inactive" } }
    );
    res.status(200).json({ message: "Todo Was Update successfully!" });
  } catch (error) {
    res.status(500).json({ error: "There was a Server Side Error!" });
  }
});

// update & read the result
router.put("/:id", async (req, res) => {
  /* 
  // way -01
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { title: "MongoDB Database & Others" } },
    { new: true, useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(500).json({ error: "There was a Server side Problem!" });
      } else {
        res.status(200).json({ message: "Updated Succesful!" });
      }
    }
  ); */

  // way -02
  try {
    var result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { title: "MongoDB Database & Others" } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Updated Succesful!" });
  } catch (err) {
    res.status(500).json({ error: "There was a Server side Problem!" });
  }
  console.log(result);
});

// DELETE single todo
router.delete("/:id", async (req, res) => {
  /*   // way -01
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({ error: "Server Side Problem!" });
    } else {
      res.status(200).json({ message: "Succesfully Deteted" });
    }
  }); */
  // way -02
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Succesfully Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Problem!" });
  }
});

// delete all todos
router.delete("/", async (req, res) => {
  /*  // way -01
  await Todo.deleteMany({}, (err) => {
    if (err) {
      res.status(500).json({ error: "Server Side Problem!" });
    } else {
      res.status(200).json({ message: "Succesfully Deteted All Documents" });
    }
  }); */

  // way -02
  try {
    await Todo.deleteMany({});
    res.status(200).json({ message: "Succesfully Deleted All Documents!" });
  } catch (err) {
    res.status(500).json({ error: "Server Side Problem!" });
  }
});

module.exports = router;
