# HƯỚNG DẪN CHẠY WEBSITE APPLE STORE

## Yêu cầu cài đặt
1. **Visual Studio 2019 hoặc 2022** (Community - miễn phí), khi cài chọn workload **"ASP.NET and web development"**
2. **SQL Server** (Express - miễn phí) + **SQL Server Management Studio (SSMS)**

## Bước 1: Tạo cơ sở dữ liệu
1. Mở **SQL Server Management Studio**, kết nối vào máy chủ
2. Nhấn **New Query**
3. Mở file `Database/AppleStore.sql`, copy toàn bộ nội dung dán vào và nhấn **Execute (F5)**
4. Kiểm tra: xuất hiện database **AppleStore** với 6 bảng là thành công

## Bước 2: Cấu hình chuỗi kết nối
Mở file `web.config`, kiểm tra dòng:
```
Data Source=localhost;Initial Catalog=AppleStore;Integrated Security=True
```
- Nếu máy dùng **SQL Server Express**: đổi `Data Source=localhost` thành `Data Source=.\SQLEXPRESS`
- Nếu SQL Server có user/password: đổi thành
  `Data Source=localhost;Initial Catalog=AppleStore;User ID=sa;Password=mật_khẩu_của_bạn`

## Bước 3: Chạy website
1. Mở Visual Studio → **File → Open → Web Site...** (hoặc Open Folder) → chọn thư mục `AppleStore`
2. Nhấn **F5** (hoặc Ctrl+F5) để chạy
3. Trình duyệt tự mở trang chủ

## Tài khoản demo
| Vai trò | Đường dẫn | Tài khoản | Mật khẩu |
|---|---|---|---|
| Khách hàng | /DangNhap.aspx | khach1 | 123456 |
| Quản trị | /Admin/DangNhapAdmin.aspx | admin | admin123 |

## Cấu trúc thư mục
```
AppleStore/
├── Database/AppleStore.sql      ← Script tạo CSDL + dữ liệu mẫu
├── App_Code/XuLyDuLieu.cs       ← Lớp xử lý dữ liệu ADO.NET dùng chung
├── Content/StyleSheet.css       ← Giao diện CSS
├── Images/                      ← Hình sản phẩm (có thể thay bằng ảnh thật)
├── Site.master                  ← Giao diện chung (menu, footer)
├── Default.aspx                 ← Trang chủ
├── SanPham.aspx                 ← Danh sách + tìm kiếm + lọc sản phẩm
├── ChiTietSanPham.aspx          ← Chi tiết sản phẩm + thêm giỏ hàng
├── GioHang.aspx                 ← Giỏ hàng (Session)
├── ThanhToan.aspx               ← Đặt hàng
├── DangNhap.aspx / DangKy.aspx  ← Tài khoản khách hàng
├── GioiThieu.aspx               ← Trang giới thiệu
└── Admin/                       ← Khu quản trị
    ├── DangNhapAdmin.aspx       ← Đăng nhập admin
    ├── ThongKe.aspx             ← Thống kê, báo cáo doanh thu
    ├── QuanLySanPham.aspx       ← Thêm/sửa/xóa sản phẩm
    ├── QuanLyDanhMuc.aspx       ← Thêm/sửa/xóa danh mục
    ├── QuanLyDonHang.aspx       ← Duyệt đơn hàng
    └── QuanLyKhachHang.aspx     ← Danh sách khách hàng
```

## Thay ảnh sản phẩm thật (nên làm để đẹp hơn)
Ảnh trong thư mục `Images/` hiện là ảnh minh họa. Tải ảnh thật từ apple.com/vn
hoặc các trang bán lẻ, đặt đúng tên file (VD: `iphone16promax.jpg`) và chép đè vào thư mục `Images/`.

## Lỗi thường gặp
- **Không kết nối được CSDL**: kiểm tra lại Bước 2, xem tên server trong SSMS lúc đăng nhập là gì thì điền đúng tên đó vào `Data Source=`
- **Lỗi font tiếng Việt trong SSMS**: đảm bảo chạy đúng file .sql gốc (đã có chữ N trước chuỗi tiếng Việt)
- **Trang báo lỗi validateRequest**: đã cấu hình sẵn trong web.config, không cần chỉnh
