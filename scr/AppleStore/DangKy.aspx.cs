using System;
using System.Data;
using System.Data.SqlClient;

public partial class DangKy : System.Web.UI.Page
{
    protected void btnDangKy_Click(object sender, EventArgs e)
    {
        // Kiểm tra tên đăng nhập đã tồn tại chưa
        SqlParameter pKiemTra = new SqlParameter("@ten", txtTenDangNhap.Text.Trim());
        object soLuong = XuLyDuLieu.LayGiaTri(
            "SELECT COUNT(*) FROM tbl_KhachHang WHERE TenDangNhap = @ten", pKiemTra);

        if (Convert.ToInt32(soLuong) > 0)
        {
            lblThongBao.CssClass = "error-msg";
            lblThongBao.Text = "Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!";
            return;
        }

        // Thêm khách hàng mới vào CSDL
        string sql = @"INSERT INTO tbl_KhachHang (HoTen, TenDangNhap, MatKhau, Email, DienThoai, DiaChi)
                       VALUES (@hoTen, @tenDN, @matKhau, @email, @dienThoai, @diaChi)";
        SqlParameter[] thamSo = new SqlParameter[]
        {
            new SqlParameter("@hoTen", txtHoTen.Text.Trim()),
            new SqlParameter("@tenDN", txtTenDangNhap.Text.Trim()),
            new SqlParameter("@matKhau", txtMatKhau.Text),
            new SqlParameter("@email", txtEmail.Text.Trim()),
            new SqlParameter("@dienThoai", txtDienThoai.Text.Trim()),
            new SqlParameter("@diaChi", txtDiaChi.Text.Trim())
        };

        int ketQua = XuLyDuLieu.ThucThi(sql, thamSo);
        if (ketQua > 0)
        {
            lblThongBao.CssClass = "success-msg";
            lblThongBao.Text = "Đăng ký thành công! <a href='DangNhap.aspx'>Đăng nhập ngay</a>";
        }
        else
        {
            lblThongBao.CssClass = "error-msg";
            lblThongBao.Text = "Có lỗi xảy ra, vui lòng thử lại!";
        }
    }
}
