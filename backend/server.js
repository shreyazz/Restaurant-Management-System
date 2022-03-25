const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParser());
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const cors = require("cors");
// connection to DB
const connectToDB = require("./db/conn");
connectToDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ! admin routes
app.use("/login", require("./routes/adminLogin"));
app.use("/register", require("./routes/adminRegister"));
// ! chef routes
app.use("/login", require("./routes/chefLogin"));
app.use("/register", require("./routes/chefRegister"));
// ! waiter routes
app.listen(PORT, () =>
  console.log(`Server Started on http://localhost:${PORT}`)
);
