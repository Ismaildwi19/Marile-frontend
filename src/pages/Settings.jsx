import React, { useState } from 'react';
import { User, Bell, Shield, Upload, Eye, EyeOff } from 'lucide-react';
// Import layout sesuai peran (AdminLayout / CashierLayout)
import AdminLayout from '../components/AdminLayout'; 
import '../styles/SettingsAdmin.css';

const Settings = ({ role = "Admin" }) => {
  const [activeMenu, setActiveMenu] = useState('profil');
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

  // Render Konten Berdasarkan Menu yang Dipilih
  const renderContent = () => {
    switch (activeMenu) {
      case 'profil':
        return (
          <div className="settings-card-content">
            <h3>Profil {role}</h3>
            <p className="subtitle">Kelola informasi akun {role.toLowerCase()} yang digunakan untuk login</p>
            <div className="profile-settings-container">
              <div className="avatar-section">
                <p className="label-bold">Foto Profil</p>
                <div className="avatar-placeholder"></div>
                <button className="btn-upload">
                  <Upload size={16} /> Ubah Foto
                </button>
                <span className="file-info">Format JPG, PNG, Maks 2MB</span>
              </div>
              <div className="form-section">
                <div className="input-group">
                  <label>Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama lengkap" />
                </div>
                <div className="input-group">
                  <label>Username</label>
                  <input type="text" placeholder="Masukkan username" />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" placeholder="Masukkan email" />
                </div>
                <div className="input-group">
                  <label>Nomor Telepon</label>
                  <input type="text" placeholder="Masukkan nomor telepon" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'notifikasi':
        return (
          <div className="settings-card-content">
            <h3>Pengaturan Notifikasi</h3>
            <div className="notification-list">
              {[
                { title: "Pesanan Baru", desc: "Dapatkan notifikasi ketika pesanan baru masuk" },
                { title: "Pembayaran Masuk", desc: "Dapatkan notifikasi ketika pembayaran berhasil dilakukan" },
                { title: "Stok Produk Menipis", desc: "Dapatkan notifikasi ketika stok produk hampir habis" },
                { title: "Chat Pelanggan", desc: "Dapatkan notifikasi ketika ada pesan baru dari pelanggan" },
                { title: "Update Sistem", desc: "Dapatkan informasi update terbaru" },
              ].map((item, idx) => (
                <div className="notif-item" key={idx}>
                  <div className="notif-text">
                    <p className="notif-title">{item.title}</p>
                    <p className="notif-desc">{item.desc}</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked={idx !== 4} />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'keamanan':
        return (
          <div className="settings-card-content">
            <h3>Ubah Password</h3>
            <div className="password-form">
              {['Password Lama', 'Password Baru', 'Konfirmasi Password'].map((label, idx) => {
                const key = idx === 0 ? 'old' : idx === 1 ? 'new' : 'confirm';
                return (
                  <div className="input-group" key={key}>
                    <label>{label}</label>
                    <div className="password-input-wrapper">
                      <input 
                        type={showPassword[key] ? "text" : "password"} 
                        placeholder={`Masukkan ${label.toLowerCase()}`} 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword({...showPassword, [key]: !showPassword[key]})}
                      >
                        {showPassword[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="info-box-teal">
                <Shield size={20} />
                <p>Gunakan minimal 8 karakter dengan kombinasi huruf, angka, dan simbol untuk password yang lebih kuat</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout> {/* Sesuaikan dengan CashierLayout jika perlu */}
      <div className="settings-page-wrapper">
        <div className="settings-sidebar">
          <h3>Menu Pengaturan</h3>
          <div className="menu-list">
            <button 
              className={`menu-item ${activeMenu === 'profil' ? 'active' : ''}`}
              onClick={() => setActiveMenu('profil')}
            >
              <div className="icon-bg"><User size={20} /></div>
              <div className="menu-text">
                <p className="m-title">Profil {role}</p>
                <p className="m-desc">Kelola informasi akun {role.toLowerCase()}</p>
              </div>
            </button>
            <button 
              className={`menu-item ${activeMenu === 'notifikasi' ? 'active' : ''}`}
              onClick={() => setActiveMenu('notifikasi')}
            >
              <div className="icon-bg"><Bell size={20} /></div>
              <div className="menu-text">
                <p className="m-title">Notifikasi</p>
                <p className="m-desc">Atur preferensi notifikasi</p>
              </div>
            </button>
            <button 
              className={`menu-item ${activeMenu === 'keamanan' ? 'active' : ''}`}
              onClick={() => setActiveMenu('keamanan')}
            >
              <div className="icon-bg"><Shield size={20} /></div>
              <div className="menu-text">
                <p className="m-title">Keamanan</p>
                <p className="m-desc">Kelola keamanan akun</p>
              </div>
            </button>
          </div>
        </div>

        <div className="settings-main-card">
          {renderContent()}
          <div className="card-footer">
            <button className="btn-save">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;