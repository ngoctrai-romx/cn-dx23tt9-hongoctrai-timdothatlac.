"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

function BaiDangContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParams = searchParams.get("category") || "";

  const [posts, setPosts] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams();
        if (query) urlParams.append('q', query);
        if (categoryParams) urlParams.append('category', categoryParams);
        if (filterType !== 'all') urlParams.append('type', filterType);
        
        const res = await fetch(`/api/posts?${urlParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
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

export default function BaiDangPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: "100px" }}>Đang tải...</div>}>
      <BaiDangContent />
    </Suspense>
  );
}
