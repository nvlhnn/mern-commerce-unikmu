/* eslint-disable no-undef */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
require("./config/passport")(app);

app.use(routes);

// ______________deployment_____________
// __dirname = path.resolve();
// if (process.env.NODE_ENV == "production") {
app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client/build", "index.html"));
});
// }

// app.get("/*", (req, res) => res.send("Index Page"));

app.listen(process.env.PORT || 5000, () => {
  console.log("conected to port 5000");
});
