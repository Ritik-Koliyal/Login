const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/gurukul");

mongoose.connection.on("connected", () => {
  console.log("db connected successfully ");
});

mongoose.connection.on("err", () => {
  console.log("db not connected ");
});

require("./usermodel");
app.use(require("./route"));

app.listen(3100, () => {
  console.log("server started");
});
