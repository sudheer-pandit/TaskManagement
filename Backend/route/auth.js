const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("authheadr:-", authHeader);

    const token = authHeader && authHeader.split(" ")[1];
    console.log("\ntokne:-", token);

    if (!token) {
      return res
        .status(400)
        .json({ message: "Authentication token is required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Attach user info to request
    req.user = decoded;

    next(); // Move to the next middleware/route handler
  } catch (error) {
    console.error("Error From auth:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    }

    return res.status(403).json({ message: "Invalid or Expired Token", error });
  }
};

module.exports = { auth };
