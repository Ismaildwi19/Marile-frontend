import React, { useState, useEffect } from 'react';
import { X, Banknote, QrCode, ShoppingBag } from 'lucide-react';
import '../styles/CashierPayment.css'; // Pastikan path ini sesuai dengan folder Anda

const CashierPayment = ({ isOpen, onClose, totalAmount = 0, cartItems = [], onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('tunai');
  const [amountPaid, setAmountPaid] = useState('');
  const [showQrisBarcode, setShowQrisBarcode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('tunai');
      setAmountPaid('');
      setShowQrisBarcode(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const safeTotalAmount = typeof totalAmount === 'string' 
    ? parseInt(totalAmount.replace(/[^0-9]/g, ''), 10) || 0 
    : totalAmount;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const amountPaidNumber = parseInt(amountPaid) || 0;
  const kembalian = amountPaidNumber - safeTotalAmount;

  const handleNumpadClick = (value) => {
    if (value === '=') {
      processPayment();
    } else if (value === 'Hapus') {
      setAmountPaid(prev => prev.toString().slice(0, -1));
    } else {
      setAmountPaid((prev) => {
        if (prev === '0') return value;
        return prev + value;
      });
    }
  };

  const processPayment = () => {
    if (paymentMethod === 'qris') {
      setShowQrisBarcode(true);
    } else {
      if (amountPaidNumber < safeTotalAmount) {
        alert("Nominal pembayaran kurang!");
        return;
      }
      if (onComplete) onComplete(kembalian);
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`payment-modal-content ${showQrisBarcode ? 'qris-mode' : ''}`}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} strokeWidth={3} />
        </button>

        {showQrisBarcode ? (
          <div className="qris-barcode-container">
            <h2>QRIS Pembayaran</h2>
            <p className="qris-total">Total: Rp {formatRupiah(safeTotalAmount)}</p>
            <div className="barcode-placeholder">
              <QrCode size={180} color="#162421" />
            </div>
            <p className="qris-instruction">Silahkan scan barcode di atas</p>
            <button className="btn-action" onClick={() => onComplete && onComplete(0)}>
              KONFIRMASI SELESAI
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Pembayaran</h2>
            <div className="payment-modal-body">
              <div className="payment-left-col">
                <div className="order-summary-box">
                  <div className="summary-header">
                    <ShoppingBag size={16} />
                    <span>Rincian Pesanan ({cartItems.length})</span>
                  </div>
                  <div className="summary-list">
                    {cartItems.map((item) => (
                      <div key={item.id} className="summary-item">
                        <span className="summary-name">{item.name}</span>
                        <span className="summary-qty">x{item.qty}</span>
                        <span className="summary-price">Rp {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="method-selector">
                  <button 
                    className={`method-card ${paymentMethod === 'tunai' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('tunai'); setAmountPaid(''); }}
                  >
                    <Banknote size={24} />
                    <span>Tunai</span>
                  </button>
                  <button 
                    className={`method-card ${paymentMethod === 'qris' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('qris'); setAmountPaid(''); }}
                  >
                    <QrCode size={24} />
                    <span>QRIS</span>
                  </button>
                </div>

                <div className="payment-inputs">
                  <div className="total-display">
                    <label>Total Tagihan</label>
                    <div className="val">Rp {formatRupiah(safeTotalAmount)}</div>
                  </div>
                  
                  {paymentMethod === 'tunai' && (
                    <div className="paid-input-group">
                      <input 
                        type="text" 
                        value={amountPaid ? `Rp ${formatRupiah(amountPaidNumber)}` : ''} 
                        readOnly 
                        placeholder="Rp 0"
                        className="input-amount" 
                      />

                      {amountPaidNumber > 0 && (
                        <div className={`change-info ${kembalian >= 0 ? 'success' : 'danger'}`}>
                          <span>{kembalian >= 0 ? 'Kembalian' : 'Kurang'}</span>
                          <strong>Rp {formatRupiah(Math.abs(kembalian))}</strong>
                        </div>
                      )}
                    </div>
                  )}

                  <button className="btn-action" onClick={processPayment}>
                    {paymentMethod === 'tunai' ? 'CETAK NOTA' : 'TAMPILKAN QRIS'}
                  </button>
                </div>
              </div>

              <div className="numpad-grid">
                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', 'Hapus', '='].map((num) => (
                  <button 
                    key={num} 
                    className={`numpad-btn ${num === '=' ? 'btn-equals' : ''} ${num === 'Hapus' ? 'btn-clear' : ''}`}
                    onClick={() => handleNumpadClick(num)}
                    disabled={paymentMethod === 'qris'}
                  >
                    {num == 'Hapus' ? '⌫' : num}
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

export default CashierPayment;