import "./globals.css";
import AuthProvider from "./AuthProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "Tìm Đồ Thất Lạc - Lost & Found",
  description: "Website giúp kết nối người mất đồ và người nhặt được đồ. Đăng tin, tìm kiếm và nhận lại đồ vật thất lạc một cách nhanh chóng.",
  keywords: "tìm đồ thất lạc, mất đồ, nhặt được, lost and found, trả đồ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

/* ============ FOOTER COMPONENT ============ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>🔍</span>
              <span className="footer-logo-text">TimDo.vn</span>
            </div>
            <p className="footer-desc">
              Nền tảng giúp kết nối người mất đồ và người nhặt được đồ. 
              Cùng nhau xây dựng cộng đồng tử tế hơn.
            </p>
          </div>

          <div className="footer-links">
            <h4>Liên kết</h4>
            <a href="/">Trang chủ</a>
            <a href="/bai-dang">Tin đăng</a>
            <a href="/dang-tin">Đăng tin</a>
            <a href="/huong-dan">Hướng dẫn</a>
          </div>

          <div className="footer-links">
            <h4>Danh mục</h4>
            <a href="/bai-dang?category=giay-to">Giấy tờ tùy thân</a>
            <a href="/bai-dang?category=dien-thoai">Điện thoại</a>
            <a href="/bai-dang?category=vi-bop">Ví / Bóp</a>
            <a href="/bai-dang?category=chia-khoa">Chìa khóa</a>
          </div>

          <div className="footer-links">
            <h4>Liên hệ</h4>
            <p>📍 Trà Vinh, Việt Nam</p>
            <p>📧 contact@timdo.vn</p>
            <p>📱 0123 456 789</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 TimDo.vn — Đồ án chuyên ngành — Hồ Ngọc Trai — DX23TT9</p>
        </div>
      </div>
    </footer>
  );
}
