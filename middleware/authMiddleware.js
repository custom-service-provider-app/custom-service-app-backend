const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "your_jwt_secret");
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied. Only ADMIN can perform this action." });
  }
  next();
};

exports.isSeller = (req, res, next) => {
  if (req.user.role !== "SELLER") {
    return res.status(403).json({ error: "Access denied. Only SELLERS can add a listing." });
  }
  next();
};

