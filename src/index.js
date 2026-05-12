import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Pastikan 'A' kapital
import './styles/index.css'; // Path baru setelah folder styles masuk ke src
import './styles/AdminLayout.css'; // Pastikan path ini sesuai dengan lokasi file CSS kamu

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);