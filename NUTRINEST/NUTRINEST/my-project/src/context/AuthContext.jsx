import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize saved credentials if not already set
  if (!localStorage.getItem("adminEmail")) {
    localStorage.setItem("adminEmail", "admin@gmail.com");
  }
  if (!localStorage.getItem("adminPassword")) {
    localStorage.setItem("adminPassword", "admin123");
  }

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (email, password) => {
    const savedEmail = localStorage.getItem("adminEmail");
    const savedPassword = localStorage.getItem("adminPassword");

    if (email === savedEmail && password === savedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    if (accounts.find(a => a.email === email)) return false;
    accounts.push({ email, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
