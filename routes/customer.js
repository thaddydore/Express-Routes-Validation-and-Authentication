const express = require("express");
const router = express.Router();
const { schema, Customer } = require("../model/customerSchema");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/adminAuth");

//route for reading customer from the database
router.get("/", async (req, res) => {
  try {
    const customer = await Customer.find().sort("name");
    if (!customer) return res.status(404).send("customer not found");
    res.send(customer)
  }
  catch (err) { if (err) return res.status(404).send("customer not found") }
});

//route for creating a new customer
router.post("/", async (req, res) => {
  const {name, email, password} = req.body
  const { error } = await schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    let customer = await Customer.find({ email: req.body.email })
    if (customer) return res.status(400).send("user already exist");
    
    customer = await Customer.create({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    customer.save();

    res.send(customer)
  }
  catch (err){ if (err) return res.status(400).send(err.message)}
})

//editing a single route
router.put("/:id", async (req, res) => {
  const { _id } = req.params.id
  const { name, email, password } = req.body;
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const customer = await Customer.findByIdAndUpdate(_id, {name, email, password})
    res.send(customer)
  }catch(err) {if (err) return res.status(400).send(err.message)}
})

//Getting a single route
router.get("/:id", async (req, res) => {
  try {
    const { _id } = req.params.id
    const customer = await Customer.findById(_id);
    if (!customer) return res.status(404).send("customer not found");
    res.send(customer)
  }catch(err){if (err) return res.status(404).send("customer not found") }
})

//delete route
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const { _id } = req.params.id
    const customer = Customer.findByIdAndDelete(_id)
    if (!customer) return res.status(404).send("customer not found");
    res.send(customer)
  }catch(err){if (err) return res.status(404).send("customer not found")}
})

module.exports = router;