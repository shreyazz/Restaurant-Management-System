const express = require("express");
const router = express.Router();
const Admin = require("../models/adminSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretCode = process.env.SECRET_CODE.toString();
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "please fill all fields" });
    }
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({ error: "admin is not registered" });
    }
    const isPasswordMatching = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatching) {
      return res.status(401).json({ error: "please ented valid credentials" });
    }

    //  ------
    const jwtPayload = jwt.sign(
      {
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
      secretCode
    );

    res.cookie("jwt", jwtPayload, {
      httpOnly: true,
    });

    // admin.jwtPayload = jwtPayload;
    await Admin.findOneAndUpdate(
      { email: admin.email },
      { $set: { jwtPayload: jwtPayload } }
    );

    res.json({ jwt: jwtPayload, username: admin.username, role: admin.role });
  } catch (err) {
    res.status(500).json({ error: "Some error occured 🔴" });
  }
});

module.exports = router;
