-- =============================================================
-- ĐỒ ÁN MÔN HỌC: CHUYÊN ĐỀ ASP.NET
-- Đề tài  : Xây dựng website bán sản phẩm công nghệ của Apple
-- Sinh viên: Hồ Ngọc Trai - Lớp DX23TT9
-- CSDL    : SQL Server
-- Cách chạy: Mở SQL Server Management Studio -> New Query ->
--            dán toàn bộ file này -> Execute (F5)
-- =============================================================

CREATE DATABASE AppleStore;
GO
USE AppleStore;
GO

-- ============================ BẢNG DANH MỤC ============================
CREATE TABLE tbl_DanhMuc (
    MaDM        INT IDENTITY(1,1) PRIMARY KEY,
    TenDM       NVARCHAR(100) NOT NULL,
    MoTa        NVARCHAR(255)
);
GO

-- ============================ BẢNG SẢN PHẨM ============================
CREATE TABLE tbl_SanPham (
    MaSP        INT IDENTITY(1,1) PRIMARY KEY,
    TenSP       NVARCHAR(200) NOT NULL,
    MaDM        INT NOT NULL FOREIGN KEY REFERENCES tbl_DanhMuc(MaDM),
    DonGia      DECIMAL(18,0) NOT NULL CHECK (DonGia >= 0),          -- ràng buộc: giá không âm
    SoLuongTon  INT NOT NULL DEFAULT 0 CHECK (SoLuongTon >= 0),      -- ràng buộc: tồn kho không âm
    HinhAnh     NVARCHAR(255),
    MoTa        NVARCHAR(MAX),
    NgayNhap    DATETIME DEFAULT GETDATE(),
    TrangThai   BIT DEFAULT 1                                        -- 1: đang bán, 0: ngừng bán
);
GO

-- ============================ BẢNG KHÁCH HÀNG ============================
CREATE TABLE tbl_KhachHang (
    MaKH        INT IDENTITY(1,1) PRIMARY KEY,
    HoTen       NVARCHAR(100) NOT NULL,
    TenDangNhap VARCHAR(50) NOT NULL UNIQUE,                         -- ràng buộc: không trùng tên đăng nhập
    MatKhau     VARCHAR(100) NOT NULL,
    Email       VARCHAR(100),
    DienThoai   VARCHAR(15),
    DiaChi      NVARCHAR(255),
    NgayDangKy  DATETIME DEFAULT GETDATE()
);
GO

-- ============================ BẢNG ĐƠN HÀNG ============================
CREATE TABLE tbl_DonHang (
    MaDH        INT IDENTITY(1,1) PRIMARY KEY,
    MaKH        INT NOT NULL FOREIGN KEY REFERENCES tbl_KhachHang(MaKH),
    NgayDat     DATETIME DEFAULT GETDATE(),
    TenNguoiNhan NVARCHAR(100),
    DiaChiGiao  NVARCHAR(255),
    DienThoai   VARCHAR(15),
    TongTien    DECIMAL(18,0) DEFAULT 0,
    TrangThai   NVARCHAR(50) DEFAULT N'Chờ xử lý'    -- Chờ xử lý / Đang giao / Đã giao / Đã hủy
);
GO

-- ============================ BẢNG CHI TIẾT ĐƠN HÀNG ============================
CREATE TABLE tbl_ChiTietDonHang (
    MaDH        INT NOT NULL FOREIGN KEY REFERENCES tbl_DonHang(MaDH),
    MaSP        INT NOT NULL FOREIGN KEY REFERENCES tbl_SanPham(MaSP),
    SoLuong     INT NOT NULL CHECK (SoLuong > 0),                    -- ràng buộc: số lượng > 0
    DonGia      DECIMAL(18,0) NOT NULL,
    PRIMARY KEY (MaDH, MaSP)                                         -- khóa chính tổ hợp
);
GO

-- ============================ BẢNG QUẢN TRỊ ============================
CREATE TABLE tbl_QuanTri (
    MaQT        INT IDENTITY(1,1) PRIMARY KEY,
    TenDangNhap VARCHAR(50) NOT NULL UNIQUE,
    MatKhau     VARCHAR(100) NOT NULL,
    HoTen       NVARCHAR(100)
);
GO

