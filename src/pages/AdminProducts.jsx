import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal'; // Import modal baru
import { Plus } from 'lucide-react';
import '../styles/AdminProduct.css';

const AdminProducts = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State untuk modal tambah
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Gunakan state untuk products agar bisa bertambah
  const [products, setProducts] = useState([
    { id: 1, name: 'Buah Semangka', category: 'Buah', price: '20000', stock: 10, img: '/assets/img/semangka.png' },
    { id: 2, name: 'Daging Sapi', category: 'Daging', price: '120000', stock: 5, img: '/assets/img/semangka.png' },
    { id: 3, name: 'Ikan Nila', category: 'Ikan', price: '35000', stock: 15, img: '/assets/img/semangka.png' },
    { id: 4, name: 'Sayur Bayam', category: 'Sayur', price: '5000', stock: 20, img: '/assets/img/semangka.png' },
    { id: 5, name: 'Buah Semangka', category: 'Buah', price: '20000', stock: 10, img: '/assets/img/semangka.png' },
    { id: 6, name: 'Daging Sapi', category: 'Daging', price: '120000', stock: 5, img: '/assets/img/semangka.png' },
    { id: 7, name: 'Ikan Nila', category: 'Ikan', price: '35000', stock: 15, img: '/assets/img/semangka.png' },
    { id: 8, name: 'Sayur Bayam', category: 'Sayur', price: '5000', stock: 20, img: '/assets/img/semangka.png' },
  ]);

  const categories = ['Semua', 'Daging', 'Ikan', 'Sayur', 'Buah'];

  const filteredProducts = activeFilter === 'Semua' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  // Fungsi Tambah Produk
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="products-container">
        {/* HEADER DENGAN TOMBOL TAMBAH */}
        <div className="page-header-row">
          <h2 className="page-title">Daftar <span>Produk</span></h2>
          <button className="btn-add-product" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} />
            Tambah Produk
          </button>
        </div>

        <div className="filter-group">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-card-table">
  {/* Header ini akan sticky karena CSS position: sticky */}
  <div className="table-row-header">
    <div className="col-info">Nama Produk</div>
    <div className="col-item">Kategori</div>
    <div className="col-item">Harga</div>
    <div className="col-item">Stock</div>
    <div className="col-action">Ubah</div>
  </div>

  {/* Div ini yang akan melakukan scrolling */}
  <div className="table-body">
    {filteredProducts.map((p) => (
      <div className="table-row-card" key={p.id}>
        <div className="col-info">
          <div className="product-img-wrapper">
            <img src={p.img} alt={p.name} />
          </div>
          <span className="product-name-label">{p.name}</span>
        </div>
        <div className="col-item">{p.category}</div>
        <div className="col-item">Rp {p.price}</div>
        <div className={`col-item ${p.stock < 10 ? 'low-stock' : ''}`}>
          {p.stock} Pcs
        </div>
        <div className="col-action">
          <button className="edit-btn-outline" onClick={() => handleEditClick(p)}>Edit</button>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>

      {/* Modal Add & Edit tetap ada di sini */}
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddProduct} 
      />
      <EditProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        product={selectedProduct}
      />
    </AdminLayout>
  );
};

export default AdminProducts;