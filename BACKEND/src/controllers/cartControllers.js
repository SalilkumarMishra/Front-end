const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    // Frontend expects an array of items
    res.json(cart ? cart.items : []);
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
      return res.json(cart);
    }
    const idx = cart.items.findIndex((i) => i.product.toString() === productId);
    if (idx > -1) cart.items[idx].quantity += quantity;
    else cart.items.push({ product: productId, quantity });
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.id || req.body.productId;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const idx = cart.items.findIndex((i) => i.product.toString() === productId);
    if (idx === -1)
      return res.status(404).json({ message: "Product not in cart" });
    if (quantity <= 0) cart.items.splice(idx, 1);
    else cart.items[idx].quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    cart.updatedAt = Date.now();
    await cart.save();
    // Return the updated items array
    res.json(cart.items);
  } catch (err) {
    next(err);
  }
};
