const express = require("express");
const user = express();
user.get("/", (req, res) => {
  res.send("user!!!");
});
module.exports = user;
