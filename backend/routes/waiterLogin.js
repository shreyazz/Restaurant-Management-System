const express = require("express");
const Router = express.Router();
const Waiter = require("../models/waiterSchema");
const bcrypt = require("bcryptjs");
require("dotenv").config();
Router.post("/waiter-login", async (req, res) => {
  const { emp_id, password } = req.body;
  try {
    if (!emp_id || !password) {
      return res.status(422).json({ error: "please fill all fields 🔴" });
    }
    const waiter = await Waiter.findOne({ emp_id });
    if (!waiter) res.status(422).json({ error: "waiter is not registered 🔴" });
    const isPasswordMatching = await bcrypt.compare(password, waiter.password);
    if (!isPasswordMatching)
      res.status(401).json({ error: "please ented valid credentials 🔴" });
    res.json({
      message: "waiter logged in successfully 🟢",
      details: {
        emp_id: waiter.emp_id,
        password: waiter.password,
      },
    });
  } catch (e) {
    res.status(500).json({ error: "Some error occured 🔴" });
  }
});

module.exports = Router;
