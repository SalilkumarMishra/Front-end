import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onOpenModal }) => {
  const [hover, setHover] = useState(false);
  const { wishlist } = useWishlist();
  const isFav = wishlist.some((item) => item._id === product._id);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* IMAGE SECTION */}
      <div className="relative bg-gray-50 p-4 flex justify-center items-center">
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
            {product.discount}%
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-auto object-contain transition-transform duration-300 hover:scale-110"
          onClick={() => onOpenModal && onOpenModal(product)}
        />

        {/* Hover Icons */}
        {hover && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-4">
            {/* Wishlist */}
            <button
              onClick={() => onAddToWishlist && onAddToWishlist(product)}
              className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
            >
              <Heart
                size={18}
                className={
                  isFav ? "text-red-500 fill-red-500" : "text-gray-700"
                }
              />
            </button>

            <button
              onClick={() => onAddToCart && onAddToCart(product)}
              className="bg-white hover:bg-[#82D173] shadow-lg rounded-full p-3 transition"
            >
              <ShoppingBag
                size={18}
                className="pointer-events-none"
              />
            </button>


            {/* View */}
            <button
              onClick={() => onOpenModal && onOpenModal(product)}
              className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
            >
              <Eye size={18} />
            </button>
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="px-4 py-3">
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-1">
          <p className="text-lg font-bold ">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-500 line-through">₹{product.originalPrice}</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center text-yellow-500 text-sm">
          {"★★★★★".slice(0, product.rating || 0)}
          {"☆☆☆☆☆".slice(product.rating || 0)}
          <span className="text-gray-600 ml-2 text-sm">
            {product.numReviews > 0
              ? `${product.numReviews} review`
              : "No reviews"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
