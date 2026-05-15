"use client";

import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="header">
      <div className="header-inner container-wide">
        <a href="/" className="logo">
          <span className="logo-icon">🔍</span>
          <span className="logo-text">
            <span className="logo-name">TimDo</span>
            <span className="logo-dot">.vn</span>
          </span>
        </a>

        <nav className="nav">
          <a href="/" className="nav-link">Trang chủ</a>
          <a href="/bai-dang" className="nav-link">Tin đăng</a>
          <a href="/dang-tin" className="nav-link">Đăng tin</a>
          <a href="/huong-dan" className="nav-link">Hướng dẫn</a>
        </nav>

        <div className="header-actions">
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Chào, {session.user.name}</span>
              <button onClick={() => signOut()} className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>Đăng xuất</button>
            </div>
          ) : (
            <>
              <a href="/dang-nhap" className="btn btn-secondary btn-sm">Đăng nhập</a>
              <a href="/dang-ky" className="btn btn-primary btn-sm">Đăng ký</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
