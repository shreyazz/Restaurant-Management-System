const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  email: {
    required: true,
    type: "string",
    unique: true,
  },
  username: {
    required: true,
    type: "string",
    unique: true,
  },
  password: {
    required: true,
    type: "string",
  },
  role: {
    type: "string",
  },
  jwtPayload: {
    type: "string",
  },
});

const Admin = mongoose.model("admins", adminSchema);
module.exports = Admin;
