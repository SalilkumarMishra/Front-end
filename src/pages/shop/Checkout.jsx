import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cart, cartTotal, clearCart } = useCart();

  // Check if coming from "Buy Now" (single product) or Cart
  const isBuyNow = state?.product;
  const buyNowProduct = state?.product;
  const buyNowQty = state?.qty || 1;

  // Items to checkout
  const checkoutItems = isBuyNow 
    ? [{ ...buyNowProduct, quantity: buyNowQty }]
    : cart;

  // Calculate total
  const subtotal = isBuyNow 
    ? buyNowProduct.price * buyNowQty
    : cartTotal;

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postal: "",
    city: "",
    country: "India",
    saveInfo: false,
    paymentMethod: "cod",
  });

  const shippingFee = form.address ? 50 : 0;
  const total = subtotal + shippingFee;

  // Redirect if no items to checkout
  useEffect(() => {
    if (!isBuyNow && cart.length === 0) {
      navigate("/products");
    }
  }, [isBuyNow, cart, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const placeOrder = () => {
    if (!form.email || !form.address || !form.firstName) {
      alert("Please fill required fields before placing order.");
      return;
    }
    
    // Clear cart if checking out from cart
    if (!isBuyNow) {
      clearCart();
    }
    
    alert("🎉 Order placed successfully!");
    navigate("/order-success");
  };

  // Show loading while checking
  if (!isBuyNow && cart.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">

        {/* LEFT SECTION */}
        <div>
          {/* CONTACT */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Information</h2>

            <input
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:border-[#82D173] outline-none transition mb-2"
            />

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="saveInfo"
                onChange={handleChange}
                className="accent-[#82D173]"
              />
              Email me with news and offers
            </label>
          </div>

          {/* DELIVERY */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Delivery Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg focus:border-[#82D173] outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg focus:border-[#82D173] outline-none"
                />
              </div>
            </div>

            <label className="text-sm text-gray-600 mt-4 block">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:border-[#82D173] outline-none"
            />

            <label className="text-sm text-gray-600 mt-4 block">
              Apartment, suite, etc. (Optional)
            </label>
            <input
              type="text"
              name="apartment"
              value={form.apartment}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:border-[#82D173] outline-none"
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">Postal Code</label>
                <input
                  type="text"
                  name="postal"
                  value={form.postal}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg focus:border-[#82D173]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg focus:border-[#82D173]"
                />
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={handleChange}
                  className="accent-[#82D173]"
                />
                Credit / Debit Card
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={form.paymentMethod === "upi"}
                  onChange={handleChange}
                  className="accent-[#82D173]"
                />
                UPI (Google Pay / PhonePe)
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="accent-[#82D173]"
                />
                Cash on Delivery
              </label>
            </div>

            <button
              onClick={placeOrder}
              className="mt-6 w-full bg-[#82D173] text-white py-3 rounded-lg font-semibold hover:bg-[#6CBD63] transition"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* RIGHT SECTION — ORDER SUMMARY */}
        <div className="sticky top-20 bg-white shadow-md rounded-xl p-6 h-fit border border-gray-100">

          <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>

          {/* Products */}
          <div className="space-y-4 border-b pb-4 max-h-64 overflow-y-auto">
            {isBuyNow ? (
              <div className="flex items-center gap-4">
                <img
                  src={buyNowProduct.image}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{buyNowProduct.name}</h3>
                  <p className="text-sm text-gray-500">{buyNowQty} item(s)</p>
                </div>
                <p className="ml-auto font-semibold text-gray-900">₹{buyNowProduct.price}</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <img
                    src={item.image || "https://placehold.co/100x100?text=Product"}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              ))
            )}
          </div>

          {/* Discount Code */}
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              placeholder="Discount code"
              className="border p-3 rounded-lg flex-1 focus:border-[#82D173] outline-none"
            />
            <button className="px-4 bg-[#e5e7eb] rounded-lg hover:bg-gray-300 transition">
              Apply
            </button>
          </div>

          {/* Breakdown */}
          <div className="mt-5 text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{form.address ? `₹${shippingFee}` : "Enter address"}</span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t pt-4">
              <span>Total</span>
              <span className="text-green-600">₹{total}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
