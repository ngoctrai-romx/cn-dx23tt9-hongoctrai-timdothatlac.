# 📋 KẾ HOẠCH CHI TIẾT — ĐỒ ÁN WEBSITE TÌM ĐỒ THẤT LẠC

> **Sinh viên:** Hồ Ngọc Trai — **MSSV:** 170123090 — **Lớp:** DX23TT9
> **Trường:** Đại học Trà Vinh — **Khoa:** Kỹ thuật và Công nghệ
> **GVHD:** Thầy Nguyễn Nhứt Lam

---

## 🎯 TỔNG QUAN ĐỀ TÀI

### 1. Giới thiệu

Website **Tìm Đồ Thất Lạc (Lost & Found)** là một nền tảng trực tuyến giúp kết nối **người mất đồ** và **người nhặt được đồ** một cách nhanh chóng, minh bạch và có tổ chức. Dự án được xây dựng với mục tiêu giải quyết vấn đề thực tế: thông tin thất lạc thường bị trôi trên mạng xã hội, khó tìm kiếm, khó đối chiếu.

### 2. Vấn đề thực tế

| Vấn đề | Mô tả |
|--------|-------|
| **Thông tin trôi** | Người mất đăng trên Facebook/Zalo — sau vài giờ là mất hút |
| **Không có cấu trúc** | Không có danh mục, không có bản đồ, không có tìm kiếm |
| **Khó đối chiếu** | Người nhặt được không biết tìm ai, người mất không biết ai đang giữ |
| **Lừa đảo** | Kẻ xấu lợi dụng lòng tin, yêu cầu chuyển tiền chuộc |

### 3. Giải pháp

TimDo.vn cung cấp một **hệ thống có tổ chức**:
- 📝 **Đăng tin** có cấu trúc (danh mục, mô tả, hình ảnh)
- 🗺️ **Bản đồ tương tác** — ghim chính xác vị trí mất/nhặt
- 🔍 **Tìm kiếm thông minh** — theo từ khóa, danh mục, loại tin
- 🔐 **Xác thực người dùng** — đăng ký/đăng nhập an toàn
- 🛡️ **Cảnh báo an toàn** — chống lừa đảo, bảo vệ người dùng

---

## 🏗️ KIẾN TRÚC HỆ THỐNG

### 1. Công nghệ sử dụng

| Thành phần | Công nghệ | Mục đích |
|-----------|-----------|----------|
| **Frontend Framework** | Next.js 14 (App Router) | React SSR, routing, API Routes |
| **Ngôn ngữ** | JavaScript (ES6+) | Xử lý logic frontend & backend |
| **CSS** | CSS thuần + CSS Variables | Design system tối ưu, không phụ thuộc thư viện |
| **Database** | MongoDB + Mongoose ODM | Lưu trữ bài đăng, người dùng |
| **Authentication** | NextAuth.js + JWT | Xác thực bằng credentials |
| **Mã hóa** | bcryptjs | Bảo mật mật khẩu |
| **Bản đồ** | Leaflet + OpenStreetMap + Nominatim | Bản đồ tương tác, tìm kiếm địa danh |
| **Deploy** | Vercel / Docker (tùy chọn) | Triển khai ứng dụng |

### 2. Sơ đồ kiến trúc (Text)

