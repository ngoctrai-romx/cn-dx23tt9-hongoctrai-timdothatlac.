"use client";
import { useEffect, useState } from "react";

/* ============ MOCK DATA ============ */
const CATEGORIES = [
  { id: "giay-to", name: "Giấy tờ", icon: "🪪", count: 45 },
  { id: "dien-thoai", name: "Điện thoại", icon: "📱", count: 32 },
  { id: "vi-bop", name: "Ví / Bóp", icon: "👛", count: 28 },
  { id: "chia-khoa", name: "Chìa khóa", icon: "🔑", count: 19 },
  { id: "thu-cung", name: "Thú cưng", icon: "🐾", count: 15 },
  { id: "trang-suc", name: "Trang sức", icon: "💍", count: 12 },
  { id: "laptop", name: "Laptop", icon: "💻", count: 8 },
  { id: "khac", name: "Khác", icon: "📦", count: 22 },
];

const RECENT_POSTS = [
  {
    id: 1,
    title: "Mất ví da màu nâu tại quán cà phê Highlands",
    type: "lost",
    category: "Ví / Bóp",
    location: "Quận 1, TP.HCM",
    date: "2 giờ trước",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
    author: "Nguyễn Văn A",
    description: "Ví da màu nâu, bên trong có CMND và thẻ ngân hàng Vietcombank.",
  },
  {
    id: 2,
    title: "Nhặt được iPhone 15 Pro Max tại công viên Tao Đàn",
    type: "found",
    category: "Điện thoại",
    location: "Quận 3, TP.HCM",
    date: "5 giờ trước",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
    author: "Trần Thị B",
    description: "iPhone 15 Pro Max màu titan tự nhiên, có ốp lưng trong suốt.",
  },
  {
    id: 3,
    title: "Mất chìa khóa xe Honda SH tại bãi giữ xe Vincom",
    type: "lost",
    category: "Chìa khóa",
    location: "Quận Bình Thạnh, TP.HCM",
    date: "1 ngày trước",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    author: "Lê Văn C",
    description: "Chìa khóa xe Honda SH 150i, móc khóa hình gấu nâu.",
  },
  {
    id: 4,
    title: "Nhặt được CCCD mang tên Phạm Thị Hoa tại trường ĐH Trà Vinh",
    type: "found",
    category: "Giấy tờ",
    location: "TP. Trà Vinh",
    date: "1 ngày trước",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    author: "Hồ Ngọc Trai",
    description: "Căn cước công dân mang tên Phạm Thị Hoa, sinh năm 2003.",
  },
  {
    id: 5,
    title: "Mất laptop Dell XPS 13 tại thư viện",
    type: "lost",
    category: "Laptop",
    location: "TP. Trà Vinh",
    date: "2 ngày trước",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    author: "Nguyễn Thị D",
    description: "Laptop Dell XPS 13 màu bạc, có dán sticker mèo ở mặt lưng.",
  },
  {
    id: 6,
    title: "Nhặt được mèo tam thể lạc tại khu chung cư",
    type: "found",
    category: "Thú cưng",
    location: "Quận 7, TP.HCM",
    date: "3 ngày trước",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    author: "Võ Văn E",
    description: "Mèo tam thể, khoảng 2-3kg, rất ngoan, đeo vòng cổ xanh.",
  },
];

const STATS = [
  { label: "Bài đăng", value: "2,458", icon: "📋" },
  { label: "Đã tìm thấy", value: "1,832", icon: "✅" },
  { label: "Người dùng", value: "5,120", icon: "👥" },
  { label: "Tỉ lệ thành công", value: "74%", icon: "🎯" },
];

