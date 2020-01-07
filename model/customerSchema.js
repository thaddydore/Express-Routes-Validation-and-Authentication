const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
    unique:true
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
})

const Customer = mongoose.model("Customer", customerSchema);

const schema = Joi.object({
  name: Joi.string().min(4).max(255).required(),
  email: Joi.string().min(3).max(255).required(),
  password: Joi.string().min(3).max(255).required(),
})

module.exports.Customer = Customer;
module.exports.schema = schema;

