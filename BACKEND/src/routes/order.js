const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/orderControllers");

router.route("/").post(protect, createOrder).get(protect, getOrders);

module.exports = router;
