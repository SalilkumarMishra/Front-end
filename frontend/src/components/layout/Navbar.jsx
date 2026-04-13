import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import WishlistDropdown from "../wishlist/WishlistDropdown";
import CartDropdown from "../cart/CartDropdown";
import { ShoppingCart, Heart, User, Menu, Search, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/products" },
  { name: "Collection", to: "/about" },
  { name: "Blogs", to: "/blogs" },
  { name: "Pages", to: "/pages" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shadow, setShadow] = useState(false);

  const closeMobileMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchQuery("");
    closeMobileMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white sticky top-0 z-50 w-full transition-shadow ${
        shadow ? "shadow-md" : ""
      }`}
    >
      <div className="py-3 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 relative">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-wide"
            style={{ color: "#82D173" }}
          >
            NUTRINEST
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 justify-center"
          >
            <div className="flex items-center h-11 w-[360px] border border-[#82D173] rounded-full overflow-visible bg-white">
              <input
                type="text"
                placeholder="Search our store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-full px-4 text-gray-700 placeholder-gray-400 outline-none rounded-l-full"
              />
              <button
                type="submit"
                className="h-full w-12 -ml-px flex items-center justify-center bg-[#82D173] rounded-r-full hover:bg-[#6EBB5E] transition"
              >
                <Search className="h-5 w-5 text-white block" />
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center cursor-pointer text-[#82D173]">
              <User className="w-6 h-6" />
              <div className="ml-2 leading-tight text-sm">
                {user ? (
                  <>
                    <p className="font-semibold">{user.username || user.email || "ACCOUNT"}</p>
                    <button
                      onClick={handleLogout}
                      className="text-gray-500 text-xs hover:text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div>
                    <p className="font-semibold">ACCOUNT</p>
                    <p className="text-gray-500 text-xs">
                      <Link to="/signup" className="hover:text-[#82D173]">Register</Link>
                      {" / "}
                      <Link to="/login" className="hover:text-[#82D173]">Login</Link>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center relative">
              <button
                onClick={() => setWishlistOpen(!wishlistOpen)}
                className="relative text-primary"
              >
                <Heart className="w-6 h-6" />
                <span className="absolute -top-1 -right-2 bg-yellow-400 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              </button>

              {wishlistOpen && (
                <div className="absolute top-8 right-0 z-50">
                  <WishlistDropdown onClose={() => setWishlistOpen(false)} />
                </div>
              )}
            </div>

            <div className="relative hidden md:flex items-center justify-center">
              <button
                onClick={() => setCartDropdown(!cartDropdown)}
                className="relative text-primary"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-center border-t bg-white">
        <div className="flex space-x-10 py-3 text-gray-700 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="hover:text-[#82D173] transition relative group"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#82D173] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-full border border-[#82D173] px-4 py-2 outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-[#82D173] p-2 text-white hover:bg-[#6EBB5E] transition"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-gray-700 hover:bg-[#82D173]/10 hover:text-[#82D173] transition"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="px-4 py-3 text-gray-700 hover:bg-[#82D173]/10 hover:text-[#82D173] transition"
              >
                Wishlist ({wishlist.length})
              </Link>
              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="px-4 py-3 text-gray-700 hover:bg-[#82D173]/10 hover:text-[#82D173] transition"
              >
                Cart ({cart.length})
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-100 p-4">
              {user ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">Signed in as</div>
                  <div className="font-semibold text-gray-900">{user.username || user.email || "Customer"}</div>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-full border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="rounded-full bg-[#82D173] px-4 py-2 text-center text-white hover:bg-[#6EBB5E] transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="rounded-full border border-[#82D173] px-4 py-2 text-center text-[#82D173] hover:bg-[#82D173]/10 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {cartDropdown && (
          <CartDropdown onClose={() => setCartDropdown(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
