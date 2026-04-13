const express = require("express");
const router = express.Router();
const { signup, login, forgotPassword, resetPassword } = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/create-admin-dev", require("../controllers/authControllers").createAdminDev);

module.exports = router;
