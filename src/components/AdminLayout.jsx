import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, History, Settings, 
  LogOut, Search, Download, Bell, User, Menu, X 
} from 'lucide-react';

// PASTIKAN IMPORT INI BENAR
import '../styles/AdminLayout.css';
import '../styles/AdminDashboard.css'; // Jika ada style khusus untuk dashboard
import '../styles/AdminProduct.css'; // Jika ada style khusus untuk products
import '../styles/AdminHistory.css'; // Jika ada style khusus untuk history


const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      navigate('/login');
    }
  };

  return (
    <div className={`admin-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Overlay mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="logo">
          <img src="/assets/img/logo_marile.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Marile</span>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="nav-container">
          <div className="nav-label">Menu Utama</div> {/* Tambahan label agar lebih rapi */}
          <Link 
            to="/admin" 
            className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/products" 
            className={`nav-item ${location.pathname === '/admin/products' ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <ShoppingBag size={20} />
            <span>Products</span>
          </Link>
          
          <Link 
            to="/admin/history" 
            className={`nav-item ${location.pathname === '/admin/history' ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <History size={20} />
            <span>History</span>
          </Link>
        </div>

        <div className="nav-bottom">
          <div className="nav-label">Sistem</div>
          <Link 
            to="/admin/settings" 
            className={`nav-item ${location.pathname.startsWith('/admin/settings') ? 'active' : ''}`}
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

      {/* MAIN AREA */}
      <main className="main">
        <header className="topbar">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>

          <div className="search-wrap">
            <Search size={18} color="var(--muted)" />
            <input type="text" placeholder="Cari data..." />
          </div>

          <div className="topbar-actions">
            {location.pathname === '/admin' && (
              <button className="btn-export">
                <Download size={16} />
                <span className="export-text">Export</span>
              </button>
            )}

            <div className="icon-btn">
              <Bell size={20} />
              <span className="notif-dot"></span>
            </div>

            <div className="admin-profile-btn">
              <div className="admin-avatar">
                <User size={18} />
              </div>
              <span className="admin-name">Administrator</span>
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

export default AdminLayout;