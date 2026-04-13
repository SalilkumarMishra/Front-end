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
import ContentPage from './pages/site/ContentPage';

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
      {
        path: '/blogs',
        element: (
          <ContentPage
            title="NutriNest Blog"
            intro="Stories, tips, and practical ideas to help you eat well and shop smarter."
            sections={[
              {
                heading: 'Healthy Living',
                body: 'Explore nutrition tips, ingredient guides, and seasonal wellness ideas written for everyday routines.',
              },
              {
                heading: 'Product Spotlights',
                body: 'Learn what makes our dry fruits, nuts, and pantry staples worth adding to your kitchen.',
              },
            ]}
          />
        ),
      },
      {
        path: '/blog',
        element: (
          <ContentPage
            title="Featured Article"
            intro="A quick entry point into the NutriNest journal and our latest health-focused updates."
            sections={[
              {
                heading: 'Fresh Content',
                body: 'This section is ready for article listings, featured posts, and editorial updates as the storefront grows.',
              },
            ]}
          />
        ),
      },
      {
        path: '/pages',
        element: (
          <ContentPage
            title="Explore Pages"
            intro="A simple hub for the key informational pages linked from the storefront navigation."
            sections={[
              {
                heading: 'Customer Resources',
                body: 'Use the footer links to jump to contact, shipping, privacy, terms, and support information.',
              },
            ]}
          />
        ),
      },
      {
        path: '/contact',
        element: (
          <ContentPage
            title="Contact Us"
            intro="We are here to help with orders, product questions, and general support."
            sections={[
              {
                heading: 'Support',
                body: 'Email support@nutrinest.com or call +1 (555) 123-4567 for help with your account or order.',
              },
              {
                heading: 'Store Address',
                body: 'Visit us at 123 Wellness Blvd, Green City, NY 10012 during standard business hours.',
              },
            ]}
          />
        ),
      },
      {
        path: '/faq',
        element: (
          <ContentPage
            title="Frequently Asked Questions"
            intro="Answers to common questions about shopping, payments, delivery, and account support."
            sections={[
              {
                heading: 'Orders and Delivery',
                body: 'Track active orders from your account and contact support if an item arrives damaged or delayed.',
              },
              {
                heading: 'Accounts and Payments',
                body: 'Use the login and checkout flows to manage addresses, place orders, and securely complete payments.',
              },
            ]}
          />
        ),
      },
      {
        path: '/shipping',
        element: (
          <ContentPage
            title="Shipping and Returns"
            intro="A quick overview of delivery expectations and return support."
            sections={[
              {
                heading: 'Shipping',
                body: 'Shipping timelines vary by region and order volume, with checkout totals updating before payment confirmation.',
              },
              {
                heading: 'Returns',
                body: 'If there is a problem with your order, contact support promptly so a replacement or refund can be reviewed.',
              },
            ]}
          />
        ),
      },
      {
        path: '/privacy',
        element: (
          <ContentPage
            title="Privacy Policy"
            intro="How customer information is used to support account access, checkout, and order fulfillment."
            sections={[
              {
                heading: 'Data Use',
                body: 'We use your details to process purchases, improve the storefront experience, and communicate about your orders.',
              },
              {
                heading: 'Security',
                body: 'Sensitive account and checkout information should always be handled carefully and reviewed regularly.',
              },
            ]}
          />
        ),
      },
      {
        path: '/terms',
        element: (
          <ContentPage
            title="Terms of Service"
            intro="Basic usage terms for browsing the storefront, creating an account, and placing orders."
            sections={[
              {
                heading: 'Using the Store',
                body: 'By using the storefront, customers agree to provide accurate information for checkout and account management.',
              },
              {
                heading: 'Orders',
                body: 'Availability, pricing, and fulfillment timing may change, and orders may be adjusted if inventory changes.',
              },
            ]}
          />
        ),
      },
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
