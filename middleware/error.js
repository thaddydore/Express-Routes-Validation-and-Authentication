// const wiston = require("wiston")

//module for creating an error middleware
module.exports = function (error, req, res, next) {
  res.status(500).send("something happen")
}