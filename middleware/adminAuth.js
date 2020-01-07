

//to check if a user is an admin
module.exports = function (req, res, next) {
  if (!req.register.isAdmin) return res.status(403).send("access denied");
  next()
}