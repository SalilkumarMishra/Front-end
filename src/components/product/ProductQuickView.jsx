import { X, ChevronLeft, ChevronRight, Minus, Plus, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductQuickView = ({ product, onClose, onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();

  const images = [product.image, ...(product.images || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextImage = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-6 relative max-h-[92vh] overflow-y-auto animate-scaleIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={26} className="text-gray-700" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT: Image Slider */}
          <div className="relative">

            {/* Discount Badge */}
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#82D173] text-white text-xs px-3 py-1 rounded-full shadow">
                {product.discount}% OFF
              </span>
            )}

            {/* Main Image */}
            <div className="relative group">
              <img
                src={images[currentIndex]}
                alt={product.name}
                className="w-full h-96 object-contain rounded-xl bg-gray-100 transition duration-300 group-hover:scale-[1.03]"
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border transition-all ${
                    currentIndex === i
                      ? "border-[#82D173] shadow scale-105"
                      : "border-gray-300 opacity-80 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="pr-4">

            {/* Title */}
            <h2 className="text-3xl font-semibold leading-tight text-gray-900">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center mt-2">
              <span className="text-[#ffb400] text-lg">
                {"★".repeat(product.rating || 0)}
                {"☆".repeat(5 - (product.rating || 0))}
              </span>
              <span className="ml-2 text-gray-500 text-sm">
                {product.numReviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-3xl text-[#82D173] font-bold">₹{product.price}</p>
              {product.originalPrice && (
                <p className="text-sm line-through text-gray-500 mt-1">
                  MRP: ₹{product.originalPrice}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-5 leading-relaxed">
              {product.description || "A premium organic product carefully sourced for purity and quality."}
            </p>

            {/* Quantity Selector */}
            <div className="mt-6">
              <p className="font-semibold mb-2">Quantity</p>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Minus size={18} />
                </button>

                <span className="text-xl font-semibold">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-[#82D173] text-white py-3 rounded-lg font-semibold hover:bg-[#6EBB5E] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/checkout", { state: { product, qty: quantity } })}
                className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => onAddToWishlist(product)}
              className="mt-5 flex items-center gap-2 text-gray-700 hover:text-[#82D173] transition"
            >
              <Heart size={20} /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
