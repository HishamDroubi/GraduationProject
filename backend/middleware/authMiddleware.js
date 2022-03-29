const jwt = require("jsonwebtoken");
const asyncHAndler = require("express-async-handler");
const User = require("../models/user");
const protect = asyncHAndler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "abc123");
      req.currentUser = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No authorized, no token");
  }
});
module.exports = { protect };
