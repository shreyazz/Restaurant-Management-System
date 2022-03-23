const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminSchema");
// ! this route is secured... only logged in admins can access this route
router.post("/admin-reg", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(422).json({ error: "please fill all fields" });
    }
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      return res.status(422).json({ error: "admin already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const newAdmin = await Admin.create({
      email: email,
      username: username,
      password: hashedPass,
      role: "admin",
    });
    if (newAdmin) res.json({ message: "admin is created successfully" });
  } catch (err) {
    return res.json({ error: "Some error occurred" });
  }
});

module.exports = router;
