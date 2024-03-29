const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Waiter = require("../models/waiterSchema");
const authAdmin = require("../middleware/authAdmin");
router.post("/waiter-reg", authAdmin, async (req, res) => {
  const { name, emp_id, password } = req.body;

  try {
    if (!name || !emp_id || !password) {
      return res.status(422).json({ error: "please fill all fields" });
    }
    const waiter = await Waiter.findOne({ emp_id });
    if (waiter) {
      return res.status(422).json({ error: "waiter already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const newWaiter = await Waiter.create({
      name: name,
      emp_id: emp_id,
      password: hashedPass,
      role: "waiter",
    });
    if (newWaiter) res.json({ message: "waiter is created successfully" });
  } catch (err) {
    return res.json({ error: "Some error occurred" });
  }
});

module.exports = router;
