import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts'; // Import halaman baru
import AdminHistory from './pages/AdminHistory';
import AdminLayout from './components/AdminLayout'; // Import layout pembungkus
import CashierLayout from './components/CashierLayout';
import CashierDashboard from './pages/CashierDashboard';
import CashierProducts from './pages/CashierProduct';
import CashierHistory from './pages/CashierHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* PERBAIKAN DI SINI: Hapus AdminLayout pembungkus karena sudah ada di dalam AdminProducts */}
        <Route path="/admin/products" element={<AdminProducts />} />

        <Route path="/admin/history" element={<AdminHistory />} />
        
        {/* Cashier Routes */}
        <Route path="/cashier" element={<CashierDashboard />} />
        <Route path="/cashier/products" element={<CashierProducts />} />
        <Route path="/cashier/history" element={<CashierHistory />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;