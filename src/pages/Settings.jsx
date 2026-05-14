import React, { useState } from 'react';
import { User, Bell, Shield, Upload, Eye, EyeOff } from 'lucide-react';
// Import kedua layout agar bisa berganti otomatis
import AdminLayout from '../components/AdminLayout'; 
import CashierLayout from '../components/CashierLayout'; 
import '../styles/Settings.css';

const Settings = ({ role = "Admin" }) => {
  const [activeMenu, setActiveMenu] = useState('profil');
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  
  // State untuk form profil agar bisa diinput
  const [profileData, setProfileData] = useState({
    nama: '',
    username: '',
    email: '',
    telp: ''
  });

  // LOGIKA DINAMIS: Pilih layout berdasarkan prop 'role'
  // Jika role="Admin" pakai AdminLayout, selain itu pakai CashierLayout
  const Layout = role === "Admin" ? AdminLayout : CashierLayout;

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'profil':
        return (
          <div className="settings-card-content">
            <div className="settings-header-inner">
              <h3>Profil {role}</h3>
              <p className="subtitle">Kelola informasi akun {role.toLowerCase()} Anda</p>
            </div>

            <div className="profile-settings-container">
              <div className="avatar-section">
                <p className="label-bold">Foto Profil</p>
                <div className="avatar-placeholder">
                   {/* Inisial nama jika foto kosong */}
                   <span>{profileData.nama.charAt(0)}</span>
                </div>
                <button className="btn-upload">
                  <Upload size={16} /> Ubah Foto
                </button>
                <span className="file-info">Format JPG, PNG, Maks 2MB</span>
              </div>

              <div className="form-section">
                <div className="input-group">
                  <label>Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="nama"
                    value={profileData.nama}
                    onChange={handleProfileChange}
                    placeholder="Masukkan nama lengkap" 
                  />
                </div>
                <div className="input-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    placeholder="Masukkan username" 
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="Masukkan email" 
                  />
                </div>
                <div className="input-group">
                  <label>Nomor Telepon</label>
                  <input 
                    type="text" 
                    name="telp"
                    value={profileData.telp}
                    onChange={handleProfileChange}
                    placeholder="Masukkan nomor telepon" 
                  />
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
            <h3>Keamanan Akun</h3>
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
                        className="btn-toggle-eye"
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
                <p>Gunakan minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="settings-page-content">
        <div className="settings-sidebar-nav">
          <h3>Menu Pengaturan</h3>
          <div className="menu-list">
            <button 
              className={`menu-item-btn ${activeMenu === 'profil' ? 'active' : ''}`}
              onClick={() => setActiveMenu('profil')}
            >
              <div className="icon-wrapper"><User size={20} /></div>
              <div className="menu-info">
                <p className="menu-title">Profil {role}</p>
                <p className="menu-subtitle">Informasi pribadi</p>
              </div>
            </button>

            <button 
              className={`menu-item-btn ${activeMenu === 'notifikasi' ? 'active' : ''}`}
              onClick={() => setActiveMenu('notifikasi')}
            >
              <div className="icon-wrapper"><Bell size={20} /></div>
              <div className="menu-info">
                <p className="menu-title">Notifikasi</p>
                <p className="menu-subtitle">Atur peringatan</p>
              </div>
            </button>

            <button 
              className={`menu-item-btn ${activeMenu === 'keamanan' ? 'active' : ''}`}
              onClick={() => setActiveMenu('keamanan')}
            >
              <div className="icon-wrapper"><Shield size={20} /></div>
              <div className="menu-info">
                <p className="menu-title">Keamanan</p>
                <p className="menu-subtitle">Kata sandi & akun</p>
              </div>
            </button>
          </div>
        </div>

        <div className="settings-main-container">
          <div className="settings-scroll-area">
             {renderContent()}
          </div>
          <div className="settings-action-footer">
            <button className="btn-cancel">Batalkan</button>
            <button className="btn-save-settings">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;