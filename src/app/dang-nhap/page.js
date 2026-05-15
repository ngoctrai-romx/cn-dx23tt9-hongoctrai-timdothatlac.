"use client";
import { useState } from "react";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        alert("Lỗi đăng nhập: " + res.error);
      } else {
        alert("Đăng nhập thành công!");
        window.location.href = '/';
      }
    } catch (error) {
      alert("Đã xảy ra lỗi hệ thống");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1>Đăng nhập</h1>
            <p>Chào mừng bạn quay lại với TimDo.vn</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email *</label>
              <input
                type="email"
                className="input"
                placeholder="nhap.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Mật khẩu *</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="forgot-password">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              Đăng nhập ngay
            </button>
          </form>

          <div className="auth-footer">
            <p>Chưa có tài khoản? <a href="/dang-ky">Đăng ký ngay</a></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 20px 60px;
          background: radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15), transparent 60%);
        }

        .auth-container {
          width: 100%;
          max-width: 440px;
        }

        .auth-card {
          padding: 40px;
          animation: slideUp 0.6s ease forwards;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          animation: float 4s ease infinite;
        }

        .auth-header h1 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .auth-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .auth-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .forgot-password {
          color: var(--primary-light);
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        .auth-submit {
          margin-top: 10px;
          padding: 14px;
          font-size: 1rem;
        }

        .auth-footer {
          margin-top: 24px;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .auth-footer a {
          color: var(--accent-green);
          font-weight: 600;
          margin-left: 4px;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
