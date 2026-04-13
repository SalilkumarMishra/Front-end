import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, cartTotal, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return <div className="p-8 text-center">Loading cart...</div>;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item) => {
            // Handle different product data structures
            const productName = item.product?.name || item.name || 'Product';
            const productPrice = item.product?.price || item.price || 0;
            const productImage = item.product?.image || item.image || 'https://via.placeholder.com/100';
            const itemId = item._id || item.id;
            const quantity = item.quantity || 1;
            
            return (
            <div key={itemId} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <img 
                    src={productImage} 
                    alt={productName} 
                    className="w-20 h-20 object-cover rounded-md bg-gray-100"
                  />
                  <div>
                     <h3 className="font-semibold text-gray-800">{productName}</h3>
                     <p className="text-gray-500 text-sm">₹{productPrice} x {quantity}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                 <p className="font-bold text-gray-900">₹{productPrice * quantity}</p>
                 <button 
                    onClick={() => removeFromCart(itemId)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Remove Item"
                 >
                    <Trash2 className="w-5 h-5"/>
                 </button>
               </div>
            </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-4 mb-6 flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center font-medium"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
