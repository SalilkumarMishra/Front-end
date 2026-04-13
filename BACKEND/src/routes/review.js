const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addReview, getRecentReviews, addSiteReview, getSiteReviews } = require("../controllers/reviewController");

router.route("/site").get(getSiteReviews).post(protect, addSiteReview);
router.route("/:id").post(protect, addReview).get(getRecentReviews);

module.exports = router;
