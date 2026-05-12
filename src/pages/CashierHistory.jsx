import React, { useState } from 'react';
import CashierLayout from '../components/CashierLayout';
import '../styles/CashierHistory.css';
import { Calendar, ChevronDown, X, ShoppingBag, Printer } from 'lucide-react';

const CashierHistory = () => {
  // State untuk mengontrol modal detail
  const [selectedTrx, setSelectedTrx] = useState(null);

  // Dummy data (Saya tambahkan detail item untuk keperluan pop-up)
  const [transactions] = useState([
    { 
      id: '#TRX-001', 
      date: '26/05/2026, 12.00', 
      payment: 'Tunai', 
      itemsCount: '5 item', 
      total: 'Rp 150.000', 
      status: 'Selesai',
      details: [
        { name: 'Daging Sapi', qty: 1, price: 120000 },
        { name: 'Ikan Kembung', qty: 1, price: 25000 },
        { name: 'Sayur Sawi', qty: 1, price: 5000 },
      ]
    },
    { id: '#TRX-002', date: '26/05/2026, 12.15', payment: 'QRIS', itemsCount: '2 item', total: 'Rp 45.000', status: 'Selesai', details: [] },
    { id: '#TRX-003', date: '26/05/2026, 12.30', payment: 'Tunai', itemsCount: '1 item', total: 'Rp. 20.000', status: 'Selesai', details: [] },
    { id: '#TRX-004', date: '26/05/2026, 12.45', payment: 'Tunai', itemsCount: '8 item', total: 'Rp. 320.000', status: 'Selesai', details: [] },
    { id: '#TRX-005', date: '26/05/2026, 13.00', payment: 'Tunai', itemsCount: '3 item', total: 'Rp. 75.000', status: 'Selesai', details: [] },
    { id: '#TRX-006', date: '26/05/2026, 13.20', payment: 'QRIS', itemsCount: '4 item', total: 'Rp. 110.000', status: 'Selesai', details: [] },
    { id: '#TRX-007', date: '26/05/2026, 13.45', payment: 'Tunai', itemsCount: '2 item', total: 'Rp. 50.000', status: 'Selesai', details: [] },
    { id: '#TRX-008', date: '26/05/2026, 14.00', payment: 'Tunai', itemsCount: '5 item', total: 'Rp. 150.000', status: 'Selesai', details: [] },
  ]);

  const closeModal = () => setSelectedTrx(null);

  return (
    <CashierLayout>
      <div className="history-page-content">
        <div className="history-header-row">
          <h2>Riwayat Transaksi</h2>
          <div className="history-actions">
            <button className="history-btn-outline">
              <Calendar size={16} /> Hari ini
            </button>
            <button className="history-btn-outline">
              Urutkan : Terbaru <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="history-table-container">
          <div className="history-table-header">
            <div>Id Transaksi</div>
            <div>Tanggal & Waktu</div>
            <div>Pembayaran</div>
            <div>Item</div>
            <div>Total Harga</div>
            <div>Status</div>
            <div className="text-center">Aksi</div>
          </div>

          <div className="history-table-body">
            {transactions.map((trx, index) => (
              <div className="history-table-row" key={index}>
                <div className="font-bold">{trx.id}</div>
                <div>{trx.date}</div>
                <div>{trx.payment}</div>
                <div>{trx.itemsCount}</div>
                <div className="font-bold">{trx.total}</div>
                <div className="status-selesai">{trx.status}</div>
                <div className="action-col">
                  {/* Klik titik tiga untuk set data ke modal */}
                  <button className="action-btn" onClick={() => setSelectedTrx(trx)}>⋮</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL DETAIL TRANSAKSI */}
        {selectedTrx && (
          <div className="history-modal-overlay" onClick={closeModal}>
            <div className="history-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="history-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
              
              <div className="history-modal-header">
                <h3>Detail Transaksi</h3>
                <span className="trx-id-badge">{selectedTrx.id}</span>
              </div>

              <div className="history-modal-body">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Waktu Transaksi</label>
                    <p>{selectedTrx.date}</p>
                  </div>
                  <div className="info-item text-right">
                    <label>Metode Pembayaran</label>
                    <p><strong>{selectedTrx.payment}</strong></p>
                  </div>
                </div>

                <div className="detail-items-box">
                  <div className="detail-items-header">
                    <ShoppingBag size={14} /> <span>Daftar Produk</span>
                  </div>
                  <div className="items-list">
                    {selectedTrx.details.length > 0 ? (
                      selectedTrx.details.map((item, i) => (
                        <div className="item-row" key={i}>
                          <span className="item-name">{item.name}</span>
                          <span className="item-qty">x{item.qty}</span>
                          <span className="item-subtotal">Rp {item.price.toLocaleString()}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-detail">Detail produk tidak tersedia.</p>
                    )}
                  </div>
                </div>

                <div className="detail-total-section">
                  <div className="total-row">
                    <span>Total Bayar</span>
                    <span className="total-val">{selectedTrx.total}</span>
                  </div>
                </div>
              </div>

              <div className="history-modal-footer">
                <button className="btn-print-receipt">
                  <Printer size={16} /> CETAK ULANG NOTA
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CashierLayout>
  );
};

export default CashierHistory;