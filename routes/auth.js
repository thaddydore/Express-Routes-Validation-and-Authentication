const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Register, schema } = require("../model/registerSchema");
const register = Register();
const auth = require("../middleware/auth")

//creating a login route
router.post("/", auth, async (req, res) => {
  //validate the body request
  const { error } =  schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  //check if email and password is valid
  try {
    let validEmail = await Register.findOne({ email: req.body.email });
    if (!validEmail) return res.status(400).send("invalid mail");

    const validePassword = await bcrypt.compare(req.body.password, validEmail.password)
    if (!validePassword) return res.status(400).send("invalid password");
    
    //check if token is valid
    const token = register.generateAuth()
    res.send(token);
  }
  catch (err) { if (err) return res.status(400).send(err.message) }
})
module.exports = router;