-- =============================================================
--                        DỮ LIỆU MẪU
-- =============================================================

INSERT INTO tbl_DanhMuc (TenDM, MoTa) VALUES
(N'iPhone',   N'Điện thoại thông minh của Apple'),
(N'iPad',     N'Máy tính bảng của Apple'),
(N'Mac',      N'Máy tính xách tay và để bàn của Apple'),
(N'Apple Watch', N'Đồng hồ thông minh của Apple'),
(N'AirPods',  N'Tai nghe không dây của Apple'),
(N'Phụ kiện', N'Phụ kiện chính hãng Apple');
GO

INSERT INTO tbl_SanPham (TenSP, MaDM, DonGia, SoLuongTon, HinhAnh, MoTa) VALUES
(N'iPhone 16 Pro Max 256GB', 1, 34990000, 50, 'Images/iphone16promax.jpg', N'iPhone 16 Pro Max với chip A18 Pro, khung titan, camera 48MP, màn hình Super Retina XDR 6.9 inch.'),
(N'iPhone 16 128GB',         1, 22990000, 80, 'Images/iphone16.jpg',        N'iPhone 16 với chip A18, Camera Control, màn hình 6.1 inch, hỗ trợ Apple Intelligence.'),
(N'iPhone 15 128GB',         1, 19490000, 60, 'Images/iphone15.jpg',        N'iPhone 15 với Dynamic Island, camera chính 48MP, chip A16 Bionic, cổng USB-C.'),
(N'iPhone 14 128GB',         1, 14990000, 40, 'Images/iphone14.jpg',        N'iPhone 14 màn hình 6.1 inch, chip A15 Bionic, camera kép 12MP, pin bền bỉ cả ngày.'),
(N'iPad Pro M4 11 inch',     2, 28990000, 30, 'Images/ipadprom4.jpg',       N'iPad Pro với chip M4, màn hình Ultra Retina XDR, mỏng nhất từ trước đến nay của Apple.'),
(N'iPad Air M2 11 inch',     2, 16990000, 45, 'Images/ipadairm2.jpg',       N'iPad Air trang bị chip M2 mạnh mẽ, hỗ trợ Apple Pencil Pro và Magic Keyboard.'),
(N'iPad Gen 10 64GB',        2, 9990000,  70, 'Images/ipadgen10.jpg',       N'iPad thế hệ 10 màn hình 10.9 inch, chip A14 Bionic, thiết kế toàn màn hình nhiều màu sắc.'),
(N'MacBook Air M3 13 inch',  3, 27990000, 35, 'Images/macbookairm3.jpg',    N'MacBook Air M3 siêu mỏng nhẹ, pin 18 giờ, màn hình Liquid Retina 13.6 inch.'),
(N'MacBook Pro M4 14 inch',  3, 39990000, 20, 'Images/macbookprom4.jpg',    N'MacBook Pro 14 inch chip M4, màn hình Liquid Retina XDR, dành cho dân chuyên nghiệp.'),
(N'iMac M4 24 inch',         3, 34990000, 15, 'Images/imacm4.jpg',          N'iMac 24 inch chip M4, màn hình Retina 4.5K, thiết kế mỏng với 7 màu sắc.'),
(N'Mac mini M4',             3, 14990000, 25, 'Images/macminim4.jpg',       N'Mac mini M4 nhỏ gọn, hiệu năng vượt trội, cổng kết nối đa dạng.'),
(N'Apple Watch Series 10',   4, 10990000, 55, 'Images/watchs10.jpg',        N'Apple Watch Series 10 màn hình lớn hơn, mỏng hơn, sạc nhanh hơn.'),
(N'Apple Watch Ultra 2',     4, 21990000, 25, 'Images/watchultra2.jpg',     N'Apple Watch Ultra 2 vỏ titan bền bỉ, GPS hai băng tần, pin 36 giờ.'),
(N'Apple Watch SE 2',        4, 6390000,  65, 'Images/watchse2.jpg',        N'Apple Watch SE thế hệ 2, đầy đủ tính năng sức khỏe với giá dễ tiếp cận.'),
(N'AirPods Pro 2',           5, 5990000,  90, 'Images/airpodspro2.jpg',     N'AirPods Pro 2 chống ồn chủ động gấp 2 lần, âm thanh thích ứng, hộp sạc USB-C.'),
(N'AirPods 4',               5, 3490000,  100,'Images/airpods4.jpg',        N'AirPods 4 thiết kế mới thoải mái hơn, âm thanh không gian cá nhân hóa.'),
(N'AirPods Max',             5, 12990000, 20, 'Images/airpodsmax.jpg',      N'AirPods Max tai nghe trùm đầu cao cấp, chống ồn chủ động, âm thanh Hi-Fi.'),
(N'Sạc nhanh Apple 20W USB-C',6, 549000,  200,'Images/sac20w.jpg',          N'Củ sạc nhanh 20W chính hãng Apple, cổng USB-C.'),
(N'Cáp USB-C to USB-C 1m',   6, 490000,   250,'Images/capusbc.jpg',         N'Cáp sạc USB-C chính hãng Apple dài 1 mét, hỗ trợ sạc nhanh.'),
(N'Ốp lưng iPhone 16 Silicon',6, 1290000, 150,'Images/oplung16.jpg',        N'Ốp lưng Silicon chính hãng cho iPhone 16 với MagSafe, nhiều màu sắc.'),
(N'AirTag',                  6, 790000,   120,'Images/airtag.jpg',          N'AirTag giúp định vị và tìm kiếm đồ vật dễ dàng qua ứng dụng Find My.'),
(N'Magic Mouse USB-C',       6, 2190000,  60, 'Images/magicmouse.jpg',      N'Chuột Magic Mouse bề mặt cảm ứng Multi-Touch, sạc qua cổng USB-C.');
GO

