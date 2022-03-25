const jwt = require("jsonwebtoken");
require("dotenv").config();

function authPrimaryAdmin(req, res, next) {
  // Get header value of auth
  // const token = req.cookies.jwt;
  // console.log(token);
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Bearer <jwt_token>
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    const secretCode = process.env.SECRET_CODE.toString();
    const tokenDecoded = jwt.verify(bearerToken, secretCode);
    if (tokenDecoded.role === "primary-admin") {
      next();
    } else {
      res.status(403).json({
        error:
          "This user is not the primary-admin. He/She can not add another admin 🔴",
      });
      // res.status(403).json({ error: "Error in authPrimaryAdmin Middleware" });
    }
    req.token = bearerToken;

    // Next middleware
  } else {
    res.status(403).json({ error: "Error in authPrimaryAdmin Middleware" });
  }
}

module.exports = authPrimaryAdmin;
