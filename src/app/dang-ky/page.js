"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    // TODO: Tích hợp API đăng ký sau
    alert("Đang xử lý đăng ký cho sinh viên: " + formData.name);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <div className="auth-icon">📝</div>
            <h1>Đăng ký tài khoản</h1>
            <p>Tham gia cộng đồng TimDo.vn ngay hôm nay</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Họ và tên *</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="VD: Hồ Ngọc Trai"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                className="input"
                placeholder="VD: 0912345678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="nhap.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Mật khẩu *</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Xác nhận mật khẩu *</label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-options">
              <label className="checkbox-label" style={{ alignItems: "flex-start" }}>
                <input type="checkbox" required style={{ marginTop: "4px" }} />
                <span>Tôi đồng ý với các <a href="#" className="forgot-password">Điều khoản dịch vụ</a> và <a href="#" className="forgot-password">Chính sách bảo mật</a></span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              Tạo tài khoản
            </button>
          </form>

          <div className="auth-footer">
            <p>Đã có tài khoản? <a href="/dang-nhap">Đăng nhập</a></p>
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
          background: radial-gradient(circle at 50% -20%, rgba(16, 185, 129, 0.15), transparent 60%);
        }

        .auth-container {
          width: 100%;
          max-width: 480px;
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
          gap: 18px;
        }

        .auth-options {
          font-size: 0.85rem;
          margin-top: 4px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-secondary);
          line-height: 1.5;
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
          background: var(--accent-green);
          box-shadow: var(--shadow-glow-green);
        }

        .auth-submit:hover {
          background: #059669;
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
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
          color: var(--primary-light);
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
