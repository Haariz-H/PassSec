require("dotenv").config();
let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let getPwnage = require("./pwned");
const app = express();
// getPwnage("19B58");
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name:${x.connections[0].name}`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });
app.use(express.json());
require("./models/user");
require("./models/Item");

const authRouter = require("./routes/auth");
const itemRoute = require("./routes/itemRoute");
app.use("/auth", authRouter);

app.use("/api/item", itemRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port: " + port);
});