```
┌─────────────────────────────────────────────────────┐
│                    NGƯỜI DÙNG                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌────────┐ │
│  │ Trang    │  │ Danh     │  │ Đăng   │  │ Hướng  │ │
│  │ Chủ     │  │ sách tin │  │ tin    │  │ dẫn    │ │
│  └────┬────┘  └────┬─────┘  └───┬────┘  └────┬───┘ │
│       │            │             │              │    │
├───────┴────────────┴─────────────┴──────────────┴────┤
│                 NEXT.JS APP ROUTER                    │
├─────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │         API ROUTES (Serverless)              │   │
│  │  ┌─────────┐  ┌────────────────────────┐    │   │
│  │  │ /api/   │  │   /api/auth/[...nextauth]│   │   │
│  │  │ posts   │  │   (NextAuth.js)         │   │   │
│  │  └────┬────┘  └───────────┬────────────┘    │   │
│  └───────┴───────────────────┴─────────────────┘   │
├─────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │              MONGODB DATABASE                │   │
│  │  ┌─────────────────┐  ┌──────────────────┐   │   │
│  │  │  Users Collection│  │  Posts Collection│   │   │
│  │  └─────────────────┘  └──────────────────┘   │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### 3. Component Tree

```
<RootLayout>
  ├── <AuthProvider> (NextAuth Session)
  ├── <Header>
  │   ├── Logo (TimDo.vn)
  │   ├── Nav Links (Trang chủ, Tin đăng, Đăng tin, Hướng dẫn)
  │   └── Auth Buttons (Đăng nhập / Đăng ký / User info)
  ├── <HomePage>
  │   ├── Hero Section (Background orbs, Search bar, Quick Actions)
  │   ├── Stats Section (Thống kê: bài đăng, tìm thấy, người dùng, tỉ lệ)
  │   ├── Categories Section (8 danh mục)
  │   └── Recent Posts Section (6 bài gần nhất)
  ├── <BaiDangPage> (/bai-dang)
  │   ├── Filter Bar (Tất cả / Mất đồ / Nhặt được)
  │   └── Posts Grid (Card: image, badge, category, title, desc, meta)
  ├── <DangTinPage> (/dang-tin)
  │   ├── Type Toggle (Bị mất / Nhặt được)
  │   ├── Form (title, category, date, image, description)
  │   └── <MapPicker> (Leaflet map + Nominatim search)
  ├── <Auth Pages> (/dang-nhap, /dang-ky)
  │   └── Auth Form (email, password, validation)
  └── <Footer>
      ├── Brand + Description
      ├── Quick Links
      └── Contact Info
```

---

## 📂 CẤU TRÚC THƯ MỤC CHI TIẾT

```
cn-dx23tt9-hongoctrai-timdothatlac/
│
├── README.md                              # Giới thiệu dự án
│
├── src/                                    # Mã nguồn chính
│   ├── app/                               # Next.js App Router pages
│   │   ├── layout.js                      # Root layout (Header + Footer + AuthProvider)
│   │   ├── page.js                        # Trang chủ (Hero, Stats, Categories, Recent)
│   │   ├── page.module.css                # CSS module cho trang chủ
│   │   ├── globals.css                    # Design System (variables, reset, components)
│   │   ├── favicon.ico                    # Icon website
│   │   ├── AuthProvider.js                # NextAuth Session Provider
│   │   │
│   │   ├── bai-dang/                      # Trang danh sách tin đăng
│   │   │   └── page.js                    # Posts grid + filter (all/lost/found)
│   │   ├── dang-tin/                      # Trang đăng tin mới
│   │   │   └── page.js                    # Form + MapPicker + validation
│   │   ├── dang-ky/                       # Trang đăng ký
│   │   │   └── page.js                    # Register form (name, phone, email, password)
│   │   ├── dang-nhap/                     # Trang đăng nhập
│   │   │   └── page.js                    # Login form (email, password)
│   │   ├── huong-dan/                     # Trang hướng dẫn
│   │   │   └── page.js                    # Guide steps + FAQ + Safety warning
│   │   │
│   │   └── api/                           # Backend API Routes
│   │       ├── auth/
│   │       │   ├── [...nextauth]/
│   │       │   │   └── route.js           # NextAuth config (CredentialsProvider)
│   │       │   └── register/
│   │       │       └── route.js           # Register API (hash password, create user)
│   │       └── posts/
│   │           └── route.js               # CRUD posts (GET with filters, POST with auth)
│   │
│   ├── components/                        # Shared components
│   │   ├── Header.js                      # Navigation bar + auth state
│   │   └── MapPicker.js                   # Leaflet map + Nominatim geocoding
│   │
│   ├── lib/                               # Utility libraries
│   │   └── mongodb.js                     # MongoDB connection (cached singleton)
│   │
│   └── models/                            # Mongoose schemas
│       ├── User.js                        # User model (name, email, phone, hashedPassword)
│       └── Post.js                        # Post model (title, type, category, location, etc.)
│
├── setup/                                 # Cài đặt và dữ liệu mẫu
├── progress-report/                       # Báo cáo tiến độ hàng tuần
├── thesis/                                # Tài liệu báo cáo đồ án
│   ├── doc/                               # File Word (.doc)
│   ├── pdf/                               # File PDF
│   ├── html/                              # Tài liệu dạng web
│   ├── abs/                               # Slide PowerPoint + Video
│   └── refs/                              # Tài liệu tham khảo
│
├── docker/                                # Docker configuration
├── soft/                                  # Phần mềm liên quan
└── package.json                           # Dependencies & scripts
```

---

## 🎨 DESIGN SYSTEM

### 1. Bảng màu (Dark Theme)

| Token | Mã màu | Sử dụng |
|-------|--------|---------|
| `--primary` | `#6366f1` (Indigo) | Nút, link, accent chính |
| `--primary-dark` | `#4f46e5` | Hover, active |
| `--primary-light` | `#818cf8` | Light text, badge |
| `--accent-green` | `#10b981` | "Nhặt được", thành công |
| `--accent-red` | `#ef4444` | "Mất đồ", cảnh báo |
| `--accent-orange` | `#f59e0b` | Cảnh báo, chú ý |
| `--bg-primary` | `#0f0f23` | Nền chính |
| `--bg-secondary` | `#1a1a3e` | Section background |
| `--bg-card` | `#1e1e45` | Card background |
| `--text-primary` | `#f1f5f9` | Văn bản chính |
| `--text-secondary` | `#94a3b8` | Văn bản phụ |