-- Tài khoản quản trị mặc định:  admin / admin123
INSERT INTO tbl_QuanTri (TenDangNhap, MatKhau, HoTen) VALUES
('admin', 'admin123', N'Hồ Ngọc Trai');
GO

-- Khách hàng mẫu:  khach1 / 123456
INSERT INTO tbl_KhachHang (HoTen, TenDangNhap, MatKhau, Email, DienThoai, DiaChi) VALUES
(N'Nguyễn Văn An', 'khach1', '123456', 'an.nguyen@gmail.com', '0901234567', N'123 Nguyễn Đáng, TP. Trà Vinh'),
(N'Trần Thị Bình', 'khach2', '123456', 'binh.tran@gmail.com', '0912345678', N'45 Điện Biên Phủ, TP. Trà Vinh');
GO

-- Đơn hàng mẫu (phục vụ demo thống kê)
INSERT INTO tbl_DonHang (MaKH, NgayDat, TenNguoiNhan, DiaChiGiao, DienThoai, TongTien, TrangThai) VALUES
(1, DATEADD(DAY,-20,GETDATE()), N'Nguyễn Văn An', N'123 Nguyễn Đáng, TP. Trà Vinh', '0901234567', 40980000, N'Đã giao'),
(2, DATEADD(DAY,-10,GETDATE()), N'Trần Thị Bình', N'45 Điện Biên Phủ, TP. Trà Vinh', '0912345678', 28990000, N'Đã giao'),
(1, DATEADD(DAY,-2, GETDATE()), N'Nguyễn Văn An', N'123 Nguyễn Đáng, TP. Trà Vinh', '0901234567', 6480000,  N'Chờ xử lý');
GO

INSERT INTO tbl_ChiTietDonHang (MaDH, MaSP, SoLuong, DonGia) VALUES
(1, 1, 1, 34990000),
(1, 15, 1, 5990000),
(2, 5, 1, 28990000),
(3, 16, 1, 3490000),
(3, 18, 1, 549000),
(3, 21, 3, 790000);
GO

PRINT N'Tạo CSDL AppleStore thành công!';
