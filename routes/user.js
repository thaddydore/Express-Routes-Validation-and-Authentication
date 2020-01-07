const express = require("express");
const router = express.Router();
const { schema, User } = require("../model/userSchema");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { __v: 0 });
    if (!users) return res.status(404).send("could not find user");
    res.send(users);
  }
  catch (err) { if (err) return res.status(404).send("could not find user") };
});

router.post("/", async (req, res) => {
  const { firstname, lastname } = req.body;
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.create({ firstname, lastname });
    res.send(user);
  }
  catch (err) { if (err) return res.status(400).send(err.message) };
});

router.put("/:id", async (req, res) => {
  const {_id} = req.params.id
  const { firstname, lastname } = req.body;
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findByIdAndUpdate(_id, { firstname, lastname });
    res.send(user)
  }
  catch (err) { if (err) return res.status(400).send("Id not found") };
})

router.delete("/:id", async (req, res) => {
  try {const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  }
  catch (err) { if (err) return res.status(400).send("id not valid") };
})

module.exports = router;