import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import '../styles/AdminProduct.css';

const EditProductModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: null
      });
      setPreview(product.img);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Update Produk</h3>
          <X size={24} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="image-upload-section">
              <div className="image-preview-box">
                {preview ? <img src={preview} alt="Preview" /> : <Upload size={40} color="#ccc" />}
              </div>
              <label className="upload-label">
                Ganti Foto Produk
                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
              </label>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Nama Produk</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Kategori</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Buah">Buah</option>
                  <option value="Daging">Daging</option>
                  <option value="Ikan">Ikan</option>
                  <option value="Sayur">Sayur</option>
                </select>
              </div>
              <div className="input-group">
                <label>Harga</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-save">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;