### 2. Typography

- **Font**: Inter (sans-serif) — Google Fonts
- **Scale**: 0.78rem → 0.85rem → 0.95rem → 1rem → 1.25rem → 1.8rem → 2.5rem → 3.5rem
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold), 900 (Black)

### 3. Component Library

| Component | File | Chức năng |
|-----------|------|-----------|
| `.btn-primary` | globals.css | Gradient indigo button |
| `.btn-secondary` | globals.css | Ghost button |
| `.card` | globals.css | Glassmorphism card |
| `.badge-lost` | globals.css | Red badge (mất đồ) |
| `.badge-found` | globals.css | Green badge (nhặt được) |
| `.input` | globals.css | Form input/select/textarea |
| `.header` | globals.css | Fixed navigation |
| `.footer` | layout.js | Site footer |

### 4. Animations

- `fadeIn` — Opacity + translateY (0.6s)
- `slideUp` — translateY (0.8s)
- `float` — Yoyo translateY (4s infinite)
- `pulse` — Opacity (2s infinite)
- `glow` — Box-shadow (3s infinite)

---

## 💾 DATABASE SCHEMA

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  name: String,              // Họ tên
  email: String,             // Email (unique)
  phone: String,             // Số điện thoại
  password: String,          // bcrypt hash
  role: String,              // "user" | "admin"
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Posts Collection

