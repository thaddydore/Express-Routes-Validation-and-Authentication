const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

let  registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
    uppercase: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 255,
  },
  isAdmin: Boolean
})

registerSchema.methods.generateAuth = function () {
  const token = jwt.sign({ _id: this._id }, config.get("privateKey"));
  return token
}

const Register = mongoose.model("Register", registerSchema)

const schema = Joi.object({
  name: Joi.string().min(4).max(255).uppercase(),
  email: Joi.string().min(4).max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(4),
})

module.exports.Register = Register;
module.exports.schema = schema;