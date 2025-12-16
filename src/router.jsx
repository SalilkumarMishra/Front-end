import { createBrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';
import { Outlet } from 'react-router-dom';

// Pages
import Home from './pages/shop/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Products from './pages/shop/Products';
import ProductDetails from './pages/shop/ProductDetails';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import Address from './pages/user/Address';
import OrderSuccess from './pages/user/OrderSuccess';
import Wishlist from './pages/user/Wishlist';
import About from './pages/shop/About';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:id', element: <ProductDetails /> },
      { path: '/about', element: <About /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/wishlist', element: <Wishlist /> },
      
      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/address', element: <Address /> }, // For managing addresses
          { path: '/order-success', element: <OrderSuccess /> },
          // { path: '/wishlist', element: <Wishlist /> }, // Moved outside protected routes
        ],
      },
    ],
  },
]);

export default router;