import { useRouter } from "next/navigation";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentPosts, setRecentPosts] = useState(RECENT_POSTS);
  const router = useRouter();

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRecentPosts(data.slice(0, 6));
        }
      } catch (error) {
        console.warn("D?ng d? li?u m?u v? API b?i ??ng ch?a s?n s?ng", error);
      }
    };
    loadRecentPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/bai-dang?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/bai-dang`);
    }
  };

  return (
    <div className="homepage">
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>

        <div className="hero-content container">
          <div className="hero-badge animate-fadeIn">
            <span className="hero-badge-dot"></span>
            Nền tảng tìm đồ thất lạc #1 Việt Nam
          </div>

          <h1 className="hero-title animate-fadeIn">
            Tìm lại đồ vật
            <br />
            <span className="hero-highlight">thất lạc</span> của bạn
          </h1>

          <p className="hero-desc animate-fadeIn">
            Đăng tin mất đồ hoặc nhặt được đồ — kết nối cộng đồng, 
            giúp nhau tìm lại những vật dụng quý giá.
          </p>

          {/* Search Bar */}
          <form className="search-bar animate-slideUp" onSubmit={handleSearch}>
            <div className="search-icon">🔍</div>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm đồ vật... (ví dụ: ví da, iPhone, chìa khóa)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary search-btn">Tìm kiếm</button>
          </form>

          {/* Quick Actions */}
          <div className="hero-actions animate-slideUp">
            <a href="/dang-tin?type=lost" className="action-card action-lost">
              <span className="action-icon">😰</span>
              <span className="action-text">
                <strong>Tôi bị mất đồ</strong>
                <small>Đăng tin tìm kiếm</small>
              </span>
              <span className="action-arrow">→</span>
            </a>
            <a href="/dang-tin?type=found" className="action-card action-found">
              <span className="action-icon">🎉</span>
              <span className="action-text">
                <strong>Tôi nhặt được đồ</strong>
                <small>Đăng tin trả lại</small>
              </span>
              <span className="action-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Danh mục đồ vật</h2>
            <p className="section-desc">Chọn danh mục để tìm kiếm nhanh hơn</p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <a key={cat.id} href={`/bai-dang?category=${cat.id}`} className="category-card">
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count} tin</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECENT POSTS SECTION ===== */}
      <section className="section posts-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tin đăng mới nhất</h2>
            <a href="/bai-dang" className="btn btn-secondary btn-sm">Xem tất cả →</a>
          </div>

          <div className="posts-grid">
            {recentPosts.map((post) => (
              <a key={post._id || post.id} href={`/bai-dang/${post._id || post.id}`} className="post-card card">
                <div className="post-image-wrapper">
                  <img src={post.image} alt={post.title} className="post-image" />
                  <span className={`badge ${post.type === "lost" ? "badge-lost" : "badge-found"}`}>
                    {post.type === "lost" ? "🔴 Mất đồ" : "🟢 Nhặt được"}
                  </span>
                </div>
                <div className="post-body">
                  <span className="post-category">{post.categoryName || post.category}</span>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-desc">{post.description}</p>
                  <div className="post-meta">
                    <span className="post-location">📍 {post.locationName || (typeof post.location === 'string' ? post.location : `${post.location?.lat?.toFixed(4)}, ${post.location?.lng?.toFixed(4)}`)}</span>
                    <span className="post-date">🕐 {post.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="section how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Cách hoạt động</h2>
            <p className="section-desc">Chỉ mất 3 bước đơn giản để tìm lại đồ vật</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">📝</div>
              <h3>Đăng tin</h3>
              <p>Mô tả đồ vật bị mất hoặc nhặt được, kèm hình ảnh và vị trí.</p>
            </div>
            <div className="step-connector">→</div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">🔍</div>
              <h3>Tìm kiếm & Kết nối</h3>
              <p>Hệ thống sẽ hiển thị tin phù hợp. Liên hệ người đăng trực tiếp.</p>
            </div>
            <div className="step-connector">→</div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">🤝</div>
              <h3>Nhận lại đồ</h3>
              <p>Xác minh và nhận lại đồ vật. Đánh dấu "Đã tìm thấy".</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Bạn đã sẵn sàng?</h2>
              <p>Đăng ký tài khoản miễn phí và bắt đầu đăng tin ngay hôm nay!</p>
              <div className="cta-actions">
                <a href="/dang-ky" className="btn btn-primary btn-lg">Đăng ký miễn phí</a>
                <a href="/huong-dan" className="btn btn-secondary btn-lg">Tìm hiểu thêm</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .homepage {
          padding-top: 72px;
        }

        /* ===== HERO ===== */
        .hero {
          position: relative;
          padding: 80px 0 60px;
          text-align: center;
          overflow: hidden;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .hero-orb-1 {
          width: 400px;
          height: 400px;
          background: var(--primary);
          top: -100px;
          right: 10%;
          animation: float 8s ease infinite;
        }

        .hero-orb-2 {
          width: 300px;
          height: 300px;
          background: #8b5cf6;
          bottom: -50px;
          left: 5%;
          animation: float 6s ease infinite reverse;
        }

        .hero-orb-3 {
          width: 200px;
          height: 200px;
          background: var(--accent-green);
          top: 30%;
          left: 60%;
          animation: float 10s ease infinite;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--primary-light);
          margin-bottom: 24px;
        }

        .hero-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-green);
          animation: pulse 2s ease infinite;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        .hero-highlight {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        /* Search Bar */
        .search-bar {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 6px 6px 6px 20px;
          max-width: 680px;
          margin: 0 auto 40px;
          transition: all var(--transition-normal);
        }

        .search-bar:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .search-icon {
          font-size: 1.2rem;
          margin-right: 12px;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 1rem;
          padding: 12px 0;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-btn {
          border-radius: 20px;
          padding: 12px 28px;
          white-space: nowrap;
        }

        /* Quick Actions */
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 24px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--gradient-glass);
          backdrop-filter: blur(10px);
          transition: all var(--transition-normal);
          text-decoration: none;
          min-width: 260px;
        }

        .action-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-hover);
        }

        .action-lost:hover {
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .action-found:hover {
          box-shadow: var(--shadow-glow-green);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .action-icon {
          font-size: 2rem;
        }

        .action-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .action-text strong {
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .action-text small {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .action-arrow {
          margin-left: auto;
          font-size: 1.2rem;
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        .action-card:hover .action-arrow {
          transform: translateX(4px);
        }

        /* ===== STATS ===== */
        .stats-section {
          padding: 0 0 60px;
          margin-top: -20px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 28px 20px;
          background: var(--gradient-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(20px);
          transition: all var(--transition-normal);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
        }

        .stat-icon {
          font-size: 1.6rem;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* ===== SECTIONS ===== */
        .section {
          padding: 60px 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .section-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 4px;
        }

        /* ===== CATEGORIES ===== */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 28px 20px;
          background: var(--gradient-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(20px);
          transition: all var(--transition-normal);
          text-decoration: none;
        }

        .category-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: var(--shadow-glow);
        }

        .category-icon {
          font-size: 2.4rem;
        }

        .category-name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .category-count {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255,255,255,0.05);
          padding: 2px 10px;
          border-radius: var(--radius-full);
        }

        /* ===== POSTS ===== */
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .post-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          text-decoration: none;
        }

        .post-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .post-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .post-card:hover .post-image {
          transform: scale(1.05);
        }

        .post-image-wrapper .badge {
          position: absolute;
          top: 12px;
          left: 12px;
        }

        .post-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .post-category {
          font-size: 0.78rem;
          color: var(--primary-light);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .post-title {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }

        .post-meta {
          display: flex;
          gap: 16px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* ===== HOW IT WORKS ===== */
        .how-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .steps-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        .step-card {
          flex: 1;
          max-width: 300px;
          text-align: center;
          padding: 36px 24px;
          background: var(--gradient-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: all var(--transition-normal);
        }

        .step-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: var(--shadow-glow);
        }

        .step-number {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 8px;
          letter-spacing: 2px;
        }

        .step-icon {
          font-size: 2.5rem;
          margin-bottom: 14px;
        }

        .step-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .step-card p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .step-connector {
          font-size: 1.4rem;
          color: var(--text-muted);
        }

        /* ===== CTA ===== */
        .cta-section {
          padding: 60px 0;
        }

        .cta-card {
          background: var(--gradient-primary);
          border-radius: var(--radius-xl);
          padding: 60px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%);
          animation: float 10s ease infinite;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-content h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .cta-content p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 30px;
        }

        .cta-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-actions .btn-primary {
          background: white;
          color: var(--primary-dark);
          box-shadow: var(--shadow-md);
        }

        .cta-actions .btn-primary:hover {
          box-shadow: var(--shadow-lg);
        }

        .cta-actions .btn-secondary {
          border-color: rgba(255,255,255,0.3);
          color: white;
        }

        .cta-actions .btn-secondary:hover {
          background: rgba(255,255,255,0.15);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .posts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .categories-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 60px 0 40px;
            min-height: 70vh;
          }
          .hero-title {
            font-size: 2.2rem;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .posts-grid {
            grid-template-columns: 1fr;
          }
          .steps-grid {
            flex-direction: column;
          }
          .step-connector {
            transform: rotate(90deg);
          }
          .search-bar {
            flex-direction: column;
            border-radius: var(--radius-lg);
            padding: 12px;
          }
          .search-btn {
            width: 100%;
          }
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          .action-card {
            width: 100%;
            max-width: 320px;
          }
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .category-card {
            padding: 20px 14px;
          }
        }
      `}</style>
    </div>
  );
}
