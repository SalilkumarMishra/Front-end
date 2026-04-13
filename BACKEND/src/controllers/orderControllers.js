const Order = require("../models/order");
const mongoose = require("mongoose");
const Cart = require("../models/cart");
const Product = require("../models/product");
const razorpay = require("../utils/razorpayHelper");
const socketHelper = require("../utils/socket");
const crypto = require("crypto");

exports.createOrder = async (req, res, next) => {
  try {
    const {
      paymentMethod,
      address,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    let items = [];
    let total = 0;
    if (
      req.body.items &&
      Array.isArray(req.body.items) &&
      req.body.items.length
    ) {
      // Direct order from frontend (guest/quick checkout)
      items = await Promise.all(
        req.body.items.map(async (it) => {
          const prod = await Product.findById(it.product);
          if (!prod) throw new Error("Product not found");
          total += prod.price * (it.quantity || 1);
          return {
            product: prod._id,
            quantity: it.quantity || 1,
            priceAtPurchase: prod.price,
          };
        })
      );
    } else {
      // Fallback to user's cart
      const cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product"
      );
      if (!cart || cart.items.length === 0)
        return res.status(400).json({ message: "Cart is empty" });
      items = cart.items.map((i) => {
        const price = i.product.price;
        total += price * i.quantity;
        return {
          product: i.product._id,
          quantity: i.quantity,
          priceAtPurchase: price,
        };
      });
    }

    // If RAZORPAY, create server-side order or verify payment
    if (paymentMethod === "RAZORPAY") {
      // If the frontend already created order and returned payment details to server for verification:
      if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
        // create a razorpay order and return it -> frontend should complete payment
        const order = await razorpay.orders.create({
          amount: Math.round(total * 100),
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          payment_capture: 1,
        });
        return res.json({ razorpayOrder: order, total });
      } else {
        // verify signature
        const generatedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
          .update(`${razorpayOrderId}|${razorpayPaymentId}`)
          .digest("hex");
        if (generatedSignature !== razorpaySignature) {
          return res
            .status(400)
            .json({ message: "Payment verification failed" });
        }
      }
    }

    // create order (allow guest orders when req.user is not set)
    const userId = req.user && req.user._id ? req.user._id : null;
    const newOrder = await Order.create({
      user: userId,
      items,
      address,
      paymentMethod,
      paymentResult:
        paymentMethod === "RAZORPAY"
          ? { razorpayPaymentId, razorpayOrderId }
          : {},
      totalAmount: total,
      status: ["RAZORPAY", "UPI", "CARD"].includes(paymentMethod) ? "paid" : "pending",
      deliveryStatus: "pending",
    });

    // decrement product stock for each ordered item (ensure non-negative)
    const stockUpdates = [];
    try {
      await Promise.all(
        items.map(async (it) => {
          const prod = await Product.findById(it.product);
          if (!prod) return;
          prod.stock = Math.max(0, (prod.stock || 0) - it.quantity);
          await prod.save();
          stockUpdates.push({ product: prod._id, stock: prod.stock });
        })
      );
    } catch (e) {
      console.error("Error updating product stock:", e.message || e);
    }

    // clear cart if this was a logged-in user
    if (req.user && req.user._id) {
      await Cart.findOneAndDelete({ user: req.user._id });
    }

    // populate order for admin/frontend view
    try {
      await newOrder.populate("user", "name username email");
      await newOrder.populate("items.product", "name image");
    } catch (e) {
      // ignore populate errors
    }

    // emit real-time events
    try {
      const io = socketHelper.getIO();
      if (io) {
        io.emit("newOrder", newOrder);
        if (stockUpdates.length) io.emit("productStockUpdate", stockUpdates);
      }
    } catch (e) {
      console.error("Socket emit error:", e.message || e);
    }

    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name username email")
      .populate("items.product", "name image");
    return res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name username email");
    // ensure items.product populated for admin view
    await Order.populate(orders, {
      path: "items.product",
      select: "name image",
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Order ID format" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: `Order with ID ${req.params.id} not found in database.` });

    order.deliveryStatus = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    next(err);
  }
};

// Admin: Delete order
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.deleteOne();
    res.json({ message: "Order removed successfully" });
  } catch (err) {
    next(err);
  }
};
