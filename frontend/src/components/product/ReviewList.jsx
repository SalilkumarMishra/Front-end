import { Star } from "lucide-react";

const ReviewList = ({ reviews = [] }) => {
  // Helper: Format date cleanly
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-gray-500 italic mt-6 text-center py-6 bg-gray-50 rounded-lg">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={review._id || index}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 animate-fadeIn"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#82D173]/20 text-[#82D173] rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {review.user?.name?.[0] || review.name?.[0] || "U"}
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-sm">
                    {review.user?.name || review.name || "Anonymous"}
                  </span>

                  {/* Optional verified badge */}
                  {review.user && (
                    <span className="text-xs text-green-600 font-medium">
                      ✔ Verified Buyer
                    </span>
                  )}
                </div>
              </div>

              <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
            </div>

            {/* STAR RATING */}
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < (review.rating || 0)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* COMMENT */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.comment || "No comment provided."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
