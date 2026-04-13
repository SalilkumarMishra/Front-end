import { X, Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistDropdown = ({ onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="w-80 bg-white shadow-2xl rounded-xl p-5 border border-gray-100 z-50 animate-fadeIn">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b">
        <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          <Heart size={18} className="text-[#82D173]" />
          Wishlist
        </h4>
        <X className="w-5 h-5 cursor-pointer hover:text-black transition" onClick={onClose} />
      </div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-300 flex justify-center mb-3">
            <Heart size={40} />
          </div>
          <p className="text-gray-500 text-sm">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto mt-4 pr-1 space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex items-start justify-between pb-3 border-b last:border-none"
            >
              {/* LEFT section */}
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {item.name}
                  </p>
                  <p className="text-[#82D173] font-bold mt-1">₹{item.price}</p>
                </div>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="p-1 rounded-full hover:bg-gray-200 transition h-fit"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* View Wishlist Button */}
      <Link
        to="/wishlist"
        onClick={onClose}
        className="block mt-5 text-center bg-[#82D173] text-white py-2.5 rounded-lg 
                   font-semibold hover:bg-[#6EBB5E] transition shadow-sm"
      >
        View Full Wishlist
      </Link>

    </div>
  );
};

export default WishlistDropdown;
