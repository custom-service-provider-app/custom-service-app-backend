const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    if (decoded.role !== "ADMIN") return res.status(403).json({ error: "Admin access required" });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
