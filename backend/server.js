const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5001;

// connection to DB
const connectToDB = require("./db/conn");
connectToDB();

app.use(express.json());
app.use("/login", require("./routes/adminLogin"));
app.use("/register", require("./routes/adminRegister"));

app.listen(PORT, () =>
  console.log(`Server Started on http://localhost:${PORT}`)
);
