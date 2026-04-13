const express = require("express");
const router = express.Router();
const { getProducts, getProduct, createProduct } = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct);

module.exports = router;
