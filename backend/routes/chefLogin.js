const express = require("express");
const Router = express.Router();
const Chef = require("../models/chefSchema");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE.toString();

Router.post("/chef-login", async (req, res) => {
  const { emp_id, password } = req.body;
  try {
    if (!emp_id || !password) {
      return res.status(422).json({ error: "please fill all fields" });
    }

    const chef = await Chef.findOne({ emp_id });
    if (!chef) return res.status(422).json({ error: "Chef is not registered" });

    const isPasswordMatching = await bcrypt.compare(password, chef.password);
    if (!isPasswordMatching)
      return res.status(401).json({ error: "please ented valid credentials" });

    const jwtPayload = jwt.sign(
      {
        username: chef.emp_id,
        role: chef.role,
      },
      secretCode
    );

    res.json({ jwt: jwtPayload, role: chef.role });
  } catch (e) {
    res.status(500).json({ error: "Some error occured 🔴" });
  }
});

module.exports = Router;
