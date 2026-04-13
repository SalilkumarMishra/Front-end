const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  priceAtPurchase: Number,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [orderItemSchema],
  address: {
    name: String,
    line1: String,
    line2: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String,
    email: String,
  },
  paymentMethod: { type: String, enum: ["COD", "RAZORPAY", "UPI", "CARD"], default: "COD" },
  paymentResult: {},
  totalAmount: Number,
  status: { type: String, default: "pending" }, // payment/general status
  deliveryStatus: { 
    type: String, 
    enum: ["pending", "shipped", "delivered", "cancelled"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
