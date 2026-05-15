"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ChiTietBaiDangPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Không tải được bài đăng");
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchPost();
  }, [params.id]);

  if (loading) return <div className="container" style={{ paddingTop: 120 }}>Đang tải chi tiết bài đăng...</div>;

  if (error || !post) {
    return (
      <div className="container" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <h1>Không tìm thấy bài đăng</h1>
          <p style={{ color: "var(--text-secondary)", margin: "12px 0 24px" }}>{error || "Bài đăng không tồn tại."}</p>
          <a href="/bai-dang" className="btn btn-primary">Quay lại danh sách</a>
        </div>
      </div>
    );
  }

  const author = post.author || {};
  const locationText = post.locationName || (post.location ? `${post.location.lat}, ${post.location.lng}` : "Chưa xác định");

  return (
    <div className="container" style={{ paddingTop: 120, paddingBottom: 60 }}>
      <a href="/bai-dang" style={{ color: "var(--primary-light)", textDecoration: "none" }}>← Quay lại danh sách</a>

      <div className="detail-grid" style={{ marginTop: 20 }}>
        <div className="card" style={{ overflow: "hidden" }}>
          <img src={post.image} alt={post.title} style={{ width: "100%", maxHeight: 480, objectFit: "cover", display: "block" }} />
          <div style={{ padding: 28 }}>
            <span className={`badge ${post.type === "lost" ? "badge-lost" : "badge-found"}`}>
              {post.type === "lost" ? "🔴 Tin mất đồ" : "🟢 Tin nhặt được"}
            </span>
            <h1 style={{ fontSize: "2rem", margin: "18px 0 12px" }}>{post.title}</h1>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{post.description}</p>
          </div>
        </div>

        <aside className="card" style={{ padding: 24, height: "fit-content" }}>
          <h2 style={{ marginBottom: 18 }}>Thông tin bài đăng</h2>
          <div className="info-list">
            <p><strong>Danh mục:</strong><br />{post.categoryName || post.category}</p>
            <p><strong>Thời gian:</strong><br />{post.date}</p>
            <p><strong>Vị trí:</strong><br />📍 {locationText}</p>
            <p><strong>Người đăng:</strong><br />{post.authorName || author.name || "Ẩn danh"}</p>
            {author.email && <p><strong>Email:</strong><br />{author.email}</p>}
            {author.phone && <p><strong>Điện thoại:</strong><br />{author.phone}</p>}
          </div>
          <a href="/dang-tin" className="btn btn-primary" style={{ width: "100%", marginTop: 18 }}>Đăng tin mới</a>
        </aside>
      </div>

      <style jsx>{`
        .detail-grid { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 24px; }
        .info-list p { padding: 12px 0; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); line-height: 1.6; }
        .info-list strong { color: var(--text-primary); }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
