const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
// -- crateing Mongoose model based on Schema
const User = new mongoose.model("User", userSchema);

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    // Encrypt the password using bcrypt package
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.name,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "Signup Successful!" });
  } catch (err) {
    res.status(500).json({ error: "Signup Failed" });
  }
});

module.exports = router;
