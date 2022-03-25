// TODO: waiter -> name, role(auto), emp-id, password
const mongoose = require("mongoose");

const waiterSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  emp_id: {
    type: "string",
    require: true,
    unique: true,
  },
  password: {
    type: "string",
  },
  role: {
    type: "string",
  },
});

const Waiter = mongoose.model("waiters", waiterSchema);
module.exports = Waiter;
