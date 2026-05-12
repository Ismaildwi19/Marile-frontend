import React, { useState } from 'react';
// Pastikan path import komponen CashierLayout benar sesuai struktur folder Anda
import CashierLayout from '../components/CashierLayout'; 
import '../styles/CashierProduct.css'; // Pastikan file CSS ini sudah dibuat dan diisi dengan style yang diperlukan

const CashierProducts = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  
  // Data produk
  const [products] = useState([
    { id: 1, name: 'Buah Semangka', category: 'Buah', price: '20.000', stock: 10, img: '/assets/img/semangka.png' },
    { id: 2, name: 'Daging Sapi', category: 'Daging', price: '120.000', stock: 5, img: '/assets/img/semangka.png' },
    { id: 3, name: 'Ikan Nila', category: 'Ikan', price: '35.000', stock: 15, img: '/assets/img/semangka.png' },
    { id: 4, name: 'Sayur Bayam', category: 'Sayur', price: '5.000', stock: 20, img: '/assets/img/semangka.png' },
    { id: 6, name: 'Buah Naga', category: 'Buah', price: '25.000', stock: 0, img: '/assets/img/semangka.png' },
  ]);

  const categories = ['Semua', 'Daging', 'Ikan', 'Sayur', 'Buah'];

  const filteredProducts = activeFilter === 'Semua' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <CashierLayout>
      <div className="cashier-page-content">
        
        {/* HEADER HALAMAN (Opsional, agar sama dengan Admin) */}
        <div className="page-header">
          <h2>Daftar <span>Produk</span></h2>
        </div>
        
        {/* FILTER KATEGORI (Style menyerupai Dashboard Admin) */}
        <div className="filters-container">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TABEL LIST PRODUK */}
        <div className="product-table-wrapper">
          {/* Header Tabel Teal */}
          <div className="teal-table-header">
            <div className="col-name">Nama Produk</div>
            <div className="col-cat">Kategori</div>
            <div className="col-price">Harga</div>
            <div className="col-stock">Stock</div>
            <div className="col-status">Status</div>
          </div>

          {/* Area yang bisa di-scroll */}
          <div className="table-scroll-container">
            {filteredProducts.map((p) => (
              <div className="product-list-row" key={p.id}>
                <div className="col-name">
                  <div className="img-thumbnail">
                    <img src={p.img} alt={p.name} />
                  </div>
                  <span className="p-text-bold">{p.name}</span>
                </div>
                <div className="col-cat p-text-medium">{p.category}</div>
                <div className="col-price p-text-bold">Rp. {p.price}</div>
                <div className={`col-stock p-text-bold ${p.stock < 10 ? 'low-stock-text' : ''}`}>
                  {p.stock}
                </div>
                <div className="col-status p-text-bold">
                  {p.stock > 0 ? (
                    <span className="status-available">Tersedia</span>
                  ) : (
                    <span className="status-empty">Habis</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CashierLayout>
  );
};

export default CashierProducts;