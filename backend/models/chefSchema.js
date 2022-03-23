// TODO: chef -> name, role(auto), emp-id, password

const mongoose = require("mongoose");

const chefSchema = mongoose.Schema({
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

const Chef = mongoose.model("chefs", chefSchema);
module.exports = Chef;
