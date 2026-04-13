const Review = require("../models/review");
const Product = require("../models/product");

exports.addReview = async (req, res, next) => {
  try {
    const { rating, text } = req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      username: req.user.username,
      rating,
      text,
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

exports.getRecentReviews = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 3;
    const query = req.params.id ? { product: req.params.id } : {};

    // If getting site reviews, ensure product is null/undefined to distinguish from product reviews?
    // Or just return all reviews? Typically testimonial sections show generic positive reviews.
    // Let's assume site reviews have product: null.

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("username rating text createdAt product");

    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.addSiteReview = async (req, res, next) => {
  try {
    const { rating, text } = req.body;
    const review = await Review.create({
      user: req.user._id,
      username: req.user.username,
      rating,
      text,
      product: null, // Site review
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

exports.getSiteReviews = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    // Fetch reviews where product is null (site reviews)
    const reviews = await Review.find({ product: null })
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
