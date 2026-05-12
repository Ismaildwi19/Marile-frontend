import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, History, Wallet, 
  Percent, Settings, LogOut, Search, Bell, User, Menu, X 
} from 'lucide-react';
import '../styles/cashier.css'; // Pastikan di file CSS ini class .nav-label sudah ada style-nya seperti di Admin

const CashierLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      navigate('/login');
    }
  };

  // Ubah teks menjadi Title Case agar sama dengan Admin
  const menuItems = [
    { name: 'Dashboard', path: '/cashier', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/cashier/products', icon: <ShoppingBag size={20} /> },
    { name: 'History', path: '/cashier/history', icon: <History size={20} /> },
  ];

  return (
    <div className={`cashier-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* OVERLAY */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className={`cashier-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="logo">
          <img src="/assets/img/logo_marile.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Marile</span>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="nav-container">
          {/* Tambahkan nav-label agar persis seperti layout admin */}
          <div className="nav-label">Menu Utama</div> 
          
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="nav-bottom">
          {/* Tambahkan nav-label Sistem seperti admin */}
          <div className="nav-label">Sistem</div> 
          
          <Link 
            to="/cashier/settings" 
            className={`nav-item ${location.pathname.startsWith('/cashier/settings') ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          
          <div className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Keluar</span>
          </div>
        </div>
      </aside>

      {/* ═══════════ MAIN AREA ═══════════ */}
      <main className="main">
        <header className="topbar">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>

          <div className="search-wrap">
            <Search size={18} color="#7b9590" />
            <input type="text" placeholder="Search Products . . ." />
          </div>

          <div className="topbar-actions">
            <div className="icon-btn notification">
              <Bell size={20} />
              <span className="notif-dot"></span>
            </div>

            <div className="admin-profile-btn">
              <div className="admin-avatar">
                <User size={18} />
              </div>
              <span className="admin-name">Kasir</span>
            </div>
          </div>
        </header>

        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CashierLayout;