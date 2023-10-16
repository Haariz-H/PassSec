const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
}, {
    collection: "item",
});
module.exports = mongoose.model("Item", ItemSchema);