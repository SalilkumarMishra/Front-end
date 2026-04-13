const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  seedAdmin,
} = require("../controllers/adminController");
const { getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderControllers");
const { protectAdmin } = require("../middleware/adminMiddleware");

router.post("/login", loginAdmin);
router.post("/seed", seedAdmin); // Use responsibly
router.get("/ping", (req, res) => res.json({ status: "Admin routes are online!", time: new Date() }));
router.get("/profile", protectAdmin, getAdminProfile);
router.put("/profile", protectAdmin, updateAdminProfile);
router.get("/orders", protectAdmin, getAllOrders);
router.put("/orders/:id", protectAdmin, updateOrderStatus);
router.delete("/orders/:id", protectAdmin, deleteOrder);

module.exports = router;
