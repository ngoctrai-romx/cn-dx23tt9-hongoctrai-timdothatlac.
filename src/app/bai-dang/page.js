"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const ALL_POSTS = [
  {
    id: 1,
    title: "Mất ví da màu nâu tại quán cà phê Highlands",
    type: "lost",
    category: "vi-bop",
    categoryName: "Ví / Bóp",
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
    category: "dien-thoai",
    categoryName: "Điện thoại",
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
    category: "chia-khoa",
    categoryName: "Chìa khóa",
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
    category: "giay-to",
    categoryName: "Giấy tờ",
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
    category: "laptop",
    categoryName: "Laptop",
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
    category: "thu-cung",
    categoryName: "Thú cưng",
    location: "Quận 7, TP.HCM",
    date: "3 ngày trước",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    author: "Võ Văn E",
    description: "Mèo tam thể, khoảng 2-3kg, rất ngoan, đeo vòng cổ xanh.",
  },
];

export default function BaiDangPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParams = searchParams.get("category") || "";

  const [posts, setPosts] = useState(ALL_POSTS);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    let result = ALL_POSTS;

    // Lọc theo từ khóa tìm kiếm
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Lọc theo danh mục trên URL (nếu có)
    if (categoryParams) {
      result = result.filter((post) => post.category === categoryParams);
    }

    // Lọc theo loại (Mất/Nhặt) trên tab
    if (filterType !== "all") {
      result = result.filter((post) => post.type === filterType);
    }

    setPosts(result);
  }, [query, categoryParams, filterType]);

  return (
    <div className="bai-dang-page" style={{ paddingTop: "100px", paddingBottom: "60px" }}>
      <div className="container">
        <div className="page-header" style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
            {query ? `Kết quả tìm kiếm cho: "${query}"` : "Danh sách Tin đăng"}
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Tìm thấy {posts.length} kết quả phù hợp.
          </p>
        </div>

        {/* BỘ LỌC */}
        <div className="filter-bar card" style={{ padding: "16px", marginBottom: "30px", display: "flex", gap: "10px" }}>
          <button 
            className={`filter-btn ${filterType === "all" ? "active" : ""}`}
            onClick={() => setFilterType("all")}
          >
            Tất cả
          </button>
          <button 
            className={`filter-btn ${filterType === "lost" ? "active" : ""}`}
            onClick={() => setFilterType("lost")}
          >
            🔴 Đồ bị mất
          </button>
          <button 
            className={`filter-btn ${filterType === "found" ? "active" : ""}`}
            onClick={() => setFilterType("found")}
          >
            🟢 Đồ nhặt được
          </button>
        </div>

        {/* DANH SÁCH BÀI ĐĂNG */}
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => (
              <a key={post.id} href={`/bai-dang/${post.id}`} className="post-card card">
                <div className="post-image-wrapper">
                  <img src={post.image} alt={post.title} className="post-image" />
                  <span className={`badge ${post.type === "lost" ? "badge-lost" : "badge-found"}`}>
                    {post.type === "lost" ? "🔴 Mất đồ" : "🟢 Nhặt được"}
                  </span>
                </div>
                <div className="post-body">
                  <span className="post-category">{post.categoryName}</span>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-desc">{post.description}</p>
                  <div className="post-meta">
                    <span className="post-location">📍 {post.location}</span>
                    <span className="post-date">🕐 {post.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="empty-state card" style={{ padding: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔍</div>
            <h3>Không tìm thấy kết quả nào!</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "10px", marginBottom: "20px" }}>
              Rất tiếc, không có đồ vật nào khớp với yêu cầu của bạn.
            </p>
            <button className="btn btn-primary" onClick={() => window.history.back()}>Quay lại</button>
          </div>
        )}

      </div>

      <style jsx>{`
        .filter-btn {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        
        .filter-btn:hover {
          border-color: var(--primary-light);
          color: var(--text-primary);
        }
        
        .filter-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

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

        @media (max-width: 1024px) {
          .posts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
