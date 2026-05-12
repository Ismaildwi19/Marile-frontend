import React, { useState, useEffect } from 'react';
import CashierLayout from '../components/CashierLayout';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import '../styles/CashierDashboard.css';
import CashierPayment from '../components/CashierPayment';

const CashierDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  
  // State untuk mengontrol Modal Pembayaran
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Load Data - 16 Produk dengan data Stok
  useEffect(() => {
    const dummyData = [
      { id: 1, name: 'Ikan Nila', category: 'Ikan', price: 20000, stock: 15, img: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400', desc: 'Tanpa Bumbu' },
      { id: 2, name: 'Ikan Kembung', category: 'Ikan', price: 25000, stock: 3, img: 'https://images.unsplash.com/photo-1534833363744-41bc184ee8f1?w=400', desc: 'Tanpa Bumbu' },
      { id: 3, name: 'Daging Sapi', category: 'Daging', price: 120000, stock: 10, img: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400', desc: 'Tanpa Bumbu' },
      { id: 4, name: 'Sayur Sawi', category: 'Sayuran', price: 5000, stock: 2, img: 'https://images.unsplash.com/photo-1547396033-283a49806654?w=400', desc: 'Segar' },
      { id: 5, name: 'Ikan Gurame', category: 'Ikan', price: 45000, stock: 8, img: 'https://images.unsplash.com/photo-1524704659694-a27e4920f631?w=400', desc: 'Tanpa Bumbu' },
      { id: 6, name: 'Daging Ayam', category: 'Daging', price: 35000, stock: 20, img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', desc: 'Potong 8' },
      { id: 7, name: 'Sayur Bayam', category: 'Sayuran', price: 4000, stock: 12, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400', desc: 'Segar' },
      { id: 8, name: 'Buah Naga', category: 'Buah', price: 15000, stock: 4, img: 'https://images.unsplash.com/photo-1527325672341-3184563a4446?w=400', desc: 'Manis' },
      { id: 9, name: 'Ikan Bawal', category: 'Ikan', price: 30000, stock: 7, img: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=400', desc: 'Tanpa Bumbu' },
      { id: 10, name: 'Buah Melon', category: 'Buah', price: 18000, stock: 6, img: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400', desc: 'Segar' },
      { id: 11, name: 'Ikan Kakap', category: 'Ikan', price: 55000, stock: 2, img: 'https://images.unsplash.com/photo-1534833213214-e22f28320141?w=400', desc: 'Fillet' },
      { id: 12, name: 'Sayur Kangkung', category: 'Sayuran', price: 3500, stock: 15, img: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?w=400', desc: 'Segar' },
      { id: 13, name: 'Daging Kambing', category: 'Daging', price: 140000, stock: 5, img: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400', desc: 'Lokal' },
      { id: 14, name: 'Buah Jeruk', category: 'Buah', price: 12000, stock: 30, img: 'https://images.unsplash.com/photo-1582979512210-99b6a50885f4?w=400', desc: 'Sunkist' },
      { id: 15, name: 'Ikan Tongkol', category: 'Ikan', price: 22000, stock: 9, img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400', desc: 'Segar' },
      { id: 16, name: 'Sayur Brokoli', category: 'Sayuran', price: 15000, stock: 1, img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400', desc: 'Organik' },
    ];
    setProducts(dummyData);
  }, []);

  const addToCart = (product) => {
    if (product.stock <= 0) return; // Tidak bisa tambah jika stok habis

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.qty >= product.stock) return prevCart; // Batas stok
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            // Validasi stok saat tambah di keranjang
            if (delta > 0 && newQty > item.stock) return item; 
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter((item) => item !== null);
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = 0;
  const total = subtotal + tax;

  return (
    <CashierLayout>
      <div className="pos-container">
        <div className="pos-catalog">
          <div className="category-tabs">
            {['Semua', 'Daging', 'Ikan', 'Sayuran', 'Buah'].map(cat => (
              <button 
                key={cat} 
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pos-grid">
            {products
              .filter(p => activeCategory === 'Semua' || p.category === activeCategory)
              .map(product => (
                <div className="product-pos-card" key={product.id} onClick={() => addToCart(product)}>
                  <div className="img-wrapper">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="product-pos-info">
                    <h4>{product.name}</h4>
                    <span className="desc-text">{product.desc}</span>
                    <p className="price-text">Rp {product.price.toLocaleString()}</p>
                    {/* Stok Indikator */}
                    <div className={`stock-info ${product.stock <= 5 ? 'low-stock' : ''}`}>
                      Stok: {product.stock}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="pos-cart">
          <div className="cart-header-title">
            <ShoppingCart size={20} />
            <h3>SHOPPING CART</h3>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-msg">Keranjang masih kosong</p>
            ) : (
              cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <div className="item-detail">
                    <h5>{item.name}</h5>
                    <p>Rp {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, -1)}><Minus size={14}/></button>
                    <span>{item.qty}</span>
                    <button className="plus" onClick={() => updateQty(item.id, 1)}><Plus size={14}/></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-line">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-line">
              <span>Pajak (10%)</span>
              <span>Rp {tax.toLocaleString()}</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
            {/* BUTTON TRIGGER MODAL */}
            <button 
              className="checkout-btn" 
              disabled={cart.length === 0}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              LANJUTKAN KE PEMBAYARAN
            </button>
          </div>
        </div>
      </div>

      {/* RENDER MODAL PEMBAYARAN DI SINI */}
      <CashierPayment 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        totalAmount={total} 
        cartItems={cart} // <--- TAMBAHKAN INI (Mengirim detail belanja)
        onComplete={(kembalian) => {
          alert(`Transaksi Selesai! Kembalian: Rp ${kembalian.toLocaleString('id-ID')}\nNota sedang dicetak...`);
          setCart([]); 
          setIsPaymentModalOpen(false);
        }}
      />
      
    </CashierLayout>
  );
};

export default CashierDashboard;