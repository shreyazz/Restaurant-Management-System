const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Chef = require("../models/chefSchema");

router.post("/chef-reg", async (req, res) => {
  const { name, emp_id, password } = req.body;

  try {
    if (!name || !emp_id || !password) {
      return res.status(422).json({ error: "please fill all fields" });
    }
    const chef = await Chef.findOne({ emp_id });
    if (chef) {
      return res.status(422).json({ error: "chef already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const newChef = await Chef.create({
      name: name,
      emp_id: emp_id,
      password: hashedPass,
      role: "chef",
    });
    if (newChef) res.json({ message: "chef is created successfully" });
  } catch (err) {
    return res.json({ error: "Some error occurred" });
  }
});

module.exports = router;

// Auth => Bearer jwt_token
// Bearer, jwt_token
// jwt_token = role => primary admin
//
