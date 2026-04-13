import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductQuickView from "../product/ProductQuickView";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const calculateTimeLeft = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight - now;

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const dealProducts = [
  {
    _id: "deal1",
    name: "Organic Almonds (250g)",
    price: 350,
    originalPrice: 500,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Almonds",
    discount: 30,
    rating: 4.7,
    numReviews: 18,
  },
  {
    _id: "deal2",
    name: "Premium Cashews (200g)",
    price: 420,
    originalPrice: 600,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Cashews",
    discount: 32,
    rating: 4.8,
    numReviews: 24,
  },
  {
    _id: "deal3",
    name: "Walnuts Kernels (200g)",
    price: 480,
    originalPrice: 700,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Walnuts",
    discount: 31,
    rating: 4.6,
    numReviews: 15,
  },
];

const SpecialOfferSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#fdf6e4] border-t border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="uppercase tracking-[0.2em] text-xs text-yellow-700">
            Limited Time Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            Deal of the Day
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Save big on today&apos;s handpicked NutriNest bestsellers. Offers valid until midnight!
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {[
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((box, i) => (
            <div
              key={i}
              className="bg-white text-[#77966D] w-24 h-24 rounded-xl shadow-md border border-green-200 flex flex-col items-center justify-center"
            >
              <span className="text-3xl font-extrabold">{box.value}</span>
              <span className="text-sm opacity-70 font-semibold">{box.label}</span>
            </div>
          ))}
        </div>

        <div data-aos="fade-up" data-aos-delay="400">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {dealProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => openModal(product)}
                    className="w-full h-52 object-cover rounded-xl mb-4 cursor-pointer hover:opacity-90 transition"
                  />

                  <h3 className="font-semibold text-lg">{product.name}</h3>

                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-[#77966D] font-bold text-xl">Rs. {product.price}</p>
                    <p className="line-through text-gray-400">Rs. {product.originalPrice}</p>
                  </div>

                  <p className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block mt-3">
                    {product.discount}% OFF
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="600">
          <button
            onClick={() => navigate("/products")}
            className="px-10 py-3 bg-[#77966D] text-white rounded-full font-semibold shadow-md hover:bg-[#647d5a] transition"
          >
            Shop Collection
          </button>
        </div>
      </div>

      {modalOpen && selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={closeModal}
          onAddToCart={(product, qty = 1) => {
            addToCart(product._id || product.id, qty, product);
            closeModal();
          }}
          onAddToWishlist={() => toggleWishlist(selectedProduct)}
        />
      )}
    </section>
  );
};

export default SpecialOfferSection;
