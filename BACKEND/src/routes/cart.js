const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getCart, addToCart, updateCartItem, deleteCartItem } = require("../controllers/cartControllers");

router.use(protect);
router.route("/").get(getCart).post(addToCart);
router.route("/:id").put(updateCartItem).delete(deleteCartItem);

module.exports = router;
