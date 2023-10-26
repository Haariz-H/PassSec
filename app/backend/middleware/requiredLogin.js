const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("you must be logged in");
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_TOKEN, (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "you are not authorized" });
    }

    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
