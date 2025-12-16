import { createContext, useState, useEffect, useContext } from 'react';
import axiosClient from '../api/axiosClient';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); 
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      const { token, user: userData } = response.data; // Assuming backend returns user info too, or just token
      // If backend only returns token:
      const savedToken = token || response.data.accessToken; // Adjust based on API
      localStorage.setItem('token', savedToken);
      const decoded = jwtDecode(savedToken);
      setUser(decoded); // Or userData if provided
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      await axiosClient.post('/auth/signup', userData);
      toast.success('Account created! Please login.');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  const forgotPassword = async (email) => {
     try {
      await axiosClient.post('/auth/forgot-password', { email });
      toast.success('Password reset link sent');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Request failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, forgotPassword, loading }}>
        {!loading && children}
    </AuthContext.Provider>
  );
};
