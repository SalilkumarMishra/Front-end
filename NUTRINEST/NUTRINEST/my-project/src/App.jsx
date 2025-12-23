import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Categories from './pages/Categories';
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

export default function App() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app-root d-flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onToggleSidebar={() => setSidebarOpen(s => !s)} isCollapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed(s => !s)} />
      <div className="flex-grow-1" style={sidebarCollapsed ? { marginLeft: '70px' } : {}}>
        <Topbar onToggleSidebar={() => setSidebarOpen(s => !s)} />
        <main className="p-4">
          <Routes> 
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />

            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} />
            <Route path="/customers" element={isAuthenticated ? <Customers /> : <Navigate to="/login" />} />
            <Route path="/categories" element={isAuthenticated ? <Categories /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
