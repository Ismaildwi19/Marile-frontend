import React, { useState } from 'react';
import { X, Banknote, QrCode } from 'lucide-react';
import '../styles/CashierPayment.css'; // Pastikan file CSS ini ada atau sesuaikan path-nya

// UBAH NAMA KOMPONEN DI SINI MENJADI CashierPayment
const CashierPayment = ({ isOpen, onClose, totalAmount = 0, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('tunai');
  const [amountPaid, setAmountPaid] = useState('');
  const [showQrisBarcode, setShowQrisBarcode] = useState(false);

  if (!isOpen) return null;

  // Skenario Anti-Error: Pastikan total tagihan selalu menjadi Angka murni
  // Jika totalAmount berbentuk string ("Rp 150.000"), kita ubah paksa jadi angka (150000)
  const safeTotalAmount = typeof totalAmount === 'string' 
    ? parseInt(totalAmount.replace(/[^0-9]/g, ''), 10) || 0 
    : totalAmount;

  // Fungsi mengubah angka menjadi format Rp 100.000
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  // Kalkulasi Angka
  const amountPaidNumber = parseInt(amountPaid) || 0;
  const kembalian = amountPaidNumber - safeTotalAmount;

  // Logika saat Numpad ditekan
  const handleNumpadClick = (value) => {
    if (value === '=') {
      processPayment();
    } else if (value === 'C') {
      setAmountPaid('');
    } else {
      setAmountPaid((prev) => {
        if (prev === '0') return value;
        return prev + value;
      });
    }
  };

  // Logika Proses Pembayaran
  const processPayment = () => {
    if (paymentMethod === 'qris') {
      setShowQrisBarcode(true);
    } else {
      if (amountPaidNumber < safeTotalAmount) {
        alert("Nominal pembayaran kurang dari Total Tagihan!");
        return;
      }
      if (onComplete) onComplete(kembalian);
    }
  };

  const resetAndClose = () => {
    setPaymentMethod('tunai');
    setAmountPaid('');
    setShowQrisBarcode(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className={`payment-modal-content ${showQrisBarcode ? 'qris-mode' : ''}`}>
        
        <button className="modal-close-btn" onClick={resetAndClose}>
          <X size={20} strokeWidth={3} />
        </button>

        {showQrisBarcode ? (
          <div className="qris-barcode-container">
            <h2>Qris Pembayaran</h2>
            <p className="qris-total">Rp {formatRupiah(safeTotalAmount)}</p>
            <div className="barcode-placeholder">
              <QrCode size={150} color="#162421" />
            </div>
            <button className="btn-action full-width" onClick={() => onComplete && onComplete(0)}>
              Cetak Nota
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Metode Pembayaran</h2>
            <div className="payment-modal-body">
              
              <div className="payment-left-col">
                <div className="method-selector">
                  <button 
                    className={`method-card ${paymentMethod === 'tunai' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('tunai'); setAmountPaid(''); }}
                  >
                    <Banknote size={40} className="method-icon" />
                    <span>Tunai</span>
                  </button>
                  <button 
                    className={`method-card ${paymentMethod === 'qris' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('qris'); setAmountPaid(''); }}
                  >
                    <QrCode size={40} className="method-icon" />
                    <span>Qris</span>
                  </button>
                </div>

                <div className="payment-inputs">
                  <label>Total Tagihan</label>
                  <input type="text" value={`Rp ${formatRupiah(safeTotalAmount)}`} readOnly className="input-readonly" />
                  
                  {paymentMethod === 'tunai' && (
                    <>
                      <label>Masukan jumlah Pembayaran</label>
                      <input 
                        type="text" 
                        value={amountPaid ? `Rp ${formatRupiah(amountPaidNumber)}` : ''} 
                        readOnly 
                        placeholder="Rp 0"
                        className="input-amount" 
                      />

                      {/* Info Kembalian Live */}
                      {amountPaidNumber > 0 && (
                        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: kembalian >= 0 ? '#f0fbf9' : '#fff0f0', borderRadius: '8px', border: `1px solid ${kembalian >= 0 ? '#2BAE96' : '#E53935'}` }}>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#162421' }}>
                            {kembalian >= 0 ? 'Kembalian: ' : 'Kurang: '}
                          </span>
                          <span style={{ fontSize: '16px', fontWeight: '800', color: kembalian >= 0 ? '#2BAE96' : '#E53935' }}>
                            Rp {formatRupiah(Math.abs(kembalian))}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <button className="btn-action full-width" onClick={processPayment}>
                    {paymentMethod === 'tunai' ? 'Cetak Nota' : 'Tampilkan Qris'}
                  </button>
                </div>
              </div>

              <div className="numpad-grid">
                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', 'C', '='].map((num) => (
                  <button 
                    key={num} 
                    className={`numpad-btn ${num === '=' ? 'btn-equals' : ''} ${num === 'C' ? 'btn-clear' : ''}`}
                    onClick={() => handleNumpadClick(num)}
                    disabled={paymentMethod === 'qris'}
                    style={{ opacity: paymentMethod === 'qris' ? 0.5 : 1 }}
                  >
                    {num}
                  </button>
                ))}
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

// PASTIKAN NAMA EXPORT-NYA SAMA DENGAN NAMA KOMPONEN
export default CashierPayment;