```javascript
{
  _id: ObjectId,
  title: String,             // Tiêu đề tin đăng
  type: String,              // "lost" | "found"
  category: String,          // Danh mục (giay-to, dien-thoai, vi-bop...)
  categoryName: String,      // Tên danh mục hiển thị
  description: String,       // Mô tả chi tiết
  image: String,             // URL hình ảnh (base64 hoặc URL)
  location: {
    lat: Number,             // Vĩ độ
    lng: Number              // Kinh độ
  },
  locationName: String,      // Tên địa điểm
  date: Date,                // Thời gian mất/nhặt
  author: ObjectId,          // Người đăng (ref User)
  authorName: String,        // Tên người đăng
  status: String,            // "active" | "resolved" | "closed"
  resolvedAt: Date,          // Thời gian tìm thấy
  views: Number,             // Lượt xem
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 CHỨC NĂNG CHI TIẾT

### 1. Trang Chủ (/)

| Thành phần | Mô tả | Trạng thái |
|-----------|-------|------------|
| Hero Section | Gradient background + animated orbs + search bar | ✅ Hoàn thành |
| Stats Bar | 4 thống kê: 2,458 bài đăng, 1,832 tìm thấy, 5,120 người dùng, 74% | ✅ Hoàn thành |
| Categories | 8 danh mục: Giấy tờ, Điện thoại, Ví, Chìa khóa, Thú cưng, Trang sức, Laptop, Khác | ✅ Hoàn thành |
| Recent Posts | 6 bài đăng gần nhất (từ API hoặc mock data fallback) | ✅ Hoàn thành |
| Quick Actions | 2 nhanh: "Tôi bị mất đồ" → /dang-tin?type=lost, "Tôi nhặt được đồ" → /dang-tin?type=found | ✅ Hoàn thành |

### 2. Danh sách Tin đăng (/bai-dang)

| Chức năng | Mô tả | Trạng thái |
|-----------|-------|------------|
| Filter | Bộ lọc: Tất cả / Mất đồ / Nhặt được | ✅ Hoàn thành |
| Tìm kiếm | Query param `?q=` tìm theo title & description (regex) | ✅ Hoàn thành |
| Lọc danh mục | Query param `?category=` lọc theo danh mục | ✅ Hoàn thành |
| Posts Grid | Grid 3 cột responsive (→2 cột tablet →1 cột mobile) | ✅ Hoàn thành |
| Post Card | Image, badge, category, title, description, location, date | ✅ Hoàn thành |
| Empty State | Hiển thị khi không có kết quả | ✅ Hoàn thành |

### 3. Đăng tin (/dang-tin)

| Chức năng | Mô tả | Trạng thái |
|-----------|-------|------------|
| Type Toggle | Chuyển đổi "Bị mất đồ" / "Nhặt được đồ" | ✅ Hoàn thành |
| Form fields | Tiêu đề, Danh mục, Thời gian, Hình ảnh, Mô tả | ✅ Hoàn thành |
| Image Upload | Chọn file + preview base64 (giới hạn 5MB) | ✅ Cơ bản |
| Map Picker | Leaflet map + click to pin + tìm kiếm địa danh (Nominatim) | ✅ Hoàn thành |
| Validation | Kiểm tra vị trí bản đồ trước khi submit | ✅ Hoàn thành |
| Auth check | Yêu cầu đăng nhập → redirect /dang-nhap nếu chưa login | ✅ Hoàn thành |
| POST API | Tạo bài đăng mới trong MongoDB | ✅ Hoàn thành |

### 4. Đăng nhập (/dang-nhap)

| Chức năng | Mô tả | Trạng thái |
|-----------|-------|------------|
| Form | Email + Password | ✅ Hoàn thành |
| Validation | Kiểm tra credentials với MongoDB | ✅ Hoàn thành |
| JWT Session | Dùng NextAuth JWT strategy | ✅ Hoàn thành |
| Remember me | Checkbox "Ghi nhớ đăng nhập" | ✅ Cơ bản |
| Forgot password | Link (chưa implement) | ⏳ Phát triển sau |

### 5. Đăng ký (/dang-ky)

| Chức năng | Mô tả | Trạng thái |
|-----------|-------|------------|
| Form | Họ tên, SĐT, Email, Mật khẩu, Xác nhận MK | ✅ Hoàn thành |
| Validation | Kiểm tra mật khẩu khớp, email tồn tại | ✅ Hoàn thành |
| Terms | Checkbox đồng ý điều khoản | ✅ Hoàn thành |
| POST API | Tạo user mới (bcrypt hash password) | ✅ Hoàn thành |

### 6. Hướng dẫn (/huong-dan)

| Chức năng | Mô tả | Trạng thái |
|-----------|-------|------------|
| Guide Steps | 3 bước có số + nội dung chi tiết | ✅ Hoàn thành |
| Warning Box | Cảnh báo an toàn, chống lừa đảo | ✅ Hoàn thành |
| FAQ | 4 câu hỏi thường gặp (accordion) | ✅ Hoàn thành |

### 7. Header & Footer

| Component | Chức năng | Trạng thái |
|-----------|-----------|------------|
| Header | Fixed top + glassmorphism + nav links + auth state | ✅ Hoàn thành |
| Footer | Logo + description + quick links + contact + copyright | ✅ Hoàn thành |

---

## 📈 KẾT QUẢ ĐẠT ĐƯỢC

### ✅ Đã hoàn thành

1. **Giao diện đầy đủ**: Trang chủ, Tin đăng, Đăng tin, Đăng nhập, Đăng ký, Hướng dẫn
2. **Design System hoàn chỉnh**: CSS Variables, dark theme, animations, responsive
3. **Xác thực người dùng**: Đăng ký/Đăng nhập với NextAuth + JWT + bcrypt
4. **Kết nối MongoDB**: CRUD bài đăng, lưu người dùng
5. **Bản đồ tương tác**: Leaflet + OpenStreetMap + Nominatim geocoding
6. **Tìm kiếm & Lọc**: Theo từ khóa, danh mục, loại tin
7. **Responsive**: Tương thích desktop, tablet, mobile
8. **Trang Hướng dẫn**: Step-by-step + FAQ + Cảnh báo an toàn

### ⏳ Cần phát triển thêm

1. **Upload ảnh thật**: Hiện tại dùng base64 hoặc URL — cần cloud storage (Cloudinary, S3)
2. **Trang quản trị (Admin)**: Quản lý bài đăng, người dùng, thống kê
3. **Chat giữa người dùng**: Tin nhắn real-time (Socket.io)
4. **Thông báo tự động**: Email/SMS khi có bài đăng trùng khớp
5. **Trang chi tiết bài đăng**: `/bai-dang/[id]` — xem thông tin liên hệ
6. **Báo cáo vi phạm**: Reporting spam/lừa đảo
7. **Pagination**: Phân trang cho danh sách bài đăng
8. **SEO**: Meta tags, sitemap, Open Graph

---

## 🧪 TESTING PLAN

### 1. Unit Tests
- Model validation (User, Post)
- API route responses
- Auth middleware

### 2. Integration Tests
- Đăng ký → Đăng nhập → Đăng tin → Xem tin
- Tìm kiếm với filter kết hợp
- Map picker interaction

### 3. E2E Tests
- User flow hoàn chỉnh
- Error handling (invalid input, network error)

---

## 🚀 DEPLOYMENT

### Option 1: Vercel (Recommended)
```bash
npm run build     # Build Next.js production
npx vercel deploy # Deploy
```

### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://timdo.vercel.app
```

