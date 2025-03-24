const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
router.post("/signin", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    //  console.log(username)
    //  console.log(email)

    const exitingUser = await User.findOne({ username: username });
    //  console.log(exitingUser)
    const exitingEmail = await User.findOne({ email: email });
    //  console.log(exitingEmail)

    if (exitingUser) {
      return res.status(300).json({ message: "Username already exits" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should have atleast 4 character" });
    }

    if (exitingEmail) {
      return res.status(300).json({ message: "Email already exits" });
    }
    const hashPass = await bcrypt.hash(req.body.password, 10);
    console.log("before new User:");
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });
    //   console.log("newUser", newUser)
    await newUser.save();
    return res.status(200).json({ message: "SignIn Successfully" });
  } catch (error) {
    console.log(" Error from sign in page: ", error);
    res.status(500).json({ message: "internal server error!!" });
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const exitingUser = await User.findOne({ username: username });

    if (!exitingUser) {
      return res
        .status(400)
        .json({ message: "Username or Password is incorrect" });
    }
    bcrypt.compare(password, exitingUser.password, (err, data) => {
      if (data) {
        const token = jwt.sign(
          { name: exitingUser.username, id: exitingUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          token: token,
          username: exitingUser.username,
          id: exitingUser._id,
          
        });
        console.log(token);
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    console.log("Error from login", error);
  }
});

module.exports = router;
