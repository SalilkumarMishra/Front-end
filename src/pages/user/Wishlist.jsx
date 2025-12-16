import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    if (!product) return;
    const id = product._id || product.id;
    if (!id) return;
    addToCart(id, 1);
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mb-8">
          Browse our collection and add items you love to your wishlist.
        </p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 rounded-full bg-[#82D173] text-white font-semibold hover:bg-[#6EBB5E] transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
          >
            <Link to={`/products/${product._id || product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            </Link>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h2 className="font-semibold text-lg line-clamp-2">{product.name}</h2>
              {product.description && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between">
                <div className="space-x-2">
                  <span className="text-lg font-bold text-[#82D173]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                {product.discount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-semibold">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            <div className="px-4 pb-4 flex gap-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-full bg-[#82D173] text-white text-sm font-semibold hover:bg-[#6EBB5E] transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="inline-flex items-center justify-center px-3 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