---

## 📅 TIMELINE

| Giai đoạn | Nội dung | Thời gian |
|-----------|----------|-----------|
| **1** | Phân tích & Thiết kế | Tuần 1-2 |
| **2** | Xây dựng UI (Trang chủ, Tin đăng, Đăng tin) | Tuần 3-4 |
| **3** | Backend (API, MongoDB, Auth) | Tuần 5-6 |
| **4** | Tích hợp bản đồ, tìm kiếm, filter | Tuần 7 |
| **5** | Responsive, Animation, Polish | Tuần 8 |
| **6** | Kiểm thử & Sửa lỗi | Tuần 9 |
| **7** | Viết báo cáo & Chuẩn bị thuyết trình | Tuần 10 |

---

## 🛡️ BẢO MẬT

### Đã implement
- ✅ Mật khẩu mã hóa bcryptjs
- ✅ JWT session (NextAuth)
- ✅ API route protection (getServerSession)
- ✅ Input validation (server-side)

### Cần bổ sung
- ⏳ Rate limiting (đăng nhập, đăng tin)
- ⏳ CSRF protection
- ⏳ XSS sanitization (HTML escape)
- ⏳ File upload validation (type, size, scan)

---

## 📞 LIÊN HỆ

- **Sinh viên:** Hồ Ngọc Trai
- **MSSV:** 170123090
- **Lớp:** DX23TT9
- **Trường:** Đại học Trà Vinh
- **GVHD:** Thầy Nguyễn Nhứt Lam

---

> *"Cùng nhau xây dựng cộng đồng tử tế — mỗi đồ vật tìm lại được là một nụ cười."*
> — **TimDo.vn**
