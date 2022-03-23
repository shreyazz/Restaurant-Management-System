const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminSchema");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretCode = process.env.SECRET_CODE.toString();
const authPrimaryAdmin = require("../middleware/authPrimaryAdmin");
// ! this route is secured... only primary admin can access this route
router.post("/admin-reg", authPrimaryAdmin, async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(422).json({ error: "please fill all fields" });
    }
    const token = req.token;

    jwt.verify(token, secretCode, async (err, user) => {
      if (err) {
        res.status(403).json({ error: "some error occured in /admin-reg 🔴" });
      }
      console.log(user);
      const role = user.role;
      if (role === "primary-admin") {
        const admin = await Admin.findOne({ email });
        if (admin) {
          return res.status(422).json({ error: "Admin already exists" });
        }
        const hashedPass = await bcrypt.hash(password, 12);
        const newAdmin = await Admin.create({
          email: email,
          username: username,
          password: hashedPass,
          role: "admin",
        });
        if (newAdmin) res.json({ message: "admin is created successfully" });
      } else {
        res.status(403).json({ error: "Forbidden Request 🔴" });
      }
    });

    // const admin = await Admin.findOne({ email: email });
    // if (admin) {
    //   return res.status(422).json({ error: "admin already exists" });
    // }
  } catch (err) {
    return res.json({ error: "Some error occurred" });
  }
});

module.exports = router;
