const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const secret = process.env.ENCRYPT;

let ItemSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});
ItemSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });
// module.exports = mongoose.model("Item", ItemSchema);
mongoose.model("Item", ItemSchema);
