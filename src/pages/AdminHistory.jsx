import React, { useState } from 'react';
import { Calendar, MoreVertical, ChevronDown } from 'lucide-react';
import AdminLayout from '../components/AdminLayout'; // Pastikan path benar
// Anda bisa mengarahkan ini ke CashierHistory.css jika tidak ingin membuat 2 file CSS yang isinya sama persis
import '../styles/AdminHistory.css'; 

const AdminHistory = () => {
  // Dummy data untuk riwayat transaksi
  const [transactions] = useState(
    Array(12).fill({
      id: '#TRX-XXX',
      date: '26/05/2026, 12.00',
      payment: 'Tunai',
      items: '5 item',
      total: 'Rp. xxx.xxx',
      status: 'Selesai'
    })
  );

  return (
    <AdminLayout>
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
                  <button className="action-btn">
                    <MoreVertical size={20} color="#162421" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHistory;