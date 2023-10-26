const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../middleware/requiredLogin");
const Item = mongoose.model("Item");

router.get("/item-list", requiredLogin, (req, res) => {
  Item.find({ postedBy: req.user._id })
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      console.log(err);
    });
});

{
}
router.post("/create-item", requiredLogin, (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status.status(422).json({ error: "Please enter all fields" });
  }
  req.user.name = undefined;
  req.user.email = undefined;
  req.user.password = undefined;
  const item = new Item({
    name,
    email,
    password,
    postedBy: req.user,
  });
  item
    .save()
    .then((result) => {
      //   console.log(result);
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/:id", requiredLogin, (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  Item.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        Item: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//if postedBy!==req.user._id
router.patch("/:id", requiredLogin, async (req, res) => {
  //   const { name, email, password } = req.body;
  //   if (postedBy !== req.user._id) {
  //     res.json("Must be logged in");
  //   }
  console.log(req.user._id);
  const itemId = req.params.id;
  const newItem = await Item.findOneAndUpdate({ _id: itemId }, req.body, {
    new: true,
  });
  res.json({ newItem });
});

router.delete("/:id", requiredLogin, (req, res) => {
  const id = req.params.id;
  const data = Item.deleteOne({ id });
  res.send("successfully Deleted");
});

module.exports = router;
