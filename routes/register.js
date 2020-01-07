const express = require("express");
const router = express.Router();
const { schema, Register } = require("../model/registerSchema");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth")

//check if  a user is online //getting a current user
router.get("/me", auth, async (req, res) => {
  const user = await Register.find(req.register._id).select("-password");
  res.send(user);
})

//creating a new user route
router.post("/", async (req, res) => {
 
  //validate body request with Joi
  const {name, email, password} = req.body
  const { error } = await schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  //check if user is already registered and return error message
  try { 
    let register = await Register.findOne({ email});
    if (register)return res.status(404).send("email already registered")
  
    //create new user and hash the password
    register = await Register.create({ name, email, password })
    const salt = await bcrypt.genSalt(10);
    register.password = await bcrypt.hash(register.password, salt);
    register.save();
    
    //generate token
    const token = register.generateAuth();
    res.header("x-auth-token", token).send(_.pick(register, ["name", "email", "_id"]));

  }
  catch (errors) {if(errors) return res.status(400).send(console.log(errors.message))}
})

module.exports = router;