const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.protectAdmin = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if role is admin (optional extra check if we put role in token)
    if (decoded.role !== "admin") {
         return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(401).json({ message: "Admin not found" });
    
    req.user = admin; // Attach admin to req.user
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
