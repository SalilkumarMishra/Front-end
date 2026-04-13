const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");
const Admin = require("../models/admin");
const { sendResetEmail } = require("../utils/mailer");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const exist = await User.findOne({ $or: [{ email }, { username }] });
    if (exist)
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
    const user = await User.create({ name, username, email, password });
    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server Error: " + err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1. Try finding as User
    let user = await User.findOne({ username });

    // If not found by username, maybe they entered email? (Optional enhancement for User)
    if (!user) {
      user = await User.findOne({ email: username });
    }

    if (user) {
      const isMatch = await user.matchPassword(password);
      if (isMatch) {
        const token = generateToken(user);
        return res.json({
          token,
          role: "user",
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: "user",
          },
        });
      }
    }

    // 2. If User not found or password failed, Try finding as Admin
    // Admin login is typically email based, so we treat 'username' input as email
    const admin = await Admin.findOne({ email: username });
    if (admin) {
      const isMatch = await admin.matchPassword(password);
      if (isMatch) {
        // Generate token (reuse generateToken or create specific admin token)
        // For now reusing generateToken provided it handles the payload correctly

        const token = jwt.sign(
          { id: admin._id, role: "admin", email: admin.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.json({
          token,
          role: "admin",
          user: { id: admin._id, email: admin.email, role: "admin" },
        });
      }
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server Error: " + err.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // respond success to avoid email enumeration
      return res.json({
        message: "If that email exists, a reset link has been sent.",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendResetEmail(user.email, resetUrl);
    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashed = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

exports.createAdminDev = async (req, res) => {
  try {
    const email = "admin@nutrinest.com";
    const password = "admin123";

    // Remove existing
    await Admin.deleteOne({ email });

    // Create new
    const admin = await Admin.create({ email, password });
    res.json({ message: "Admin created successfully", admin });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
