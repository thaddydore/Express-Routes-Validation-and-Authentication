const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 4,
    maxlength: 23,
    required: true,
    lowercase: true
  },
  lastname: {
    type: String,
    minlength: 4,
    maxlength: 23,
    required: true,
    lowercase: true
  }
});

const schema = Joi.object({
  firstname: Joi.string().min(4).max(25).required().lowercase(),
  lastname: Joi.string().min(4).max(25).required().lowercase()
})
const User = mongoose.model("User", userSchema);

module.exports.User= User;
module.exports.schema= schema;