import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Thank you for shopping with NutriNest. Your order has been received and will be processed shortly.
      </p>
      <div className="space-x-4">
        <Link to="/products" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition font-medium">
          Continue Shopping
        </Link>
        <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
            Go Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
