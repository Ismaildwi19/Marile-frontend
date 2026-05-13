import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminHistory from './pages/AdminHistory';
import AdminLayout from './components/AdminLayout';
import CashierLayout from './components/CashierLayout';
import CashierDashboard from './pages/CashierDashboard';
import CashierProducts from './pages/CashierProduct';
import CashierHistory from './pages/CashierHistory';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/history" element={<AdminHistory />} />
        <Route path="/admin/settings" element={<Settings role="Admin" />} />
        
        {/* Cashier Routes */}
        <Route path="/cashier" element={<CashierDashboard />} />
        <Route path="/cashier/products" element={<CashierProducts />} />
        <Route path="/cashier/history" element={<CashierHistory />} />
        <Route path="/cashier/settings" element={<Settings role="Cashier" />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;