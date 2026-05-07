"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dùng dynamic import cho MapPicker vì Leaflet cần chạy ở Client-side (sử dụng đối tượng window)
const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-input)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
      Đang tải bản đồ...
    </div>
  ),
});

export default function DangTinPage() {
  const [type, setType] = useState("lost");
  const [position, setPosition] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position) {
      alert("Vui lòng chọn vị trí trên bản đồ!");
      return;
    }
    // TODO: Gửi data lên API (sẽ làm ở các bước sau)
    alert("Cảm ơn bạn! Tính năng gửi dữ liệu đang được hoàn thiện.\nVị trí đã chọn: " + position.lat.toFixed(5) + ", " + position.lng.toFixed(5));
  };

  return (
    <div className="dang-tin-page">
      <div className="container" style={{ maxWidth: "800px", paddingTop: "120px", paddingBottom: "60px" }}>
        
        <div className="section-header" style={{ marginBottom: "20px" }}>
          <h1 className="section-title">Đăng tin mới</h1>
          <p className="section-desc">Cung cấp thông tin chi tiết để cộng đồng giúp đỡ bạn tốt hơn.</p>
        </div>

        <form className="post-form card" onSubmit={handleSubmit}>
          
          {/* LOẠI TIN */}
          <div className="form-type-toggle">
            <button 
              type="button" 
              className={`type-btn ${type === "lost" ? "active lost" : ""}`}
              onClick={() => setType("lost")}
            >
              😰 Bị mất đồ
            </button>
            <button 
              type="button" 
              className={`type-btn ${type === "found" ? "active found" : ""}`}
              onClick={() => setType("found")}
            >
              🎉 Nhặt được đồ
            </button>
          </div>

          <div className="form-grid">
            {/* TIÊU ĐỀ */}
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label>Tiêu đề tin đăng *</label>
              <input 
                type="text" 
                className="input" 
                placeholder={type === "lost" ? "VD: Mất ví da màu nâu tại trường ĐH Trà Vinh" : "VD: Nhặt được CCCD tên Nguyễn Văn A"}
                required
              />
            </div>

            {/* DANH MỤC */}
            <div className="input-group">
              <label>Danh mục *</label>
              <select className="input" required>
                <option value="">-- Chọn danh mục --</option>
                <option value="giay-to">Giấy tờ tùy thân</option>
                <option value="dien-thoai">Điện thoại</option>
                <option value="vi-bop">Ví / Bóp</option>
                <option value="chia-khoa">Chìa khóa</option>
                <option value="thu-cung">Thú cưng</option>
                <option value="khac">Khác</option>
              </select>
            </div>

            {/* THỜI GIAN */}
            <div className="input-group">
              <label>Thời gian {type === "lost" ? "mất" : "nhặt"} (ước tính) *</label>
              <input type="date" className="input" required />
            </div>

            {/* HÌNH ẢNH */}
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label>Hình ảnh *</label>
              <div className="upload-area">
                <span className="upload-icon">📸</span>
                <p>Nhấp để tải ảnh lên hoặc kéo thả ảnh vào đây</p>
                <small className="text-muted">Hỗ trợ JPG, PNG (Tối đa 5MB)</small>
                {/* Giả lập nút upload, sau này sẽ làm tính năng upload thật */}
                <input type="file" style={{ display: "none" }} id="file-upload" />
                <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: "10px" }} onClick={() => document.getElementById("file-upload").click()}>Chọn ảnh</button>
              </div>
            </div>

            {/* MÔ TẢ */}
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label>Mô tả chi tiết *</label>
              <textarea 
                className="input" 
                placeholder="Mô tả đặc điểm nhận dạng, màu sắc, nhãn hiệu hoặc các vật dụng bên trong..."
                required
              ></textarea>
            </div>

            {/* BẢN ĐỒ VỊ TRÍ */}
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label>Vị trí {type === "lost" ? "mất" : "nhặt"} * <span style={{ color: "var(--accent-red)", fontWeight: "normal", fontSize: "0.8rem" }}>(Nhấp vào bản đồ để cắm ghim)</span></label>
              <MapPicker position={position} setPosition={setPosition} />
              {position && (
                <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "var(--accent-green)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>✅ Đã chọn vị trí: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}</span>
                  <button type="button" style={{ background: "none", border: "none", color: "var(--accent-red)", cursor: "pointer", textDecoration: "underline" }} onClick={() => setPosition(null)}>Xóa</button>
                </div>
              )}
            </div>

          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>Hủy</button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: "200px" }}>Đăng tin ngay</button>
          </div>
        </form>

      </div>

      <style jsx>{`
        .post-form {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .form-type-toggle {
          display: flex;
          gap: 10px;
          background: rgba(0,0,0,0.2);
          padding: 6px;
          border-radius: var(--radius-lg);
        }

        .type-btn {
          flex: 1;
          padding: 14px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid transparent;
          transition: all var(--transition-fast);
        }

        .type-btn:hover {
          color: var(--text-primary);
        }

        .type-btn.active {
          color: white;
        }

        .type-btn.active.lost {
          background: var(--accent-red);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .type-btn.active.found {
          background: var(--accent-green);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .upload-area {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 40px 20px;
          text-align: center;
          background: var(--bg-input);
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .upload-area:hover {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
        }

        .upload-icon {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .post-form {
            padding: 24px;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
