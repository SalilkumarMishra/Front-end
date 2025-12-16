import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "../../components/product/ProductCard";
import ProductQuickView from "../../components/product/ProductQuickView";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import SpecialOfferSection from "../../components/home/SpecialOfferSection";
import WriteReview from "../../components/home/WriteReview";

const testimonials = [
  {
    title: "Amazing quality!",
    quote:
      "Products are always fresh and delivered on time. Highly recommended!",
    author: "Anika Sharma",
    rating: 5,
  },
  {
    title: "Fast delivery",
    quote: "Very fast delivery and everything was packaged perfectly.",
    author: "Rohan Patel",
    rating: 4,
  },
  {
    title: "Highly satisfied",
    quote: "Loved the quality of organic supplements. Will order again!",
    author: "Meera Verma",
    rating: 5,
  },
  {
    title: "Worth the price",
    quote: "Prices are reasonable, and the quality is excellent!",
    author: "Dinesh Kumar",
    rating: 4,
  },
  {
    title: "Customer support is great",
    quote: "Support team helped me instantly when I had a query.",
    author: "Priya Nair",
    rating: 5,
  },
  {
    title: "Fresh products",
    quote: "All fruits and vegetables were really fresh. Good job!",
    author: "Amit Singh",
    rating: 5,
  },
  {
    title: "User-friendly website",
    quote: "Easy to search, browse and purchase items. Smooth experience.",
    author: "Rutuja Desai",
    rating: 4,
  },
  {
    title: "Organic and healthy",
    quote: "Love their organic items. They actually taste better!",
    author: "Sakshi Gupta",
    rating: 5,
  },
  {
    title: "Good packaging",
    quote: "Everything arrived in great condition. No damage.",
    author: "Yuvraj Gaikwad",
    rating: 4,
  },
  {
    title: "Highly recommended",
    quote: "Overall experience is fantastic. My new go-to store!",
    author: "Harshita Mehta",
    rating: 5,
  },
];

const dryFruitProducts = [
  {
    _id: "df1",
    name: "California Almonds (200g)",
    price: 450,
    originalPrice: 600,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Almonds",
    rating: 4.5,
    numReviews: 12,
    discount: 25,
    badge: "PREMIUM",
  },
  {
    _id: "df2",
    name: "Premium Cashews (200g)",
    price: 380,
    originalPrice: 500,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Cashews",
    rating: 4.8,
    numReviews: 24,
    discount: 24,
    badge: "BESTSELLER",
  },
  {
    _id: "df3",
    name: "Walnut Kernels (200g)",
    price: 650,
    originalPrice: 800,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Walnuts",
    rating: 4.6,
    numReviews: 8,
    discount: 18,
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product, qty = 1) => {
    addToCart(product._id || product.id, qty, product);
  };

  const handleAddToWishlist = (product) => {
    toggleWishlist(product);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalOpen]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-amber-50 overflow-hidden" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-amber-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-amber-50 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Premium Quality</span>{" "}
                  <span className="block text-primary xl:inline">
                    Dry Fruits &amp; Nuts
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Boost your immunity and energy with our hand-picked, premium
                  quality dry fruits. Sourced from the best farms to ensure
                  freshness and nutrition in every bite.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primaryDark md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.pexels.com/photos/1667427/pexels-photo-1667427.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Mixed Dry Fruits"
          />
        </div>
      </div>

      {/* Dry Fruits Section */}
      <div className="bg-white py-12" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="section-title">Premium Dry Fruits</h2>
            <Link
              to="/products"
              className="hover:opacity-80 font-medium flex items-center transition text-primary"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dryFruitProducts.map((product, idx) => (
              <div
                key={product._id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  onOpenModal={openModal}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {modalOpen && selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      )}

      {/* About Teaser */}
      <div className="bg-gray-100 py-16" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Why Choose NutriNest?</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            We are committed to providing the highest quality natural products,
            sourced sustainably and delivered with care. Your health is our
            priority.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-gray-500">
                Certified organic ingredients for pure nutrition.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-500">
                Quick and reliable shipping to your doorstep.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-500">
                Guidance from nutrition experts anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offer Section */}
      <SpecialOfferSection />

      {/* Testimonial Section */}
      <div className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Customers Say
        </h2>

        <div className="max-w-7xl mx-auto px-6">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            loop
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="pb-14"
          >
            {testimonials.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="border rounded-2xl shadow-sm bg-white p-10 text-center h-full flex flex-col justify-between">
                  {/* Quote Icon */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white hover:scale-110 transition-transform duration-300 shadow-lg mx-auto"
                    style={{ backgroundColor: "#77966D" }}
                  >
                    ❝
                  </div>

                  <h3 className="font-semibold text-xl mb-4">"{item.title}"</h3>

                  <p className="text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">
                    {item.quote}
                  </p>

                  <p className="font-semibold text-gray-900">By {item.author}</p>

                  {/* Star Rating */}
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        style={{ color: "#77966D" }}
                        className="text-xl"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Write Review Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Share Your Experience
          </h2>
          <WriteReview />
        </div>
      </div>
    </div>
  );
};

export default Home;
