import React, { useState, useRef } from 'react';
import { X, UploadCloud } from 'lucide-react';
import '../styles/AdminProduct.css';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  // Input file tersembunyi
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Ikan',
    price: '',
    stock: '',
    // Default placeholder jika belum upload
    img: '/assets/img/semangka.png' 
  });

  // State untuk menyimpan nama file yang diunggah
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  // --- LOGIKA UPLOAD GAMBAR DISINI ---
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Ambil file pertama

    if (file) {
      setFileName(file.name); // Simpan nama file

      // Inisialisasi FileReader
      const reader = new FileReader();

      // Callback ketika file selesai dibaca
      reader.onloadend = () => {
        // reader.result berisi string Base64 gambar
        setFormData({ ...formData, img: reader.result }); 
      };

      // Mulai membaca file sebagai Data URL (Base64)
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() }); // Kirim data baru
    // Reset form ke awal
    setFormData({ name: '', category: 'Ikan', price: '', stock: '', img: '/assets/img/semangka.png' });
    setFileName('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Tambah <span>Produk Baru</span></h3>
          <button onClick={onClose} className="icon-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="image-upload-section">
            <div className="image-preview-box">
              {/* Gambar akan otomatis berubah saat di-upload berkat Base64 string */}
              <img src={formData.img} alt="Preview" />
            </div>
            
            {/* Input file asli disembunyikan */}
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg"
              ref={fileInputRef} 
              onChange={handleImageChange}
              style={{ display: 'none' }} 
            />

            {/* Tombol pemicu upload yang serasi dengan desain */}
            <button 
              type="button" 
              className="btn-upload-trigger" 
              onClick={() => fileInputRef.current.click()}
            >
              <UploadCloud size={16} />
              {fileName ? 'Ganti Foto' : 'Unggah Foto Produk'}
            </button>
            {fileName && <span className="file-name-text">{fileName}</span>}
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Nama Produk</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
                placeholder="Contoh: Ikan Bandeng Super"
              />
            </div>
            <div className="input-group">
              <label>Kategori</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Daging">Daging</option>
                <option value="Ikan">Ikan</option>
                <option value="Sayur">Sayur</option>
                <option value="Buah">Buah</option>
              </select>
            </div>
            <div className="input-group">
              <label>Harga (Rp)</label>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required 
                placeholder="50000"
              />
            </div>
            <div className="input-group">
              <label>Jumlah Stok</label>
              <input 
                type="number" 
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                required 
                placeholder="10"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel">
              Batal
            </button>
            <button type="submit" className="btn-save">
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;