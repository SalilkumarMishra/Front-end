import React from 'react';
import { Home, Package, ShoppingCart, Users, Tag, LogOut } from 'lucide-react';
import { MdMenuOpen } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose, onToggleSidebar, isCollapsed, onToggleCollapsed }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <aside className={`sidebar bg-dark text-white position-fixed ${isOpen ? 'show' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="p-3 d-flex align-items-center justify-content-between sidebar-header">
        {!isCollapsed && <h5 className="m-0">Admin Panel</h5>}
        <button className="btn btn-sm btn-close btn-close-white d-lg-none" onClick={onClose}></button>
        <button className="btn btn-sm text-white d-none d-lg-block" onClick={onToggleCollapsed} aria-label="Toggle sidebar">
          <MdMenuOpen size={22} />
        </button>
      </div>
      {!isCollapsed && (
      <nav className="nav flex-column p-3">
        <Link to="/" className="nav-link text-white" onClick={onClose}>
          <Home size={20} className="me-2" />
          Dashboard
        </Link>
        <Link to="/products" className="nav-link text-white" onClick={onClose}>
          <Package size={20} className="me-2" />
          Products
        </Link>
        <Link to="/orders" className="nav-link text-white" onClick={onClose}>
          <ShoppingCart size={20} className="me-2" />
          Orders
        </Link>
        <Link to="/customers" className="nav-link text-white" onClick={onClose}>
          <Users size={20} className="me-2" />
          Customers
        </Link>
        <Link to="/categories" className="nav-link text-white" onClick={onClose}>
          <Tag size={20} className="me-2" />
          Categories
        </Link>
        <button className="nav-link text-white border-0 bg-transparent" onClick={handleLogout}>
          <LogOut size={20} className="me-2" />
          Logout
        </button>
      </nav>
      )}
    </aside>
  );
}