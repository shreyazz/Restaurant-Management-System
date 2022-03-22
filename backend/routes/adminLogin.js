const express = require("express");
const router = express.Router();
const Admin = require("../models/adminSchema");
const bcrypt = require("bcryptjs");

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "please fill all fields" });
    }
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(422).json({ error: "admin is not registered" });
    }
    const isPasswordMatching = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatching) {
      return res.json({ error: "please ented valid credentials" });
    }

    res.json({ admin });
  } catch (err) {
    res.status(500).json({ error: "Some error occured 🔴" });
  }
});

module.exports = router;
