function authPrimaryAdmin(req, res, next) {
  // Get header value of auth
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Bearer <jwt_token>
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    res.status(403).json({ error: "Error in authPrimaryAdmin Middleware" });
  }
}

module.exports = authPrimaryAdmin;
