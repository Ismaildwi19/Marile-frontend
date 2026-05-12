import React from 'react';
import '../styles/login.css';

const Login = () => {
  return (
    <div className="login-screen">
      <div className="login-content">
        
        {/* SISI KIRI (SUDAH OKE) */}
        <div className="left-brand">
        <img src="/assets/img/logo_login.png" alt="Marile" className="marile-logo" />
        <h1 className="marile-title">Marile</h1>
        </div>

        {/* SISI KANAN (PERBAIKAN) */}
        <div className="right-auth-card">
            <div className="card-header-vertical">
                <h2 className="login-header-text">LOGIN</h2>
                <p className="login-sub-text">
                Masuk untuk melanjutkan ke sistem Marile
                </p>
        </div>

          <form className="auth-form-body">
            <div className="input-row">
              <label>Username</label>
              <input type="text" required />
            </div>

            <div className="input-row">
              <label>Password</label>
              <input type="password" required />
            </div>

            <div className="auth-utils-row">
              <label className="remember-me-label">
                <input type="checkbox" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn-orange">Login</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;