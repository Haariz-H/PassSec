const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;
const requiredLogin = require("../middleware/requiredLogin");

router.get("/protected", requiredLogin, (req, res) => {
  res.send("Hello world");
});
router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exist" });
      }
      bcrypt
        .hash(password, 12)
        .then((hashedpassword) => {
          const user = new User({
            email,
            password: hashedpassword,
            name,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "saved Successfully" });
            })
            .catch((err) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add emailo or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid emailo or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //   let _id = savedUser._id;
          //   console.log(_id);
          //   res.json({ message: "Successfully signed in" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_TOKEN);
          res.send({ token });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
