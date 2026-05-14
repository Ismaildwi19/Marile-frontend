import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { TrendingUp } from 'lucide-react';

// Data untuk Grafik Penjualan (Line Chart)
const salesData = [
  { name: 'Januari', val: 2 },
  { name: 'Februari', val: 3.8 },
  { name: 'Maret', val: 2.2 },
  { name: 'April', val: 3 },
  { name: 'Mei', val: 2.5 },
  { name: 'Juni', val: 4.5 },
];

// Data untuk Kategori Produk (Pie Chart)
const pieData = [
  { name: 'Ikan', value: 40, color: '#FF0000' },
  { name: 'Sayuran', value: 25, color: '#00FF00' },
  { name: 'Buah', value: 35, color: '#0000FF' },
];

// Data dummy untuk Pesanan Terbaru
const orders = [
  { id: '#INV-2026-001', time: '20 Mei 2026, 12.30', amount: 'Rp 15.000' },
  { id: '#INV-2026-002', time: '20 Mei 2026, 11.45', amount: 'Rp 32.000' },
  { id: '#INV-2026-003', time: '20 Mei 2026, 11.00', amount: 'Rp 20.000' },
  { id: '#INV-2026-004', time: '20 Mei 2026, 10.22', amount: 'Rp 45.000' },
];



const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <div className="page-title" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Selamat datang, <span style={{ color: 'var(--teal)' }}>Admin</span> 👋
      </div>

      {/* Baris Atas: Statistik Ringkas */}
      <div className="top-row">
        <div className="card">
          <div className="stat-label">Total Pesanan</div>
          <div className="stat-value">120</div>
          <div className="stat-sub">
            <span className="stat-badge">↑ 12%</span> dari minggu lalu
          </div>
        </div>

        <div className="card">
          <div className="stat-label">Pendapatan</div>
          <div className="stat-value" style={{ fontSize: '28px' }}>Rp 4.000.000</div>
          <div className="stat-sub">
            <span className="stat-badge">↑ 12%</span> dari minggu lalu
          </div>
        </div>

        {/* Kategori Produk dengan Perbaikan Syntax Error */}
        <div className="card">
          <div className="stat-label">Kategori Produk</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PieChart width={100} height={100}>
              <Pie
                data={pieData}
                innerRadius={30}
                outerRadius={45}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ flex: 1 }}>
              {pieData.map((item) => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  {/* PERBAIKAN: var(--muted) dibungkus tanda kutip */}
                  <span style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></span>
                    {item.name}
                  </span>
                  <span style={{ fontWeight: 800 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Baris Bawah: Grafik & List */}
      <div className="bottom-row">
        <div className="left-col">
          {/* Grafik Penjualan */}
          <div className="card" style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h4 style={{ margin: 0 }}>Grafik Penjualan</h4>
              <select style={{ borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px' }}>
                <option>6 Bulan Terakhir</option>
              </select>
            </div>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#2BAE96" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#2BAE96', stroke: '#fff', strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Produk Terlaris (Sesuai Gambar Mockup) */}
          <div className="card">
            <h4>Produk Terlaris</h4>
            <div className="produk-item">
              <div className="produk-thumb">
                <img src="/assets/img/fish.svg" alt="Ikan Gurame" />
              </div>
              <div style={{ flex: 1, fontWeight: 700 }}>Ikan Gurame</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Terjual 80</div>
            </div>
            <div className="produk-item">
              <div className="produk-thumb">
                <img src="/assets/img/fish.svg" alt="Ikan Bawal" />
              </div>
              <div style={{ flex: 1, fontWeight: 700 }}>Ikan Bawal</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Terjual 74</div>
            </div>
          </div>
        </div>

        {/* Pesanan Terbaru */}
        <div className="right-col">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0 }}>Pesanan Terbaru</h4>
              <span style={{ color: 'var(--teal)', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/admin/history')} >Lihat Semua
      </span>
            </div>
            {orders.map((order, index) => (
              <div className="pesanan-item" key={index}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{order.id}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{order.time}</div>
                </div>
                <div style={{ fontWeight: 'bold', marginRight: '10px' }}>{order.amount}</div>
                <button className="btn-selesai">Selesai</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;