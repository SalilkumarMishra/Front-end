import React from 'react';
import { Menu, Bell } from 'lucide-react';
import logo from '../assets/Logo.jpg';
import Navbar from "./Navbar";

export default function Topbar({ onToggleSidebar }) {
  const savedData = JSON.parse(localStorage.getItem("adminData")) || {};
  const avatarUrl = savedData.avatar || "/profile.jpg";

  return (
    <header className="topbar bg-light border-bottom d-flex align-items-center justify-content-between p-3">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-sm d-lg-none" onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>
        <img src={logo} alt="NutriNest Logo" className="topbar-logo" />
        <h2 className="nutrinest-heading m-0" style={{ marginLeft: '10px' }}>NUTRINEST</h2>
      </div>
      <div className="d-flex gap-3">
        <button className="btn btn-light position-relative">
          <Bell size={20} />
        </button>
        <Navbar avatarUrl={avatarUrl} />
      </div>
    </header>
  );
}
