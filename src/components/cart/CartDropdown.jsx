import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { X, Trash2, Plus, Minus, ChevronDown, Gift } from "lucide-react";
import { useState } from "react";

const CartDropdown = ({ onClose }) => {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [showInstructions, setShowInstructions] = useState(false);

  const FREE_SHIPPING_AMOUNT = 500;
  const progress = Math.min((cartTotal / FREE_SHIPPING_AMOUNT) * 100, 100);
  const remaining = FREE_SHIPPING_AMOUNT - cartTotal;

  return (
    <>
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full w-[420px] max-w-full bg-white shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-900">My shopping cart</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-black transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-5">
          {/* Free shipping bar */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-800 mb-2">
              {cartTotal >= FREE_SHIPPING_AMOUNT ? (
                <span className="text-green-600">Congratulations, you've got free shipping!</span>
              ) : (
                <>Add <span className="text-orange-500 font-semibold">₹{remaining.toFixed(0)}</span> more to get free shipping</>
              )}
            </p>

            <div className="relative w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-linear-to-r from-yellow-400 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              {/* Gift icon at end */}
              <div className="absolute -right-1 -top-2 bg-yellow-400 rounded-full p-1">
                <Gift className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link 
                to="/products" 
                onClick={onClose}
                className="inline-block bg-[#82D173] text-white px-6 py-2 rounded-lg hover:bg-[#6EBB5E] transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  {/* Product Image */}
                  <img 
                    src={item.image || "https://placehold.co/80x80?text=Product"} 
                    alt={item.name} 
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-gray-800">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">₹{item.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Size: {item.size || "500g"}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section - Fixed */}
        {cart.length > 0 && (
          <div className="border-t bg-white p-5">
            {/* Order Special Instructions */}
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              className="flex items-center justify-between w-full py-3 text-gray-700 border-b"
            >
              <span className="font-medium">Order special instructions</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showInstructions ? 'rotate-180' : ''}`} />
            </button>

            {showInstructions && (
              <textarea 
                placeholder="Add any special instructions..."
                className="w-full mt-2 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:border-yellow-500"
                rows={3}
              />
            )}

            {/* Subtotal */}
            <div className="flex justify-between items-center py-4">
              <span className="text-lg font-semibold text-gray-900">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">₹{cartTotal.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Link 
                to="/cart"
                onClick={onClose}
                className="flex-1 bg-yellow-500 text-white py-3.5 rounded-full font-semibold text-center hover:bg-yellow-400 transition"
              >
                View cart
              </Link>

              <Link 
                to="/checkout"
                onClick={onClose}
                className="flex-1 bg-yellow-500 text-white py-3.5 rounded-full font-semibold text-center hover:bg-yellow-400 transition border-2 border-yellow-600"
              >
                Check out
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDropdown;
