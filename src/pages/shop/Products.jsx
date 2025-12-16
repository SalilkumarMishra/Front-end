// src/pages/products/Products.jsx
import { useEffect, useMemo, useState } from "react";
import axiosClient from "../../api/axiosClient";
import ProductCard from "../../components/product/ProductCard";
import Loader from "../../components/common/Loader";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import ProductQuickView from "../../components/product/ProductQuickView";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const sampleProducts = [
  {
    _id: "p1",
    name: "Fresh Apple (5kg)",
    price: 1400,
    originalPrice: 2000,
    image: "https://placehold.co/400x400/ffcccc/333333?text=Apple",
    rating: 4,
    numReviews: 8,
    discount: 30,
    badge: "SPECIAL PRODUCT",
    category: "Fruits",
  },
  {
    _id: "p2",
    name: "Fresh Oranges (2kg)",
    price: 330,
    originalPrice: 550,
    image: "https://placehold.co/400x400/ffa500/ffffff?text=Oranges",
    rating: 5,
    numReviews: 12,
    discount: 40,
    badge: "NEW PRODUCT",
    category: "Fruits",
  },
  {
    _id: "p3",
    name: "Mixed Berries (500g)",
    price: 450,
    originalPrice: 600,
    image: "https://placehold.co/400x400/8b0000/ffffff?text=Berries",
    rating: 5,
    numReviews: 15,
    discount: 25,
    badge: "BESTSELLER",
    category: "Fruits",
  },
  {
    _id: "p4",
    name: "Fresh Banana (1kg)",
    price: 60,
    originalPrice: 80,
    image: "https://placehold.co/400x400/ffff00/333333?text=Banana",
    rating: 4,
    numReviews: 6,
    discount: 25,
    category: "Fruits",
  },
  {
    _id: "p5",
    name: "California Almonds (500g)",
    price: 699,
    originalPrice: 999,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Almonds",
    rating: 5,
    numReviews: 24,
    discount: 30,
    category: "Dry Fruits",
  },
  {
    _id: "p6",
    name: "Premium Cashews (500g)",
    price: 599,
    originalPrice: 850,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Cashews",
    rating: 5,
    numReviews: 18,
    discount: 29,
    category: "Dry Fruits",
  },
  {
    _id: "p7",
    name: "Walnut Kernels (250g)",
    price: 450,
    originalPrice: 600,
    image: "https://placehold.co/400x400/f5f5dc/333333?text=Walnuts",
    rating: 5,
    numReviews: 15,
    discount: 25,
    category: "Dry Fruits",
  },
  {
    _id: "p8",
    name: "Dried Figs (250g)",
    price: 350,
    originalPrice: 500,
    image: "https://placehold.co/400x400/deb887/333333?text=Figs",
    rating: 4,
    numReviews: 10,
    discount: 30,
    category: "Dry Fruits",
  },
  {
    _id: "p9",
    name: "Pistachios (250g)",
    price: 550,
    originalPrice: 750,
    image: "https://placehold.co/400x400/90ee90/333333?text=Pistachios",
    rating: 5,
    numReviews: 20,
    discount: 27,
    category: "Dry Fruits",
  },
  {
    _id: "p10",
    name: "Raisins (500g)",
    price: 199,
    originalPrice: 299,
    image: "https://placehold.co/400x400/4b0082/ffffff?text=Raisins",
    rating: 4,
    numReviews: 22,
    discount: 33,
    category: "Dry Fruits",
  },
  {
    _id: "p11",
    name: "Dates (500g)",
    price: 450,
    originalPrice: 650,
    image: "https://placehold.co/400x400/8b4513/ffffff?text=Dates",
    rating: 5,
    numReviews: 30,
    discount: 31,
    category: "Dry Fruits",
  },
  {
    _id: "p12",
    name: "Hazelnuts (250g)",
    price: 399,
    originalPrice: 550,
    image: "https://placehold.co/400x400/d2691e/ffffff?text=Hazelnuts",
    rating: 4,
    numReviews: 8,
    discount: 27,
    category: "Dry Fruits",
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance"); // relevance | price-asc | price-desc | discount-desc
  const [discountOnly, setDiscountOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // modal / quickview
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();

  // fetch
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    const fetchProducts = async () => {
      try {
        const { data } = await axiosClient.get("/products");
        setProducts(data.products || data || sampleProducts);
      } catch (err) {
        console.error("Products fetch failed — using sample", err);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derived categories from product list
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
      else if (p.badge) set.add(p.badge);
    });
    return ["All", ...Array.from(set)];
  }, [products]);

  // Featured for slider — top discounted or highest rating
  const featured = useMemo(() => {
    if (!products.length) return sampleProducts.slice(0, 4);
    return [...products]
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
      .slice(0, 6);
  }, [products]);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (category !== "All") {
      list = list.filter(
        (p) => (p.category === category) || (p.badge === category)
      );
    }

    if (discountOnly) {
      list = list.filter((p) => (p.discount || 0) > 0);
    }

    if (minRating > 0) {
      list = list.filter((p) => (p.rating || 0) >= minRating);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "discount-desc":
        list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
      // relevance — leave as-is (API order)
    }

    return list;
  }, [products, search, category, sort, discountOnly, minRating]);

  // Handlers
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
    setSelectedProduct(null);
    setModalOpen(false);
  };

  useEffect(() => {
    // lock body scroll when modal open
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [modalOpen]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header + search + featured slider */}
      <div className="mb-8" data-aos="fade-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="text-sm text-gray-500 mt-1">
              Browse our curated selection of organic & healthy products.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full md:w-80 px-4 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none"
            />
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("relevance");
                setDiscountOnly(false);
                setMinRating(0);
              }}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Featured slider */}
        <div className="mt-6" data-aos="fade-up" data-aos-delay="150">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 3200 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-4"
          >
            {featured.map((p) => (
              <SwiperSlide key={p._id || p.id}>
                <div className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{p.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-lg font-bold text-[#77966D]">₹{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-sm line-through text-gray-400">₹{p.originalPrice}</span>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="px-3 py-1 rounded-full bg-[#77966D] text-white text-sm"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => openModal(p)}
                        className="px-3 py-1 rounded-full border text-sm"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Filters + grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 bg-white p-4 rounded-xl shadow-sm" data-aos="fade-up">
          <div>
            <h4 className="font-semibold mb-3">Filters</h4>

            <label className="block text-sm text-gray-600 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-md"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="block text-sm text-gray-600 mb-2">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-md"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="discount-desc">Top discounts</option>
            </select>

            <div className="flex items-center justify-between mb-3">
              <label className="text-sm">Discounts only</label>
              <input
                type="checkbox"
                checked={discountOnly}
                onChange={(e) => setDiscountOnly(e.target.checked)}
                className="h-4 w-4"
              />
            </div>

            <label className="block text-sm text-gray-600 mb-2">Minimum Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full mb-3 px-3 py-2 border rounded-md"
            >
              <option value={0}>Any</option>
              <option value={4}>4 & up</option>
              <option value={4.5}>4.5 & up</option>
              <option value={5}>5 only</option>
            </select>

            <div className="text-xs text-gray-500 mt-4">
              Tip: Use search for quick results.
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <main className="lg:col-span-4">
          {filtered.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center shadow-sm" data-aos="fade-up">
              <p className="text-gray-500">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" data-aos="fade-up">
              {filtered.map((product) => (
                <div key={product._id || product.id} data-aos="fade-up" data-aos-delay="50">
                  {/* ProductCard is expected to handle props: product, onAddToCart, onAddToWishlist, onOpenModal */}
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    onOpenModal={openModal}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
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
    </div>
  );
};

export default Products;
