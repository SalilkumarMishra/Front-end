import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useCart } from '../../context/CartContext';
import Loader from '../../components/common/Loader';
import ReviewList from '../../components/product/ReviewList';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          axiosClient.get(`/products/${id}`),
          axiosClient.get(`/reviews/${id}?limit=3`)
        ]);
        setProduct(productRes.data.product || productRes.data);
        setReviews(reviewsRes.data.reviews || reviewsRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleQuantityChange = (type) => {
      if (type === 'inc') setQuantity(prev => prev + 1);
      if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.image || 'https://via.placeholder.com/600'} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-500">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className={`w-5 h-5 ${i < (product.rating || 0) ? 'fill-current' : 'text-gray-300'}`} />
               ))}
            </div>
            <span className="text-gray-500 ml-2">({product.numReviews || 0} reviews)</span>
          </div>
          
          <p className="text-2xl font-bold text-green-600 mb-6">₹{product.price}</p>
          
          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center space-x-6 mb-8">
             <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={() => handleQuantityChange('dec')} className="p-2 hover:bg-gray-100 text-gray-600">
                    <Minus className="w-5 h-5"/>
                </button>
                <span className="px-4 font-medium text-gray-900">{quantity}</span>
                <button onClick={() => handleQuantityChange('inc')} className="p-2 hover:bg-gray-100 text-gray-600">
                    <Plus className="w-5 h-5"/>
                </button>
             </div>
             
             <button 
                onClick={() => addToCart(product._id, quantity)}
                className="flex-1 bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center font-medium"
             >
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
             </button>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-8">
             <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
