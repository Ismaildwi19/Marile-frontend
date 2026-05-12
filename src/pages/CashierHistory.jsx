import React, { useState } from 'react';
import CashierLayout from '../components/CashierLayout'; // Sesuaikan path jika berbeda
import '../styles/CashierHistory.css';
import { Calendar, MoreVertical, ChevronDown } from 'lucide-react';

const CashierHistory = () => {
  // Dummy data untuk riwayat transaksi
  const [transactions] = useState([
    { id: '#TRX-001', date: '26/05/2026, 12.00', payment: 'Tunai', items: '5 item', total: 'Rp. 150.000', status: 'Selesai' },
    { id: '#TRX-002', date: '26/05/2026, 12.15', payment: 'QRIS', items: '2 item', total: 'Rp. 45.000', status: 'Selesai' },
    { id: '#TRX-003', date: '26/05/2026, 12.30', payment: 'Tunai', items: '1 item', total: 'Rp. 20.000', status: 'Selesai' },
    { id: '#TRX-004', date: '26/05/2026, 12.45', payment: 'Kartu Debit', items: '8 item', total: 'Rp. 320.000', status: 'Selesai' },
    { id: '#TRX-005', date: '26/05/2026, 13.00', payment: 'Tunai', items: '3 item', total: 'Rp. 75.000', status: 'Selesai' },
    { id: '#TRX-006', date: '26/05/2026, 13.20', payment: 'QRIS', items: '4 item', total: 'Rp. 110.000', status: 'Selesai' },
    { id: '#TRX-007', date: '26/05/2026, 13.45', payment: 'Tunai', items: '2 item', total: 'Rp. 50.000', status: 'Selesai' },
    { id: '#TRX-008', date: '26/05/2026, 14.00', payment: 'Tunai', items: '5 item', total: 'Rp. 150.000', status: 'Selesai' },
  ]);

  return (
    <CashierLayout>
      <div className="history-page-content">
        
        {/* HEADER HALAMAN */}
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

        {/* TABEL RIWAYAT TRANSAKSI */}
        <div className="history-table-container">
          
          {/* Table Header (Teal) */}
          <div className="history-table-header">
            <div>Id Transaksi</div>
            <div>Tanggal & Waktu</div>
            <div>Pembayaran</div>
            <div>Item</div>
            <div>Total Harga</div>
            <div>Status</div>
            <div className="text-center">Aksi</div>
          </div>

          {/* Table Body */}
          <div className="history-table-body">
            {transactions.map((trx, index) => (
              <div className="history-table-row" key={index}>
                <div className="font-bold">{trx.id}</div>
                <div>{trx.date}</div>
                <div>{trx.payment}</div>
                <div>{trx.items}</div>
                <div className="font-bold">{trx.total}</div>
                <div className="status-selesai">{trx.status}</div>
                <div className="action-col">
                  <button className="action-btn">⋮</button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </CashierLayout>
  );
};

export default CashierHistory;