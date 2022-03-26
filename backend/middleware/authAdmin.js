const jwt = require("jsonwebtoken");
require("dotenv").config();

function authAdmin(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const secretCode = process.env.SECRET_CODE.toString();
    const tokenDecoded = jwt.verify(bearerToken, secretCode);
    if (
      tokenDecoded.role === "admin" ||
      tokenDecoded.role === "primary-admin"
    ) {
      next();
    } else {
      res.status(403).json({
        error: "This user is not an admin. He/She can not add new waiter/chef",
      });
    }
  }
}

module.exports = authAdmin;
