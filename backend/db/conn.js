const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.CON_STRING.toString();
const connectToDB = () => {
  mongoose.connect(URI, (err) => {
    if (!err) console.log("Connected to DB 🟢");
    else console.log("Not connected to DB 🔴");
  });
};

module.exports = connectToDB;