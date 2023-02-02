const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = checkToken;
