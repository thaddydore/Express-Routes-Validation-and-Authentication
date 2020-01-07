const config = require("config");
const jwt = require("jsonwebtoken");

//middleware for checking a token 
module.exports = async function (req, res, next) {
  const token = await req.header("x-auth-token");
  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = jwt.verify(token, config.get("privateKey"));
    req.register = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send("bad token")
  }
};



