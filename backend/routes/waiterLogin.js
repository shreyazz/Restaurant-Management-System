const express = require("express");
const Router = express.Router();
const Waiter = require("../models/waiterSchema");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE.toString();

Router.post("/waiter-login", async (req, res) => {
  const { emp_id, password } = req.body;
  try {
    if (!emp_id || !password) {
      return res.status(422).json({ error: "please fill all fields 🔴" });
    }

    const waiter = await Waiter.findOne({ emp_id });
    if (!waiter)
      return res.status(422).json({ error: "waiter is not registered 🔴" });

    const isPasswordMatching = await bcrypt.compare(password, waiter.password);
    if (!isPasswordMatching)
      return res
        .status(401)
        .json({ error: "please ented valid credentials 🔴" });

    const jwtPayload = jwt.sign(
      {
        username: waiter.username,
        role: waiter.role,
      },
      secretCode
    );
    res.json({ jwt: jwtPayload, role: waiter.role });
  } catch (e) {
    res.status(500).json({ error: "Some error occured 🔴" });
  }
});

module.exports = Router;
