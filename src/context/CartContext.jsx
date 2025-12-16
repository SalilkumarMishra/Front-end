import { createContext, useState, useEffect, useContext, useRef } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(() => {
    // Initialize from localStorage if available
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  
  // Ref to prevent double toast in StrictMode
  const toastTimeoutRef = useRef(null);

  const fetchCart = async () => {
    if (!user) {
        // Load from localStorage if not logged in
        try {
          const saved = localStorage.getItem("cart");
          setCart(saved ? JSON.parse(saved) : []);
        } catch {
          setCart([]);
        }
        return;
    }
    try {
      setLoading(true);
      const res = await axiosClient.get('/cart');
      setCart(res.data.products || res.data.cartItems || res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = (productId, quantity = 1, product = null) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      
      let updatedCart;
      if (existingItem) {
        // If product exists, increase quantity
        updatedCart = prev.map(item =>
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new product with consistent structure
        const newItem = {
          productId,
          name: product?.name || 'Product',
          price: product?.price || 0,
          image: product?.image || '',
          size: product?.size || '500g',
          originalPrice: product?.originalPrice || null,
          quantity
        };
        updatedCart = [...prev, newItem];
      }
      
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Debounce toast to prevent double-firing in StrictMode
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      toast.success('Added to cart');
      toastTimeoutRef.current = null;
    }, 100);

    // If user is logged in, also sync with API
    if (user) {
      axiosClient.post('/cart/add', { productId, quantity }).catch(error => {
        console.error('Failed to sync cart with server', error);
      });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setCart(prev => {
        const updated = prev.filter(item => item.productId !== productId);
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
      
      // Debounce toast
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        toast.success('Removed from cart');
        toastTimeoutRef.current = null;
      }, 100);
      
      // If user is logged in, also sync with API
      if (user) {
        await axiosClient.delete(`/cart/${productId}`);
      }
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };
  
  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => {
      const updated = prev.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });

    // Sync with API if user is logged in
    if (user) {
      axiosClient.put(`/cart/${productId}`, { quantity: newQuantity }).catch(error => {
        console.error('Failed to sync quantity with server', error);
      });
    }
  };

  const cartTotal = cart.reduce((total, item) => {
      const price = item.price || 0;
      return total + (price * (item.quantity || 1));
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, fetchCart, loading, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
