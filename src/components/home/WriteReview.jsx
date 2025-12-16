import { useState, useRef } from "react";
import { Star, Send, ImagePlus, Trash2, BadgeCheck, Shield, Clock, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const WriteReview = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const fileInputRef = useRef(null);

  // Load from localStorage and sort by newest first
  const [reviews, setReviews] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("homeReviews")) || [];
    return stored.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
  });

  // Calculate average rating from localStorage reviews
  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
      : 0
  }));

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return false;
      }
      return true;
    });

    setImages(prev => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new review object
      const newReview = {
        id: Date.now(),
        rating,
        comment: comment.trim(),
        images: imagePreviews, // Store base64 previews for localStorage
        date: new Date().toISOString(),
        user: { name: user?.name || "Guest User" },
        status: "pending" // For moderation
      };

      // Save to localStorage (sorted by newest first)
      const updatedReviews = [...reviews, newReview].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      localStorage.setItem("homeReviews", JSON.stringify(updatedReviews));
      setReviews(updatedReviews);

      setShowSuccess(true);
      
      setTimeout(() => {
        setRating(0);
        setComment("");
        setImages([]);
        setImagePreviews([]);
        setShowSuccess(false);
      }, 2000);

    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  // Login Required Popup Component
  const LoginRequiredPopup = () => (
    <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Login Required</h2>

      <p className="text-gray-600 mb-6">
        You must be logged in to write a review.  
        Please login to continue.
      </p>

      <Link
        to="/login"
        className="px-6 py-3 w-full bg-[#82D173] text-white font-semibold rounded-xl block hover:bg-[#6BC25E] transition"
      >
        Login Now
      </Link>
    </div>
  );

  // If user is not logged in, show login prompt
  if (!user) {
    return <LoginRequiredPopup />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-2xl mx-auto mt-16 mb-16 relative overflow-hidden"
    >
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-[#82D173] rounded-full flex items-center justify-center mb-4"
            >
              <BadgeCheck size={40} className="text-white" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-gray-800"
            >
              Review Submitted!
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 mt-2 flex items-center gap-2"
            >
              <Clock size={14} />
              Pending moderation
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Write a Review</h3>
          <p className="text-sm text-gray-500 mt-1">Share your experience with NutriNest</p>
        </div>
      </div>

      {/* Average Rating Display */}
      {reviews.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 bg-gray-50 rounded-xl"
          >
            <div className="flex items-start gap-6">
              {/* Average Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">{averageRating}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= Math.round(averageRating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {reviews.length} reviews
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="flex-1 space-y-1.5">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-gray-600">{star}</span>
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: star * 0.1 }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                    <span className="w-8 text-xs text-gray-500">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    size={36}
                    className={`cursor-pointer transition-all duration-200 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400 scale-110"
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                  />
                </motion.button>
              ))}
              <AnimatePresence mode="wait">
                {rating > 0 && (
                  <motion.span
                    key={rating}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="ml-3 text-sm font-medium text-gray-600"
                  >
                    {ratingLabels[rating]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label
              htmlFor="review-comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review-comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#82D173] focus:border-[#82D173] outline-none transition-all shadow-sm resize-none"
              maxLength={500}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Minimum 10 characters</span>
              <span className={`text-xs ${comment.length >= 450 ? "text-orange-500" : "text-gray-500"}`}>
                {comment.length}/500
              </span>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Photos <span className="text-gray-400">(Optional)</span>
            </label>
            
            <div className="flex flex-wrap gap-3">
              {/* Image Previews */}
              <AnimatePresence>
                {imagePreviews.map((preview, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <Trash2 size={12} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Upload Button */}
              {images.length < 3 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[#82D173] hover:text-[#82D173] transition-colors"
                >
                  <ImagePlus size={24} />
                  <span className="text-xs mt-1">{3 - images.length} left</span>
                </motion.button>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Max 3 images, 5MB each</p>
          </div>

          {/* Moderation Notice */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
          >
            <Shield size={18} className="text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Review Moderation</p>
              <p className="text-xs text-blue-600 mt-0.5">
                Your review will be checked for quality and guidelines compliance before publishing.
              </p>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full bg-[#82D173] hover:bg-[#6bc25e] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Review
              </>
            )}
          </motion.button>
        </form>
    </motion.div>
  );
};

export default WriteReview;
